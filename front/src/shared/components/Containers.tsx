import {
    StyledContainer,
    StyledCard,
    StyledFormContainer,
    StyledInputContainer,
} from "../styles/Containers.styles"
import type { ReactNode, FormHTMLAttributes, HTMLAttributes } from "react"

// Para contenedores genéricos tipo div
type ContainerProps = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode
    className?: string
    id?: string
}

// Para FormContainer que es un form
type FormProps = FormHTMLAttributes<HTMLFormElement> & {
    children: ReactNode
    className?: string
    id?: string
}

export const MainContainer = ({ children, className, id }: ContainerProps) => {
    return (
        <StyledContainer className={className} id={id}>
            {children}
        </StyledContainer>
    )
}

export const CardContainer = ({ children, className, id }: ContainerProps) => {
    return (
        <StyledCard className={className} id={id}>
            {children}
        </StyledCard>
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
