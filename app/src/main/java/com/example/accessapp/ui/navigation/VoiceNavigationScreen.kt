package com.example.accessapp.ui.navigation

import android.Manifest
import android.annotation.SuppressLint
import android.content.Intent
import android.location.Location
import android.os.Bundle
import android.speech.RecognitionListener
import android.speech.RecognizerIntent
import android.speech.SpeechRecognizer
import android.speech.tts.TextToSpeech
import android.util.Log
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.tooling.preview.Devices
import androidx.compose.ui.tooling.preview.Preview
import androidx.lifecycle.compose.LocalLifecycleOwner
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.viewinterop.AndroidView
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.LifecycleEventObserver
import com.example.accessapp.theme.AccessAppTheme
import com.google.accompanist.permissions.ExperimentalPermissionsApi
import com.google.accompanist.permissions.rememberMultiplePermissionsState
import com.google.android.gms.location.LocationServices
import com.google.ai.client.generativeai.GenerativeModel
import kotlinx.coroutines.launch
import org.json.JSONObject
import org.osmdroid.config.Configuration
import org.osmdroid.tileprovider.tilesource.TileSourceFactory
import org.osmdroid.util.GeoPoint
import org.osmdroid.views.MapView
import org.osmdroid.views.overlay.Marker
import org.osmdroid.views.overlay.Polyline
import org.osmdroid.views.overlay.mylocation.GpsMyLocationProvider
import org.osmdroid.views.overlay.mylocation.MyLocationNewOverlay
import java.util.Locale

@SuppressLint("MissingPermission")
@OptIn(ExperimentalPermissionsApi::class)
@Composable
fun VoiceNavigationScreen(
    onNavigateBack: () -> Unit,
) {
    val context = LocalContext.current
    Configuration.getInstance().userAgentValue = context.packageName

    val permissionsState = rememberMultiplePermissionsState(
        permissions = listOf(
            Manifest.permission.RECORD_AUDIO,
            Manifest.permission.ACCESS_FINE_LOCATION,
            Manifest.permission.ACCESS_COARSE_LOCATION
        )
    )

    var spokenText by remember { mutableStateOf("Tap the mic to speak...") }
    var isListening by remember { mutableStateOf(value = false) }
    var tts: TextToSpeech? by remember { mutableStateOf(null) }
    var speechRecognizer: SpeechRecognizer? by remember { mutableStateOf(null) }
    var speechRecognizerIntent: Intent? by remember { mutableStateOf(null) }

    val fusedLocationClient = remember { LocationServices.getFusedLocationProviderClient(context) }
    var currentLocation by remember { mutableStateOf<Location?>(null) }
    var mapView by remember { mutableStateOf<MapView?>(null) }
    
    val coroutineScope = rememberCoroutineScope()
    
    val mbmUniversityGeoPoint = GeoPoint(26.2655, 73.0450)
    
    // Initialize Gemini Model
    val generativeModel = remember {
        GenerativeModel(
            modelName = "gemini-1.5-flash",
            apiKey = "YOUR_API_KEY_HERE"
        )
    }

    LaunchedEffect(permissionsState.allPermissionsGranted) {
        if (permissionsState.allPermissionsGranted) {
            fusedLocationClient.lastLocation.addOnSuccessListener { location: Location? ->
                currentLocation = location
                location?.let {
                    mapView?.controller?.setCenter(GeoPoint(it.latitude, it.longitude))
                }
            }
        }
    }

    DisposableEffect(Unit) {
        val ttsEngine = TextToSpeech(context) { status ->
            if (status == TextToSpeech.SUCCESS) tts?.language = Locale.US
        }
        tts = ttsEngine
        onDispose {
            ttsEngine.stop()
            ttsEngine.shutdown()
        }
    }

    DisposableEffect(Unit) {
        if (SpeechRecognizer.isRecognitionAvailable(context)) {
            val recognizer = SpeechRecognizer.createSpeechRecognizer(context)
            val intent = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH).apply {
                putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
                putExtra(RecognizerIntent.EXTRA_LANGUAGE, Locale.getDefault())
            }

            recognizer.setRecognitionListener(
                object : RecognitionListener {
                override fun onReadyForSpeech(params: Bundle?) { isListening = true }
                override fun onBeginningOfSpeech() {}
                override fun onRmsChanged(rmsdB: Float) {}
                override fun onBufferReceived(buffer: ByteArray?) {}
                override fun onEndOfSpeech() { isListening = false }
                override fun onError(error: Int) {
                    isListening = false
                    spokenText = "Error listening. Please try again."
                }
                override fun onResults(results: Bundle?) {
                    val matches = results?.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION)
                    if (!matches.isNullOrEmpty()) {
                        val text = matches[0]
                        spokenText = text
                        
                        coroutineScope.launch {
                            handleDynamicNavigation(text, tts, currentLocation, mapView, generativeModel)
                        }
                    }
                }
                override fun onPartialResults(partialResults: Bundle?) {}
                override fun onEvent(eventType: Int, params: Bundle?) {}
            })
            speechRecognizer = recognizer
            speechRecognizerIntent = intent
        } else {
            spokenText = "Speech Recognition not available."
        }
        onDispose { speechRecognizer?.destroy() }
    }

    val lifecycleOwner = LocalLifecycleOwner.current
    DisposableEffect(lifecycleOwner) {
        val observer = LifecycleEventObserver { _, event ->
            if (event == Lifecycle.Event.ON_RESUME) mapView?.onResume()
            else if (event == Lifecycle.Event.ON_PAUSE) mapView?.onPause()
        }
        lifecycleOwner.lifecycle.addObserver(observer)
        onDispose { lifecycleOwner.lifecycle.removeObserver(observer) }
    }

    if (!permissionsState.allPermissionsGranted) {
        Column(modifier = Modifier.fillMaxSize().padding(16.dp), horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.Center) {
            Text("Permissions required.", textAlign = TextAlign.Center)
            Spacer(modifier = Modifier.height(16.dp))
            Button(onClick = { permissionsState.launchMultiplePermissionRequest() }) { Text("Grant Permissions") }
        }
        return
    }

    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        Row(modifier = Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
            Button(onClick = onNavigateBack) { Text("Back") }
        }
        Spacer(modifier = Modifier.height(16.dp))

        // OpenStreetMap 
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .weight(1.5f)
                .clip(RoundedCornerShape(16.dp))
        ) {
            AndroidView(
                factory = { ctx ->
                    MapView(ctx).apply {
                        setTileSource(TileSourceFactory.MAPNIK)
                        setMultiTouchControls(true)
                        controller.setZoom(17.0)
                        controller.setCenter(mbmUniversityGeoPoint) // Default center

                        val locationOverlay = MyLocationNewOverlay(GpsMyLocationProvider(ctx), this)
                        locationOverlay.enableMyLocation()
                        overlays.add(locationOverlay)

                        mapView = this
                    }
                },
                modifier = Modifier.fillMaxSize()
            )
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Voice Controls
        Card(
            modifier = Modifier.fillMaxWidth().weight(1f),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
            shape = RoundedCornerShape(16.dp)
        ) {
            Column(
                modifier = Modifier.fillMaxSize().padding(16.dp).clickable {
                    if (isListening) speechRecognizer?.stopListening()
                    else {
                        fusedLocationClient.lastLocation.addOnSuccessListener { loc -> 
                            currentLocation = loc
                            loc?.let {
                                mapView?.controller?.animateTo(GeoPoint(it.latitude, it.longitude))
                            }
                        }
                        speechRecognizer?.startListening(speechRecognizerIntent)
                    }
                },
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Center
            ) {
                Box(
                    modifier = Modifier.size(80.dp).clip(CircleShape).background(if (isListening) MaterialTheme.colorScheme.error else MaterialTheme.colorScheme.primary),
                    contentAlignment = Alignment.Center
                ) {
                    Text(if (isListening) "..." else "Mic", color = MaterialTheme.colorScheme.onPrimary, style = MaterialTheme.typography.titleLarge)
                }
                Spacer(modifier = Modifier.height(16.dp))
                Text(
                    text = spokenText,
                    style = MaterialTheme.typography.bodyLarge,
                    textAlign = TextAlign.Center
                )
            }
        }
    }
}

suspend fun handleDynamicNavigation(query: String, tts: TextToSpeech?, currentLocation: Location?, mapView: MapView?, generativeModel: GenerativeModel) {
    if (currentLocation == null) {
        tts?.speak("I cannot determine your current location. Please ensure GPS is enabled.", TextToSpeech.QUEUE_FLUSH, null, "NAV_ERR_1")
        return
    }

    tts?.speak("Thinking...", TextToSpeech.QUEUE_FLUSH, null, "NAV_THINKING")

    // Highly robust Stop-Word NLP extractor
    val lowerQuery = query.lowercase(Locale.ROOT)
    var cleaned = lowerQuery
    
    // Remove punctuation
    cleaned = cleaned.replace(Regex("[^a-z0-9 ]"), "")
    
    // Define common conversational fluff (Stop Words)
    val stopWords = setOf(
        "hi", "hello", "hey", "i", "want", "would", "like", "to", "go", "visit", 
        "see", "take", "me", "navigate", "route", "directions", "please", "can", 
        "you", "find", "show", "a", "the", "etc", "how", "are", "is", "everything",
        "some", "place", "location", "there", "get", "need", "could", "am", "looking",
        "for", "where", "my"
    )
    
    // Filter out all stop words, leaving only the important nouns (Destination)
    val words = cleaned.split(" ")
    val destWords = words.filter { it !in stopWords && it.isNotBlank() }
    
    val destName = if (destWords.isNotEmpty()) {
        destWords.joinToString(" ")
    } else {
        // If the filter stripped literally everything, fallback to the original query
        query.trim()
    }
    
    var chitchat = ""
    
    // Use Wikipedia to generate REAL factual chitchat!
    val wikiSummary = WikipediaHelper.getSummary(destName)
    if (wikiSummary != null) {
        chitchat = "Setting your route to $destName. Did you know? $wikiSummary"
    } else {
        val chitChats = listOf(
            "Ah, $destName! That sounds like a wonderful place. Let me calculate a route.",
            "I'd love to take you to $destName. I am getting the best directions now.",
            "Sure thing! $destName is a great destination. Setting up your navigation.",
            "Alright, heading to $destName. Let's see how far it is!"
        )
        chitchat = chitChats.random()
    }
    
    Log.d("LocalAI", "Used Local NLP. Destination: $destName")

    if (destName.isEmpty()) {
        tts?.speak(chitchat, TextToSpeech.QUEUE_FLUSH, null, "NAV_ERR_2")
        return
    }

    // Speak the ChitChat immediately
    tts?.speak(chitchat, TextToSpeech.QUEUE_FLUSH, null, "NAV_CHITCHAT")

    // 1. Geocoding (Passing currentLocation to strongly prefer local results)
    val coordinates = NavigationApiHelper.getCoordinates(destName, currentLocation)
    if (coordinates == null) {
        tts?.speak("I could not find the exact location of $destName on the map.", TextToSpeech.QUEUE_ADD, null, "NAV_ERR_3")
        return
    }

    val (destLat, destLng) = coordinates
    val destGeoPoint = GeoPoint(destLat, destLng)

    // 2. Routing
    val routeResult = NavigationApiHelper.getRoute(
        currentLocation.latitude, currentLocation.longitude,
        destLat, destLng
    )

    // 3. Draw on Map - ALWAYS DO THIS even if route fails!
    mapView?.let { map ->
        val overlaysToRemove = map.overlays.filter { it is Polyline || it is Marker }
        map.overlays.removeAll(overlaysToRemove)

        // Drop destination marker
        val marker = Marker(map)
        marker.position = destGeoPoint
        marker.setAnchor(Marker.ANCHOR_CENTER, Marker.ANCHOR_BOTTOM)
        marker.title = destName
        map.overlays.add(marker)

        if (routeResult != null) {
            // Draw real route
            val polyline = Polyline(map)
            val geoPoints = routeResult.pathCoordinates.map { GeoPoint(it.first, it.second) }
            polyline.setPoints(geoPoints)
            polyline.outlinePaint.color = android.graphics.Color.BLUE
            polyline.outlinePaint.strokeWidth = 10f
            map.overlays.add(polyline)
        } else {
            // Draw straight line fallback
            val polyline = Polyline(map)
            val geoPoints = listOf(
                GeoPoint(currentLocation.latitude, currentLocation.longitude),
                destGeoPoint
            )
            polyline.setPoints(geoPoints)
            polyline.outlinePaint.color = android.graphics.Color.RED
            polyline.outlinePaint.strokeWidth = 5f
            map.overlays.add(polyline)
        }

        map.invalidate()
        map.controller.animateTo(destGeoPoint)
        map.controller.setZoom(if (routeResult != null) 14.0 else 10.0)
    }

    // 4. TTS Feedback
    if (routeResult != null) {
        val distanceStr = if (routeResult.distanceMeters > 1000) {
            String.format(Locale.ROOT, "%.1f kilometers", routeResult.distanceMeters / 1000.0)
        } else {
            "${routeResult.distanceMeters.toInt()} meters"
        }

        val durationMins = (routeResult.durationSeconds / 60).toInt()
        val timeStr = if (durationMins > 60) {
            val hrs = durationMins / 60
            val mins = durationMins % 60
            "$hrs hours and $mins minutes"
        } else {
            "$durationMins minutes"
        }

        tts?.speak("The distance is $distanceStr, and it will take approximately $timeStr.", TextToSpeech.QUEUE_ADD, null, "NAV_SUCCESS")
    } else {
        // Calculate straight line distance
        val destLoc = Location("").apply {
            latitude = destLat
            longitude = destLng
        }
        val straightDistMeters = currentLocation.distanceTo(destLoc)
        val distanceStr = if (straightDistMeters > 1000) {
            String.format(Locale.ROOT, "%.1f kilometers", straightDistMeters / 1000.0)
        } else {
            "${straightDistMeters.toInt()} meters"
        }
        tts?.speak("Found $destName. It is $distanceStr away. A driving route could not be calculated, possibly due to distance or oceans.", TextToSpeech.QUEUE_ADD, null, "NAV_STRAIGHT")
    }
}

@Preview(showBackground = true, device = Devices.PIXEL_7, showSystemUi = true)
@Composable
fun VoiceNavigationScreenPreview() {
    AccessAppTheme {
        VoiceNavigationScreen(onNavigateBack = {})
    }
}
