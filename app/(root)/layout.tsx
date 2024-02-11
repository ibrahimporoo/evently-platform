import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
		<main className="flex flex-col min-h-screen mx-auto">
			<Header />
			{ children }
			<Footer />
		</main>
  );
}
