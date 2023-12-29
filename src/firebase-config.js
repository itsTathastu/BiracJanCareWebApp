
import { getStorage} from "firebase/storage"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOkieme2najMS__2v4RhpovnVWVfXRCsE",
  authDomain: "biracjancare2.firebaseapp.com",
  projectId: "biracjancare2",
  storageBucket: "biracjancare2.appspot.com",
  messagingSenderId: "547808322705",
  appId: "1:547808322705:web:86546f671966e439744b30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);