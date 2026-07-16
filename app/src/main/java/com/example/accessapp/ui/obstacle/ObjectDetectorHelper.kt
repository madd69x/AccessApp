package com.example.accessapp.ui.obstacle

import android.content.Context
import android.graphics.Bitmap
import android.os.SystemClock
import android.util.Log
import com.google.mediapipe.framework.image.BitmapImageBuilder
import com.google.mediapipe.tasks.core.BaseOptions
import com.google.mediapipe.tasks.vision.core.RunningMode
import com.google.mediapipe.tasks.vision.objectdetector.ObjectDetector
import com.google.mediapipe.tasks.vision.objectdetector.ObjectDetectorResult

class ObjectDetectorHelper(
    var threshold: Float = 0.5f,
    var maxResults: Int = 3,
    val context: Context,
    val objectDetectorListener: DetectorListener?
) {

    private var objectDetector: ObjectDetector? = null

    init {
        setupObjectDetector()
    }

    fun clearObjectDetector() {
        objectDetector?.close()
        objectDetector = null
    }

    private fun setupObjectDetector() {
        val baseOptionsBuilder = BaseOptions.builder()
            .setModelAssetPath("efficientdet_lite0.tflite")
        
        try {
            val baseOptions = baseOptionsBuilder.build()
            val optionsBuilder = ObjectDetector.ObjectDetectorOptions.builder()
                .setBaseOptions(baseOptions)
                .setScoreThreshold(threshold)
                .setMaxResults(maxResults)
                .setRunningMode(RunningMode.IMAGE)

            val options = optionsBuilder.build()
            objectDetector = ObjectDetector.createFromOptions(context, options)
        } catch (e: IllegalStateException) {
            objectDetectorListener?.onError(
                "Object detector failed to initialize. See error logs for details"
            )
            Log.e("ObjectDetectorHelper", "TFLite failed to load model with error: " + e.message)
        } catch (e: RuntimeException) {
            objectDetectorListener?.onError(
                "Object detector failed to initialize. See error logs for details"
            )
            Log.e("ObjectDetectorHelper", "Object detector failed to load model with error: " + e.message)
        }
    }

    fun detect(image: Bitmap, imageRotation: Int) {
        if (objectDetector == null) {
            setupObjectDetector()
        }

        var inferenceTime = SystemClock.uptimeMillis()
        val mpImage = BitmapImageBuilder(image).build()

        try {
            val results = objectDetector?.detect(mpImage)
            inferenceTime = SystemClock.uptimeMillis() - inferenceTime
            objectDetectorListener?.onResults(results, inferenceTime, image.height, image.width)
        } catch (e: RuntimeException) {
            objectDetectorListener?.onError(
                "Object detector failed to process image with error: " + e.message
            )
        }
    }

    interface DetectorListener {
        fun onError(error: String)
        fun onResults(
            results: ObjectDetectorResult?,
            inferenceTime: Long,
            imageHeight: Int,
            imageWidth: Int
        )
    }
}
