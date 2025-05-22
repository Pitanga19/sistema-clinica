import {
    StyledConditionalContainer,
    StyledBaseContainer,
    StyledMainContainer,
    StyledCardContainer,
    StyledFormContainer,
    StyledInputContainer,
    StyledButtonContainer,
    StyledTableFilterFormContainer,
    StyledTableFilterInputContainer,
} from "../styles/Containers.styles"
import type { ReactNode, FormHTMLAttributes, HTMLAttributes } from "react"

interface ConditionalContainerProps {
    children: ReactNode
    show: boolean
    className?: string
    id?: string
}

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode
    className?: string
    id?: string
}

type FormProps = FormHTMLAttributes<HTMLFormElement> & {
    children: ReactNode
    className?: string
    id?: string
}

export const ConditionalContainer = ({
    children,
    show,
    className,
    id,
}: ConditionalContainerProps) => {
    return (
        <StyledConditionalContainer
            $show={show}
            className={className}
            id={id}
        >
            {children}
        </StyledConditionalContainer>
    )
}

export const BaseContainer = ({ children, className, id }: ContainerProps) => {
    return (
        <StyledBaseContainer className={className} id={id}>
            {children}
        </StyledBaseContainer>
    )
}

export const MainContainer = ({ children, className, id }: ContainerProps) => {
    return (
        <StyledMainContainer className={className} id={id}>
            {children}
        </StyledMainContainer>
    )
}

export const CardContainer = ({ children, className, id }: ContainerProps) => {
    return (
        <StyledCardContainer className={className} id={id}>
            {children}
        </StyledCardContainer>
    )
}

export const FormContainer = ({
    children,
    className,
    id,
    ...rest
}: FormProps) => {
    return (
        <StyledFormContainer
            as="form"
            className={className}
            id={id}
            {...rest}
        >
            {children}
        </StyledFormContainer>
    )
}

export const InputContainer = ({ children, className, id }: ContainerProps) => {
    return (
        <StyledInputContainer className={className} id={id}>
            {children}
        </StyledInputContainer>
    )
}

export const ButtonContainer = ({ children, className, id }: ContainerProps) => {
    return (
        <StyledButtonContainer className={className} id={id}>
            {children}
        </StyledButtonContainer>
    )
}

export const TableFilterFormContainer = ({
    children,
    className,
    id,
    ...rest
}: FormProps) => {
    return (
        <StyledTableFilterFormContainer
            as="form"
            className={className}
            id={id}
            {...rest}
        >
            {children}
        </StyledTableFilterFormContainer>
    )
}

export const TableFilterInputContainer = ({
    children,
    className,
    id,
}: ContainerProps) => {
    return (
        <StyledTableFilterInputContainer className={className} id={id}>
            {children}
        </StyledTableFilterInputContainer>
    )
}
