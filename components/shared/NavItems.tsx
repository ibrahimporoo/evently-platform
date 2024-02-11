'use client';
import { NavLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItems = () => {
	const pathname = usePathname();
	return (
		<ul className="flex-1 w-full items-start px-3 flex-col gap-6 justify-center flex md:flex-row md:gap-5">
			{ NavLinks.map((link) => {
				const isActive = pathname === link.route;
				return (
					<li key={link.route} className={`font-semibold text-sm hover:text-primary-500 ${ isActive && 'text-primary-500' } `}>
						<Link href={link.route}>{link.label}</Link>
					</li>
				)
			}) }
		</ul>
	)
}

export default NavItems
