import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from '@firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCqWCC5wtiU2289kSKCL9znlXFk0S_VYxc",
  authDomain: "talk-with-doc-88.firebaseapp.com",
  projectId: "talk-with-doc-88",
  storageBucket: "talk-with-doc-88.appspot.com",
  messagingSenderId: "602811930968",
  appId: "1:602811930968:web:223a6ec34f585d645a6d2d",
  measurementId: "G-RQMJCLY5MK"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();

// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({
  prompt: "select_account "
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore(firebaseApp)
export const storage = getStorage(firebaseApp);