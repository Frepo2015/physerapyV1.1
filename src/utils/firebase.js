import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore, memoryLocalCache } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDTzcgXFsEeqdywBW9sd1wFy82upj4rmho",
  authDomain: "physerapyv1-f6f23.firebaseapp.com",
  projectId: "physerapyv1-f6f23",
  storageBucket: "physerapyv1-f6f23.appspot.com",
  messagingSenderId: "567266129899",
  appId: "1:567266129899:web:77143cba13f3ecb7dd8bae"
};
// Initialize Firebase
export const initFirebase = initializeApp(firebaseConfig);

export const offlineDb = initializeFirestore(initFirebase, {localCache: memoryLocalCache()});

export const db = getFirestore(initFirebase)

