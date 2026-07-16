package com.example.accessapp.ui.signlanguage

import android.Manifest
import android.speech.tts.TextToSpeech
import androidx.camera.core.CameraSelector
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import com.example.accessapp.ui.ocr.CameraView
import com.google.accompanist.permissions.ExperimentalPermissionsApi
import com.google.accompanist.permissions.isGranted
import com.google.accompanist.permissions.rememberPermissionState
import java.util.Locale

@OptIn(ExperimentalPermissionsApi::class)
@Composable
fun SignLanguageScreen(
    onNavigateBack: () -> Unit,
) {
    val context = LocalContext.current
    val cameraPermissionState = rememberPermissionState(permission = Manifest.permission.CAMERA)
    
    var detectedGesture by remember { mutableStateOf("Waiting for gesture...") }
    var useFrontCamera by remember { mutableStateOf(value = true) }
    var enableTTS by remember { mutableStateOf(false) }
    
    val cameraSelector = if (useFrontCamera) CameraSelector.DEFAULT_FRONT_CAMERA else CameraSelector.DEFAULT_BACK_CAMERA

    var tts: TextToSpeech? by remember { mutableStateOf(null) }
    var lastSpokenGesture by remember { mutableStateOf("") }

    DisposableEffect(Unit) {
        val ttsEngine = TextToSpeech(context) { status ->
            if (status == TextToSpeech.SUCCESS) {
                tts?.language = Locale.US
            }
        }
        tts = ttsEngine
        onDispose {
            ttsEngine.stop()
            ttsEngine.shutdown()
        }
    }

    val gestureRecognizer = remember {
        GestureRecognizerHelper(
            context = context,
            gestureListener = object : GestureRecognizerHelper.GestureListener {
                override fun onGestureDetected(gestureName: String) {
                    val formattedGesture = gestureName.replace("_", " ")
                    detectedGesture = formattedGesture

                    if (enableTTS && (formattedGesture != "No gesture detected") && (formattedGesture != lastSpokenGesture)) {
                        val prefix = "The user is signing: "
                        tts?.speak("$prefix$formattedGesture", TextToSpeech.QUEUE_FLUSH, null, "TTS_ID")
                        lastSpokenGesture = formattedGesture
                    }
                }
            }
        )
    }

    if (!cameraPermissionState.status.isGranted) {
        Column(
            modifier = Modifier.fillMaxSize().padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Text("Camera permission is required for Live Sign Language.")
            Spacer(modifier = Modifier.height(16.dp))
            Button(onClick = { cameraPermissionState.launchPermissionRequest() }) {
                Text("Grant Permission")
            }
        }
        return
    }

    Box(modifier = Modifier.fillMaxSize()) {
        CameraView(cameraSelector = cameraSelector) { bitmap ->
            gestureRecognizer.recognize(bitmap)
        }

        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp),
            verticalArrangement = Arrangement.SpaceBetween
        ) {
            // Top Controls
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Button(onClick = onNavigateBack) { Text("Back") }

                Button(onClick = { useFrontCamera = !useFrontCamera }) {
                    Text("Flip Camera")
                }
            }

            val scrollState = rememberScrollState()
            Column(modifier = Modifier.verticalScroll(scrollState)) {
                
                // Detected Gesture Box
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.9f))
                ) {
                    Column(
                        modifier = Modifier.padding(16.dp),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Text(
                            text = "Detected Gesture:", 
                            style = MaterialTheme.typography.titleSmall,
                            color = MaterialTheme.colorScheme.primary
                        )
                        Text(
                            text = detectedGesture,
                            style = MaterialTheme.typography.titleLarge
                        )
                        
                        Spacer(modifier = Modifier.height(16.dp))

                        Text(
                            text = "Live Translation:", 
                            style = MaterialTheme.typography.titleMedium,
                            color = MaterialTheme.colorScheme.primary
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                        
                        val waitingText = "I am waiting for you to sign."
                        val userSigningPrefix = "The user is signing:"
                        
                        Text(
                            text = if ((detectedGesture == "Waiting for gesture...") || (detectedGesture == "No gesture detected") || (detectedGesture.isBlank()))
                                     waitingText 
                                   else 
                                     "$userSigningPrefix $detectedGesture.",
                            style = MaterialTheme.typography.bodyLarge
                        )
                        Spacer(modifier = Modifier.height(16.dp))
                        
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Text("Speak Gestures (TTS)")
                            Spacer(modifier = Modifier.width(8.dp))
                            Switch(
                                checked = enableTTS,
                                onCheckedChange = { enableTTS = it }
                            )
                        }
                    }
                }
            }
        }
    }
}
