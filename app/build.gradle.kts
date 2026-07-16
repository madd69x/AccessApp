import java.io.FileOutputStream
import java.io.FileInputStream
import java.net.URI
import java.util.Properties

plugins {
  alias(libs.plugins.android.application)
  alias(libs.plugins.compose.compiler)
  alias(libs.plugins.kotlin.serialization)
  alias(libs.plugins.google.services)
}

val properties = Properties()
val localPropertiesFile = rootProject.file("local.properties")
if (localPropertiesFile.exists()) {
    properties.load(FileInputStream(localPropertiesFile))
}

android {
    namespace = "com.example.accessapp"
    compileSdk = 36
    defaultConfig {
        applicationId = "vortex.ai"
        minSdk = 30
        targetSdk = 36
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        vectorDrawables {
            useSupportLibrary = true
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    buildFeatures {
      compose = true
      aidl = false
      buildConfig = false
      shaders = false
    }

    packaging {
      resources {
        excludes += "/META-INF/{AL2.0,LGPL2.1}"
      }
    }

    // Keep AI model files uncompressed so they can be memory-mapped efficiently.
    androidResources {
        noCompress += listOf("tflite", "task", "bin")
    }
}

kotlin {
    jvmToolchain(17)
}

dependencies {
  val composeBom = platform(libs.androidx.compose.bom)
  implementation(composeBom)
  androidTestImplementation(composeBom)

  // Core Android dependencies
  implementation(libs.androidx.core.ktx)
  implementation(libs.androidx.lifecycle.runtime.ktx)
  implementation(libs.androidx.activity.compose)

  // Arch Components
  implementation(libs.androidx.lifecycle.runtime.compose)
  implementation(libs.androidx.lifecycle.viewmodel.compose)

  // Compose
  implementation(libs.androidx.compose.ui)
  implementation(libs.androidx.compose.ui.tooling.preview)
  implementation(libs.androidx.compose.material3)
  implementation("androidx.compose.material:material-icons-extended:1.6.0")
  implementation("androidx.compose.ui:ui-text-google-fonts:1.6.0")
  // Tooling
  debugImplementation(libs.androidx.compose.ui.tooling)
  // Instrumented tests
  androidTestImplementation(libs.androidx.compose.ui.test.junit4)
  debugImplementation(libs.androidx.compose.ui.test.manifest)

  // Local tests: jUnit, coroutines, Android runner
  testImplementation(libs.junit)
  testImplementation(libs.kotlinx.coroutines.test)

  // Instrumented tests: jUnit rules and runners
  androidTestImplementation(libs.androidx.test.core)
  androidTestImplementation(libs.androidx.test.ext.junit)
  androidTestImplementation(libs.androidx.test.runner)
  androidTestImplementation(libs.androidx.test.espresso.core)

  // Navigation
  implementation(libs.androidx.navigation3.ui)
  implementation(libs.androidx.navigation3.runtime)
  implementation(libs.androidx.lifecycle.viewmodel.navigation3)

  // Firebase
  implementation(platform(libs.firebase.bom))
  implementation(libs.firebase.auth)

  // CameraX
  implementation(libs.camerax.core)
  implementation(libs.camerax.camera2)
  implementation(libs.camerax.lifecycle)
  implementation(libs.camerax.view)

  // ML Kit Text Recognition
  implementation(libs.mlkit.text.recognition)
  implementation(libs.text.recognition.devanagari)

  // Accompanist Permissions
  implementation(libs.accompanist.permissions)

  // MediaPipe
  implementation(libs.mediapipe.tasks.vision)

  // Location Services
  implementation(libs.play.services.location)

  // Maps (Free OSM)
  implementation(libs.osmdroid.android)

  // Gemini API
  implementation("com.google.ai.client.generativeai:generativeai:0.9.0")
  
  // TensorFlow Lite (For MiDaS Depth Estimation)
  // NOTE: Only the core interpreter is included. The support library is intentionally
  // excluded because it causes a duplicate namespace conflict with tensorflow-lite-support-api
  // which is pulled transitively by MediaPipe. MidasDepthEstimator uses raw ByteBuffer instead.
  implementation("org.tensorflow:tensorflow-lite:2.16.1")
  
  // Material Components for XML Theme
  implementation("com.google.android.material:material:1.12.0")
}


tasks.register("downloadMediaPipeModel") {
    description = "Downloads the MediaPipe Gesture Recognizer model if it doesn't exist."
    val modelDir = file("src/main/assets")
    val modelFile = file("src/main/assets/gesture_recognizer.task")
    val modelUrl = "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task"

    doLast {
        if (!modelFile.exists()) {
            println("Downloading MediaPipe Gesture Recognizer model...")
            modelDir.mkdirs()
            URI(modelUrl).toURL().openStream().use { input ->
                FileOutputStream(modelFile).use { output ->
                    input.copyTo(output)
                }
            }
            println("Download complete.")
        } else {
            println("MediaPipe model already exists.")
        }
    }
}

tasks.named("preBuild") {
    dependsOn("downloadMediaPipeModel")
}



