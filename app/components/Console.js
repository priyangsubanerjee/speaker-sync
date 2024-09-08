/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Button, Slider, Switch } from "@nextui-org/react";
import React, { useEffect } from "react";
import LosslessAlert from "./LosslessAlert";

function Console({ setIsAboutOpen }) {
  const [inputDevicesList, setInputDevicesList] = React.useState([]);
  const [outputDevicesList, setOutputDevicesList] = React.useState([]);
  const [selectedInputDevice, setSelectedInputDevice] = React.useState(null);
  const [selectedOutputDevice, setSelectedOutputDevice] = React.useState(null);
  const [stream, setStream] = React.useState(null);
  const [audioContext, setAudioContext] = React.useState(null);
  const [isStreaming, setIsStreaming] = React.useState(false);
  const [samplingRate, setSamplingRate] = React.useState(48000);
  const [losslessAlert, setLosslessAlert] = React.useState(false);

  const [constraints, setConstraints] = React.useState({
    audio: {
      deviceId: selectedInputDevice ? { exact: selectedInputDevice } : undefined,
      sampleRate: samplingRate,
      channelCount: 1,
      echoCancellation: false,
      noiseSuppression: false,
      autoGainControl: false,
    },
  });
  const [isLossless, setIsLossless] = React.useState(true);
  const [inputGain, setInputGain] = React.useState(1);
  const [outputGain, setOutputGain] = React.useState(1);
  const [latency, setLatency] = React.useState(0);

  const getInputDevices = async () => {
    await navigator.mediaDevices.getUserMedia({ audio: true });
    const devices = await navigator.mediaDevices.enumerateDevices();
    const audioInputDevices = devices.filter((device) => device.kind === "audioinput");
    setInputDevicesList(audioInputDevices);
    if (selectedInputDevice === null && audioInputDevices.length > 0) {
      setSelectedInputDevice(audioInputDevices[0].deviceId);
    }
  };

  const getOutputDevices = async () => {
    await navigator.mediaDevices.getUserMedia({ audio: true });
    const devices = await navigator.mediaDevices.enumerateDevices();
    const audioOutputDevices = devices.filter((device) => device.kind === "audiooutput");
    setOutputDevicesList(audioOutputDevices);

    if (isLossless) {
      if (audioOutputDevices.length > 0) {
        setSelectedOutputDevice(audioOutputDevices[audioOutputDevices.length - 1].deviceId);
      }
    }
  };

  const startStreaming = async () => {
    let stream_n = await navigator.mediaDevices.getUserMedia(constraints);
    let audioContext_n = new AudioContext({ sampleRate: samplingRate, latencyHint: latency });

    try {
      await audioContext_n.audioWorklet.addModule("/worklet.js");
      console.log("AudioWorklet module registered successfully.");
    } catch (error) {
      console.error("Failed to register AudioWorklet module:", error);
      return;
    }

    const gainNode = new AudioWorkletNode(audioContext_n, "gain-processor", {
      parameterData: { inputGain: inputGain, outputGain: outputGain },
    });

    gainNode.port.onmessage = (event) => {
      console.log("Message from AudioWorkletProcessor:", event.data);
    };

    const source = audioContext_n.createMediaStreamSource(stream_n);
    source.connect(gainNode);

    if (isLossless) {
      gainNode.connect(audioContext_n.destination);
    } else {
      const mediaStreamDestination = audioContext_n.createMediaStreamDestination();
      gainNode.connect(mediaStreamDestination);

      const audioElement = new Audio();
      audioElement.srcObject = mediaStreamDestination.stream;

      if (audioElement.setSinkId && selectedOutputDevice) {
        try {
          await audioElement.setSinkId(selectedOutputDevice);
          console.log(`Output device set to: ${selectedOutputDevice}`);
        } catch (error) {
          console.error(`Error setting output device: ${error}`);
        }
      } else {
        console.warn("setSinkId is not supported by this browser.");
      }

      audioElement.play();
    }

    console.log("Microphone audio processing started.");
    setStream(stream_n);
    setAudioContext(audioContext_n);

    if (audioContext_n.state === "suspended") {
      await audioContext_n.resume();
      console.log("Audio context resumed.");
    }

    stream_n.getTracks().forEach((track) => {
      track.onended = () => {
        console.warn("Microphone track ended.");
      };
    });
  };

  const resetSettings = () => {
    setInputGain(1);
    setOutputGain(1);
    setLatency(0);
    setSamplingRate(48000);
    setConstraints({
      audio: {
        deviceId: selectedInputDevice ? { exact: selectedInputDevice } : undefined,
        sampleRate: 48000,
        channelCount: 1,
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false,
      },
    });
  };

  React.useEffect(() => {
    getInputDevices();
    getOutputDevices();
  }, []);

  React.useEffect(() => {
    const handleDeviceChange = async () => {
      getInputDevices();
      getOutputDevices();
    };

    navigator.mediaDevices.addEventListener("devicechange", handleDeviceChange);

    return () => {
      navigator.mediaDevices.removeEventListener("devicechange", handleDeviceChange);
    };
  }, [inputDevicesList]);

  useEffect(() => {
    if (isStreaming) {
      startStreaming();
    } else {
      if (audioContext) {
        if (audioContext.state !== "closed") {
          audioContext.close();
          console.log("AudioContext closed.");
        } else {
          console.log("AudioContext is already closed.");
        }
      }
    }
  }, [isStreaming]);

  useEffect(() => {
    if (audioContext) {
      if (audioContext.state !== "closed") {
        audioContext.close();
        console.log("AudioContext closed.");
      } else {
        console.log("AudioContext is already closed.");
      }
    }
    setIsStreaming(false);

    setConstraints({
      audio: {
        ...constraints.audio,
        deviceId: selectedInputDevice ? { exact: selectedInputDevice } : undefined,
      },
    });
  }, [selectedInputDevice, selectedOutputDevice]);

  useEffect(() => {
    if (audioContext) {
      if (audioContext.state !== "closed") {
        audioContext.close();
        console.log("AudioContext closed.");
      } else {
        console.log("AudioContext is already closed.");
      }
    }
    setIsStreaming(false);

    if (isLossless) {
      if (outputDevicesList.length > 0) {
        setSelectedOutputDevice(outputDevicesList[outputDevicesList.length - 1].deviceId);
      }
    }
  }, [inputGain, outputGain, isLossless, latency, constraints]);

  return (
    <div>
      <div className="flex items-center px-4 md:px-8 mt-6">
        <div className="w-fit hidden md:flex items-center gap-1">
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
        <div className="w-fit flex md:hidden items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24">
            <g fill="currentColor">
              <path d="M22.143 3.302c-.328-.547-.665-.921-.913-1.128a.75.75 0 0 0-.96 1.152c.127.106.353.357.587.747c.401.67.643 1.475.643 2.427s-.242 1.758-.643 2.427c-.234.39-.46.641-.587.747a.75.75 0 0 0 .96 1.152c.248-.207.585-.58.913-1.128C22.68 8.805 23 7.736 23 6.5s-.32-2.305-.857-3.198"></path>
              <path d="M19.874 4.396a3.1 3.1 0 0 0-.674-.746a.75.75 0 0 0-.9 1.2c.062.046.19.175.326.379c.234.35.374.77.374 1.271s-.14.92-.374 1.271a1.7 1.7 0 0 1-.326.379l-.084.073A.75.75 0 0 0 19.2 9.35c.189-.141.435-.388.674-.746A3.73 3.73 0 0 0 20.5 6.5c0-.812-.235-1.517-.626-2.104M17 3.75a.75.75 0 0 0-1.314-.494L14.16 5h-1.41a.75.75 0 0 0-.75.75v1.5c0 .414.336.75.75.75h1.41l1.526 1.744A.75.75 0 0 0 17 9.25z"></path>
              <path d="M4.25 4H12a1 1 0 0 0-1 1v.5H4.25a.75.75 0 0 0-.75.75v11.502c0 .414.336.75.75.75h15.499a.75.75 0 0 0 .75-.75v-5.77c.474.069.974-.057 1.371-.388q.063-.052.129-.112v6.27a2.25 2.25 0 0 1-2.25 2.25H4.25A2.25 2.25 0 0 1 2 17.752V6.25A2.25 2.25 0 0 1 4.25 4"></path>
              <path d="M13.75 15.5a.75.75 0 0 1 .102 1.493L13.75 17h-3.5a.75.75 0 0 1-.102-1.493l.102-.007z"></path>
            </g>
          </svg>
          <h1 className="text-base font-medium ml-2">SpeakerSync</h1>
        </div>
        <div className="hidden md:flex items-center">
          <div className="h-1 mx-3 w-1 rounded-full bg-neutral-900"></div>
          <p className="text-xs text-neutral-600">Last updated Sept 2024</p>
        </div>
        <ul className="hidden md:flex items-center gap-6 ml-auto">
          <li onClick={() => setIsAboutOpen(true)} className="text-sm text-neutral-500 cursor-pointer hover:underline">
            About
          </li>
          <li className="text-sm text-neutral-500 cursor-pointer hover:underline">
            <a href="https://pages.razorpay.com/pl_OuaTr039U22ZDf/view">Support</a>
          </li>
          <li>
            <a href="https://github.com/priyangsubanerjee">
              <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
                  <path d="M16 22.027v-2.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7a5.44 5.44 0 0 0-1.5-3.75a5.07 5.07 0 0 0-.09-3.77s-1.18-.35-3.91 1.48a13.4 13.4 0 0 0-7 0c-2.73-1.83-3.91-1.48-3.91-1.48A5.07 5.07 0 0 0 5 5.797a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7a3.37 3.37 0 0 0-.94 2.58v2.87"></path>
                  <path d="M9 20.027c-3 .973-5.5 0-7-3"></path>
                </g>
              </svg>
            </a>
          </li>
        </ul>
        <Button isIconOnly className="md:hidden rounded-md bg-transparent border ml-auto">
          <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8.5h16m-16 7h16" color="currentColor"></path>
          </svg>
        </Button>
      </div>
      <div className="px-4 md:px-8 mt-8 md:mt-12">
        <p className="text-sm text-neutral-600 leading-7 md:leading-6">Choose input source and output source to sync your audio with the speaker.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 md:w-[90%]">
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
              <select value={selectedInputDevice} onChange={(e) => setSelectedInputDevice(e.target.value)} className="appearance-none bg-white w-full outline-none" name="" id="">
                {inputDevicesList.map((device) => {
                  return (
                    <option key={device.deviceId} value={device.deviceId}>
                      {device.label}
                    </option>
                  );
                })}
              </select>
              <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24">
                <g fill="none" fillRule="evenodd">
                  <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                  <path fill="currentColor" d="M12.707 15.707a1 1 0 0 1-1.414 0L5.636 10.05A1 1 0 1 1 7.05 8.636l4.95 4.95l4.95-4.95a1 1 0 0 1 1.414 1.414z"></path>
                </g>
              </svg>
            </div>
          </div>
          <div
            onClick={() => {
              if (isLossless) {
                setLosslessAlert(true);
              }
            }}
          >
            <div
              style={{
                opacity: isLossless ? 0.5 : 1,
                pointerEvents: isLossless ? "none" : "auto",
                cursor: isLossless ? "not-allowed" : "pointer",
                userSelect: isLossless ? "none" : "auto",
              }}
              className="border rounded-lg"
            >
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
                <select value={selectedOutputDevice} onChange={(e) => setSelectedOutputDevice(e.target.value)} className="appearance-none bg-white w-full outline-none" name="" id="">
                  {outputDevicesList.map((device) => {
                    return (
                      <option key={device.deviceId} value={device.deviceId}>
                        {device.label}
                      </option>
                    );
                  })}
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
      </div>
      <div className="px-8 mt-12">
        <p className="font-medium text-neutral-600">Basic settings</p>
        <div className="flex items-center gap-2 mt-5">
          <p className="text-sm text-neutral-600">Lossless audio:</p>
          <Switch
            isSelected={isLossless}
            onValueChange={(value) => {
              setIsLossless(value);
            }}
            size="small"
            className="scale-80"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mt-4 max-w-[90%]">
          <div className="flex items-center">
            <p className="text-sm text-neutral-600 whitespace-nowrap">Input gain control:</p>
            <Slider showTooltip size="sm" step={0.1} maxValue={5} minValue={0} aria-label="Temperature" defaultValue={1} value={inputGain} onChange={(value) => setInputGain(value)} className="ml-3" />
          </div>
          <div className="flex items-center">
            <p className="text-sm text-neutral-600 whitespace-nowrap">Output gain control:</p>
            <Slider
              size="sm"
              value={outputGain}
              onChange={(value) => setOutputGain(value)}
              showTooltip
              step={0.1}
              maxValue={5}
              minValue={0}
              aria-label="Temperature"
              defaultValue={1}
              className="ml-3"
            />
          </div>
        </div>
      </div>
      <div className="px-8 mt-12">
        <p className="font-medium text-neutral-600">Advanced settings</p>
        <div className="md:flex items-center mt-6">
          <p className="text-sm text-neutral-600">Sampling rate:</p>
          <div className="md:ml-5 mt-4 md:mt-0 flex items-center gap-4 flex-wrap">
            <div className="flex items-center cursor-pointer">
              <input onChange={(e) => setSamplingRate(41400)} type="radio" name="sample-rate" id="sample-rate-44" className="h-5 w-5" />
              <label htmlFor="sample-rate-44" className="text-sm ml-2 font-mono cursor-pointer">
                41.4 KHz
              </label>
            </div>
            <div className="flex items-center cursor-pointer">
              <input defaultChecked onChange={(e) => setSamplingRate(48000)} type="radio" name="sample-rate" id="sample-rate-48" className="h-5 w-5" />
              <label htmlFor="sample-rate-48" className="text-sm ml-2 font-mono cursor-pointer">
                48 KHz
              </label>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:gap-1 md:grid-cols-4 mt-4">
          <div className="flex items-center gap-2">
            <p className="text-sm text-neutral-600">Echo cancellation:</p>
            <Switch
              isSelected={constraints.audio.echoCancellation}
              onValueChange={(value) => {
                setConstraints({
                  audio: {
                    ...constraints.audio,
                    echoCancellation: value,
                  },
                });
              }}
              size="small"
              className="scale-80"
            />
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm text-neutral-600">Noise suppression:</p>
            <Switch
              isSelected={constraints.audio.noiseSuppression}
              onValueChange={(value) => {
                setConstraints({
                  audio: {
                    ...constraints.audio,
                    noiseSuppression: value,
                  },
                });
              }}
              size="small"
              className="scale-80"
            />
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm text-neutral-600">Auto gain control:</p>
            <Switch
              isSelected={constraints.audio.autoGainControl}
              onValueChange={(value) => {
                setConstraints({
                  audio: {
                    ...constraints.audio,
                    autoGainControl: value,
                  },
                });
              }}
              size="small"
              className="scale-80"
            />
          </div>
        </div>

        <div className="flex items-center mt-4">
          <p className="text-sm text-neutral-600 whitespace-nowrap">Latency control:</p>
          <Slider
            value={latency}
            onChange={(value) => setLatency(value)}
            showTooltip
            size="sm"
            step={0.1}
            maxValue={5}
            minValue={0}
            aria-label="Latency"
            defaultValue={0}
            className="md:max-w-[250px] ml-3"
          />
        </div>
      </div>
      <audio
        id="sample-audio"
        onEnded={() => {
          document.getElementById("sample-audio-btn").style.color = "#737373";
          document.getElementById("sample-audio").currentTime = 0;
        }}
        src="/notification.mov"
      ></audio>
      <div className="flex flex-wrap items-center mt-16 px-8 gap-12">
        <div className="flex items-center w-fit gap-2">
          <button onClick={resetSettings} className="text-sm text-neutral-500">
            Reset settings
          </button>
          <span className="text-neutral-400">|</span>
          <button
            id="sample-audio-btn"
            onClick={() => {
              document.getElementById("sample-audio").play();
              document.getElementById("sample-audio").volume = 0.8;
              document.getElementById("sample-audio-btn").style.color = "#2563eb";
            }}
            className="text-sm text-neutral-500"
          >
            Play test sound
          </button>
        </div>
        <div className="flex items-center ml-auto">
          <Button onClick={() => setIsStreaming(!isStreaming)} className="text-white bg-neutral-800 rounded-lg">
            <span className="text-sm">{isStreaming ? "Stop streaming" : "Start streaming"}</span>
            {isStreaming ? (
              <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 16 16">
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M5 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm5 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 256 256">
                <path
                  fill="currentColor"
                  d="M240 128a15.74 15.74 0 0 1-7.6 13.51L88.32 229.65a16 16 0 0 1-16.2.3A15.86 15.86 0 0 1 64 216.13V39.87a15.86 15.86 0 0 1 8.12-13.82a16 16 0 0 1 16.2.3l144.08 88.14A15.74 15.74 0 0 1 240 128"
                ></path>
              </svg>
            )}
          </Button>
        </div>
      </div>

      {losslessAlert && <LosslessAlert close={() => setLosslessAlert(false)} />}
    </div>
  );
}

export default Console;
