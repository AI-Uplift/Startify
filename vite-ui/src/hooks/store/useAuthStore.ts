import { IUser } from "@/types/User";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IAuthStore {
	user: IUser | null;
	setUser: (user: IUser | null) => void;
}

export const useAuthStore = create(
	persist<IAuthStore>(
		(set) => ({
			user: null,
			setUser: (user) => set({ user }),
		}),
		{ name: "authStore" }
	)
);
