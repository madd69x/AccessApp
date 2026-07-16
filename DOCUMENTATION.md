# AccessApp - Technical Documentation

Welcome to the official technical documentation for **AccessApp**, the next-generation accessibility assistant designed for visually impaired and deaf users.

## 🏗 Architecture & Technology Stack

AccessApp is built on a modern Android architecture designed for high performance, edge-AI capabilities, and fluid user experiences.

### Core Frameworks
- **Language:** Kotlin (1.9.0+)
- **UI Framework:** Jetpack Compose (Material 3)
- **Minimum SDK:** API 30 (Android 11) - Enforces modern security and background processing constraints.
- **Target SDK:** API 36

### Edge AI & Machine Learning
We prioritize **On-Device Machine Learning** to ensure the app functions rapidly without requiring an active internet connection (preserving privacy and reducing latency).
- **Google MediaPipe Vision:** Used for real-time Object Detection (Obstacle Radar) and Gesture Recognition (ASL Translation).
- **Google ML Kit:** Used for rapid Optical Character Recognition (OCR) and text extraction.
- **Android TTS Engine:** Native Text-to-Speech synthesis for zero-latency audio feedback.

---

## 🧩 Module Deep Dives

### 1. Obstacle Radar
The Obstacle Radar acts as a digital cane, utilizing the device's rear camera to identify objects in the user's path.

**Technical Implementation:**
- Utilizes the `efficientdet_lite0.tflite` model via MediaPipe.
- Processes camera frames via `CameraX` `ImageAnalysis` use case.
- Extracts bounding boxes and calculates approximate proximity based on bounding box area relative to the screen frame.
- Triggers dynamic haptic feedback using the Android `Vibrator` API, increasing intensity and frequency as the object's bounding box grows larger (indicating it is closer).

### 2. Notes-to-Audio (Unified OCR)
A specialized document scanner designed to read real-world text (signs, notes, books) and speak it aloud.

**Technical Implementation:**
- Built using **Google ML Kit Vision (Text Recognition)**.
- Automatically handles language detection for both Latin (English) and Devanagari (Hindi) scripts simultaneously without requiring the user to manually switch modes.
- Text is piped directly into the Android `TextToSpeech` service.
- The UI handles states gracefully, ensuring that overlapping frames do not cause the TTS engine to stutter.

### 3. Live Sign Language Translator
Bridges the communication gap by translating American Sign Language (ASL) alphabets into English text in real-time.

**Technical Implementation:**
- Powered by a custom-trained MediaPipe Gesture Recognizer model (`gesture_recognizer.task`).
- Detects hand landmarks in 3D space and maps them against known ASL configurations.
- Displays the translated character securely on the screen with high contrast for the user to read or show to a bystander.

### 4. Color & Light Detector
Assists visually impaired users in identifying the color of clothing, objects, or the ambient lighting of a room.

**Technical Implementation:**
- Analyzes the center pixel cluster of the `CameraX` feed.
- Converts raw RGB pixel values into human-readable strings (e.g., "Dark Red", "Light Navy Blue") using a custom color-mapping algorithm.
- Evaluates luminance to determine if a room is dark or well-lit, providing vital context to the user.

---

## 🎨 UI/UX Philosophy
We firmly believe that accessibility tools should not look like clinical prototypes.
- **Spring Physics:** Every button press and screen transition utilizes Compose `spring()` animations rather than linear tweens, giving the app a tactile, organic feel.
- **Color Palette:** A highly curated palette of Deep Navy Blues, Light Blues, and Whites. 
- **Typography:** Custom integration of the *Outfit* Google font.

---

## 🚀 Build & Deployment

### Cloning the Repository
```bash
git clone https://github.com/madd69x/AccessApp.git
cd AccessApp
```

### Dependency Setup
The project heavily relies on specific `.tflite` models. These are automatically downloaded by a custom Gradle task during the build process, ensuring the repository remains lightweight. Ensure you have an active internet connection during your first Gradle Sync.

### Running the App
Due to the heavy reliance on `CameraX` and hardware sensors (Haptics, TTS), **AccessApp must be run on a physical Android device**. 
1. Connect your Android 11+ device via USB debugging or Wireless debugging.
2. Select the device in Android Studio.
3. Click **Run** (`Shift + F10`).
