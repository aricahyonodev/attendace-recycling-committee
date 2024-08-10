"use client";
import { useRouter } from "next/navigation";
import MobileFooter from "../scan-computer/mobileFooter";
import NavbarTop from "../scan-computer/navbarTop";
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
      {!contentHide && <div className="">{children}</div>}
      <MobileFooter hideContent={() => setContentHide(!contentHide)} />
    </section>
  );
}
