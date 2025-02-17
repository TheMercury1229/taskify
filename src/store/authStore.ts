import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import { axiosInstance } from "@/lib/axios";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
  loadUser: () => void;
  error: string | null;
  login: (formData: { email: string; password: string }) => Promise<any>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  error: null,

  setToken: (token) => {
    if (!token || token === "{}") {
      console.error("Received empty token:", token);
      return;
    }
    const decodedUser = jwtDecode<User>(token);
    set({ token, user: decodedUser });
    localStorage.setItem("token", token);
  },

  logout: () => {
    set({ token: null, user: null });
    localStorage.removeItem("token");
  },

  loadUser: () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedUser = jwtDecode<User>(token);

      // Prevent unnecessary state updates to avoid infinite loop
      set((state) => {
        if (state.token !== token) {
          return { token, user: decodedUser };
        }
        return state;
      });
    }
  },

  login: async (formData) => {
    try {
      set({ error: null });
      const res = await axiosInstance.post("/auth/login", formData);
      if (res.data.success) {
        const token = res.data.token;
        set({ token, user: jwtDecode<User>(token) });
        localStorage.setItem("token", token);
      }
      return res;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  },
}));
