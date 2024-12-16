// app/components/Navigation.js
import Link from "next/link";

export default function Navigation() {
  return (
    <header>
      <img src="/logo.png" className="logo"></img>
      <nav>
        <ul>
          <li>
            <Link href="/">Strona główna</Link>
          </li>
          <li>
            <Link href="/pokemon?limit=20">Pokemony</Link>
          </li>
          <li>
            <Link href="/favorites">Ulubione</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
