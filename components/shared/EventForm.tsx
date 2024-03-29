"use client";

/*
{
    "title": "Title One",
    "description": "Description One",
    "location": "Online",
    "imageUrl": "blob:http://localhost:3000/b33cf213-5958-4282-85cf-94d21b8a82cf",
    "startDateTime": "2024-02-18T10:00:00.000Z",
    "endDateTime": "2024-02-18T12:30:00.000Z",
    "categoryId": "65d1c81b8408226bb7827583",
    "price": "100",
    "isFree": true,
    "url": "https://googlemeet.com"
}
*/

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EventFormSchema } from "@/lib/validator";
import * as z from "zod";
import { eventDefaultValues } from "@/constants";
import Dropdown from "./Dropdown";
import { Textarea } from "../ui/textarea";
import { FileUploader } from "./FileUploader";
import { useState } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "../ui/checkbox";
import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { createEvent } from "@/lib/actions/event.actions";

type EventFormProps = {
	userId: string;
	type: "Create" | "Update";
};

const EventForm = ({ userId, type }: EventFormProps) => {
	const [files, setFiles] = useState<File[]>([]);
	const initialValues = eventDefaultValues;
	const { startUpload } = useUploadThing('imageUploader');
	const router = useRouter()

	const form = useForm<z.infer<typeof EventFormSchema>>({
		resolver: zodResolver(EventFormSchema),
		defaultValues: initialValues,
	});

	async function onSubmit(values: z.infer<typeof EventFormSchema>) {
		// console.log(values);

		let uploadedImageUrl = values.imageUrl;

		if(files.length > 0) {
			const uploadedImages = await startUpload(files)

			if(!uploadedImages) {
				return
			}

			uploadedImageUrl = uploadedImages[0].url
		}

		if(type === 'Create') {
			try {
				const newEvent = await createEvent({
					event: { ...values, imageUrl: uploadedImageUrl },
					userId,
					path: '/profile'
				})
				if(newEvent) {
					form.reset();
					router.push(`/events/${newEvent._id}`)
				}
			} catch(error) {
				console.log(error);
			}
		}


	}

	console.log("USER ID:", userId)

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-5 py-8"
			>
				<div className="flex flex-col gap-5 md:flex-row">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<Input
										placeholder="Event title"
										{...field}
										className="input-field"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="categoryId"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<Dropdown
										onChangeHandler={field.onChange}
										value={field.value}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="flex flex-col gap-5 md:flex-row">
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<Textarea
										{...field}
										placeholder="Description"
										className="textarea h-72"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="imageUrl"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<FileUploader
										onFileChange={field.onChange}
										imageUrl={field.value}
										setFiles={setFiles}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="flex flex-col gap-3 md:flex-row">
					<FormField
						control={form.control}
						name="location"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50">
										<Image
											src="/assets/icons/location-grey.svg"
											alt="calender"
											width={24}
											height={24}
										/>
										<Input
											placeholder="Event Location Or Online"
											{...field}
											className="input-field"
										/>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="flex flex-col gap-3 md:flex-row">
					<FormField
						control={form.control}
						name="startDateTime"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50">
										<Image
											src="/assets/icons/calendar.svg"
											alt="calender"
											width={24}
											height={24}
											className="filter-grey"
										/>
										<p className="ml-3 min-w-[84px] whitespace-nowrap text-grey-500">
											Start Date:
										</p>
										<DatePicker
											selected={field.value}
											onChange={(date: Date) => field.onChange(date)}
											showTimeSelect
											timeInputLabel="Time:"
											dateFormat="dd/MM/yyyy h:mm aa"
											wrapperClassName="datePicker"
										/>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="endDateTime"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50">
										<Image
											src="/assets/icons/calendar.svg"
											alt="calender"
											width={24}
											height={24}
											className="filter-grey"
										/>
										<p className="ml-3 min-w-[84px] whitespace-nowrap text-grey-500">
											End Date:
										</p>
										<DatePicker
											selected={field.value}
											onChange={(date: Date) => field.onChange(date)}
											showTimeSelect
											timeInputLabel="Time:"
											dateFormat="dd/MM/yyyy h:mm aa"
											wrapperClassName="datePicker"
										/>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="flex flex-col gap-5 md:flex-row">
					<FormField
						control={form.control}
						name="price"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50">
										<Image
											src="/assets/icons/dollar.svg"
											alt="dollar"
											width={24}
											height={24}
											className="filter-grey"
										/>
										<Input
											type="number"
											placeholder="Price"
											{...field}
											className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
										/>
										<FormField
											control={form.control}
											name="isFree"
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<div className="flex-center">
															<label
																htmlFor="isFree"
																className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
															>
																Free Ticket
															</label>
															<Checkbox
																onCheckedChange={field.onChange}
																checked={field.value}
																id="isFree"
																className="mr-2 h-5 w-5 border-2 border-primary-500"
															/>
														</div>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div>
					<FormField
						control={form.control}
						name="url"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50">
										<Image
											src="/assets/icons/link.svg"
											alt="link"
											width={24}
											height={24}
											className="filter-grey"
										/>
										<Input
											type="string"
											placeholder="URL"
											{...field}
											className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
										/>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button
					type="submit"
					size="lg"
					className="button col-span-2 w-full"
					disabled={form.formState.isSubmitting}
				>
					{form.formState.isSubmitting ? "...Submitting" : `${type} Event`}
				</Button>
			</form>
		</Form>
	);
};

export default EventForm;
