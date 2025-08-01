import { User } from "@/type";
import { create } from "zustand";

type AuthState = {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;

    setIsAuthentificated : (value : boolean) => void;
    setUser : (user : User | null) => void;
    setIsLoading : (value : boolean) => void;

    fetchAuthenticatedUser : () => Promise<User | null>;
}

const useAuthStore = create<AuthState>((set, get) => ({
    isAuthenticated: false,
    user: null,
    isLoading: false,

    setIsAuthentificated : (value : boolean) => set({ isAuthenticated: value }),
    setUser : (user : User | null) => set({ user }),
    setIsLoading : (value : boolean) => set({ isLoading: value }),

    fetchAuthenticatedUser : async () => {
        set({ isLoading: true });
        const user = await fetch("/api/user").then(res => res.json());
        set({ isLoading: false, user });
        return user;
    }
}));

export default useAuthStore;