"use client";

import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "../../../firebase";
import { usePathname } from "next/navigation";
import Link from "next/link";


 function SidebarOption({ href, id }: { href: string; id: string })

  {
    const [data , loading , error] = useDocumentData(doc(db , "documents" , id));
    const pathName = usePathname ();
    const isActive = href.includes(pathName) && pathName !=="/";
    if (!data) return null ; 





    return (
      <Link
        href={href}
        className={`flex items-center px-4 py-2 rounded-md text-sm font-medium truncate border ${
          isActive
            ? "bg-blue-600 text-white border-blue-600"
            : "bg-white text-gray-700 border-gray-300"
        }`}
      >
        <p className="truncate">{data.title}</p>
      </Link>
    );
}
export default SidebarOption
