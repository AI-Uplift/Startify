import { firebaseAuth, firebaseFirestore } from "@/lib/initFirebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";
import { doc, getDoc } from "firebase/firestore";
import { IUser } from "@/types/User";

export default function useAuthStateListener() {
	const { setUser } = useAuthStore();
	const authStateChanged = async (user: User) => {
		if (!user) {
			return setUser(null);
		}

		const userRef = doc(firebaseFirestore, "users", user.uid);
		const userSnap = await getDoc(userRef);
		setUser({
			id: userSnap.id,
			...userSnap.data(),
		} as IUser);
	};

	useEffect(() => onAuthStateChanged(firebaseAuth, (user) => authStateChanged(user)), []);
}
