
import type { ReactNode } from "react";
import Header from "./Header";
import "./Layout.css";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <Header className="layout-header" />
      <main className="layout-body">
        {children}
      </main>
    </div>
  );
}