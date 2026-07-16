package com.example.accessapp.ui.colorlight

import android.graphics.Color
import androidx.camera.core.ImageAnalysis
import androidx.camera.core.ImageProxy
import java.nio.ByteBuffer

class ColorLightAnalyzer(
    private val onResult: (colorName: String, isDark: Boolean, colorInt: Int) -> Unit
) : ImageAnalysis.Analyzer {

    private fun getClosestColorName(r: Int, g: Int, b: Int): String {
        val hsv = FloatArray(3)
        android.graphics.Color.RGBToHSV(r, g, b, hsv)
        
        val hue = hsv[0]
        val saturation = hsv[1]
        val value = hsv[2]

        // Handle edge cases: Black, White, and Grey
        if (value < 0.15f) return "Black"
        if (value > 0.85f && saturation < 0.15f) return "White"
        if (saturation < 0.15f) return "Grey"
        if (saturation < 0.25f && value < 0.35f) return "Dark Grey"

        // Use Hue to determine the actual color name
        return when (hue) {
            in 0f..15f -> if (value < 0.5f) "Dark Red" else "Red"
            in 15f..45f -> if (saturation > 0.6f && value > 0.6f) "Orange" else "Brown"
            in 45f..70f -> "Yellow"
            in 70f..160f -> if (value < 0.5f) "Dark Green" else "Green"
            in 160f..200f -> "Cyan"
            in 200f..260f -> if (value < 0.5f) "Navy Blue" else "Blue"
            in 260f..300f -> "Purple"
            in 300f..345f -> "Pink"
            in 345f..360f -> if (value < 0.5f) "Dark Red" else "Red"
            else -> "Unknown"
        }
    }

    override fun analyze(image: ImageProxy) {
        val bitmap = try {
            image.toBitmap()
        } catch (e: Exception) {
            image.close()
            return
        }

        val width = bitmap.width
        val height = bitmap.height

        // Sample a small grid in the dead center
        val sampleSize = 40
        val startX = (width - sampleSize) / 2
        val startY = (height - sampleSize) / 2

        var totalR = 0L
        var totalG = 0L
        var totalB = 0L
        var sampleCount = 0

        for (y in startY until startY + sampleSize step 2) {
            for (x in startX until startX + sampleSize step 2) {
                if (x in 0 until width && y in 0 until height) {
                    val pixel = bitmap.getPixel(x, y)
                    totalR += android.graphics.Color.red(pixel)
                    totalG += android.graphics.Color.green(pixel)
                    totalB += android.graphics.Color.blue(pixel)
                    sampleCount++
                }
            }
        }

        image.close()

        if (sampleCount == 0) return

        val avgR = (totalR / sampleCount).toInt()
        val avgG = (totalG / sampleCount).toInt()
        val avgB = (totalB / sampleCount).toInt()

        val colorName = getClosestColorName(avgR, avgG, avgB)
        
        // Relative luminance formula for determining if the overall room is dark/bright
        val luminance = (0.2126 * avgR + 0.7152 * avgG + 0.0722 * avgB)
        val isDark = luminance < 40.0
        
        val colorInt = android.graphics.Color.rgb(avgR, avgG, avgB)
        
        onResult(colorName, isDark, colorInt)
    }
}
