"use client";

import { useUser , SignedIn, SignedOut, UserButton, SignInButton} from "@clerk/nextjs";
import Breadcrumbs from "./Breadcrumbs";



 function Header() {
    const {user} = useUser();

  return (
    <div className="flex space-x-1.5 items-center justify-between p-5">
        {user && (
            <h1>

                {user.firstName}
                {`s`} space
            </h1>
            


        ) }
        <Breadcrumbs/>
        <div>
        <SignedOut>
                <SignInButton/>
                

            </SignedOut>
            <SignedIn>
                <UserButton/>

            </SignedIn>
            
        </div>
    </div>
  )
}
export default Header ;
