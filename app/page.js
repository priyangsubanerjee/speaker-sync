"use client";

import { Button, Slider, Switch } from "@nextui-org/react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="h-svh max-h-svh w-screen relative overflow-hidden">
      {/* <img src="https://wallpaperswide.com/download/light_background-wallpaper-3000x2000.jpg" className="h-full w-full opacity-40 absolute inset-0" alt="" /> */}
      <div className="absolute bg-neutral-100 inset-0 h-svh w-svh overflow-y-auto pt-20">
        <div className="w-[70%] h-fit pb-10 bg-white border rounded-[30px] shadow-neutral-200 mx-auto">
          <div className="flex items-center px-8 mt-6">
            <div className="w-fit flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 24 24">
                <g fill="currentColor">
                  <path d="M22.143 3.302c-.328-.547-.665-.921-.913-1.128a.75.75 0 0 0-.96 1.152c.127.106.353.357.587.747c.401.67.643 1.475.643 2.427s-.242 1.758-.643 2.427c-.234.39-.46.641-.587.747a.75.75 0 0 0 .96 1.152c.248-.207.585-.58.913-1.128C22.68 8.805 23 7.736 23 6.5s-.32-2.305-.857-3.198"></path>
                  <path d="M19.874 4.396a3.1 3.1 0 0 0-.674-.746a.75.75 0 0 0-.9 1.2c.062.046.19.175.326.379c.234.35.374.77.374 1.271s-.14.92-.374 1.271a1.7 1.7 0 0 1-.326.379l-.084.073A.75.75 0 0 0 19.2 9.35c.189-.141.435-.388.674-.746A3.73 3.73 0 0 0 20.5 6.5c0-.812-.235-1.517-.626-2.104M17 3.75a.75.75 0 0 0-1.314-.494L14.16 5h-1.41a.75.75 0 0 0-.75.75v1.5c0 .414.336.75.75.75h1.41l1.526 1.744A.75.75 0 0 0 17 9.25z"></path>
                  <path d="M4.25 4H12a1 1 0 0 0-1 1v.5H4.25a.75.75 0 0 0-.75.75v11.502c0 .414.336.75.75.75h15.499a.75.75 0 0 0 .75-.75v-5.77c.474.069.974-.057 1.371-.388q.063-.052.129-.112v6.27a2.25 2.25 0 0 1-2.25 2.25H4.25A2.25 2.25 0 0 1 2 17.752V6.25A2.25 2.25 0 0 1 4.25 4"></path>
                  <path d="M13.75 15.5a.75.75 0 0 1 .102 1.493L13.75 17h-3.5a.75.75 0 0 1-.102-1.493l.102-.007z"></path>
                </g>
              </svg>
              <h1 className="text-lg font-medium ml-2">SpeakerSync</h1>
            </div>
            <div className="h-1 mx-3 w-1 rounded-full bg-neutral-900"></div>
            <p className="text-sm text-neutral-600">Last updated 2 minutes ago</p>

            <ul className="flex items-center gap-6 ml-auto">
              <li className="text-sm text-neutral-500">About</li>
              <li className="text-sm text-neutral-500">Questions</li>
              <li className="text-sm text-neutral-500">Contact us</li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24">
                  <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
                    <path d="M16 22.027v-2.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7a5.44 5.44 0 0 0-1.5-3.75a5.07 5.07 0 0 0-.09-3.77s-1.18-.35-3.91 1.48a13.4 13.4 0 0 0-7 0c-2.73-1.83-3.91-1.48-3.91-1.48A5.07 5.07 0 0 0 5 5.797a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7a3.37 3.37 0 0 0-.94 2.58v2.87"></path>
                    <path d="M9 20.027c-3 .973-5.5 0-7-3"></path>
                  </g>
                </svg>
              </li>
            </ul>
          </div>

          <div className="px-8 mt-12">
            <p className="text-sm text-neutral-600">Choose input source and output source to sync your audio with the speaker.</p>
            <div className="grid grid-cols-2 gap-4 mt-5 w-[80%]">
              <div className="border rounded-lg">
                <div className="flex px-4 mt-3 w-fit gap-1 items-center text-sm text-neutral-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M12 14q-1.25 0-2.125-.875T9 11V5q0-1.25.875-2.125T12 2t2.125.875T15 5v6q0 1.25-.875 2.125T12 14m-1 7v-3.075q-2.6-.35-4.3-2.325T5 11h2q0 2.075 1.463 3.538T12 16t3.538-1.463T17 11h2q0 2.625-1.7 4.6T13 17.925V21z"
                    ></path>
                  </svg>
                  <span>Source</span>
                </div>
                <div className="pl-5 pr-2 mt-2 mb-3 flex items-center">
                  <select className="appearance-none w-full outline-none" name="" id="">
                    <option value="">Select source</option>
                    <option value="">Select source</option>
                    <option value="">Select source</option>
                    <option value="">Select source</option>
                  </select>
                  <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24">
                    <g fill="none" fillRule="evenodd">
                      <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                      <path fill="currentColor" d="M12.707 15.707a1 1 0 0 1-1.414 0L5.636 10.05A1 1 0 1 1 7.05 8.636l4.95 4.95l4.95-4.95a1 1 0 0 1 1.414 1.414z"></path>
                    </g>
                  </svg>
                </div>
              </div>
              <div className="border rounded-lg">
                <div className="flex px-4 mt-3 w-fit gap-1 items-center text-sm text-neutral-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M15 4.25v15.496c0 1.079-1.274 1.651-2.08.934l-4.492-3.994a.75.75 0 0 0-.498-.189H4.25A2.25 2.25 0 0 1 2 14.247V9.749A2.25 2.25 0 0 1 4.25 7.5h3.68a.75.75 0 0 0 .498-.19l4.491-3.993C13.726 2.6 15 3.172 15 4.25m3.992 1.648a.75.75 0 0 1 1.049.156A9.96 9.96 0 0 1 22 12.001a9.96 9.96 0 0 1-1.96 5.946a.75.75 0 0 1-1.205-.893a8.46 8.46 0 0 0 1.665-5.053a8.46 8.46 0 0 0-1.665-5.054a.75.75 0 0 1 .157-1.05M17.143 8.37a.75.75 0 0 1 1.017.302c.536.99.84 2.125.84 3.329a7 7 0 0 1-.84 3.328a.75.75 0 0 1-1.32-.714a5.5 5.5 0 0 0 .66-2.614c0-.948-.24-1.838-.66-2.615a.75.75 0 0 1 .303-1.016"
                    ></path>
                  </svg>
                  <span>Destination</span>
                </div>
                <div className="pl-5 pr-2 mt-2 mb-3 flex items-center">
                  <select className="appearance-none w-full outline-none" name="" id="">
                    <option value="">Select destination</option>
                    <option value="">Select source</option>
                    <option value="">Select source</option>
                    <option value="">Select source</option>
                  </select>
                  <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24">
                    <g fill="none" fillRule="evenodd">
                      <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                      <path fill="currentColor" d="M12.707 15.707a1 1 0 0 1-1.414 0L5.636 10.05A1 1 0 1 1 7.05 8.636l4.95 4.95l4.95-4.95a1 1 0 0 1 1.414 1.414z"></path>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="px-8 mt-12">
            <p className="font-medium text-neutral-600">Basic settings</p>
            <div className="grid grid-cols-2 mt-4">
              <div className="flex items-center">
                <p className="text-sm text-neutral-600">Input gain control:</p>
                <Slider size="sm" step={0.1} maxValue={5} minValue={0} aria-label="Temperature" defaultValue={1} className="max-w-[250px] ml-3" />
              </div>
              <div className="flex items-center">
                <p className="text-sm text-neutral-600">Output gain control:</p>
                <Slider size="sm" step={0.1} maxValue={5} minValue={0} aria-label="Temperature" defaultValue={1} className="max-w-[250px] ml-3" />
              </div>
            </div>
          </div>

          <div className="px-8 mt-12">
            <p className="font-medium text-neutral-600">Advanced settings</p>
            <div className="flex items-center mt-6">
              <p className="text-sm text-neutral-600">Sampling rate:</p>
              <div className="ml-5 flex items-center gap-4">
                <div className="flex items-center">
                  <input type="radio" name="" id="" className="h-4 w-4" />
                  <label htmlFor="" className="text-sm ml-2">
                    41.4 KHz
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="radio" name="" id="" className="h-4 w-4" />
                  <label htmlFor="" className="text-sm ml-2">
                    48 KHz
                  </label>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 mt-4">
              <div className="flex items-center gap-2">
                <p className="text-sm text-neutral-600">Echo cancellation:</p>
                <Switch size="small" className="scale-80" />
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-neutral-600">Noise suppression:</p>
                <Switch size="small" className="scale-80" />
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-neutral-600">Auto gain control:</p>
                <Switch size="small" className="scale-80" />
              </div>
            </div>

            <div className="flex items-center mt-4">
              <p className="text-sm text-neutral-600">Latency control:</p>
              <Slider size="sm" step={0.1} maxValue={10} minValue={0} aria-label="Temperature" defaultValue={0} className="max-w-[250px] ml-3" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
