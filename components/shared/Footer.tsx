import Image from "next/image";
import Link from "next/link";

const Footer = () => {
	return (
		<footer className="p-4 border-t">
			<div className="flex flex-col items-center md:flex-row md:justify-between">
				<Link href='/'>
					<Image src={'/assets/images/logo.svg'} alt="brand"
						width={100} height={12}
					/>
				</Link>
				<p className="text-sm py-2">2024 Evently. All Rights reserved.</p>
			</div>
		</footer>
	)
}

export default Footer
