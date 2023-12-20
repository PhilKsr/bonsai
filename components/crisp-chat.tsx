"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export default function CrispChat() {
  useEffect(() => {
    Crisp.configure("211f8a86-000f-4f06-95a2-e6ccc04af8b2");
  }, []);

  return null;
}
