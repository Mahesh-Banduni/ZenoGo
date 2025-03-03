# ZenoGo - Ride Hailing Platform 🚖

  - Live Website: [Visit Here](https://zenogo.netlify.app/)

## Description

ZenoGo is a ride-hailing platform built using the MERN stack. It allows users to book rides, track them in real-time, and make payments seamlessly. Drivers can accept ride requests and update ride statuses. The platform integrates Ola Maps API for navigation, route optimization, and location tracking, and WebSockets for real-time ride updates.

## Features

### 1. User Features

- **Ride Booking:** Select pickup and destination locations using Ola Maps API.

- **Fare Estimation:** Get an estimated fare before booking.

- **Real-time Tracking:** Track rides live using WebSockets.

- **Multiple Ride Options:** Choose between Mini, Sedan, and SUV.

- **Payment Integration:** Select payment methods and pay securely.

- **Ride History:** View past ride details.

- **Push Notifications:** Get notified about ride status changes.

### 2. Driver Features

- **Ride Requests:** Accept or decline ride requests.

- **Live Location Updates:** Share real-time location with the rider.

- **Earnings Dashboard:** View completed rides and earnings.


## Tech Stack

- **Frontend:** React.js, Tailwind CSS, Redux

- **Backend:** Node.js + Express.js

- **Database:** MongoDB with Mongoose


## Installation Guide

### 1️⃣ Clone the Repository

- git clone https://github.com/Mahesh-Banduni/ZenoGo.git
- cd ZenoGo

### 2️⃣ Backend Setup

- cd backend
- npm install
- cp .env.example .env  # Update environment variables
- npm run dev

### 3️⃣ Frontend Setup

- cd frontend
- npm install
- cp .env.example .env  # Update environment variables
- npm run dev
