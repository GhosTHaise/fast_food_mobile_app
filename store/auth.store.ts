import { getCurrentUser } from "@/lib/appwrite";
import { User } from "@/type";
import { create } from "zustand";

type AuthState = {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;

    setIsAuthentificated : (value : boolean) => void;
    setUser : (user : User | null) => void;
    setIsLoading : (value : boolean) => void;

    fetchAuthenticatedUser : () => Promise<void>;
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
        try {
            const user = await getCurrentUser();

            if(user) {
                set({ isAuthenticated: true, user : user as User });
            }else{
                set({ isAuthenticated: false, user : null });
            }
        } catch (error) {
            console.log("fetchAuthenticatedUser error", error);
            set({ isLoading: false, user : null });
        }finally{
            set({ isLoading: false });
        }
    }
}));

export default useAuthStore;