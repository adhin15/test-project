const ModalPlayer = (props: any) => {
  const { modalOpened, closeModal, youtubeId } = props;

  return (
    <div
      className="w-[100vw] h-[100vh] fixed top-0 transition-ease-in"
      onClick={closeModal}
      style={!modalOpened ? { opacity: 0, zIndex: 0, height: 0 } : { opacity: 1, zIndex: 99 }}
    >
      <div
        className={`fixed top-0 flex justify-center items-center transition-ease-in bg-[#fff] w-[90vw] h-[50vw] top-[10%] left-[5%]
          ${modalOpened ? "move-in-modal" : "move-out-modal"}`}
      >
        <div className="w-full h-full" onClick={closeModal}>
          <div className="bg-[#000] w-full h-full">
            <div
              className="flex justify-end px-2"
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <div className="h-[32px] w-[32px]" style={{ cursor: "pointer" }} onClick={closeModal}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  className="bi bi-x"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                </svg>
              </div>
            </div>
            {youtubeId === "0" ? (
              ""
            ) : youtubeId ? (
              <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${youtubeId}`}></iframe>
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <h2 className="font-bold text-center text-xl">Unavailable</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPlayer;
