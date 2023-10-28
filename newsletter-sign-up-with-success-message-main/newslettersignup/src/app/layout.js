import { Roboto } from "next/font/google";
import "./globals.css";
import "./css/grid.css";
import "./css/responsive.css";

const roboto = Roboto({ 
  subsets: ["latin"],
  weight: ["400", "700"]
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}