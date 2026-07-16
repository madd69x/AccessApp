package com.example.accessapp.ui.navigation

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.json.JSONObject
import java.net.URL
import java.net.URLEncoder

object WikipediaHelper {
    suspend fun getSummary(topic: String): String? = withContext(Dispatchers.IO) {
        try {
            val encodedQuery = URLEncoder.encode(topic, "UTF-8")
            val url = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exsentences=1&exlimit=1&titles=$encodedQuery&explaintext=1&format=json"
            
            val connection = URL(url).openConnection()
            connection.setRequestProperty("User-Agent", "AccessApp/1.0 (Student Project)")
            
            val response = connection.inputStream.bufferedReader().use { it.readText() }
            val jsonObject = JSONObject(response)
            
            val pages = jsonObject.getJSONObject("query").getJSONObject("pages")
            val keys = pages.keys()
            if (keys.hasNext()) {
                val pageId = keys.next()
                if (pageId != "-1") {
                    val page = pages.getJSONObject(pageId)
                    val extract = page.optString("extract", "")
                    if (extract.isNotEmpty()) {
                        return@withContext extract.replace(Regex("\\(.*?\\)"), "").replace(Regex("\\[.*?\\]"), "").trim()
                    }
                }
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
        return@withContext null
    }
}
