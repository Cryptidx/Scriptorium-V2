type ErrorResponse = {
    message: string;
  };
  
  export const apiCallText = async (url: string, options: RequestInit): Promise<any> => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
  
    const fetchWithToken = async (token: string) => {
      const headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
  
      const response = await fetch(url, {
        ...options,
        headers,
      });
  
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Token expired");
        }
        const errorData: ErrorResponse = await response.json();
        throw new Error(errorData.message || "Unknown API error occurred");
      }
  
      return response.text();
    };
  
    try {
      // Try using the access token first
      return await fetchWithToken(accessToken!);  

    } catch (error: any) {
      if (error.message === 'Invalid or expired token.' && refreshToken) {
        // Try to refresh the access token
        const refreshResponse = await fetch("/api/users/refresh", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'x-refresh-token': refreshToken
          },
        });
  
        if (refreshResponse.status === 200) {
          const { newAccessToken } = await refreshResponse.json();
          localStorage.setItem("accessToken", newAccessToken);
  
          // Retry the original API call with the new access token
          return await fetchWithToken(newAccessToken);
        } else {
          // Refresh token also failed
          const errorData: ErrorResponse = await refreshResponse.json();
          throw new Error(errorData.message || "Session expired. Please log in again.");
        }
      } else {
        throw error; // Propagate other errors
      }
    }
  };
  