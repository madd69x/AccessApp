package com.example.accessapp.theme

import androidx.compose.runtime.compositionLocalOf

data class ThemeController(
    val isDarkTheme: Boolean,
    val toggleTheme: () -> Unit
)

val LocalThemeController = compositionLocalOf<ThemeController> {
    error("No ThemeController provided")
}
