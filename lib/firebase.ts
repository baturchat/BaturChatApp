import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getDatabase, Database } from 'firebase/database';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// Firebase configurations for dual database setup
const authConfig = {
  apiKey: "AIzaSyDDtKnay2kYMLP5_ZmZhkW9qGSFE7hOvdo",
  authDomain: "baturchat-0708.firebaseapp.com",
  projectId: "baturchat-0708",
  storageBucket: "baturchat-0708.firebasestorage.app",
  messagingSenderId: "1098323002585",
  appId: "1:1098323002585:android:c0578af7500c470fe66ac8"
};

const storageConfig = {
  apiKey: "AIzaSyBjw4t8_b0Of4zUCRITzteyi90aXqcaSpg",
  authDomain: "demoprobeta3.firebaseapp.com",
  databaseURL: "https://demoprobeta3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "demoprobeta3",
  storageBucket: "demoprobeta3.appspot.com",
  messagingSenderId: "369529000980",
  appId: "1:369529000980:android:ebb425dda72b0fa9d58301"
};

// Initialize Firebase apps
let authApp: FirebaseApp;
let storageApp: FirebaseApp;

if (getApps().length === 0) {
  authApp = initializeApp(authConfig, 'authApp');
  storageApp = initializeApp(storageConfig, 'storageApp');
} else {
  authApp = getApps().find(app => app.name === 'authApp') || initializeApp(authConfig, 'authApp');
  storageApp = getApps().find(app => app.name === 'storageApp') || initializeApp(storageConfig, 'storageApp');
}

// Export Firebase services
export const auth: Auth = getAuth(authApp);
export const database: Database = getDatabase(storageApp);
export const storage: FirebaseStorage = getStorage(storageApp);

export { authApp, storageApp };