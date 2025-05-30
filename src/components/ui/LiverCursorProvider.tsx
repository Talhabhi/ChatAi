
"use client";
import React from "react";
import { useMyPresence } from "@liveblocks/react";
import { useOthers } from "@liveblocks/react/suspense";
import FollowPointer from "./FollowPointer";

function LiverCursorProvider({ children }: { children: React.ReactNode }) {
  const [myPresence, updateMyPresense] = useMyPresence();
  const others = useOthers();

  // Handle mouse movement
  function handlePointerMove(e:React.PointerEvent<HTMLDivElement>) {
    const cursor = { x: Math.floor(e.pageX), y: Math.floor(e.pageY) };
    updateMyPresense({ cursor });
  }

  // Handle mouse leaving the element
  function handlePointerLeave() {
    updateMyPresense({ cursor: null });
  }

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {others.filter((other)=>  other.presence.cursor !==null ).map(({connectionId ,presence , info})=> (
        <FollowPointer 
        key = {connectionId}
        info ={info}
        x = {presence.cursor!.x}
        y = {presence.cursor!.y}
        
        />

      ))  }
      {children}
    </div>
  );
}

export default LiverCursorProvider;
