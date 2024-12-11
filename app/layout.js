import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`font-['Inter'] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
