"use client";

import { Button, Slider, Switch } from "@nextui-org/react";
import Image from "next/image";
import Console from "./components/Console";

export default function Home() {
  return (
    <main className="h-svh max-h-svh w-screen relative overflow-hidden">
      {/* <img src="https://wallpaperswide.com/download/light_background-wallpaper-3000x2000.jpg" className="h-full w-full opacity-40 absolute inset-0" alt="" /> */}
      <div className="absolute bg-neutral-100 inset-0 h-svh w-svh overflow-y-auto pt-20">
        <div className="w-[950px] h-fit pb-10 bg-white border rounded-[30px] shadow-neutral-200 mx-auto">
          <Console />
        </div>
      </div>
    </main>
  );
}
