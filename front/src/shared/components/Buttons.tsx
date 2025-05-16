import type { ReactNode, ButtonHTMLAttributes } from 'react';
import {
    StyledButton,
    StyledInLineButton,
    StyledDeleteButton,
    StyledNavigationButton,
    StyledConfirmButton,
    StyledCancelButton,
    StyledNavBarButton,
} from '../styles/Buttons.styles';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
};

export const BaseButton = ({ children, ...rest }: Props) => {
    return <StyledButton {...rest}>{children}</StyledButton>;
};

export const InLineButton = ({ children, ...rest }: Props) => {
    return <StyledInLineButton {...rest}>{children}</StyledInLineButton>;
};

export const DeleteButton = ({ children, ...rest }: Props) => {
    return <StyledDeleteButton {...rest}>{children}</StyledDeleteButton>;
};

export const NavigationButton = ({ children, ...rest }: Props) => {
    return <StyledNavigationButton {...rest}>{children}</StyledNavigationButton>;
};

export const ConfirmButton = ({ children, ...rest }: Props) => {
    return <StyledConfirmButton {...rest}>{children}</StyledConfirmButton>;
};

export const CancelButton = ({ children, ...rest }: Props) => {
    return <StyledCancelButton {...rest}>{children}</StyledCancelButton>;
};

export const NavBarButton = ({ children, ...rest }: Props) => {
    return <StyledNavBarButton {...rest}>{children}</StyledNavBarButton>;
};
