<div align="center">

<!-- You can replace the src below with your actual banner image link later -->
<img src="https://via.placeholder.com/1200x400/0A192F/E6F1FF?text=AccessApp" alt="AccessApp Banner" width="100%">

# 🌌 AccessApp
### Your Personal Campus Assistant, Powered by AI

[![Kotlin](https://img.shields.io/badge/Kotlin-1.9.0-7F52FF?style=for-the-badge&logo=kotlin)](https://kotlinlang.org)
[![Android](https://img.shields.io/badge/Android-11%2B-3DDC84?style=for-the-badge&logo=android)](https://developer.android.com/)
[![Jetpack Compose](https://img.shields.io/badge/Compose-Material%203-4285F4?style=for-the-badge&logo=android)](https://developer.android.com/jetpack/compose)
[![MediaPipe](https://img.shields.io/badge/MediaPipe-Vision-FF6F00?style=for-the-badge&logo=google)](https://developers.google.com/mediapipe)

<p align="center">
  <b>AccessApp</b> is a highly-premium, AI-driven accessibility companion explicitly designed for visually impaired and deaf users navigating complex environments like university campuses. 
  <br>It fuses state-of-the-art On-Device Machine Learning with fluid, tactile UX.
</p>

</div>

---

## ✨ Flagship Modules

### 🧭 Walker-Friendly AI Navigation (Upcoming)
Smart, pedestrian-optimized routing using OpenStreetMap (OSRM) designed to prioritize footpaths, campus trails, and safe walkways over standard vehicular roads.

### 👁️ Obstacle Radar (MediaPipe Vision)
Uses real-time object detection via the device camera to identify approaching obstacles. 
- **Dynamic Haptic Feedback:** Phone vibrates dynamically based on obstacle proximity.
- **Sonar Alerts:** Emits varying audio tones to indicate distance.
- **Glassmorphic HUD:** Premium UI alerting bystanders and the user to "Path Clear" or "Obstacle Detected".

### 📖 Notes-to-Audio (Unified OCR)
A seamless Optical Character Recognition (OCR) scanner powered by ML Kit.
- **Auto-Language Detection:** Automatically detects both Latin (English) and Devanagari (Hindi) characters without manual toggles.
- **Instant TTS:** Instantly converts scanned text into fluid speech using the native Android TTS Engine.

### 🤟 Live Sign Language Translator
Uses Google's MediaPipe Gesture Recognizer to identify ASL letters in real-time. Translates live camera feeds into English text for seamless communication bridging.

### 🎨 Color & Light Detector
Analyzes the center of the camera feed to output exact RGB values, luminance, and human-readable color names (e.g., "Dark Navy Blue") to assist visually impaired users in identifying objects, clothing, and ambient lighting.

---

## 💎 Design Philosophy (Gen-Z & Premium UX)

We moved away from the stereotypical, clinical "prototype" look of traditional accessibility apps. 
AccessApp features:
- **Spring-Physics Engine:** Fluid, bouncy, momentum-based animations powered by Compose's Spring framework.
- **Custom Typography:** Driven entirely by the modern *Outfit* Google Font.
- **Tactile Soundscapes:** Every interaction includes physical button feedback and system click sounds.
- **Adaptive Theming:** Deep Navy Blues and soft gradients that fluidly cross-fade between Day and Night modes.

---

## 🚀 Getting Started

### Prerequisites
- Android Studio Iguana (or newer)
- Minimum SDK: **API 30** (Android 11)
- Target SDK: **API 36**

### Build Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/madd69x/AccessApp.git
   ```
2. Open the project in Android Studio.
3. Allow Gradle to sync and download the required MediaPipe `.tflite` models via the automated Gradle Task.
4. Build and deploy to a physical device (Emulators do not support camera-based features).

---

<div align="center">
  <p><i>"Accessibility should not compromise on aesthetics."</i></p>
  <b>Designed with ❤️ for a more inclusive world.</b>
</div>
