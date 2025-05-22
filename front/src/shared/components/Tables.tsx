import type { ReactNode } from "react"
import {
    StyledTable,
    StyledTableRow,
    StyledTableHeader,
    StyledTableHeaderCell,
    StyledTableBody,
    StyledTableCell,
} from '../styles/Tables.styles';

type TableProps = {
    children: ReactNode
    className?: string
    id?: string
}

export const Table = ({ children, className, id }: TableProps) => {
    return (
        <StyledTable className={className} id={id}>
            {children}
        </StyledTable>
    )
}

export const TableRow = ({ children, className, id }: TableProps) => {
    return (
        <StyledTableRow className={className} id={id}>
            {children}
        </StyledTableRow>
    )
}

export const TableHeader = ({ children, className, id }: TableProps) => {
    return (
        <StyledTableHeader className={className} id={id}>
            {children}
        </StyledTableHeader>
    )
}

export const TableHeaderCell = ({ children, className, id }: TableProps) => {
    return (
        <StyledTableHeaderCell className={className} id={id}>
            {children}
        </StyledTableHeaderCell>
    )
}

export const TableBody = ({ children, className, id }: TableProps) => {
    return (
        <StyledTableBody className={className} id={id}>
            {children}
        </StyledTableBody>
    )
}

export const TableCell = ({ children, className, id }: TableProps) => {
    return (
        <StyledTableCell className={className} id={id}>
            {children}
        </StyledTableCell>
    )
}
