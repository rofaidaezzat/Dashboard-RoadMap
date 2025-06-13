import { axiosInstance } from "../config/axios.config";

// Add global type for window._isLoggingOut to avoid 'any' usage
declare global {
  interface Window {
    _isLoggingOut?: boolean;
  }
}

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
