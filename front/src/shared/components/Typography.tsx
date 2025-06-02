import type { ReactNode } from 'react'
import { StyledTitle, StyledSubtitle, StyledText, StyledError } from '../styles/Typography.styles'

type TypographyProps = {
    children: ReactNode
    className?: string
    id?: string
}

export const Title = ({ children, className, id }: TypographyProps) => {
    return (
        <StyledTitle className={className} id={id}>
            {children}
        </StyledTitle>
    )
}

export const Subtitle = ({ children, className, id }: TypographyProps) => {
    return (
        <StyledSubtitle className={className} id={id}>
            {children}
        </StyledSubtitle>
    )
}

export const Text = ({ children, className, id }: TypographyProps) => {
    return (
        <StyledText className={className} id={id}>
            {children}
        </StyledText>
    )
}

export const Error = ({ children, className, id }: TypographyProps) => {
    return (
        <StyledError className={className} id={id}>
            {children}
        </StyledError>
    )
}
