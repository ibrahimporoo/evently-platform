import EventForm from "@/components/shared/EventForm";
import { auth } from "@clerk/nextjs";

const CreateEvent = () => {
	const { sessionClaims } = auth();
	const userId = sessionClaims?.userId as string;

	return (
		<>
			<section className="bg-primary-50">
				<div className="container">
					<div className="text-center py-8">
						<h2 className="text-xl font-bold lg:text-2xl">Create Event</h2>
					</div>
				</div>
			</section>

			<div className="container">
				<EventForm userId={userId} type="Create" />
			</div>
		</>
	)
}

export default CreateEvent
