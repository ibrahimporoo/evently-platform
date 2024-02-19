import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/actions/event.actions";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {

  const events = await getAllEvents({
    query: '',
    category: '',
    page: 1,
    limit: 6
  });

  console.log(events)

	return (
		<>
      <section className="bg-primary-50">
        <div className="container">
          <div className="flex py-8 items-center flex-col gap-4 md:flex-row">
            <div className="pt-2 max-w-xl">
              <h1 className="mb-6 text-4xl 2xl:text-5xl font-bold">
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
              className="max-h-[50vh] object-contain object-center 2xl:max-h-[60vh]"
            />
          </div>
        </div>
      </section>
      <section id="events" className="container">
        <div className="pt-6 max-w-md">
          <h2 className="mb-6 text-2xl font-bold">
            Trust by <br /> Thousands of Events
          </h2>
        </div>
        <div className="mb-6 text-[16px]">
            Search Category Filter

            <Collection
              data={events?.data}
              emptyTitle="No Events Found"
              emptyStateSubtext="Come back later"
              collectionType="All_Events"
              page={1}
              totalPages={3}
            />

        </div>
      </section>
    </>
	);
}
