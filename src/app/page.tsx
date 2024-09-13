"use client"

import { useCar } from "@/hooks/useCars";
import Link from "next/link";


export default function Home() {
  const {data}=useCar()
 
  return (
    <div className="h-screen flex justify-center items-center">
      <Link href='/cars'>GO TO CARS</Link>
    </div>
  );
}
