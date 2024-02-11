import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<>
    <section className="bg-primary-50 container">
      <div className="flex py-8 items-center flex-col gap-4 md:flex-row">
        <div className="pt-2 max-w-md">
          <h1 className="mb-6 text-4xl font-bold">
            Host, Connect, Celebrate: Your Events, Our Platform!
          </h1>
          <p className="mb-6 text-[16px]">
            Book and learn helpful tips from 3,168+ mentors in world-class
            companies with our global community.
          </p>
          <Button size="lg" asChild className="rounded-full w-full md:w-fit">
            <Link href="#events">Explore Now</Link>
          </Button>
        </div>
        <Image
          src={"/assets/images/hero.png"}
          alt="hero-img"
          width={1000}
          height={1000}
          className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
        />
      </div>
    </section>
    <section id="events" className="container">
      <div className="pt-6 max-w-md">
        <h2 className="mb-6 text-2xl font-bold">
          Trust by <br /> Thousands of Events
        </h2>
        <div className="mb-6 text-[16px]">
            Search Category Filter
        </div>
      </div>
    </section>
    </>
	);
}
