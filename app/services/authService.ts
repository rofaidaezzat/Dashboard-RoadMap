import { axiosInstance } from "@/app/config/axios.config";
import Cookies from 'js-cookie';

// Add global type for window._isLoggingOut to avoid 'any' usage
declare global {
  interface Window {
    _isLoggingOut?: boolean;
  }
}

export const login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    const { accessToken, ...userData } = response.data;

    // Store in cookies instead of localStorage
    Cookies.set("accessToken", accessToken, { expires: 7 }); // 7 days expiry
    Cookies.set("loggedInUser", JSON.stringify(userData), { expires: 7 });
    Cookies.set("First-name", JSON.stringify(userData.first_name), { expires: 7 });
    Cookies.set("last-name", JSON.stringify(userData.last_name), { expires: 7 });
    Cookies.set("email", JSON.stringify(userData.email), { expires: 7 });
    Cookies.set("role", JSON.stringify(userData.role), { expires: 7 });
    Cookies.set("id", JSON.stringify(userData.id), { expires: 7 });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  // Clear cookies instead of localStorage
  Cookies.remove("accessToken");
  Cookies.remove("loggedInUser");
  Cookies.remove("First-name");
  Cookies.remove("last-name");
  Cookies.remove("email");
  Cookies.remove("role");
  Cookies.remove("id");
};

export const getStoredToken = () => {
  return Cookies.get("accessToken");
};

export const getStoredUser = () => {
  const userData = Cookies.get("loggedInUser");
  return userData ? JSON.parse(userData) : null;
};

export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const response = await axiosInstance.get("/auth/refresh");
    const newAccessToken = response.data.accessToken;

    // Use localStorage only in the browser
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", newAccessToken);
    }

    return newAccessToken;
  } catch (error: unknown) {
    console.error("Refresh token failed:", error);

    if (
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      (error as { response?: { status?: number } }).response?.status === 401
    ) {
      // Prevent redirect crash in SSR
      if (typeof window !== "undefined" && !window._isLoggingOut) {
        window._isLoggingOut = true;
        window.location.href = "/authpage";
      }
    }

    return null;
  }
};
