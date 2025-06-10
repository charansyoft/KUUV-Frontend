# README for Kuuv

## 1. Introduction  
**Project Overview:**  
This mobile native app supports multiple sign-in options (mobile, Google, Apple) and includes a complete authentication flow. Users enter their phone number (validated according to their country code), receive and verify an OTP, and then access the home screen. The home screen uses bottom tab navigation (Home, Shouts, Chats, Profile), where users can search for groups based on their location, view group details, and manage their profile (view login details, update info, and logout).  

---

## 2. Authentication Flow  
**SignInMethod Page:**  
The app launches with the SignInMethod page, where users choose how they want to sign in (mobile, Google, or Apple).  

**PhoneNumber Page:**  
If the mobile option is selected, users are taken to a page where they must enter their phone number. The app validates the phone number based on the country code (e.g., India uses +91) and checks the proper length.  

**OTP Verification:**  
Once validated, an OTP is sent to the user. The OTPVerification page displays a countdown timer; the user enters the OTP, and if verified by the backend within the allotted time, the user is authenticated.  

**Routing to Home:**  
Upon successful OTP verification, the user is routed to the Home screen.  

---

## 3. Home and Navigation  
**Home Screen:**  
The Home screen is accessible via bottom tab navigation. It allows users to search for groups based on their current location.  
If a location is found, groups matching that location are displayed.  
The search bar lets users filter groups by name, and if more groups exist, they are loaded as the user scrolls.  

**Profile Screen:**  
The Profile tab shows the phone number used for login and a “My Info” section.  

**My Info:**  
- 📷 Displays user data such as profile image, name, phone number (unchangeable), and a description.  

**Edit Option:**  
- ✏️ An edit button lets users update their name and description.  

**Logout:**  
- 🔓 A logout button clears the authentication token stored in AsyncStorage.  

---

## 4. State Management  
**Redux Integration:**  
The app uses Redux to manage global state. For example, the location retrieved via Expo's location API is processed and stored globally through the Redux slice using an action. This enables any part of the app to access the stored location data.  

---

## 5. Installation and Running the App  

### For Web Users:  

**Clone the Repository:**  
```sh
git clone [repository link]
```

**Install Dependencies:**  
```sh
npm install
```
Dependencies for running the app include (but are not limited to):  
- 📦 expo  
- ⚛️ react  
- 📱 react-native  
- 🌍 react-dom  
- 🛠️ @reduxjs/toolkit  
- 🏬 react-redux  
- 📍 expo-location  
- And other required packages listed in the dependencies section.  

**Start the App:**  
```sh
npm start
```
The app will be available at `http://localhost:8081`.  

### For Mobile Users:  

**Clone the Repository:**  
```sh
git clone [repository link]
```

**Install Dependencies:**  
```sh
npm install
```

**Launch the App:**  
```sh
npm start
```
This will start the Expo development server.  

**Using Expo Go:**  
- 📥 Download the Expo Go app from the app store on your mobile device.  

**Scan QR Code:**  
- 📸 Open Expo Go and scan the QR code provided in your terminal.  
This will open the mobile version of the app on your device.  

---

To see the frontend functionality fully, you need to clone and run the backend project as well. Clone the backend project from [Kuuv API](https://github.com/syoft/kuuv_api). Read this README and run both projects for full functionality.

