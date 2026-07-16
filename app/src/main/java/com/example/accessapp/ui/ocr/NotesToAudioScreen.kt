package com.example.accessapp.ui.ocr

import android.Manifest
import android.graphics.Bitmap
import android.graphics.ImageDecoder
import android.net.Uri
import android.os.Build
import android.provider.MediaStore
import android.speech.tts.TextToSpeech
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.asImageBitmap
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.tooling.preview.Devices
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.example.accessapp.theme.AccessAppTheme
import com.google.accompanist.permissions.ExperimentalPermissionsApi
import com.google.accompanist.permissions.isGranted
import com.google.accompanist.permissions.rememberPermissionState
import com.google.mlkit.vision.common.InputImage
import com.google.mlkit.vision.text.TextRecognition
import com.google.mlkit.vision.text.latin.TextRecognizerOptions
import com.google.mlkit.vision.text.devanagari.DevanagariTextRecognizerOptions
import java.util.Locale

@OptIn(ExperimentalPermissionsApi::class)
@Composable
fun NotesToAudioScreen(
    onNavigateBack: () -> Unit,
) {
    val context = LocalContext.current
    val cameraPermissionState = rememberPermissionState(permission = Manifest.permission.CAMERA)
    
    var extractedText by remember { mutableStateOf("Aim at some text or upload an image...") }
    var isReading by remember { mutableStateOf(value = false) }
    var uploadedBitmap by remember { mutableStateOf<Bitmap?>(null) }
    
    // The Devanagari recognizer natively supports BOTH English (Latin) and Hindi (Devanagari) characters simultaneously
    val universalRecognizer = remember { TextRecognition.getClient(DevanagariTextRecognizerOptions.Builder().build()) }
    
    var tts: TextToSpeech? by remember { mutableStateOf(null) }

    DisposableEffect(Unit) {
        val ttsEngine = TextToSpeech(context) { _ -> }
        tts = ttsEngine
        onDispose {
            ttsEngine.stop()
            ttsEngine.shutdown()
        }
    }
    
    DisposableEffect(Unit) {
        onDispose {
            universalRecognizer.close()
        }
    }

    // Auto Language Detection using Unicode blocks
    fun speakText(text: String) {
        if (text.isBlank() || text.contains("Aim at some text")) return
        
        // Devanagari Unicode Block: U+0900 to U+097F
        val isHindi = Regex("[\\u0900-\\u097F]").containsMatchIn(text)
        val locale = if (isHindi) Locale.forLanguageTag("hi-IN") else Locale.US
        
        tts?.language = locale
        isReading = true
        tts?.speak(text, TextToSpeech.QUEUE_FLUSH, null, "TTS_ID")
    }

    val galleryLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.GetContent()
    ) { uri: Uri? ->
        uri?.let {
            try {
                val bitmap = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
                    val source = ImageDecoder.createSource(context.contentResolver, it)
                    ImageDecoder.decodeBitmap(source)
                } else {
                    @Suppress("DEPRECATION")
                    MediaStore.Images.Media.getBitmap(context.contentResolver, it)
                }
                
                uploadedBitmap = bitmap
                val image = InputImage.fromBitmap(bitmap, 0)
                
                universalRecognizer.process(image)
                    .addOnSuccessListener { visionText ->
                        val formattedText = visionText.text.replace("\n", " ").trim()
                        extractedText = if (formattedText.isNotBlank()) formattedText else "No text found in image."
                        
                        if (formattedText.isNotBlank()) {
                            speakText(formattedText)
                        }
                    }
                    .addOnFailureListener { _ ->
                        extractedText = "Failed to process image."
                    }
            } catch (e: Exception) {
                extractedText = "Error loading image."
            }
        }
    }

    if (!cameraPermissionState.status.isGranted) {
        Column(
            modifier = Modifier.fillMaxSize().padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Text("Camera permission is required for live scanning.")
            Spacer(modifier = Modifier.height(16.dp))
            Button(onClick = { cameraPermissionState.launchPermissionRequest() }) {
                Text("Grant Permission")
            }
            Spacer(modifier = Modifier.height(16.dp))
            Button(onClick = { galleryLauncher.launch("image/*") }) {
                Text("Upload Image Instead")
            }
        }
        return
    }

    Box(modifier = Modifier.fillMaxSize().background(MaterialTheme.colorScheme.background)) {
        if (uploadedBitmap == null) {
            CameraView { bitmap ->
                if (!isReading) {
                    val image = InputImage.fromBitmap(bitmap, 0)
                    universalRecognizer.process(image)
                        .addOnSuccessListener { visionText ->
                            val formattedText = visionText.text.replace("\n", " ").trim()
                            if (formattedText.isNotBlank()) {
                                extractedText = formattedText
                            }
                        }
                }
            }
        }

        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp),
            verticalArrangement = Arrangement.SpaceBetween
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Button(onClick = onNavigateBack) { Text("Back") }
                
                if (uploadedBitmap != null) {
                    Button(onClick = { 
                        uploadedBitmap = null
                        extractedText = "Aim at some text or upload an image..."
                        tts?.stop()
                        isReading = false
                    }) {
                        Text("Clear Image")
                    }
                } else {
                    Button(onClick = { galleryLauncher.launch("image/*") }) {
                        Text("Upload Image")
                    }
                }
            }

            if (uploadedBitmap != null) {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .weight(1f)
                        .padding(bottom = 16.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Image(
                        bitmap = uploadedBitmap!!.asImageBitmap(),
                        contentDescription = "Uploaded Image Preview",
                        modifier = Modifier
                            .fillMaxWidth(0.6f)
                            .aspectRatio(1f),
                        contentScale = ContentScale.Fit
                    )
                }
            } else {
                Spacer(modifier = Modifier.weight(1f))
            }

            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .heightIn(min = 150.dp, max = 250.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.9f))
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(
                        text = "Detected Text:", 
                        style = MaterialTheme.typography.titleMedium,
                        color = MaterialTheme.colorScheme.primary
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    
                    val scrollState = rememberScrollState()
                    Text(
                        text = extractedText,
                        style = MaterialTheme.typography.bodyMedium,
                        modifier = Modifier.weight(1f).verticalScroll(scrollState)
                    )
                    Spacer(modifier = Modifier.height(16.dp))
                    
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceEvenly
                    ) {
                        Button(onClick = { 
                            speakText(extractedText) 
                        }) {
                            Text("Read Aloud")
                        }
                        
                        Button(
                            onClick = {
                                isReading = false
                                tts?.stop()
                            },
                            enabled = isReading
                        ) {
                            Text("Stop")
                        }
                    }
                }
            }
        }
    }
}

@Preview(showBackground = true, device = Devices.PIXEL_7, showSystemUi = true)
@Composable
fun NotesToAudioScreenPreview() {
    AccessAppTheme {
        NotesToAudioScreen(onNavigateBack = {})
    }
}
