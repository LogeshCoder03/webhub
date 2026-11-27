import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import Loader from "@/components/Loader";
import { auth } from "@/auth";

export default async function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const session=await auth()   
  return (
    <Suspense fallback={<Loader />}>
      <NavigationBar session={session}/>
      <main>{children}</main>
      <Footer />
    </Suspense>
  );
}
