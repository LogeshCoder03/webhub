import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import Loader from "@/components/Loader";

export default async function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<Loader />}>
      <NavigationBar />
      <main>{children}</main>
      <Footer />
    </Suspense>
  );
}
