import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SpeakerSync | Audio hub anytime, anywhere",
  description:
    "Ever felt the lack of a microphone in a family gathering or a crowded celebration? SpeakerSync turns your Bluetooth, RF, or wired earphones into wireless microphones, ensuring that everyone’s voice is heard. Perfect for virtual or in-person events, SpeakerSync provides real-time audio routing through your computer’s speakers or connected output devices. Whether it's a family reunion, birthday toast, or group celebration, SpeakerSync’s echo cancellation, noise suppression, and gain controls guarantee crystal-clear sound for everyone to enjoy, no matter the size of the crowd.",
  openGraph: {
    title: "SpeakerSync | Audio hub anytime, anywhere",
    description:
      "Ever felt the lack of a microphone in a family gathering or a crowded celebration? SpeakerSync turns your Bluetooth, RF, or wired earphones into wireless microphones, ensuring that everyone’s voice is heard. Perfect for virtual or in-person events, SpeakerSync provides real-time audio routing through your computer’s speakers or connected output devices. Whether it's a family reunion, birthday toast, or group celebration, SpeakerSync’s echo cancellation, noise suppression, and gain controls guarantee crystal-clear sound for everyone to enjoy, no matter the size of the crowd.",

    type: "website",
    authors: ["Priyangsu Banerjee"],
    images: [
      {
        url: "https://speakersync.priyangsu.dev/og-image.png",
        width: 800,
        height: 600,
      },
      {
        url: "https://speakersync.priyangsu.dev/og-image.png",
        width: 1800,
        height: 1600,
      },
    ],
    url: "https://speakersync.priyangsu.dev/",
  },

  alternates: {
    canonical: "https://speakersync.priyangsu.dev/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
