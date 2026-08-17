import Image from "next/image";

type ImageContainerTypes = {
  src: string;
  width?: number | string;
  height?: number | string;
  alt?: string;
  style?: any;
  className?: string;
  objectFit?: string;
};
const ImageContainer = (props: ImageContainerTypes) => {
  const { src, width = "auto", height = "auto", alt, style, className, objectFit = "cover" } = props;
  return (
    <div
      className={className}
      style={{
        position: "relative",
        height: height,
        width: width,
        ...style,
      }}
    >
      <Image
        src={src}
        width={1000}
        height={1000}
        alt={"example"}
        style={{ objectFit: objectFit, height: height, width: width, ...style }}
      />
    </div>
  );
};

export default ImageContainer;
