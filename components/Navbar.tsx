import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <header className="w-full h-16 fixed flex justify-center bg-stone-800">
      <div className="flex px-4 py-2 justify-end w-full max-w-6xl">
        {session ? (
          <button
            className="w-32 py-3 text-white rounded-lg border-2 border-white hover:shadow hover:opacity-75 inline-flex space-x-2 items-center justify-center font-semibold"
            onClick={() => signOut()}
          >
            Log out
          </button>
        ) : (
          <Link href="/api/auth/signin">
            <a className="w-32 py-3 text-white bg-blue-700 hover:bg-blue-500 rounded-lg hover:shadow inline-flex space-x-2 items-center justify-center">
              Log in
            </a>
          </Link>
        )}
      </div>
    </header>
  );
}
