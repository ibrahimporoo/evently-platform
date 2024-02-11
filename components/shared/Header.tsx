import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
import MainNav from "./MainNav";
import MobileNav from "./MobileNav";

const Header = () => {
	return (
		<header className="container shadow-sm border-b">
			<div className="flex items-center justify-between h-16">
				<div className="flex items-center">
					<Link href="/" className="flex items-center pe-2">
						<Image
							src="/assets/images/logo.svg"
							alt="logo"
							width={100}
							height={20}
						/>
					</Link>
				</div>
				<MainNav />
				<div className="ps-2">
					<SignedIn>
						<div className="flex items-center gap-2">
							<UserButton afterSignOutUrl="/" />
							<MobileNav />
						</div>
					</SignedIn>
					<SignedOut>
						<Button asChild className="rounded-full" size="lg">
							<Link href="/sign-in" className="w-full">
								Login
							</Link>
						</Button>
					</SignedOut>
				</div>
			</div>
		</header>
	);
};

export default Header;
