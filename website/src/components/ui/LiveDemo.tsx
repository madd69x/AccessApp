import { useRef, useState, useEffect } from 'react';
import { HandLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';
import { Camera, StopCircle, RefreshCw } from 'lucide-react';
import { playClickSound } from '../../lib/sounds';

export const LiveDemo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [handLandmarker, setHandLandmarker] = useState<HandLandmarker | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [lastVideoTime, setLastVideoTime] = useState(-1);
  const requestRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    let active = true;
    const initializeModel = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );
        const landmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
            delegate: "CPU"
          },
          runningMode: "VIDEO",
          numHands: 2
        });
        if (active) {
          setHandLandmarker(landmarker);
        }
      } catch (err) {
        if (active) setErrorMsg("Failed to load neural model. Please check connection.");
      }
    };
    initializeModel();
    return () => { active = false; };
  }, []);

  const enableCam = async () => {
    playClickSound();
    if (!handLandmarker) return;
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.addEventListener("loadeddata", () => {
          setIsLoading(false);
          setIsCameraActive(true);
          predictWebcam();
        });
      }
    } catch (err) {
      setIsLoading(false);
      setErrorMsg("Camera access denied or unavailable.");
    }
  };

  const disableCam = () => {
    playClickSound();
    setIsCameraActive(false);
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    
    // Clear canvas
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const predictWebcam = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !handLandmarker) return;

    // Set canvas dimensions to match video
    if (canvas.width !== video.videoWidth) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    }

    const startTimeMs = performance.now();
    if (lastVideoTime !== video.currentTime) {
      setLastVideoTime(video.currentTime);
      const results = handLandmarker.detectForVideo(video, startTimeMs);
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (results.landmarks) {
          for (const landmarks of results.landmarks) {
            // Draw custom sci-fi style connections
            ctx.strokeStyle = '#3B82F6';
            ctx.lineWidth = 2;
            
            // Draw points
            for (let i = 0; i < landmarks.length; i++) {
              const lm = landmarks[i];
              ctx.beginPath();
              ctx.arc(lm.x * canvas.width, lm.y * canvas.height, 4, 0, 2 * Math.PI);
              ctx.fillStyle = '#60A5FA';
              ctx.fill();
              
              if (i > 0 && i % 4 !== 0) {
                const prevLm = landmarks[i - 1];
                ctx.beginPath();
                ctx.moveTo(prevLm.x * canvas.width, prevLm.y * canvas.height);
                ctx.lineTo(lm.x * canvas.width, lm.y * canvas.height);
                ctx.stroke();
              }
            }
          }
        }
        ctx.restore();
      }
    }

    if (isCameraActive) {
      requestRef.current = requestAnimationFrame(predictWebcam);
    }
  };

  // Ensure loop runs continuously while active
  useEffect(() => {
    if (isCameraActive && videoRef.current) {
      requestRef.current = requestAnimationFrame(predictWebcam);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isCameraActive, lastVideoTime]);

  return (
    <div className="w-full relative rounded-2xl overflow-hidden border border-[#1E293B] bg-[#050A15] shadow-2xl">
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E293B] bg-[#0F172A]/50 backdrop-blur-md relative z-20">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${isCameraActive ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)] animate-pulse' : 'bg-red-500'}`} />
          <h3 className="font-['Sora'] font-semibold text-white tracking-tight">Live Neural Engine Demo</h3>
        </div>
        {!isCameraActive ? (
          <button 
            onClick={enableCam} 
            disabled={!handLandmarker || isLoading}
            className="px-4 py-2 bg-[#3B82F6] hover:bg-[#2563EB] disabled:bg-[#1E293B] disabled:text-[#64748B] text-white rounded-md text-sm font-semibold transition-colors flex items-center gap-2"
          >
            {isLoading ? <RefreshCw className="animate-spin" size={16} /> : <Camera size={16} />}
            {isLoading ? 'Starting...' : handLandmarker ? 'Start Demo' : 'Loading Model...'}
          </button>
        ) : (
          <button 
            onClick={disableCam}
            className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-md text-sm font-semibold transition-colors flex items-center gap-2"
          >
            <StopCircle size={16} /> Stop
          </button>
        )}
      </div>

      <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
        {!isCameraActive && !isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-[#64748B] p-6 text-center z-10">
            <Camera size={48} className="mb-4 opacity-50" />
            <p className="max-w-md">Experience our edge-AI hand tracking model running live in your browser using WebAssembly. No data is sent to the cloud.</p>
            {errorMsg && <p className="text-red-400 mt-4 font-medium">{errorMsg}</p>}
          </div>
        )}
        
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/80 backdrop-blur-sm">
            <RefreshCw size={32} className="text-[#3B82F6] animate-spin mb-4" />
            <p className="text-[#94A3B8]">Requesting camera access...</p>
          </div>
        )}

        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          playsInline
          muted
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10"
        />
      </div>
    </div>
  );
};
