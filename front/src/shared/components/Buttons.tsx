import type { ReactNode, ButtonHTMLAttributes } from 'react';
import {
    StyledButton,
    StyledConfirmButton,
    StyledDeleteButton,
    StyledCancelButton,
} from '../styles/Buttons.styles';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
};

export const BaseButton = ({ children, ...rest }: Props) => {
    return <StyledButton {...rest}>{children}</StyledButton>;
};

export const ConfirmButton = ({ children, ...rest }: Props) => {
    return <StyledConfirmButton {...rest}>{children}</StyledConfirmButton>;
};

export const DeleteButton = ({ children, ...rest }: Props) => {
    return <StyledDeleteButton {...rest}>{children}</StyledDeleteButton>;
};

export const CancelButton = ({ children, ...rest }: Props) => {
    return <StyledCancelButton {...rest}>{children}</StyledCancelButton>;
};
