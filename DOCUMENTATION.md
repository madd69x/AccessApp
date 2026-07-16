# Technical Documentation: AccessApp

## 1. Abstract

**AccessApp** is a comprehensive, artificial intelligence-driven accessibility application engineered specifically for individuals with visual or auditory impairments. The system leverages edge-based machine learning paradigms to provide real-time spatial awareness, optical character recognition, and gestural translation without reliance on cloud-based processing. This approach ensures maximal privacy, minimizes computational latency, and guarantees operability in environments with restricted network connectivity.

## 2. System Architecture

The application is structured upon a modern, modular Android architecture, ensuring scalability and robust performance.

*   **Programming Language:** Kotlin (Version 1.9.0+)
*   **User Interface Framework:** Jetpack Compose (Material Design 3 parameters)
*   **Minimum SDK Requirement:** API Level 30 (Android 11) - Enforced to leverage contemporary security protocols and background processing constraints.
*   **Target SDK Requirement:** API Level 36

### 2.1 Machine Learning Infrastructure

The system employs on-device inference engines to process sensory data locally:
*   **Google MediaPipe Vision:** Deployed for high-frequency frame analysis, facilitating object detection (Obstacle Radar) and skeletal node tracking (American Sign Language Translation).
*   **Google ML Kit Vision:** Utilized for rapid Optical Character Recognition (OCR) and text segmentation.
*   **Android Text-to-Speech (TTS) Engine:** Synthesizes localized audio feedback with near-zero latency.

---

## 3. Module Specifications

### 3.1 Obstacle Radar (Spatial Awareness Module)

This module functions as a digital mobility aid, utilizing the device's primary camera sensor to calculate the proximity of physical obstructions within the user's trajectory.

**Technical Implementation:**
*   **Model:** Employs the `efficientdet_lite0.tflite` model, integrated via the MediaPipe framework.
*   **Data Pipeline:** Processes sequential video frames through the `CameraX` `ImageAnalysis` use case.
*   **Proximity Calculation:** Extracts bounding boxes from detected entities. Proximity is approximated by calculating the ratio of the bounding box area to the total field of view.
*   **Sensory Feedback:** Interfaces with the Android `Vibrator` API to deliver dynamic haptic feedback. The frequency and amplitude of the vibrations are directly proportional to the calculated proximity of the nearest detected obstruction.

### 3.2 Notes-to-Audio (Unified Optical Character Recognition)

A specialized document parsing module engineered to extract textual data from physical environments (e.g., signage, documents) and convert it into audible speech.

**Technical Implementation:**
*   **Engine:** Built upon the Google ML Kit Vision API (Text Recognition module).
*   **Language Processing:** Implements concurrent language classification, automatically identifying and processing both Latin (English) and Devanagari (Hindi) scripts without requiring manual user intervention.
*   **Audio Synthesis:** Extracted text strings are queued and piped sequentially into the Android `TextToSpeech` service. The module incorporates state-management logic to prevent audio overlap and ensure fluid dictation.

### 3.3 Live Sign Language Translator

This module facilitates communication for individuals with auditory impairments by translating American Sign Language (ASL) alphabetic gestures into textual output in real-time.

**Technical Implementation:**
*   **Model:** Powered by a localized MediaPipe Gesture Recognizer model (`gesture_recognizer.task`).
*   **Kinematic Analysis:** Detects and tracks 21 distinct hand landmarks in three-dimensional space, mapping the spatial configurations against a pre-defined dataset of ASL static gestures.
*   **User Interface:** Projects the translated characters onto the display utilizing high-contrast typography to ensure readability for both the user and conversational partners.

### 3.4 Color and Luminance Detector

A sensory augmentation tool designed to assist visually impaired individuals in discerning the chromatic properties of objects and the ambient lighting conditions of their environment.

**Technical Implementation:**
*   **Pixel Analysis:** Targets the central pixel cluster within the active `CameraX` feed.
*   **Chromatic Mapping:** Extracts raw RGB (Red, Green, Blue) values and processes them through a custom comparative algorithm to map the data to the nearest human-readable color nomenclature (e.g., "Dark Red", "Light Navy Blue").
*   **Luminance Evaluation:** Calculates the relative luminance of the sampled area to determine environmental lighting conditions, outputting descriptive metrics (e.g., "Well-lit", "Dim") to provide contextual awareness.

---

## 4. User Interface and Experience Methodology

The interface is designed strictly in accordance with accessibility best practices, prioritizing tactile feedback and high-contrast visual elements over superfluous aesthetics.

*   **Kinetic Feedback:** Employs the Compose `spring()` physics engine for all interactive elements and transition states. This provides a sense of physical weight and momentum to the digital interface, aiding spatial memory for visually impaired users.
*   **Auditory Cues:** Integrates comprehensive system audio feedback for all state changes and button interactions.
*   **Contrast and Legibility:** Utilizes a carefully calibrated palette of deep navy blues and high-luminance whites, compliant with WCAG (Web Content Accessibility Guidelines) contrast ratio standards.

---

## 5. Deployment and Build Protocols

### 5.1 Repository Initialization
To establish a local development environment, execute the following command:
```bash
git clone https://github.com/madd69x/AccessApp.git
cd AccessApp
```

### 5.2 Dependency Management
The application requires specific TensorFlow Lite (`.tflite`) model files to function. These binary assets are managed automatically via a custom Gradle task executed during the synchronization phase. An active internet connection is mandatory during the initial build to facilitate these downloads.

### 5.3 Execution Environment Constraints
Due to the system's reliance on physical hardware sensors (camera arrays, haptic motors, localized TTS engines), **AccessApp must be compiled and deployed to a physical Android device**. Virtualization environments (Emulators) are incompatible with the core sensory modules. 

1. Ensure the target device is running Android 11 (API Level 30) or higher.
2. Enable USB Debugging or Wireless Debugging within Developer Options.
3. Initiate the build sequence via Android Studio (`Shift + F10`).
