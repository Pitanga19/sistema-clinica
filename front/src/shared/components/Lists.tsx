import type { ReactNode } from "react"
import {
    StyledList,
    StyledListItem,
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
