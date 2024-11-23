import DigitalMenu from "@/components/landingPage/DigitalMenu";
import PowerfulFeatures from "@/components/landingPage/PowerfulFeatures";
import Features from "@/components/features";
import FeaturesBlocks from "@/components/featuresBlocks";
import Hero from "@/components/landingPage/hero";
import Testimonials from "@/components/testimonial";
import Header from "@/components/ui/header";
import Image from "next/image";
import StartFreeTrial from "@/components/landingPage/StartFreeTrial";

export default function Home() {
  return (
    <>
    <Header/>
    <Hero/>
    {/* <Features/> */}
    <PowerfulFeatures/>
    <DigitalMenu/>
    {/* <StartFreeTrial/> */}
    {/* <FeaturesBlocks/>
    <Testimonials/> */}
    </>
  );
}
