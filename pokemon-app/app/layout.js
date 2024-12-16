import "./globals.css";
import Navigation from "./components/Navigation";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Pokemons</title>
      </head>
      <body>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
