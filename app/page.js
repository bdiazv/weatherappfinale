"use client";
import { useState } from "react"; 
import Link from "next/link";
import { useUserAuth } from "./auth-context"; 

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

 
  const handleSignIn = async () => {
    await gitHubSignIn();
  };

  const handleSignOut = async () => {
    await firebaseSignOut();
  };


  return (
    <div className="container mx-auto my-8 p-4">
      {user ? (
        <>
          <p>Dang, you use github? That is totally rad. I have decided you are cool enough to check out my application!</p>

          <Link href="/weather" passHref>
            <button className="btn">Go to Weather Page</button>
          </Link>

          <button
            onClick={handleSignOut}
            className="px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Sign Out
          </button>
        </>
      ) : (
        <>
          <p>Howdy there Partner! This is a cool programmers only zone. Please verify that you are a cool programmer by signing to your Github!</p>

          <button
            onClick={handleSignIn}
            className="px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign In with GitHub
          </button>
        </>
      )}
    </div>
  );
}
