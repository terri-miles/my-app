import NavBar from "@/components/navbar/navbar";
import "./globals.css";
import Footer from "@/components/footer/footer";
import { Roboto } from "next/font/google";
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: {
    default: "NurseLink",
    template: "%s | NurseLink",
  },
  description: "Your Trusted Platform for Professional Nurse Hiring",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <div className="container">
          <NavBar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
