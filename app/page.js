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
        {/* <div className="w-[97%] md:w-[950px] mx-auto mt-20 pt-12">
          <h2 className="text-xl text-center font-semibold">Frequently Asked Questions</h2>
          <p className="text-center text-neutral-600 mt-2">Find answers to common questions about SpeakerSync.</p>
          <div className="max-w-2xl mx-auto">
            <Accordion selectionMode="multiple">
              <AccordionItem key="1" aria-label="Accordion 1" title={<h2>How do I change the audio output device?</h2>}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut dolores, distinctio ipsam voluptate fugit eos nemo illum consequuntur officiis id ducimus libero repellat dolor quam atque
                fuga, consectetur quia iusto!
              </AccordionItem>
              <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut dolores, distinctio ipsam voluptate fugit eos nemo illum consequuntur officiis id ducimus libero repellat dolor quam atque
                fuga, consectetur quia iusto!
              </AccordionItem>
              <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut dolores, distinctio ipsam voluptate fugit eos nemo illum consequuntur officiis id ducimus libero repellat dolor quam atque
                fuga, consectetur quia iusto!
              </AccordionItem>
            </Accordion>
          </div>
        </div> */}
      </div>
    </main>
  );
}
