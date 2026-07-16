package com.example.accessapp.ui.signlanguage

import android.content.Context
import android.graphics.Bitmap
import android.util.Log
import com.google.mediapipe.framework.image.BitmapImageBuilder
import com.google.mediapipe.tasks.core.BaseOptions
import com.google.mediapipe.tasks.vision.core.RunningMode
import com.google.mediapipe.tasks.vision.gesturerecognizer.GestureRecognizer

class GestureRecognizerHelper(
    val context: Context,
    val gestureListener: GestureListener? = null
) {
    private var gestureRecognizer: GestureRecognizer? = null
    private var customASLModel: CustomASLModel? = null

    init {
        customASLModel = CustomASLModel(context)
        setupGestureRecognizer()
    }

    private fun setupGestureRecognizer() {
        try {
            val baseOptionsBuilder = BaseOptions.builder()
                .setModelAssetPath("gesture_recognizer.task")

            val optionsBuilder = GestureRecognizer.GestureRecognizerOptions.builder()
                .setBaseOptions(baseOptionsBuilder.build())
                .setMinHandDetectionConfidence(0.5f)
                .setMinTrackingConfidence(0.5f)
                .setMinHandPresenceConfidence(0.5f)
                .setRunningMode(RunningMode.IMAGE)

            gestureRecognizer = GestureRecognizer.createFromOptions(context, optionsBuilder.build())
        } catch (e: Exception) {
            Log.e("GestureRecognizerHelper", "Failed to initialize gesture recognizer.", e)
        }
    }

    fun recognize(bitmap: Bitmap) {
        val mpImage = BitmapImageBuilder(bitmap).build()
        try {
            val result = gestureRecognizer?.recognize(mpImage)
            result?.let {
                var basicGesture = ""
                var aslLetter = ""

                // 1. Get Basic Gesture
                if (it.gestures().isNotEmpty()) {
                    val topGesture = it.gestures().first().first()
                    if (topGesture.score() > 0.6f && topGesture.categoryName() != "None") {
                        basicGesture = topGesture.categoryName()
                    }
                }

                // 2. Get Hand Landmarks for ASL Model
                if (it.landmarks().isNotEmpty()) {
                    val handLandmarks = it.landmarks().first()
                    val features = FloatArray(63)
                    for (i in 0 until 21) {
                        features[i * 3] = handLandmarks[i].x()
                        features[i * 3 + 1] = handLandmarks[i].y()
                        features[i * 3 + 2] = handLandmarks[i].z()
                    }
                    aslLetter = customASLModel?.predict(features) ?: ""
                }

                // Combine them
                if (basicGesture.isNotEmpty() && aslLetter.isNotEmpty()) {
                    gestureListener?.onGestureDetected("$basicGesture (ASL: $aslLetter)")
                } else if (basicGesture.isNotEmpty()) {
                    gestureListener?.onGestureDetected(basicGesture)
                } else if (aslLetter.isNotEmpty()) {
                    gestureListener?.onGestureDetected("ASL: $aslLetter")
                } else {
                    gestureListener?.onGestureDetected("No gesture detected")
                }
            }
        } catch (e: Exception) {
            Log.e("GestureRecognizerHelper", "Error processing image", e)
        }
    }

    interface GestureListener {
        fun onGestureDetected(gestureName: String)
    }
}
