'use client';
import Image from "next/image";
import NavItems from "./NavItems"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

const MobileNav = () => {
	return (
		<nav className="md:hidden">
			<Sheet>
				<SheetTrigger>
					<Image src={'/assets/icons/menu.svg'} alt="menu-icon"
						width={18} height={12}
					/>
				</SheetTrigger>
				<SheetContent className="bg-white">
					<Image src={'/assets/images/logo.svg'}
					alt="logo" width={100} height={40} />
					<Separator className="my-4" />
					<NavItems />
				</SheetContent>
			</Sheet>
		</nav>
	)
}

export default MobileNav
