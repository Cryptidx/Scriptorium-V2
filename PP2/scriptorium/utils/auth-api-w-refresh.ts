type ErrorResponse = {
    message: string;
  };

  type Err = {
    error:string
  }
  
  export const apiCall = async (url: string, options: RequestInit): Promise<any> => {

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
        const errorData: Err = await response.json();
        throw new Error(errorData.error || "Unknown API error occurred");
      }
  
      return response.json();
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
// export const apiCall = async (url: string, options: RequestInit): Promise<any> => {
//   if (typeof window === "undefined") {
//     throw new Error("localStorage is not available on the server side");
//   }

//   const accessToken = localStorage.getItem("accessToken");
//   const refreshToken = localStorage.getItem("refreshToken");

//   const fetchWithToken = async (token: string) => {
//     const headers = {
//       ...options.headers,
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     };

//     const response = await fetch(url, {
//       ...options,
//       headers,
//     });

//     if (!response.ok) {
//       if (response.status === 401) {
//         throw new Error("Token expired");
//       }
//       const errorData = await response.json();
//       throw new Error(errorData.message || "Unknown API error occurred");
//     }

//     return response.json();
//   };

//   try {
//     // Try using the access token first
//     return await fetchWithToken(accessToken!);
//   } catch (error: any) {
//     if (error.message === "Token expired" && refreshToken) {
//       // Try refreshing the token
//       const refreshResponse = await fetch("/api/users/refresh", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "x-refresh-token": refreshToken,
//         },
//       });

//       if (refreshResponse.status === 200) {
//         const { newAccessToken } = await refreshResponse.json();
//         localStorage.setItem("accessToken", newAccessToken);

//         // Retry original request with new access token
//         return await fetchWithToken(newAccessToken);
//       } else {
//         const errorData = await refreshResponse.json();
//         throw new Error(errorData.message || "Session expired. Please log in again.");
//       }
//     }

//     throw error; // Propagate other errors
//   }
// };
