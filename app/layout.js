import { Montserrat_Alternates } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";

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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
