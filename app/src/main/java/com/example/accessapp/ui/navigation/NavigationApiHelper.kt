package com.example.accessapp.ui.navigation

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.json.JSONArray
import org.json.JSONObject
import java.net.URL
import java.net.URLEncoder

object NavigationApiHelper {

    /**
     * Geocodes a location name using Nominatim API (Free).
     * Returns a Pair of (Latitude, Longitude) or null if not found.
     */
    suspend fun getCoordinates(locationName: String, currentLocation: android.location.Location? = null): Pair<Double, Double>? = withContext(Dispatchers.IO) {
        try {
            val encodedQuery = URLEncoder.encode(locationName, "UTF-8")
            // Use Photon (Elasticsearch based) for fuzzy searching and typo tolerance
            var url = "https://photon.komoot.io/api/?q=$encodedQuery&limit=1"
            
            if (currentLocation != null) {
                // Photon uses lat/lon to heavily bias the search to local areas
                url += "&lat=${currentLocation.latitude}&lon=${currentLocation.longitude}"
            }
            
            val connection = URL(url).openConnection()
            connection.setRequestProperty("User-Agent", "AccessApp/1.0 (Student Project)")
            
            val response = connection.inputStream.bufferedReader().use { it.readText() }
            val jsonObject = JSONObject(response)
            
            val features = jsonObject.getJSONArray("features")
            if (features.length() > 0) {
                val firstResult = features.getJSONObject(0)
                val geometry = firstResult.getJSONObject("geometry")
                val coordinates = geometry.getJSONArray("coordinates")
                // Photon returns GeoJSON format: [longitude, latitude]
                val lon = coordinates.getDouble(0)
                val lat = coordinates.getDouble(1)
                return@withContext Pair(lat, lon)
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
        return@withContext null
    }

    /**
     * Calculates route using OSRM API (Free).
     * Returns a RouteResult containing distance, duration, and GeoJSON polyline coordinates.
     */
    suspend fun getRoute(startLat: Double, startLng: Double, endLat: Double, endLng: Double, profile: String = "driving"): RouteResult? = withContext(Dispatchers.IO) {
        try {
            // OSRM coordinates are in Longitude, Latitude format
            val url = "https://router.project-osrm.org/route/v1/$profile/$startLng,$startLat;$endLng,$endLat?overview=full&geometries=geojson"
            
            val connection = URL(url).openConnection()
            connection.setRequestProperty("User-Agent", "AccessApp/1.0 (Student Project)")
            
            val response = connection.inputStream.bufferedReader().use { it.readText() }
            val jsonObject = JSONObject(response)
            
            val code = jsonObject.optString("code")
            if (code == "Ok") {
                val route = jsonObject.getJSONArray("routes").getJSONObject(0)
                val distanceMeters = route.getDouble("distance")
                val durationSeconds = route.getDouble("duration")
                
                val geometry = route.getJSONObject("geometry")
                val coordinates = geometry.getJSONArray("coordinates")
                
                val path = mutableListOf<Pair<Double, Double>>()
                for (i in 0 until coordinates.length()) {
                    val point = coordinates.getJSONArray(i)
                    // GeoJSON format is [longitude, latitude]
                    val lng = point.getDouble(0)
                    val lat = point.getDouble(1)
                    path.add(Pair(lat, lng))
                }
                
                return@withContext RouteResult(distanceMeters, durationSeconds, path)
            } else if (profile == "driving") {
                // Fallback to walking if driving fails (e.g., in a park)
                return@withContext getRoute(startLat, startLng, endLat, endLng, "walking")
            }
        } catch (e: Exception) {
            e.printStackTrace()
            if (profile == "driving") {
                return@withContext getRoute(startLat, startLng, endLat, endLng, "walking")
            }
        }
        return@withContext null
    }
}

data class RouteResult(
    val distanceMeters: Double,
    val durationSeconds: Double,
    val pathCoordinates: List<Pair<Double, Double>> // List of (Lat, Lng)
)
