"use client";

import NewDocumentButton from "@/components/ui/NewDocumentButton";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUser } from "@clerk/nextjs";
import { MenuIcon } from "lucide-react";
import { collectionGroup, query, where } from "firebase/firestore";
import { db } from "../../../firebase";
import { useEffect, useState } from "react";
import SidebarOption from "./SidebarOption";

interface RoomDocument {
  id?: string;
  createdAt: string;
  role: "owner" | "editor";
  roomId: string;
  userId: string;
}

function Sidebar() {
  const { user } = useUser();
  const [groupedData, setGroupedData] = useState<{
    owner: RoomDocument[];
    editor: RoomDocument[];
  }>({
    owner: [],
    editor: [],
  });

  const [data, loading, error] = useCollection(
    user && query(
      collectionGroup(db, "rooms"),
      where("userId", "==", user.emailAddresses[0].emailAddress)
    )
  );

  useEffect(() => {
    if (!data) return;

    const grouped = data.docs.reduce<{
      owner: RoomDocument[];
      editor: RoomDocument[];
    }>(
      (acc, curr) => {
        const roomData = curr.data() as RoomDocument;
        if (roomData.role === 'owner') {
          acc.owner.push({ id: curr.id, ...roomData });
        } else {
          acc.editor.push({ id: curr.id, ...roomData });
        }
        return acc;
      },
      { owner: [], editor: [] }
    );
    
    setGroupedData(grouped);
  }, [data]);

  const menuOptions = (
    <>
      <NewDocumentButton />
      {groupedData.owner.length === 0 ? (
        <h2 className="text-gray-500 font-semibold text-sm">No documents found</h2>
      ) : (
        <>
          <h2 className="text-gray-500 font-semibold text-sm">My Documents</h2>
          {groupedData.owner.map((doc) => (
            
<SidebarOption key={doc.id} id={doc.id} href={`/doc/${doc.id}`} />
            // <p key={doc.roomId}>{doc.roomId}</p>
          ))}
        </>
      )}
    </>
  );

  return (
    <div className="p-5 md:p-5 bg-gray-300 relative">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <MenuIcon className="p-2 hover:opacity-30 rounded-lg" size={40} />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <div>{menuOptions}</div>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your account and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden md:inline">{menuOptions}</div>
    </div>
  );
}

export default Sidebar;
