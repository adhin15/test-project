import Link from "next/link";
import type { PersonCreditCast } from "@/types";

const ExpMapping = ({ header, data }: { header: string; data?: PersonCreditCast[] }) => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">{header}</h3>
      <div className="border rounded border-[#001d3d] box-shadow ">
        {data?.map((val, index) => {
          const year = val?.release_date?.slice(0, 4) || val?.first_air_date?.slice(0, 4);
          const nextYear = data[index + 1]?.release_date?.slice(0, 4) || data[index + 1]?.first_air_date?.slice(0, 4);
          const isNewYear = year !== nextYear;
          return (
            <Link href={`/${val?.media_type === "tv" ? "tv-series" : "movie"}/${val?.id}`} key={index}>
              <div
                className={`flex gap-[8px] p-4 ${
                  isNewYear ? (data[index + 1] ? "border-b border-b-[#fff]" : "border-tranparent") : ""
                }`}
                data-aos="fade-up"
              >
                <div className="max-w-[100px] w-full flex items-center">
                  <div className="w-full text-center	">
                    {year || (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-dash-lg m-auto"
                        viewBox="0 0 16 16"
                      >
                        <path fillRule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8" />
                      </svg>
                    )}
                  </div>
                </div>
                <div>
                  <p className="font-bold">{val.original_name || val.title}</p>
                  <p className="pl-4">
                    <span className="opacity-50	">as </span>
                    {val.character}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ExpMapping;
