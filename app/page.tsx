import { Input } from "@/components/input";
import RequestAccess from "@/components/request-access";
import { Inter, Linden_Hill } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`${inter.className} max-w-sm md:max-w-screen-md xl:max-w-screen-xl m-auto pt-[140px]`}
    >
      <div className="flex flex-col items-center">
        <span className="font-semibold text-[10px] bg-[#F4F4F4] text-[#232323] px-4 border-[1px] border-black rounded-full w-fit">
          Currently in private beta
        </span>
        <h1 className="font-extrabold text-3xl md:text-5xl xl:text-7xl text-[#232323] pt-6 md:pt-10">
          Ruthlessly test
        </h1>
        <h1 className="font-extrabold text-3xl md:text-5xl xl:text-7xl text-[#232323]">
          Scale beyond limits
        </h1>
        <h3 className="text-xs md:text-md xl:text-xl font-light w-[36ch] md:w-[72ch] text-center pt-8">
          Complete suite for limit testing with ease of developer experience and
          performance at the core. Test ruthlessly and sacle beyond limits as
          you mitigate site downtime leading to bad UX.
        </h3>
        <div className="py-10 flex flex-col md:flex-row w-full space-y-2 md:space-x-2 max-w-xl items-center">
          <Input
            type="email"
            className="bg-[#F8F8F8] h-[32px] px-4 rounded-md xl:w-2/3 w-full"
            placeholder="email address"
          />
          <RequestAccess />
        </div>
        <Image
          loading="eager"
          className="drop-shadow-[0_35px_35px_rgba(0,0,0,0.12)] rounded-2xl"
          src={"/hero.png"}
          height={730}
          width={1280}
          alt="hero-image"
        />
        <h2 className="pt-12 md:pt-24 font-bold text-lg md:text-2xl text-[#232323]">
          Powered by great products.
        </h2>
        <h3 className="text-xs md:text-md xl:text-xl font-light w-[32ch] md:w-[72ch] text-center pt-4">
          Built on top of great products. Utilising the power, speed and
          accessibility of great innovation to power testing efficiency at
          scale.
        </h3>
        <div className="hidden md:flex justify-between w-full py-16">
          <Image src={"/clerk.png"} height={24} width={67} alt="clerk" />
          <Image src={"/grafana.png"} height={24} width={96} alt="grafana" />
          <Image src={"/vercel.png"} height={24} width={95} alt="vercel" />
          <Image src={"/vultr.png"} height={24} width={63} alt="vultr" />
          <Image src={"/stripe.png"} height={24} width={79} alt="stripe" />
        </div>
        <div className="flex md:hidden py-8 underline">
          <Link href="/privacy-policy">Products we use</Link>
        </div>
      </div>
    </main>
  );
}
