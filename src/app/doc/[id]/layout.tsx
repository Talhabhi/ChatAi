// No 'use client' directive here
import RoomProvider from "@/components/ui/RoomProvider";

async function DocLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>; // Changed: params is now a Promise
}) {
  // Await the params to get the actual values
  const { id } = await params;
  
  return <RoomProvider roomId={id}>{children}</RoomProvider>;
}

export default DocLayout;