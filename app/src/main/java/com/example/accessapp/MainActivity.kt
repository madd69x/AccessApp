package com.example.accessapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.safeDrawingPadding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import com.example.accessapp.theme.AccessAppTheme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import com.example.accessapp.theme.LocalThemeController
import com.example.accessapp.theme.ThemeController

class MainActivity : ComponentActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    enableEdgeToEdge()
    setContent {
      val systemDark = isSystemInDarkTheme()
      var isDarkTheme by remember { mutableStateOf(systemDark) }

      val themeController = remember {
          ThemeController(
              isDarkTheme = isDarkTheme,
              toggleTheme = { isDarkTheme = !isDarkTheme }
          )
      }
      
      // Update the controller reference when state changes
      val currentController = themeController.copy(isDarkTheme = isDarkTheme)

      CompositionLocalProvider(LocalThemeController provides currentController) {
          AccessAppTheme(darkTheme = isDarkTheme) {
            Surface(
              modifier = Modifier.fillMaxSize().safeDrawingPadding(),
              color = MaterialTheme.colorScheme.background
            ) {
              MainNavigation()
            }
          }
      }
    }
  }
}
