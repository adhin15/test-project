

export type DropdownProps = {
    label?: string | null | React.ReactNode;
    dropdownList?: Array<childList>;
    style?: any;
    className?: String;
}
type childList = {
    label?:string,
    url?:string,
    onClick?:(e: React.MouseEvent<HTMLButtonElement>) => void | void
}