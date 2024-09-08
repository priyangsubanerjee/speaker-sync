/* eslint-disable @next/next/no-img-element */
import { Button } from "@nextui-org/react";
import React from "react";

function About({ isAboutOpen, setIsAboutOpen }) {
  return (
    <div className="absolute inset-0 h-full w-full bg-white">
      <div className="relative">
        <img className="h-32 md:h-52 object-cover w-full" src="https://www.transparentpng.com/download/pattern/p3NBVZ-data-security-and-privacy-software-services-safe-data.png" alt="" />
        <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-transparent to-white"></div>
      </div>
      <div className="px-4 md:px-8">
        <div className="flex justify-center items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width={58} height={58} viewBox="0 0 24 24">
            <g fill="currentColor">
              <path d="M22.143 3.302c-.328-.547-.665-.921-.913-1.128a.75.75 0 0 0-.96 1.152c.127.106.353.357.587.747c.401.67.643 1.475.643 2.427s-.242 1.758-.643 2.427c-.234.39-.46.641-.587.747a.75.75 0 0 0 .96 1.152c.248-.207.585-.58.913-1.128C22.68 8.805 23 7.736 23 6.5s-.32-2.305-.857-3.198"></path>
              <path d="M19.874 4.396a3.1 3.1 0 0 0-.674-.746a.75.75 0 0 0-.9 1.2c.062.046.19.175.326.379c.234.35.374.77.374 1.271s-.14.92-.374 1.271a1.7 1.7 0 0 1-.326.379l-.084.073A.75.75 0 0 0 19.2 9.35c.189-.141.435-.388.674-.746A3.73 3.73 0 0 0 20.5 6.5c0-.812-.235-1.517-.626-2.104M17 3.75a.75.75 0 0 0-1.314-.494L14.16 5h-1.41a.75.75 0 0 0-.75.75v1.5c0 .414.336.75.75.75h1.41l1.526 1.744A.75.75 0 0 0 17 9.25z"></path>
              <path d="M4.25 4H12a1 1 0 0 0-1 1v.5H4.25a.75.75 0 0 0-.75.75v11.502c0 .414.336.75.75.75h15.499a.75.75 0 0 0 .75-.75v-5.77c.474.069.974-.057 1.371-.388q.063-.052.129-.112v6.27a2.25 2.25 0 0 1-2.25 2.25H4.25A2.25 2.25 0 0 1 2 17.752V6.25A2.25 2.25 0 0 1 4.25 4"></path>
              <path d="M13.75 15.5a.75.75 0 0 1 .102 1.493L13.75 17h-3.5a.75.75 0 0 1-.102-1.493l.102-.007z"></path>
            </g>
          </svg>
          <h1 className="text-2xl font-medium ml-2">SpeakerSync</h1>
        </div>
        <div className="flex flex-wrap items-center justify-center text-sm gap-4 text-neutral-600 mt-4">
          <span>Audio hub</span>
          <span>•</span>
          <span>September 2024</span>
          <span>•</span>
          <span>Real time audio</span>
        </div>
        <p className="text-sm md:text-base leading-7 text-pretty md:leading-9 text-justify md:text-center mt-7">
          SpeakerSync is a powerful web-based application designed to turn your computer into a versatile audio hub or amplifier. Whether you&apos;re using Bluetooth headphones as a microphone or
          managing multiple audio devices, SpeakerSync provides seamless real-time audio routing with advanced control features.
        </p>
        <div className="flex items-center justify-center mt-10 gap-4">
          <div>
            <a href="https://priyangsu.dev/message">
              <Button className="text-neutral-800 bg-neutral-100 text-base rounded-lg">Contact us</Button>
            </a>
          </div>
          <div>
            <Button onClick={() => setIsAboutOpen(!isAboutOpen)} className="text-white bg-neutral-800 text-base rounded-lg">
              Get started
            </Button>
          </div>
        </div>
        <div className="flex justify-center mt-20">
          <p className="text-sm text-neutral-600">
            Developed by{" "}
            <a className="hover:underline" href="https://priyangsu.dev">
              Priyangsu Banerjee
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
