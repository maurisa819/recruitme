"use client";

import React from "react";
import { useRouter } from "next/navigation";
import "../styles.css";

export default function CompanyRegister() {
  const router = useRouter();

  const goToCompanyRegister = () => router.push("/company/register");
  
    
  return (
    <div className="flex-box"> Company Register Page </div>

  );
}
