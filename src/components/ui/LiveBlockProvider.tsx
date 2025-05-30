"use client";
import React from 'react'

import { LiveblocksProvider } from "@liveblocks/react/suspense";

function LiveBlockProvider({children} : { children :React.ReactNode}) {
    if (!process.env.NEXT_PUBLIC_LIVEBLOCK_KEY) {
        throw new Error ("public is not entered in env") 
        
    }
  return (
    <LiveblocksProvider throttle={16} authEndpoint={"/auth-endpoint"} >
      {children}
      
    </LiveblocksProvider>
  )
}

export default LiveBlockProvider