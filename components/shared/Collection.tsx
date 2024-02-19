import { IEvent } from "@/lib/database/models/event.model"
import { formatDateTime } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

type CollectionProps = {
	data: IEvent[],
	emptyTitle: string,
	emptyStateSubtext: string,
	page: number | string,
	totalPages?: number,
	urlParamName?: string
	collectionType?: 'Event_Organized' | 'My_Tickets' | 'All_Events'
}

const Collection = ({
	data,
	emptyTitle,
	emptyStateSubtext,
	page,
	totalPages= 0,
	collectionType,
	urlParamName,
}: CollectionProps) => {
	return (
		<>
			{
				data.length > 0 ?
					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
						{ data.map(event => (
						<Link key={event._id} href={`/events/${event._id}`} className="block rounded-lg p-4 shadow-sm shadow-indigo-100">
							<img
								alt={event.title.replace(' ', '-')}
								src={event.imageUrl}
								className="h-56 w-full rounded-md object-cover"
							/>

							<div className="mt-2">
								<dl>
									<div>
										<dt className="sr-only">Price</dt>
										
										{
											event.isFree ? <dd className="text-sm text-gray-500">For Free</dd> :
											<dd className="text-sm text-gray-500">${event.price}</dd>
										}
										
									</div>

									<div>
										<dd className="font-bold line-clamp-1">{event.title}</dd>
									</div>
									<div>
										<div className="flex items-center gap-1">
											<Image
												src='/assets/icons/location-grey.svg'
												alt="location"
												width={24}
												height={24}
											/>

											<dd className="font-medium text-xs">{event.location}</dd>
										</div>
									</div>
									<div className="mt-3">
										<dd className="line-clamp-3">{event.description}</dd>
									</div>
								</dl>

								<div className="mt-6 flex flex-wrap items-center gap-8 sm:gap-4 text-xs">
									<div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
										<svg
											className="size-4 text-indigo-700"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
											/>
										</svg>

										<div className="mt-1.5 sm:mt-0">
											<p className="text-gray-500">From</p>

											<p className="font-medium">{ formatDateTime(event.startDateTime).dateOnly } - {' '}
											{ formatDateTime(event.startDateTime).timeOnly } </p>
										</div>
									</div>

									<div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
										<svg
											className="size-4 text-indigo-700"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
											/>
										</svg>

										<div className="mt-1.5 sm:mt-0">
											<p className="text-gray-500">To</p>

											<p className="font-medium">{ formatDateTime(event.endDateTime).dateOnly } - {' '}
											{ formatDateTime(event.endDateTime).timeOnly } </p>
										</div>
									</div>
								</div>
							</div>
						</Link>
						))
					}
					</div>
				: (
					<div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-20 text-center">
						<h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
						<p className="p-regular-14">{emptyStateSubtext}</p>
					</div>
				)
			}
		</>
	)
}

export default Collection
