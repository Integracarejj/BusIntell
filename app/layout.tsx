// app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body className="h-screen overflow-hidden">
                <div className="flex h-full">
                    <Sidebar />
                    <div className="flex flex-col flex-1">
                        <Header />
                        <main className="flex-1 overflow-auto p-6">
                            {children}
                        </main>
                    </div>
                </div>
            </body>
        </html>
    );
}
