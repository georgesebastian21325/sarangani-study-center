import { initializeApp } from 'firebase/app';
import firebaseConfig from './config';

const app = initializeApp(firebaseConfig);

console.log('Firebase Initialized', app);

export default app;
