import type { CSSProperties, ReactNode } from "react";

export type DropdownChild = {
  label?: string;
  url?: string;
  onClick?: () => void;
};

export type DropdownProps = {
  label?: string | null | ReactNode;
  dropdownList?: DropdownChild[];
  style?: CSSProperties;
  className?: string;
};
