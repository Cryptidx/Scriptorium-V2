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
      <Header />
      <div className="px-6 py-6 space-y-4">
        {title && <h1 className="text-center text-4xl sm:text-5xl font-mono">{title}</h1>}
        {subtitle && (
          <h2 className="text-center text-lg font-mono text-gray-700">{subtitle}</h2>
        )}
        {extraContent && <div className="mt-4">{extraContent}</div>}
      </div>
      <div className="flex-1 flex justify-start items-start px-6">{children}</div>
    </div>
  );
};

export default Layout;
