import styled from 'styled-components';

export const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
    font-size: 1rem;
`

export const StyledTableRow = styled.tr`
`

export const StyledTableHeader = styled.thead`
`

export const StyledTableHeaderCell = styled.th`
    border: 1px solid ${({ theme }) => theme.tableBorderColor};
    padding: 0.5rem;
    font-weight: bold;
    text-align: center;
`

export const StyledTableBody = styled.tbody`
`

export const StyledTableCell = styled.td`
    border: 1px solid ${({ theme }) => theme.tableBorderColor};
    padding: 0.5rem;
    text-align: left;
`