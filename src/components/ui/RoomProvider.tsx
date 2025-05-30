'use client';

import React from "react";
import { ClientSideSuspense, RoomProvider as RoomProviderWrapper } from "@liveblocks/react/suspense";
import LoadingSpinner from "./LoadingSpinner";
import LiverCursorProvider from "./LiverCursorProvider";

function RoomProvider({
  roomId,
  children
}: {
  children: React.ReactNode;
  roomId: string;
}) {
  return (
    <RoomProviderWrapper 
      id={roomId} 
      initialPresence={{
        cursor: null,
      }}
    > 
      <ClientSideSuspense fallback={<LoadingSpinner />}>
        {() => (
          <LiverCursorProvider>
            {children}
          </LiverCursorProvider>
        )}
      </ClientSideSuspense>
    </RoomProviderWrapper>
  );
}

export default RoomProvider;