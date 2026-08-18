import { Suspense } from "react";
import Search from "@/components/pages/Search";

const SearchPage = () => {
  return (
    <Suspense fallback={null}>
      <Search />
    </Suspense>
  );
};

export default SearchPage;
