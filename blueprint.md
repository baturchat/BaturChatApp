# BaturChat Blueprint

## Overview

BaturChat is a modern, responsive, and feature-rich chat application built with Flutter and Firebase. It aims to provide a seamless and engaging user experience with a focus on performance, security, and real-time communication.

## Core Features

- **Real-time Messaging:** Instantaneous message delivery and synchronization across devices.
- **Authentication:** Secure email-based login and user management.
- **User Presence:** Real-time online/offline status indicators.
- **Rich Media Sharing:** Share images and other media files.
- **Push Notifications:** Stay updated with new messages even when the app is in the background.
- **Group Chat:** Create and manage group conversations.
- **Message Reactions:** React to messages with emojis.
- **Typing Indicators:** See when other users are typing a message.
- **End-to-End Encryption:** (Future) Secure conversations with end-to-end encryption.

## Design and Theming

- **Modern UI:** A clean, intuitive, and visually appealing user interface.
- **Light & Dark Mode:** Support for both light and dark themes, with automatic system theme detection.
- **Custom Fonts:** Use of Google Fonts for a consistent and professional look.
- **Animations:** Lottie animations for a more engaging user experience.

## Project Structure

```
lib/
├── core/
│   ├── constants/
│   ├── themes/
│   ├── utils/
│   └── encryption/
├── data/
│   ├── models/
│   ├── repositories/
│   └── services/
├── presentation/
│   ├── screens/
│   │   ├── auth/
│   │   ├── chat/
│   │   ├── home/
│   │   └── settings/
│   ├── widgets/
│   └── animations/
├── state/
│   ├── blocs/
│   └── providers/
├── main.dart
└── presentation/app.dart
assets/
├── icons/
└── animations/
```

## Current Plan

- Initialize the project structure.
- Set up basic dependencies.
- Create the main application widget.
- Define the application theme.
- Set up the routing.
- Create the basic screens (Login, Home, Chat).
