package com.example.accessapp.theme

import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.dynamicDarkColorScheme
import androidx.compose.material3.dynamicLightColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.platform.LocalContext

private val DarkColorScheme = darkColorScheme(
    primary = DarkPrimary,
    secondary = DarkSecondary,
    background = DarkBackground,
    surface = DarkSurface,
    onPrimary = DarkBackground,
    onBackground = DarkTextPrimary,
    onSurface = DarkTextPrimary,
    surfaceVariant = DarkSurface,
    onSurfaceVariant = DarkTextSecondary
)

private val LightColorScheme = lightColorScheme(
    primary = LightPrimary,
    secondary = LightSecondary,
    background = LightBackground,
    surface = LightSurface,
    onPrimary = LightSurface,
    onBackground = LightTextPrimary,
    onSurface = LightTextPrimary,
    surfaceVariant = LightSurface,
    onSurfaceVariant = LightTextSecondary
)

@Composable
fun AccessAppTheme(
  darkTheme: Boolean = isSystemInDarkTheme(),
  dynamicColor: Boolean = false, // We force our highly curated palette
  content: @Composable () -> Unit,
) {
  val targetColorScheme =
    when {
      dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
        val context = LocalContext.current
        if (darkTheme) dynamicDarkColorScheme(context) else dynamicLightColorScheme(context)
      }
      darkTheme -> DarkColorScheme
      else -> LightColorScheme
    }

  val primary by androidx.compose.animation.animateColorAsState(targetColorScheme.primary, androidx.compose.animation.core.tween(500), label = "ThemePrimary")
  val secondary by androidx.compose.animation.animateColorAsState(targetColorScheme.secondary, androidx.compose.animation.core.tween(500), label = "ThemeSecondary")
  val background by androidx.compose.animation.animateColorAsState(targetColorScheme.background, androidx.compose.animation.core.tween(500), label = "ThemeBackground")
  val surface by androidx.compose.animation.animateColorAsState(targetColorScheme.surface, androidx.compose.animation.core.tween(500), label = "ThemeSurface")
  val onPrimary by androidx.compose.animation.animateColorAsState(targetColorScheme.onPrimary, androidx.compose.animation.core.tween(500), label = "ThemeOnPrimary")
  val onBackground by androidx.compose.animation.animateColorAsState(targetColorScheme.onBackground, androidx.compose.animation.core.tween(500), label = "ThemeOnBackground")
  val onSurface by androidx.compose.animation.animateColorAsState(targetColorScheme.onSurface, androidx.compose.animation.core.tween(500), label = "ThemeOnSurface")
  val surfaceVariant by androidx.compose.animation.animateColorAsState(targetColorScheme.surfaceVariant, androidx.compose.animation.core.tween(500), label = "ThemeSurfaceVariant")
  val onSurfaceVariant by androidx.compose.animation.animateColorAsState(targetColorScheme.onSurfaceVariant, androidx.compose.animation.core.tween(500), label = "ThemeOnSurfaceVariant")

  val animatedColorScheme = targetColorScheme.copy(
      primary = primary,
      secondary = secondary,
      background = background,
      surface = surface,
      onPrimary = onPrimary,
      onBackground = onBackground,
      onSurface = onSurface,
      surfaceVariant = surfaceVariant,
      onSurfaceVariant = onSurfaceVariant
  )

  MaterialTheme(colorScheme = animatedColorScheme, typography = Typography, content = content)
}
