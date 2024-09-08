"use client";

import { Accordion, AccordionItem, Button, Slider, Switch } from "@nextui-org/react";
import Image from "next/image";
import Console from "./components/Console";
import About from "./components/About";
import { useState } from "react";

export default function Home() {
  const [isAboutOpen, setIsAboutOpen] = useState(true);
  return (
    <main className="h-svh max-h-svh w-screen relative overflow-hidden">
      {/* <img src="https://wallpaperswide.com/download/light_background-wallpaper-3000x2000.jpg" className="h-full w-full opacity-40 absolute inset-0" alt="" /> */}
      <div className="absolute bg-neutral-100 inset-0 h-svh w-svh overflow-y-auto pt-2 md:pt-20">
        <div className="w-[97%] md:w-[950px] h-fit pb-10 bg-white border rounded-lg md:rounded-[30px] shadow-neutral-200 mx-auto relative overflow-hidden">
          <Console setIsAboutOpen={setIsAboutOpen} />
          {isAboutOpen && <About isAboutOpen={isAboutOpen} setIsAboutOpen={setIsAboutOpen} />}
        </div>
        <div className="h-10"></div>
      </div>
    </main>
  );
}
