package com.example.accessapp.ui.main

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.Spring
import androidx.compose.animation.core.spring
import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeIn
import androidx.compose.animation.slideInVertically
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.DarkMode
import androidx.compose.material.icons.outlined.Hearing
import androidx.compose.material.icons.outlined.LightMode
import androidx.compose.material.icons.outlined.Map
import androidx.compose.material.icons.outlined.Radar
import androidx.compose.material.icons.outlined.SignLanguage
import androidx.compose.material.icons.outlined.ColorLens
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.platform.LocalView
import android.view.SoundEffectConstants
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsPressedAsState
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.navigation3.runtime.NavKey
import com.example.accessapp.NotesToAudio
import com.example.accessapp.R
import com.example.accessapp.theme.LocalThemeController
import kotlinx.coroutines.delay

@Composable
fun MainScreen(
  onItemClick: (NavKey) -> Unit,
  modifier: Modifier = Modifier,
) {
  val themeController = LocalThemeController.current
  var isVisible by remember { mutableStateOf(false) }

  LaunchedEffect(Unit) {
      delay(50)
      isVisible = true
  }

  Box(
      modifier = modifier
          .fillMaxSize()
          .background(
              Brush.verticalGradient(
                  colors = listOf(
                      MaterialTheme.colorScheme.background,
                      MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.4f)
                  )
              )
          )
  ) {
      // Top Right Theme Toggle
      IconButton(
          onClick = { themeController.toggleTheme() },
          modifier = Modifier
              .align(Alignment.TopEnd)
              .padding(16.dp)
              .clip(CircleShape)
              .background(MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f))
      ) {
          Icon(
              imageVector = if (themeController.isDarkTheme) Icons.Outlined.LightMode else Icons.Outlined.DarkMode,
              contentDescription = "Toggle Theme",
              tint = MaterialTheme.colorScheme.primary
          )
      }

      Column(
          modifier = Modifier
              .fillMaxSize()
              .padding(24.dp),
          horizontalAlignment = Alignment.CenterHorizontally,
      ) {
          Spacer(modifier = Modifier.height(32.dp))

          AnimatedVisibility(
              visible = isVisible,
              enter = fadeIn(spring(stiffness = Spring.StiffnessLow)) + slideInVertically(spring(dampingRatio = Spring.DampingRatioMediumBouncy, stiffness = Spring.StiffnessLow), initialOffsetY = { -50 })
          ) {
              Column(horizontalAlignment = Alignment.CenterHorizontally) {
                  val logoFilter = if (!themeController.isDarkTheme) {
                      androidx.compose.ui.graphics.ColorFilter.colorMatrix(androidx.compose.ui.graphics.ColorMatrix(floatArrayOf(
                          -1f, 0f, 0f, 0f, 255f,
                          0f, -1f, 0f, 0f, 255f,
                          0f, 0f, -1f, 0f, 255f,
                          0f, 0f, 0f, 1f, 0f
                      )))
                  } else null

                  Image(
                      painter = painterResource(id = R.drawable.logo),
                      contentDescription = "AccessApp Logo",
                      modifier = Modifier
                          .size(80.dp)
                          .clip(RoundedCornerShape(16.dp)),
                      colorFilter = logoFilter
                  )
                  Spacer(modifier = Modifier.height(16.dp))
                  Text(
                      text = "AccessApp",
                      style = MaterialTheme.typography.headlineMedium.copy(fontWeight = FontWeight.Bold),
                      color = MaterialTheme.colorScheme.onBackground
                  )
                  Text(
                      text = "Your Personal Campus Assistant",
                      style = MaterialTheme.typography.bodyMedium,
                      color = MaterialTheme.colorScheme.onSurfaceVariant
                  )
              }
          }

          Spacer(modifier = Modifier.height(48.dp))

          val buttons = listOf(
              Triple(NotesToAudio, "Notes to Audio", Icons.Outlined.Hearing),
              Triple(com.example.accessapp.SignLanguage, "Live Sign Language", Icons.Outlined.SignLanguage),
              Triple(com.example.accessapp.ObstacleRadar, "Obstacle Radar (AI)", Icons.Outlined.Radar),
              Triple(com.example.accessapp.ColorLightDetector, "Color & Light Detector", Icons.Outlined.ColorLens)
          )

          buttons.forEachIndexed { index, (route, title, icon) ->
              AnimatedVisibility(
                  visible = isVisible,
                  enter = fadeIn(tween(300, delayMillis = 100 + index * 50)) +
                          slideInVertically(
                              spring(dampingRatio = Spring.DampingRatioMediumBouncy, stiffness = Spring.StiffnessLow), 
                              initialOffsetY = { 100 }
                          )
              ) {
                  ProfessionalCard(
                      title = title,
                      icon = icon,
                      onClick = { onItemClick(route) }
                  )
              }
              Spacer(modifier = Modifier.height(16.dp))
          }
      }
  }
}

@Composable
fun ProfessionalCard(
    title: String,
    icon: ImageVector,
    onClick: () -> Unit
) {
    val view = LocalView.current
    val interactionSource = remember { MutableInteractionSource() }
    val isPressed by interactionSource.collectIsPressedAsState()
    val scale by animateFloatAsState(
        targetValue = if (isPressed) 0.92f else 1f,
        label = "Button Scale",
        animationSpec = spring(
            dampingRatio = Spring.DampingRatioMediumBouncy,
            stiffness = Spring.StiffnessMedium
        )
    )

    ElevatedCard(
        onClick = {
            view.playSoundEffect(SoundEffectConstants.CLICK)
            onClick()
        },
        modifier = Modifier
            .fillMaxWidth()
            .height(72.dp)
            .scale(scale),
        interactionSource = interactionSource,
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.elevatedCardColors(
            containerColor = MaterialTheme.colorScheme.surface
        ),
        elevation = CardDefaults.elevatedCardElevation(
            defaultElevation = 2.dp,
            pressedElevation = 4.dp
        )
    ) {
        Row(
            modifier = Modifier
                .fillMaxSize()
                .padding(horizontal = 20.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                imageVector = icon,
                contentDescription = null,
                tint = MaterialTheme.colorScheme.primary,
                modifier = Modifier.size(24.dp)
            )
            Spacer(modifier = Modifier.width(16.dp))
            Text(
                text = title,
                style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.SemiBold),
                color = MaterialTheme.colorScheme.onSurface
            )
        }
    }
}
