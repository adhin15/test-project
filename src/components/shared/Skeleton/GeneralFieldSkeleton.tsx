type GeneralFieldSkeletonProps = {
  children?: React.ReactNode;
  isLoading?: boolean;
  width?: string;
  className?: string;
};

const GeneralFieldSkeleton = (props: GeneralFieldSkeletonProps) => {
  const { children, isLoading = false, width = "100%", className } = props;
  return isLoading ? (
    <div className={`my-2 animate-pulse ${className}`}>
      <div className={`rounded bg-slate-700 min-h-[24px]`} style={{ width: width }}></div>
    </div>
  ) : (
    children
  );
};
export default GeneralFieldSkeleton;
