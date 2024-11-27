export const metadata = {
  title: "Rumo Ideal",
  description: "Page description",
};

import PageIllustration from "@/components/page-illustration";
import Hero from "@/components/hero-home";
import Workflows from "@/components/workflows";
import Cta from "@/components/cta";
import Header from "@/components/ui/header";

export default function Home() {
  return (
    <>
      <Header/>
      <PageIllustration />
      <Hero />
      <Workflows />
      <Cta />
    </>
  );
}
