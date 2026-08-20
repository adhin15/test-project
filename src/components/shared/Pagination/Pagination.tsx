type PaginationProps = {
  totalPages?: number;
  currentPage: number;
  setPage: (page: number) => void;
};

const Pagination = ({ totalPages = 0, currentPage, setPage }: PaginationProps) => {
  return (
    <div>
      {[...Array(totalPages)].map((_, i) => {
        return (
          <span
            className={`px-2 cursor-pointer hover:opacity-75 ${currentPage == i + 1 ? "bg-[#012459]" : ""}`}
            onClick={() => {
              setPage(i + 1);
            }}
            key={i}
          >
            {i + 1}
          </span>
        );
      })}
    </div>
  );
};

export default Pagination;
