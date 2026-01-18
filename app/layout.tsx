
// app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header"; // ← add this import

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" className="h-full">
            <body className="h-full bg-slate-50 text-slate-800 antialiased">
                <div className="flex h-screen">
                    <Sidebar />
                    <main className="relative flex-1 overflow-auto">
                        <Header />           {/* ← add this line */}
                        <div className="p-6">{children}</div>
                    </main>
                </div>
            </body>
        </html>
    );
}
