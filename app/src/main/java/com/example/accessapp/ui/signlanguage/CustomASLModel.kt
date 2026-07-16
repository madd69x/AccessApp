package com.example.accessapp.ui.signlanguage

import android.content.Context
import android.util.Log
import org.json.JSONObject
import java.io.InputStreamReader
import kotlin.math.max

class CustomASLModel(context: Context) {
    private var labels = mutableListOf<String>()
    private var weights = mutableListOf<Array<FloatArray>>()
    private var biases = mutableListOf<FloatArray>()
    private var isLoaded = false

    init {
        try {
            val inputStream = context.assets.open("asl_model.json")
            val jsonString = InputStreamReader(inputStream).readText()
            val json = JSONObject(jsonString)
            
            val labelsJson = json.getJSONArray("labels")
            for (i in 0 until labelsJson.length()) {
                labels.add(labelsJson.getString(i))
            }
            
            val weightsJson = json.getJSONArray("weights")
            for (i in 0 until weightsJson.length()) {
                val layerWeights = weightsJson.getJSONArray(i)
                val rows = layerWeights.length()
                val cols = layerWeights.getJSONArray(0).length()
                val w = Array(rows) { FloatArray(cols) }
                for (r in 0 until rows) {
                    val rowJson = layerWeights.getJSONArray(r)
                    for (c in 0 until cols) {
                        w[r][c] = rowJson.getDouble(c).toFloat()
                    }
                }
                weights.add(w)
            }
            
            val biasesJson = json.getJSONArray("biases")
            for (i in 0 until biasesJson.length()) {
                val layerBiases = biasesJson.getJSONArray(i)
                val b = FloatArray(layerBiases.length())
                for (j in 0 until layerBiases.length()) {
                    b[j] = layerBiases.getDouble(j).toFloat()
                }
                biases.add(b)
            }
            isLoaded = true
            Log.d("CustomASLModel", "Model loaded successfully. Labels: $labels")
        } catch (e: Exception) {
            Log.e("CustomASLModel", "Error loading model", e)
        }
    }
    
    fun predict(features: FloatArray): String {
        if (!isLoaded || features.size != 63) return ""
        var x = features
        
        for (i in weights.indices) {
            val w = weights[i]
            val b = biases[i]
            val newX = FloatArray(b.size)
            
            for (col in newX.indices) {
                var sum = b[col]
                for (row in w.indices) {
                    sum += x[row] * w[row][col]
                }
                newX[col] = sum
            }
            
            // ReLU for all except last layer
            if (i < weights.size - 1) {
                for (j in newX.indices) {
                    newX[j] = max(0f, newX[j])
                }
            }
            x = newX
        }
        
        // Argmax
        var maxIdx = 0
        var maxVal = x[0]
        for (j in 1 until x.size) {
            if (x[j] > maxVal) {
                maxVal = x[j]
                maxIdx = j
            }
        }
        return labels[maxIdx]
    }
}
