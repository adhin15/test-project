import react from "react";

const TrailerCardSkeleton = () => {
  return (
    <>
      <div className="w-[300px] h-[225px] mr-4 box-shadow">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded bg-slate-700 w-[300px] h-[225px]"></div>
        </div>
      </div>
    </>
  );
};

export default TrailerCardSkeleton;
