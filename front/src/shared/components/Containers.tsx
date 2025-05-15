import { StyledContainer } from "../styles/Containers.styles"
import type { ReactNode } from "react"

type Props = {
    children: ReactNode
    className?: string
    id?: string
}

export const MainContainer = ({ children, className, id }: Props) => {
    return (
        <StyledContainer className={className} id={id}>
            {children}
        </StyledContainer>
    )
}
