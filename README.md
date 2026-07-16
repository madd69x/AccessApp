<div align="center">

<img src="banner.jpg" alt="AccessApp Banner" width="100%">

# AccessApp
### Next-Generation Accessibility Assistant

[![Kotlin](https://img.shields.io/badge/Kotlin-1.9.0-7F52FF?style=flat-square&logo=kotlin)](https://kotlinlang.org)
[![Android](https://img.shields.io/badge/Android-11%2B-3DDC84?style=flat-square&logo=android)](https://developer.android.com/)
[![Jetpack Compose](https://img.shields.io/badge/Compose-Material%203-4285F4?style=flat-square&logo=android)](https://developer.android.com/jetpack/compose)
[![MediaPipe](https://img.shields.io/badge/MediaPipe-Vision-FF6F00?style=flat-square&logo=google)](https://developers.google.com/mediapipe)

<p align="center">
  <b>AccessApp</b> is an advanced, AI-driven accessibility companion explicitly designed for visually impaired and deaf users navigating complex environments. 
  <br>It integrates state-of-the-art On-Device Machine Learning with fluid, tactile UX.
</p>

</div>

---

## Flagship Modules

<img src="ui_showcase.jpg" alt="AccessApp UI Showcase" width="100%" style="border-radius: 12px; margin-bottom: 24px;">

### Obstacle Radar (MediaPipe Vision)
Uses real-time object detection via the device camera to identify approaching obstacles. 
- **Dynamic Haptic Feedback:** Device vibrates dynamically based on obstacle proximity.
- **Sonar Alerts:** Emits varying audio tones to indicate distance.
- **Glassmorphic HUD:** Premium UI alerting bystanders and the user to spatial awareness states.

### Notes-to-Audio (Unified OCR)
A seamless Optical Character Recognition (OCR) scanner powered by ML Kit.
- **Auto-Language Detection:** Automatically detects both Latin (English) and Devanagari (Hindi) characters without manual toggles.
- **Instant TTS:** Instantly converts scanned text into fluid speech using the native Android TTS Engine.

### Live Sign Language Translator
Uses Google's MediaPipe Gesture Recognizer to identify ASL letters in real-time. Translates live camera feeds into English text for seamless communication bridging.

### Color & Light Detector
Analyzes the center of the camera feed to output exact RGB values, luminance, and human-readable color names to assist visually impaired users in identifying objects, clothing, and ambient lighting.

### Walker-Friendly AI Navigation (Upcoming)
Smart, pedestrian-optimized routing using OpenStreetMap (OSRM) designed to prioritize footpaths, campus trails, and safe walkways over standard vehicular roads.

---

## Design Philosophy

AccessApp utilizes a modern, professional aesthetic built for scale and ease of use.
- **Spring-Physics Engine:** Fluid, momentum-based animations powered by Compose's Spring framework.
- **Custom Typography:** Driven entirely by the modern Outfit Google Font.
- **Tactile Soundscapes:** Comprehensive physical button feedback and system audio integration.
- **Adaptive Theming:** Deep Navy Blues and soft gradients that cross-fade seamlessly between Day and Night modes.

---

## Getting Started

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
  <p><b>Made By Vortex AI</b></p>
  <p>
    Avadhi Sharma (3rd Year CSE) &bull;
    Mudit Vaishnav (2nd Year ECC) &bull;
    Mudra Chauhan (2nd Year CSE) &bull;
    Jigyasha Mahariya (2nd Year ECC) &bull;
    Monalika Vyas (2nd Year P&I)
  </p>
</div>
