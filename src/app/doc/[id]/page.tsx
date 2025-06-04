// "use client";

// import React, { use } from "react";
// import Document from "@/components/Document";

// function DocumentPage({ params }: { params: { id: string } }) {
//   // Unwrap the params using React.use()
//   const unwrappedParams = use(params);
//   const id = unwrappedParams.id;

//   return (
//     <Document id={id} />
//   );
// }

// export default DocumentPage;
"use client";

import React, { use } from "react";
import Document from "@/components/Document";

function DocumentPage({ params }: { params: Promise<{ id: string }> }) {
  // Use React.use() to unwrap the Promise
  const { id } = use(params);

  return (
    <Document id={id} />
  );
}

export default DocumentPage;