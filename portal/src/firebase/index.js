// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC_4jUq3kGGCk8CqkwPbJBjsP6UQ-_yjeU",
    authDomain: "portal-itm.firebaseapp.com",
    projectId: "portal-itm",
    storageBucket: "portal-itm.appspot.com",
    messagingSenderId: "34733201514",
    appId: "1:34733201514:web:72c12f70aa7d2fb82e9213"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)
const auth = getAuth (app)


export {
    db,
    storage,
    auth
}