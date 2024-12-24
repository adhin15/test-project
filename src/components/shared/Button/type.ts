type Variant = 'regular' | 'outlined' | 'text'
type TextVariant =  'display1' | 'display2' | 'title1' | 'title2' | 'buttonLarge' | 'button' | 'body1' | 'body2' | 'body3' | 'body4' | 'body5' | 'body6' | 'body7'

export type ButtonProps = {
    label?: string;
    variant?: Variant;
    textVariant?: TextVariant;
    children?: React.ReactNode;
    color?: string;
    textColor?: string;
    disabled?: boolean;
    endIcon?: string;
    id?: string;
    isFullWidth?: boolean;
    isLoading?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    startIcon?: string;
    style?: React.CSSProperties;
    textWeight?: string | number;
    textSize?: string | number;
}