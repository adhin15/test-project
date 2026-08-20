import type { ReactNode } from "react";

const IconContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-secondary-bg rounded-full w-[46px] h-[46px] flex items-center justify-center md:mx-2 mx-1">
      {children}
    </div>
  );
};

export default IconContainer;
