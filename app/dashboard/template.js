"use client";
import { useRouter } from "next/navigation";
import MobileFooter from "../scan/mobileFooter";
import NavbarTop from "../scan/navbarTop";
import { useState } from "react";
export default function DashboardTemplate({ children }) {
 
  const [isActive, setIsActive] = useState(false);
  // const [code, setCode] = useState("JKFSSGM");
  const [code, setCode] = useState("");
  const [contentHide, setContentHide] = useState(false);
  const router = useRouter();


  const buttonClik = () => {
    setIsActive(isActive ? false : true);
  };

  const getCodeScan = (code) => {
    setCode(code);
    router.push(`/dashboard/forma/${code}`);
  };

  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      {!contentHide && <NavbarTop />}
      {!contentHide && children}
      <MobileFooter hideContent={() => setContentHide(!contentHide)} />
    </section>
  );
}
