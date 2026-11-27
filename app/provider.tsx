import React from "react";
import ThemeProvider from "../components/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import {SessionProvider} from 'next-auth/react'
import { auth } from "@/auth";
import { connection } from "next/server";

const Provider =  async({ children }: { children: React.ReactNode }) => {
    await connection()
    const session=await auth()
    return (
        <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        >
        <TooltipProvider>
            <SessionProvider session={session}>{children}</SessionProvider>
        </TooltipProvider>
        </ThemeProvider>
    );
};

export default Provider;
