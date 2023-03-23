import { Input } from "@/components/input";
import RequestAccess from "@/components/request-access";
import { Inter } from "next/font/google";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`${inter.className} max-w-sm xl:max-w-screen-xl m-auto pt-[140px]`}
    >
      <div className="flex flex-col items-center">
        <span className="font-semibold text-[10px] bg-[#F4F4F4] text-[#232323] px-4 border-[1px] border-black rounded-full w-fit">
          Currently in private beta
        </span>
        <h1 className="font-extrabold text-7xl text-[#232323] pt-10">
          Ruthlessly test
        </h1>
        <h1 className="font-extrabold text-7xl text-[#232323]">
          Scale beyond limits
        </h1>
        <h3 className="text-xl font-light w-[72ch] text-center pt-8">
          Complete suite for limit testing with ease of developer experience and
          performance at the core. Test ruthlessly and sacle beyond limits as
          you mitigate site downtime leading to bad UX.
        </h3>
        <div className="py-10 flex flex-col xl:flex-row w-full xl:space-x-2 max-w-xl items-center">
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
        <h2 className="pt-24 font-bold text-2xl text-[#232323]">
          Powered by great products.
        </h2>
        <h3 className="text-lg font-light w-[72ch] text-center pt-4">
          Built on top of great products. Utilising the power, speed and
          accessibility of great innovation to power testing efficiency at
          scale.
        </h3>
        <div className="flex justify-between w-full py-16">
          <Image src={"/clerk.png"} height={24} width={67} alt="clerk" />
          <Image src={"/grafana.png"} height={24} width={96} alt="grafana" />
          <Image src={"/vercel.png"} height={24} width={95} alt="vercel" />
          <Image src={"/vultr.png"} height={24} width={63} alt="vultr" />
          <Image src={"/stripe.png"} height={24} width={79} alt="stripe" />
        </div>
      </div>
    </main>
  );
}
