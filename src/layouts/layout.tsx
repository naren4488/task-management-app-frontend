import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

type Props = {
  children: React.ReactNode;
};
const layout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen flex-col ">
      <Header />
      <div className="px-4 lg:px-12  flex-1 py-8">{children}</div>
      <Footer />
    </div>
  );
};

export default layout;
