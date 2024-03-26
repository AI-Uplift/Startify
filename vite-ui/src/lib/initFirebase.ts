import { FirebaseOptions, getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyA7ilVRK1vOiFJOcSKszo10oeJKcMEmiWg",
	authDomain: "startify-efb39.firebaseapp.com",
	projectId: "startify-efb39",
	storageBucket: "startify-efb39.appspot.com",
	messagingSenderId: "203973589037",
	appId: "1:203973589037:web:c5656adb45434ed115e0a4",
} satisfies FirebaseOptions;

function createFirebaseApp() {
	try {
		return getApp();
	} catch {
		return initializeApp(firebaseConfig);
	}
}

export const firebaseApp = createFirebaseApp();
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseFirestore = getFirestore(firebaseApp);
