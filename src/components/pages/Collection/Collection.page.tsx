"use client";

import { useParams } from "next/navigation";
import { Suspense } from "react";
import CollectionView from "./Collection";
import type { ReactElement } from "react";

const CollectionPage = (): ReactElement => {
  return (
    <Suspense fallback={null}>
      <CollectionInner />
    </Suspense>
  );
};

const CollectionInner = () => {
  const { id } = useParams();
  return <CollectionView id={String(Array.isArray(id) ? id[0] : id)} />;
};

export default CollectionPage;
