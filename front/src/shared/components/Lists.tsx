import type { ReactNode } from "react"
import {
    StyledList,
    StyledListItem,
    StyledDetailItem,
    StyledDetailTitle,
    StyledDetailDescription,
} from '../styles/Lists.styles'

type ListProps = {
    children: ReactNode
    className?: string
    id?: string
}

export const List = ({ children, className, id }: ListProps) => {
    return (
        <StyledList className={className} id={id}>
            {children}
        </StyledList>
    )
}

export const ListItem = ({ children, className, id }: ListProps) => {
    return (
        <StyledListItem className={className} id={id}>
            {children}
        </StyledListItem>
    )
}

export const DetailItem = ({ children, className, id }: ListProps) => {
    return (
        <StyledDetailItem className={className} id={id}>
            {children}
        </StyledDetailItem>
    )
}

export const DetailTitle = ({ children, className, id }: ListProps) => {
    return (
        <StyledDetailTitle className={className} id={id}>
            {children}
        </StyledDetailTitle>
    )
}

export const DetailDescription = ({ children, className, id }: ListProps) => {
    return (
        <StyledDetailDescription className={className} id={id}>
            {children}
        </StyledDetailDescription>
    )
}
