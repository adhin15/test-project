import Link from "next/link";
import BackButton from "../BackButton";

const CastHeaderSkeleton = () => {
  return (
    <>
      <div className="w-[58px] h-[87px] bg-[#334155] animate-pulse rounded" />
      <div className="flex flex-col text-left	">
        <h3 className="text-2xl font-bold w-[100px] h-[24px] bg-[#334155] animate-pulse rounded"></h3>
        <BackButton />
      </div>
    </>
  );
};

export default CastHeaderSkeleton;
