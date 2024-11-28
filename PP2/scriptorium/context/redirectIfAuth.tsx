import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "@/context/userContextHeader";

const RedirectIfAuthenticated: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/home"); // Redirect to the desired page if logged in
    }
  }, [user, router]);

  // Prevent rendering the children while the redirect is in progress
  if (user) {
    return null;
  }

  return <>{children}</>;
};

export default RedirectIfAuthenticated;
