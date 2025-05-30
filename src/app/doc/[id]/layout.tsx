// No 'use client' directive here
import RoomProvider from "@/components/ui/RoomProvider";

function DocLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  // We can access params.id directly in a Server Component
  return <RoomProvider roomId={params.id}>{children}</RoomProvider>;
}

export default DocLayout;