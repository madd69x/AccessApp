package com.example.accessapp

import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation3.runtime.entryProvider
import androidx.navigation3.runtime.rememberNavBackStack
import androidx.navigation3.ui.NavDisplay
import com.example.accessapp.ui.main.MainScreen

import com.example.accessapp.ui.login.LoginScreen
import com.example.accessapp.ui.login.RegisterScreen

import com.google.firebase.auth.FirebaseAuth

@Composable
fun MainNavigation() {
  val backStack = rememberNavBackStack(Splash)

  NavDisplay(
    backStack = backStack,
    onBack = { backStack.removeLastOrNull() },
    entryProvider =
      entryProvider {
        entry<Splash> {
          com.example.accessapp.ui.main.SplashScreen(
            onNavigateToMain = {
                backStack.removeLastOrNull()
                backStack.add(if (FirebaseAuth.getInstance().currentUser != null) Main else Login)
            }
          )
        }
        entry<Login> {
          LoginScreen(
            onNavigateToRegister = { backStack.add(Register) }
          ) {
            backStack.clear()
            backStack.add(Main)
          }
        }
        entry<Register> {
          RegisterScreen(
            onNavigateToLogin = { backStack.removeLastOrNull() }
          ) {
            backStack.clear()
            backStack.add(Main)
          }
        }
        entry<Main> {
          MainScreen(onItemClick = { navKey -> backStack.add(navKey) }, modifier = Modifier.padding(top = 8.dp))
        }
        entry<NotesToAudio> {
          com.example.accessapp.ui.ocr.NotesToAudioScreen(
            onNavigateBack = { backStack.removeLastOrNull() }
          )
        }
        entry<SignLanguage> {
          com.example.accessapp.ui.signlanguage.SignLanguageScreen(
            onNavigateBack = { backStack.removeLastOrNull() }
          )
        }
        entry<ObstacleRadar> {
          com.example.accessapp.ui.obstacle.ObstacleRadarScreen(
            onNavigateBack = { backStack.removeLastOrNull() }
          )
        }
        entry<ColorLightDetector> {
          com.example.accessapp.ui.colorlight.ColorLightDetectorScreen(
            onNavigateBack = { backStack.removeLastOrNull() }
          )
        }
      },
  )
}




