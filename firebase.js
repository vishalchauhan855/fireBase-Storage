// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import{getDatabase} from 'firebase/database'
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkM5GIs6Uc4vtRXR3KTFxWYsmxcaiti70",
  authDomain: "newproject-95038.firebaseapp.com",
  projectId: "newproject-95038",
  storageBucket: "newproject-95038.firebasestorage.app",
  messagingSenderId: "686782929960",
  appId: "1:686782929960:web:0151b365e4ad05acd9a91d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth(app)
const db =getFirestore(app)
export { auth,db};
// export default auth