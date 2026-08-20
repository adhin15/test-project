import type { CSSProperties } from "react";

type ImageContainerTypes = {
  src: string;
  width?: number | string;
  height?: number | string;
  alt?: string;
  style?: CSSProperties;
  className?: string;
  objectFit?: CSSProperties["objectFit"];
};

const ImageContainer = ({
  src,
  width = "auto",
  height = "auto",
  alt,
  style,
  className,
  objectFit = "cover",
}: ImageContainerTypes) => {
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
      <img
        src={src}
        alt={alt ?? "example"}
        style={{ objectFit: objectFit, height: height, width: width, ...style }}
      />
    </div>
  );
};

export default ImageContainer;
