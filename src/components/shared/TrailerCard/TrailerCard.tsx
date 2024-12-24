const TrailerCard = (props: any) => {
  const { data, onMouseOver, onClick } = props;

  return (
    <div className="mr-4 relative max-w-[300px] transition-transform duration-100 transform hover:scale-105 peer">
      <div
        className="w-[300px] h-full hover-zoom"
        onMouseOver={onMouseOver}
        style={{ cursor: "pointer" }}
        onClick={onClick}
      >
        <img
          className="w-full h-full min-h-[168px] object-cover rounded object-position lazy-load-image"
          src={`https://www.themoviedb.org/t/p/original${data?.backdrop_path}`}
          alt=""
        />
        <div className="w-[300px] h-[168px] top-0 absolute flex justify-center items-center hover-zoom">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            className="bi bi-play-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z" />
          </svg>
        </div>
      </div>
      <h2 className="mt-5 font-bold text-center">{data.title || data.name}</h2>
    </div>
  );
};

export default TrailerCard;
