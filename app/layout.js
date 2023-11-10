import { Montserrat_Alternates } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";

const inter = Montserrat_Alternates({
  subsets: ["latin"],
  weight: "500",
  display: "swap",
});

export const metadata = {
  title: "URL Shortener",
  description: "convert the long url into short url",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <footer className="fixed-bottom text-center mb-2">
          Made with ❤️ by Nagarjuna |{" "}
          <Link href="https://github.com/nagarjuna06">Follow on GitHub</Link>
        </footer>
      </body>
    </html>
  );
}
