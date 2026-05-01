// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDFEsEpYRkso8sK0BWt_nMx06GdKBiOHrE',
  authDomain: 'sarangani-study-center.firebaseapp.com',
  projectId: 'sarangani-study-center',
  storageBucket: 'sarangani-study-center.firebasestorage.app',
  messagingSenderId: '464315237287',
  appId: '1:464315237287:web:4df5882e5189327c186c82',
  measurementId: 'G-3K0H64CVGC',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
