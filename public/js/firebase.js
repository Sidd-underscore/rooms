  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyA09XIhl6Oqn1LOqYFU0ZUzrhiHgNAlRyk",
    authDomain: "rooms-326702.firebaseapp.com",
    projectId: "rooms-326702",
    storageBucket: "rooms-326702.appspot.com",
    messagingSenderId: "824085801611",
    appId: "1:824085801611:web:c6eb92a61624ddbe50428e",
    measurementId: "G-DNQFMVDRCJ"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);