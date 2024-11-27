# LoreHunter Gaming Forum

## Overview
A full-stack gaming community platform built with Spring Boot and Angular. LoreHunter provides gamers with a space to discuss games, share experiences, and connect with fellow enthusiasts through various interactive features.

## Features
* User Profiles & Authentication
* Game Library Management
* Community Discussion Forums
* Ticket Support System
* Real-time Notifications
* Private Messaging System
* User Following System
* Comment & Like System
* Admin Dashboard
* Category Management
* Custom Email Service
* User Session Tracking

## Technology Stack

### Backend
* Java Spring Boot
* Spring Security
* Spring Data JPA/Hibernate
* MySQL Database
* Gradle Build System
* Custom Session Management

### Frontend
* Angular
* TypeScript
* Material UI
* CKEditor 5
* Custom Directives
* Responsive Layouts
* Image Processing

## Project Structure

    ├── DB/                          # Database files & schema
    ├── LoreHunter/                  # Spring Boot Backend
    │   ├── src/main/java
    │   │   ├── configuration/      # App configs
    │   │   ├── controllers/        # REST endpoints
    │   │   ├── services/          # Business logic
    │   │   ├── repositories/      # Data access
    │   │   ├── security/          # Auth & security
    │   │   └── dto/               # Data transfer objects
    │   └── resources/             # Properties & static
    ├── JPALoreHunter/             # JPA Entity Project
    │   └── src/main/java
    │       └── entities/          # Data models
    └── ngLoreHunter/              # Angular Frontend
        ├── src/app
        │   ├── layouts/          # Page layouts
        │   ├── shared/           # Shared components
        │   ├── services/         # Data services
        │   ├── models/           # TypeScript interfaces
        │   ├── directives/       # Custom directives
        │   └── pipes/            # Data transformation

## Setup & Installation

### Prerequisites
* Java 11+
* Node.js & npm
* MySQL
* Gradle

### Database Setup
1. Create MySQL database
2. Run schema script from DB folder
3. Configure connection in application.properties

### Backend Setup
1. Clone repository
2. Navigate to LoreHunter directory
3. Build project:
    ```
    ./gradlew build
    ```
4. Run application:
    ```
    ./gradlew bootRun
    ```

### Frontend Setup
1. Navigate to ngLoreHunter
2. Install dependencies:
    ```
    npm install
    ```
3. Start development server:
    ```
    ng serve
    ```

## Key Features Implementation

### User Management
* JWT Authentication
* Role-based Authorization
* Profile Customization
* Follow System
* Session Tracking

### Content Management
* Game Categories
* Post Creation & Editing
* Comment System
* Like/Dislike System
* Image Upload & Processing

### Communication Features
* Private Messaging
* Notification System
* Support Ticket System
* Admin Messaging
* Email Notifications

### Admin Features
* User Management
* Content Moderation
* Category Management
* Ticket Management
* Analytics Dashboard

## Core Entities
* Users
* Games
* Posts
* Comments
* Categories
* Tickets
* Messages
* Notifications
* Likes
* UserFollowers

## Testing
* Backend: JUnit tests for entities & services
* Frontend: Karma & Jasmine for components & services

## Contributing
1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Submit pull request

## License
All rights reserved

## Contact
[Your contact information]
