<div align="center">

<img src="banner.jpg" alt="AccessApp Banner" width="40%">

# AccessApp
### Comprehensive AI-Driven Accessibility Assistant

[![Kotlin](https://img.shields.io/badge/Kotlin-1.9.0-7F52FF?style=flat-square&logo=kotlin)](https://kotlinlang.org)
[![Android](https://img.shields.io/badge/Android-11%2B-3DDC84?style=flat-square&logo=android)](https://developer.android.com/)
[![Jetpack Compose](https://img.shields.io/badge/Compose-Material%203-4285F4?style=flat-square&logo=android)](https://developer.android.com/jetpack/compose)
[![MediaPipe](https://img.shields.io/badge/MediaPipe-Vision-FF6F00?style=flat-square&logo=google)](https://developers.google.com/mediapipe)

<p align="center">
  <b>AccessApp</b> is a comprehensive, artificial intelligence-driven accessibility application engineered specifically for individuals with visual or auditory impairments. 
  <br>The system leverages edge-based machine learning paradigms to provide real-time spatial awareness without reliance on cloud-based processing.
</p>

</div>

---

<div align="center">
  <h4><a href="DOCUMENTATION.md">View Technical Documentation</a></h4>
</div>

---

## Flagship Modules

<table>
  <tr>
    <td width="40%" align="center">
      <img src="radar_banner.jpg" alt="Obstacle Radar Module" width="100%" style="border-radius: 8px;">
    </td>
    <td width="60%">
      <h3>Obstacle Radar (MediaPipe Vision)</h3>
      Uses real-time object detection via the device camera to identify approaching obstacles. 
      <br><br>
      <b>Key Features:</b>
      <ul>
        <li><b>Dynamic Haptic Feedback:</b> Device vibrates dynamically based on obstacle proximity.</li>
        <li><b>Sonar Alerts:</b> Emits varying audio tones to indicate distance.</li>
        <li><b>Glassmorphic HUD:</b> Premium UI alerting bystanders and the user to spatial awareness states.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="60%">
      <h3>Notes-to-Audio (Unified OCR)</h3>
      A seamless Optical Character Recognition (OCR) scanner powered by ML Kit.
      <br><br>
      <b>Key Features:</b>
      <ul>
        <li><b>Auto-Language Detection:</b> Automatically detects both Latin (English) and Devanagari (Hindi) characters without manual toggles.</li>
        <li><b>Instant TTS:</b> Instantly converts scanned text into fluid speech using the native Android TTS Engine.</li>
      </ul>
    </td>
    <td width="40%" align="center">
      <img src="ocr_banner.jpg" alt="Notes-to-Audio OCR Module" width="100%" style="border-radius: 8px;">
    </td>
  </tr>
  <tr>
    <td width="40%" align="center">
      <img src="asl_banner.jpg" alt="Live Sign Language Translator Module" width="100%" style="border-radius: 8px;">
    </td>
    <td width="60%">
      <h3>Live Sign Language Translator</h3>
      Uses Google's MediaPipe Gesture Recognizer to identify American Sign Language (ASL) letters in real-time. Translates live camera feeds into English text for seamless communication bridging, drastically improving interactivity for deaf users.
    </td>
  </tr>
  <tr>
    <td width="60%">
      <h3>Color & Light Detector</h3>
      Analyzes the center of the camera feed to output exact RGB values, luminance, and human-readable color names (e.g., "Dark Navy Blue") to assist visually impaired users in identifying objects, clothing, and ambient lighting conditions.
    </td>
    <td width="40%" align="center">
      <img src="color_banner.jpg" alt="Color & Light Detector Module" width="100%" style="border-radius: 8px;">
    </td>
  </tr>

</table>

---

## User Interface and Experience Methodology

The interface is designed strictly in accordance with accessibility best practices, prioritizing tactile feedback and high-contrast visual elements over superfluous aesthetics.
*   **Kinetic Feedback:** Employs the Compose `spring()` physics engine for all interactive elements to provide a sense of physical weight and momentum, aiding spatial memory.
*   **Auditory Cues:** Integrates comprehensive system audio feedback for all state changes and button interactions.
*   **Contrast and Legibility:** Utilizes a carefully calibrated palette of deep navy blues and high-luminance whites, designed for maximal readability.

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
  <h3>Made By Vortex AI</h3>
  <code>Avadhi Sharma (3rd Year CSE)</code> &bull; <code>Mudit Vaishnav (2nd Year ECC)</code> &bull; <code>Mudra Chauhan (2nd Year CSE)</code> &bull; <code>Jigyasha Mahariya (2nd Year ECC)</code> &bull; <code>Monalika Vyas (2nd Year P&I)</code>
</div>
