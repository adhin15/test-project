import Link from "next/link";
import { generateImageUrl } from "../Helper/Helper";

const CastingList = (props: any) => {
  const { data } = props;

  return (
    <>
      <div
        className="mr-4 relative border rounded border-[#001d3d] box-shadow md:max-w-[150px] max-w-[120px] h-full transition-transform duration-100 transform hover:scale-105"
        style={{ overflowWrap: "break-word" }}
      >
        <Link href={`/person/${data?.id}`}>
          <div className="w-full min-w-[120px] md:min-w-[150px] md:min-h-[225px] min-h-[120px]">
            <img
              className="w-[99%] md:min-h-[225px] min-h-[120px] object-cover rounded object-position lazy-load-image"
              src={generateImageUrl(data?.profile_path)}
              alt=""
            />
          </div>
          <div className="relative" style={{ left: 0, bottom: "-19px" }}>
            <p className="text-[10px] py-4 px-3 absolute" style={{ left: -1, bottom: -1, zIndex: 1 }}>
              {/* {Math.round(data.vote_average * 10)}% */}
            </p>
          </div>
          <h2 className="mt-5 font-bold text-[14px] md:text-[16px] px-2">{data.name}</h2>
          <p className="font-normal opacity-50 text-[10px] md:text-[12px] p-2">{data.character}</p>
        </Link>
      </div>
    </>
  );
};

export default CastingList;
