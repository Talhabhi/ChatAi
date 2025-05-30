"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { createNewDocument } from "../../../actions/actions";

function NewDocumentButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleCreateButton = () => {
    startTransition(async () => {
      const { docId } = await createNewDocument();
      router.push(`/documents/${docId}`);
    });
  };
  return (
    <Button onClick={handleCreateButton} disabled={isPending}>
      {isPending ? "createing...." : "new document"}
    </Button>
  );
}
export default NewDocumentButton;
