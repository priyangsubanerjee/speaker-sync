import { Button } from "@nextui-org/react";
import React from "react";

function LosslessAlert({ close }) {
  return (
    <div className="fixed inset-0 h-full w-full bg-black/50 flex items-center justify-center">
      <div className="h-fit py-6 md:py-8 w-[97%] md:w-[600px] bg-white rounded-xl">
        <div className="px-6 md:px-8">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 512 512">
              <path
                fill="currentColor"
                d="m110.763 110.763l-22.7-22.7c-.095.1-.193.186-.288.281a238.483 238.483 0 0 0-.7 336.573l22.7-22.7a206.144 206.144 0 0 1 .988-291.462Zm314.306-22.415c-.4-.4-.817-.793-1.223-1.194l-22.7 22.7a206.14 206.14 0 0 1 1.5 292.8l22.7 22.7a238.49 238.49 0 0 0-.281-337Z"
              ></path>
              <path
                fill="currentColor"
                d="M153.523 153.522a145.746 145.746 0 0 0-.989 205.944l22.617-22.617a113.8 113.8 0 0 1 .989-160.71Zm182.25 21.705a113.8 113.8 0 0 1 1.5 162.05L359.9 359.9a145.746 145.746 0 0 0-1.5-207.285Zm-41.007 41.007a55.914 55.914 0 1 0 17.658 40.759a55.78 55.78 0 0 0-17.658-40.759m-38.342 64.759a24 24 0 1 1 24-24a24 24 0 0 1-24 24"
              ></path>
            </svg>
            <h2 className="ml-3 font-semibold text-lg md:text-xl">Lossless Audio</h2>
          </div>
          <div className="mt-6">
            <p className="text-sm md:text-base leading-7 md:leading-8 text-neutral-700">
              Output device switching is not supported in lossless audio mode. Please disable lossless audio in <span className="font-medium text-black">Basic settings</span> to switch output devices.
            </p>
            <p className="text-sm leading-7 mt-5 text-neutral-500">
              Though you can change output deivce in your device settings. Please choose the OS you are using to learn how to change output device.
            </p>
          </div>
          <div className="mt-6">
            <ul className="flex flex-wrap gap-4 text-sm text-neutral-700">
              <li className="hover:text-black hover:underline">
                <a href="https://support.apple.com/en-lk/guide/mac-help/mchlp2256/mac#:~:text=On%20your%20Mac%2C%20choose%20Apple,list%20of%20sound%20output%20devices.">Mac OS</a>
              </li>
              <li className="hover:text-black hover:underline">
                <a href="https://support.switcherstudio.com/article/316-checking-or-changing-the-audio-output">iOS & iPad OS</a>
              </li>
              <li className="hover:text-black hover:underline">
                <a href="https://www.businessinsider.com/guides/tech/how-to-change-audio-output-on-android?IR=T">Android</a>
              </li>
              <li className="hover:text-black hover:underline">
                <a href="https://answers.microsoft.com/en-us/windows/forum/all/windows-11-audio-output-selection-from-taskbar/e643ec94-751a-48cb-b246-54943fde0847">Windows</a>
              </li>
            </ul>
          </div>
          <div className="mt-8">
            <Button onClick={close} className="text-white bg-neutral-800 float-end rounded-lg">
              I understand
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LosslessAlert;
