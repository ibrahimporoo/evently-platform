import { getEventById } from "@/lib/actions/event.actions"
import { formatDateTime } from "@/lib/utils";
import { SearchParamProps } from "@/types"
import Image from "next/image";
import Link from "next/link";
/*
{
  _id: '65d215a794e113a9bc3d7873',
  title: 'Next.js 14 - Modernes Webentwicklung mit React',
  description: 'Tauche ein in die Welt der modernen Webentwicklung mit unserem umfassenden Kurs zu Next.js 14. Next.js ist ein React-Framework, das die Entwicklung von reaktionsfähigen und performanten Webanwendungen erleichtert. In diesem Kurs lernst du alle wesentlichen Konzepte und Techniken, die für die Gestaltung fortschrittlicher Webanwendungen erforderlich sind.',
  location: 'Online',
  imageUrl: 'https://utfs.io/f/578fe24d-d3b5-47a4-b14e-d1558bb27d47-h5boet.png',
  startDateTime: '2024-02-23T14:30:00.000Z',
  endDateTime: '2024-02-23T16:00:00.000Z',
  price: '8.99',
  isFree: false,
  url: 'https://googlemeet.com',
  category: { _id: '65d1d40e8408226bb782758f', name: 'Course' },    
  organizer: {
    _id: '65c95e8f4c5d0a2a7b2653ad',
    firstName: 'Ibrahim',
    lastName: 'Abdo'
  },
  createdAt: '2024-02-18T14:35:19.152Z',
  __v: 0
}
https://meet.google.com/
*/
const EventDetails = async ({ params: { id }}: SearchParamProps) => {
	const event = await getEventById(id);

	return (
		<section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
			<div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
				<Image
					src={event.imageUrl}
					alt="hero image"
					width={1000}
					height={1000}
					className="h-full min-h-[300px] object-cover object-center"
				/>

				<div className="flex w-full flex-col gap-8 p-5 md:p-10">
					<div className="flex flex-col gap-6">
						<h2 className="h2-bold">{event.title}</h2>

						<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
							<div className="flex items-center gap-3 p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-70">

								<p className="">
									{ event.isFree? "FREE" : `$${event.price}` }
								</p>

								<p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
									{ event.category.name }
								</p>

								<p className="p-medium-18 ml-2 mt-2 sm:mt-0">
									by{' '}
									<span className="text-primary-500">{event.organizer.firstName} { event.organizer.lastName }</span>
								</p>

							</div>
						</div>
						{/* Checkout Button */}

						<div className="flex flex-col gap-5">
							<div className="flex gap-2 md:gap-3">
								<Image
									src="/assets/icons/calendar.svg"
									alt="calendar"
									width={32}
									height={24}
								/>
								<div className="p-medium-16 lg:p-regular-20">
									<p>
										{/* <span className="me-2 w-16 inline-block">From:</span> */}
										{ formatDateTime(event.startDateTime).dateOnly } - {' '}
										{ formatDateTime(event.startDateTime).timeOnly } 
									</p>
									<p>
										{/* <span className="me-2 w-16 inline-block">To:</span> */}
										{ formatDateTime(event.endDateTime).dateOnly } - {' '}
										{ formatDateTime(event.endDateTime).timeOnly } 
									</p>
								</div>
							</div>

							<div className="p-regular-20 flex items-center gap-3">
								<Image
									src="/assets/icons/location.svg"
									alt="location"
									width={32}
									height={32}
								/>
								<p className="p-medium-16 lg:p-regular-20">{ event.location }</p>
							</div>

							<div className="flex flex-col gap-2">
								<p className="p-bold-20 text-grey-600">What You'll Learn:</p>
								<p className="p-medium-16 lg:p-regular-18">
									{ event.description }
								</p>
								{/* <Link href={event.url} className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">
									{ event.url }
								</Link> */}
								<a href={event.url} target="_blank" className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">
									Follow
								</a>
							</div>

						</div>

					</div>
				</div>

			</div>
		</section>
	)
}

export default EventDetails
