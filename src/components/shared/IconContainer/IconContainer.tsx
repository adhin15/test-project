const IconContainer = (props: any) => {
  return (
    <div className="bg-secondary-bg rounded-full w-[46px] h-[46px] flex items-center justify-center md:mx-2 mx-1">
      {props.children}
    </div>
  );
};

export default IconContainer;
