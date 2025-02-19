"use client";
import { Hero } from "@/components/landing-page/Hero";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { ModeToggle } from "@/components/ui/theme-toggle";
import {
  featuresData,
  howItWorksData,
  statsData,
  testimonialsData,
} from "@/data.js";
import { useAuthStore } from "@/store/authStore";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
interface Testimonial {
  name: string;
  image: string;
  role: string;
  quote: string;
}
export default function Home() {
  const loadUser = useAuthStore((state) => state.loadUser);

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <>
      <header className="pb-20 px-4 pt-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Taskify</h1>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Link href={"/login"}>
              {" "}
              <Button>Sign In</Button>{" "}
            </Link>
          </div>
        </div>
      </header>
      <Hero />
      {/* Stats */}
      <section className="py-20 bg-yellow-50 dark:bg-yellow-500">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {statsData.map(
              ({ value, label }: { value: string; label: string }) => (
                <div key={label} className="text-center ">
                  <h4 className="text-4xl font-bold text-yellow-600 mb-2">
                    {value}
                  </h4>
                  <p className="text-gray-600 text-lg">{label}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>
      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Everything you need to manage your finances
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresData.map(
              ({
                title,
                description,
                icon,
              }: {
                title: string;
                description: string;
                icon: React.ReactNode;
              }) => (
                <Card key={title} className="p-6">
                  <CardContent className="space-y-4 pt-4">
                    {icon}
                    <CardTitle className="text-xl font-semibold">
                      {title}
                    </CardTitle>
                    <CardDescription>{description}</CardDescription>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </div>
      </section>
      {/* How it works */}
      <section className="py-20 bg-yellow-50 dark:bg-yellow-500">
        <div className="container mx-auto px-4 ">
          <h2 className="text-3xl font-bold mb-12 text-center">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3  gap-8">
            {howItWorksData.map(
              ({
                title,
                description,
                icon,
              }: {
                title: string;
                description: string;
                icon: React.ReactNode;
              }) => (
                <div key={title} className="text-center">
                  <div className="size-16 bg-yellow-200 dark:bg-yellow-800 rounded-full flex items-center justify-center mx-auto mb-6">
                    {icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{title}</h3>
                  <p className="text-gray-600">{description}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            What our customers say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonialsData.map((testimonial: Testimonial) => (
              <Card key={testimonial.name} className="p-6">
                <CardContent>
                  <div className="flex items-center mb-4">
                    <Image
                      alt="Testimonial"
                      src={testimonial.image}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="ml-4 ">
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600">{testimonial.quote}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/*CTA */}
      <section className="py-20 bg-yellow-400">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-5xl font-bold mb-12 text-center">
            Ready to Take Control of Your Tasks?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-center">
            Join thousands of users who are already managing their tasks
            smarter with our app.
          </p>
          <Link
            href={"/dashboard"}
            className="flex justify-center items-center"
          >
            <Button
              size={"lg"}
              className="bg-white text-yellow-800 hover:bg-yellow-50 animate-bounce"
            >
              Start Free Trial
            </Button>
          </Link>
        </div>
      </section>
      <footer className="py-8 text-center text-gray-600">
        Made with ❤️ by{" "}
        <a
          href="https://github.com/TheMercury1229"
          target="_blank"
          rel="noreferrer"
          className="text-yellow-500"
        >
          Mercury
        </a>
      </footer>
    </>
  );
}
