import { Container } from "@/components/container";
import { Hero } from "@/components/hero";
import { Background } from "@/components/background";
import { Features } from "@/components/features";
import { Companies } from "@/components/companies";
import { GridFeatures } from "@/components/grid-features";
import { Testimonials } from "@/components/testimonials";
import { CTA } from "@/components/cta";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative">
      <div className="absolute inset-0 h-full w-full overflow-hidden ">
        <Background />
      </div>
      <Container className="flex min-h-screen flex-col items-center justify-between ">
        <Hero />
        <Companies />
        <Features />
        <GridFeatures />
        <Testimonials />
      </Container>
      <div className="relative">
        <div className="absolute inset-0 h-full w-full overflow-hidden">
          <Background />
        </div>
        <CTA />
      </div>
      <div className="flex flex-col items-center justify-center min-h-[70vh] py-24 md:pt-0">
        <h1 className="font-heading text-center text-5xl md:text-6xl lg:text-7xl">
          A Logistics CRM
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
            that works for you
          </span>
        </h1>
        <p className="mt-4 max-w-3xl text-center text-xl text-muted-foreground">
          Streamlined warehouse management. Fast. Efficient. Reliable.
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            href="/signup"
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Get Started
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            View Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
