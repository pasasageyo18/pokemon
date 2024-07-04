import Image from "next/image";
import Link from "next/link";
import React from "react";

function Navigation() {
  return (
    <div className="flex gap-4 px-16 py-8 bg-white">
      <Link href={"/"}>
        <Image
          alt="PokeAPI Logo"
          src="/pokeapi_logo.png"
          height={24}
          width={120}
        />
      </Link>
      <Link href={"/"} className="flex items-center px-8">
        List Pokemon
      </Link>
      <Link href={"/collection"} className="flex items-center px-8">
        My Pokemon
      </Link>
    </div>
  );
}

export default Navigation;
