package com.example.accessapp.ui.obstacle

import android.Manifest
import android.content.Context
import android.graphics.Bitmap
import android.media.AudioManager
import android.media.ToneGenerator
import android.os.Build
import android.os.VibrationEffect
import android.os.Vibrator
import android.os.VibratorManager
import android.util.Log
import androidx.camera.core.*
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.camera.view.PreviewView
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.viewinterop.AndroidView
import androidx.core.content.ContextCompat
import androidx.lifecycle.compose.LocalLifecycleOwner
import com.google.accompanist.permissions.ExperimentalPermissionsApi
import com.google.accompanist.permissions.isGranted
import com.google.accompanist.permissions.rememberPermissionState
import com.google.mediapipe.tasks.vision.objectdetector.ObjectDetectorResult
import kotlinx.coroutines.delay
import java.util.concurrent.Executors

@OptIn(ExperimentalPermissionsApi::class)
@Composable
fun ObstacleRadarScreen(onNavigateBack: () -> Unit) {
    val cameraPermissionState = rememberPermissionState(Manifest.permission.CAMERA)

    if (cameraPermissionState.status.isGranted) {
        ObstacleRadarContent(onNavigateBack = onNavigateBack)
    } else {
        Column(
            modifier = Modifier.fillMaxSize().padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Text(
                "Camera permission is required to detect obstacles.",
                textAlign = TextAlign.Center
            )
            Spacer(modifier = Modifier.height(16.dp))
            Button(onClick = { cameraPermissionState.launchPermissionRequest() }) {
                Text("Grant Permission")
            }
        }
    }
}

@Composable
fun ObstacleRadarContent(onNavigateBack: () -> Unit) {
    val context = LocalContext.current
    val lifecycleOwner = LocalLifecycleOwner.current

    var objectDetectorResult by remember { mutableStateOf<ObjectDetectorResult?>(null) }
    var isRunning by remember { mutableStateOf(true) }
    var detectorError by remember { mutableStateOf<String?>(null) }
    
    val imageWidth = remember { mutableStateOf(1) }
    val imageHeight = remember { mutableStateOf(1) }

    val vibrator = remember {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S)
            (context.getSystemService(Context.VIBRATOR_MANAGER_SERVICE) as VibratorManager).defaultVibrator
        else {
            @Suppress("DEPRECATION")
            context.getSystemService(Context.VIBRATOR_SERVICE) as Vibrator
        }
    }
    val toneGen = remember { ToneGenerator(AudioManager.STREAM_MUSIC, 100) }

    val objectDetectorHelper = remember {
        ObjectDetectorHelper(
            context = context,
            threshold = 0.5f,
            maxResults = 5,
            objectDetectorListener = object : ObjectDetectorHelper.DetectorListener {
                override fun onError(error: String) {
                    detectorError = error
                    Log.e("ObstacleRadar", "Error: $error")
                }

                override fun onResults(
                    results: ObjectDetectorResult?,
                    inferenceTime: Long,
                    height: Int,
                    width: Int
                ) {
                    if (isRunning) {
                        objectDetectorResult = results
                        imageHeight.value = height
                        imageWidth.value = width
                    }
                }
            }
        )
    }

    DisposableEffect(Unit) {
        onDispose {
            isRunning = false
            objectDetectorHelper.clearObjectDetector()
            toneGen.release()
            vibrator.cancel()
        }
    }

    // Feedback Loop
    LaunchedEffect(objectDetectorResult, isRunning) {
        val result = objectDetectorResult
        if (isRunning && result != null && result.detections().isNotEmpty()) {
            val closestDetection = result.detections().maxByOrNull {
                it.boundingBox().width() * it.boundingBox().height()
            }
            if (closestDetection != null) {
                val imgArea = imageWidth.value.toFloat() * imageHeight.value.toFloat()
                val detArea = closestDetection.boundingBox().width() * closestDetection.boundingBox().height()
                val areaRatio = if (imgArea > 0) detArea / imgArea else 0f

                if (areaRatio > 0.15f) {
                    val exp = areaRatio.coerceIn(0f, 1f)
                    val delayMs = (1000 / (1 + exp * 10)).toLong().coerceAtLeast(100)
                    try {
                        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                            vibrator.vibrate(VibrationEffect.createOneShot(50, (exp * 255).toInt().coerceIn(1, 255)))
                        } else { 
                            @Suppress("DEPRECATION")
                            vibrator.vibrate(50) 
                        }                        
                        if (areaRatio > 0.4f)
                            toneGen.startTone(ToneGenerator.TONE_CDMA_ABBR_ALERT, 50)
                        else
                            toneGen.startTone(ToneGenerator.TONE_CDMA_PIP, 50)
                    } catch (_: Exception) {}
                    delay(delayMs)
                }
            }
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.Black)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Button(
                onClick = { isRunning = false; onNavigateBack() },
                colors = ButtonDefaults.buttonColors(containerColor = Color.DarkGray)
            ) { Text("Back", color = Color.White) }
            Spacer(modifier = Modifier.width(16.dp))
            Text(
                "Obstacle Radar (MediaPipe)",
                style = MaterialTheme.typography.titleLarge,
                color = Color.White
            )
        }

        Box(
            modifier = Modifier
                .fillMaxWidth()
                .weight(1f)
                .clip(RoundedCornerShape(16.dp))
        ) {
            AndroidView(
                factory = { ctx ->
                    val previewView = PreviewView(ctx)
                    val future = ProcessCameraProvider.getInstance(ctx)
                    future.addListener({
                        val provider = future.get()
                        val preview = Preview.Builder().build().also {
                            it.setSurfaceProvider(previewView.surfaceProvider)
                        }
                        val analyser = ImageAnalysis.Builder()
                            .setBackpressureStrategy(ImageAnalysis.STRATEGY_KEEP_ONLY_LATEST)
                            .setOutputImageFormat(ImageAnalysis.OUTPUT_IMAGE_FORMAT_RGBA_8888)
                            .build().also { ia ->
                                ia.setAnalyzer(Executors.newSingleThreadExecutor()) { proxy ->
                                    val bmp = Bitmap.createBitmap(
                                        proxy.width, proxy.height, Bitmap.Config.ARGB_8888
                                    )
                                    proxy.use { p ->
                                        p.planes[0].buffer.rewind()
                                        bmp.copyPixelsFromBuffer(p.planes[0].buffer)
                                    }
                                    if (isRunning) {
                                        objectDetectorHelper.detect(bmp, proxy.imageInfo.rotationDegrees)
                                    }
                                }
                            }
                        try {
                            provider.unbindAll()
                            provider.bindToLifecycle(
                                lifecycleOwner,
                                CameraSelector.DEFAULT_BACK_CAMERA,
                                preview, analyser
                            )
                        } catch (e: Exception) {
                            Log.e("ObstacleRadar", "Camera bind failed", e)
                        }
                    }, ContextCompat.getMainExecutor(ctx))
                    previewView
                },
                modifier = Modifier.fillMaxSize()
            )

            // Bounding box overlay
            objectDetectorResult?.let { result ->
                if (result.detections().isNotEmpty()) {
                    Canvas(modifier = Modifier.fillMaxSize()) {
                        val scaleFactor = maxOf(
                            size.width / imageWidth.value,
                            size.height / imageHeight.value
                        )
                        
                        result.detections().forEach { detection ->
                            val boundingBox = detection.boundingBox()
                            
                            val left = boundingBox.left * scaleFactor
                            val top = boundingBox.top * scaleFactor
                            val width = boundingBox.width() * scaleFactor
                            val height = boundingBox.height() * scaleFactor
                            
                            val detArea = boundingBox.width() * boundingBox.height()
                            val imgArea = imageWidth.value.toFloat() * imageHeight.value.toFloat()
                            val areaRatio = if (imgArea > 0) detArea / imgArea else 0f
                            
                            // Dynamic color based on proximity (size), using professional, muted tones
                            val targetColor = when {
                                areaRatio > 0.4f -> Color(0xFFDC2626) // Deep, professional Red
                                areaRatio > 0.15f -> Color(0xFFF59E0B) // Muted Amber/Gold
                                else -> Color(0xFF1E3A8A) // Deep Navy Blue (Primary) instead of bright green
                            }

                            drawRect(
                                color = targetColor,
                                topLeft = Offset(left, top),
                                size = Size(width, height),
                                style = Stroke(width = 8f)
                            )
                        }
                    }
                }
            }
            
            detectorError?.let { err ->
                 Box(
                    modifier = Modifier.fillMaxSize().background(Color(0xCC0F172A)),
                    contentAlignment = Alignment.Center
                ) {
                    Text(err, color = Color(0xFFEF4444), textAlign = TextAlign.Center,
                         modifier = Modifier.padding(24.dp))
                }
            }
        }
        
        Spacer(modifier = Modifier.height(16.dp))
        
        // Polished HUD Status Panel
        Surface(
            modifier = Modifier
                .fillMaxWidth()
                .height(100.dp)
                .padding(horizontal = 16.dp, vertical = 8.dp),
            shape = RoundedCornerShape(24.dp),
            color = MaterialTheme.colorScheme.surface,
            shadowElevation = 8.dp
        ) {
            Column(modifier = Modifier.padding(24.dp), horizontalAlignment = Alignment.CenterHorizontally) {
                val text = if (objectDetectorResult?.detections()?.isNotEmpty() == true) {
                    val detection = objectDetectorResult!!.detections().first()
                    val category = detection.categories().firstOrNull()?.categoryName() ?: "Unknown"
                    "Detected: ${category.uppercase()}"
                } else {
                    "Path Clear"
                }
                
                // Professional text colors
                val statusColor = if (text == "Path Clear") Color(0xFF10B981) // Muted Emerald Green
                                 else Color(0xFFEF4444) // Muted Red
                
                Text(
                    text = text, 
                    color = statusColor, 
                    style = MaterialTheme.typography.headlineMedium.copy(fontWeight = FontWeight.Bold),
                    maxLines = 1,
                    overflow = androidx.compose.ui.text.style.TextOverflow.Ellipsis
                )
            }
        }
    }
}
