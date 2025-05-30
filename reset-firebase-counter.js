// reset-firebase-counter.js
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set } = require('firebase/database');

const firebaseConfig = {
  apiKey: "AIzaSyBpt2snG0YyMf7ymcjycBhz5tmckqy5X9M",
  authDomain: "coitus-counter-bcafd.firebaseapp.com",
  databaseURL: "https://coitus-counter-bcafd-default-rtdb.firebaseio.com",
  projectId: "coitus-counter-bcafd",
  storageBucket: "coitus-counter-bcafd.firebasestorage.app",
  messagingSenderId: "107033654230",
  appId: "1:107033654230:web:13437c96127a2db516aa77"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const year = new Date().getFullYear();

set(ref(db, 'counter/' + year), 0)
  .then(() => {
    console.log('Counter reset for year', year);
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error resetting counter:', err);
    process.exit(1);
  });
