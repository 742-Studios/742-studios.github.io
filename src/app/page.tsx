import type { Metadata } from "next";

import About from "@/components/home/about";
import Contact from "@/components/home/contact";
import Hero from "@/components/home/hero";
import PendingScroll from "@/components/home/pending-scroll";
import Projects from "@/components/home/projects";
import Services from "@/components/home/services";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  description: process.env.NEXT_PUBLIC_SITE_META_DESCRIPTION,
};

/**
 * Home page: the single-page studio site, one panel per section
 * @returns The home page
 */
const Home = () => {
  return (
    <main
      className="mx-auto flex max-w-360 flex-col gap-2 px-2 sm:gap-3 sm:px-4 lg:px-6"
      id="main"
    >
      <PendingScroll />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Contact />
    </main>
  );
};

Home.displayName = "Home";

export default Home;
