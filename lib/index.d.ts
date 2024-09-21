import React from 'react';

interface ButtonProps {
    type?: 'primary' | 'secondary';
    textColor?: string;
    size?: 'small' | 'medium' | 'large';
    label: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
declare const Button: ({ type, textColor, size, onClick, label, }: ButtonProps) => React.JSX.Element;

export { Button };
