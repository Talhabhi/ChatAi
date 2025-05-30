"use client";

import React, { use } from "react";
import Document from "@/components/Document";

function DocumentPage({ params }: { params: { id: string } }) {
  // Unwrap the params using React.use()
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;

  return (
    <Document id={id} />
  );
}

export default DocumentPage;