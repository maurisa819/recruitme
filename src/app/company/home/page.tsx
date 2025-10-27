"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function CompanyHome() {
  const router = useRouter();

  const goToReviewProfile = () => {
    router.push("/company/review");
  };

  return (
    <div>
      <h1>Company Home Page</h1>
      <button onClick={goToReviewProfile}>Review Company Profile</button>
    </div>
  );
}
