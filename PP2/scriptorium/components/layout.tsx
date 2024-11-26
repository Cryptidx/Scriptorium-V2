import Header from "@/components/header";
import React from "react";

interface LayoutProps {
  children: React.ReactNode; // Content-specific for each page
  title?: string; // Optional title for the layout
  subtitle?: string; // Optional subtitle
  extraContent?: React.ReactNode; // Optional extra content (e.g., filters, buttons, etc.)
}

const Layout: React.FC<LayoutProps> = ({ children, title, subtitle, extraContent }) => {
  return (
    <div className="h-screen flex flex-col">
      {/* <Header /> */}
      <div className="px-6 py-6 space-y-4">
        {title && <h1 className="text-center text-4xl sm:text-5xl font-mono">{title}</h1>}
        {subtitle && (
          <h2 className="text-center text-lg font-mono text-gray-700">{subtitle}</h2>
        )}
        {extraContent && <div className="mt-4">{extraContent}</div>}
      </div>
      <div className="px-6 -my-[4%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">{children}</div>
    </div>
  );
};

export default Layout;
