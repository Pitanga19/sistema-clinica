import styled from 'styled-components'

export const StyledNavBar = styled.nav`
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    background-color: ${({ theme }) => theme.buttonBackground};
    color: ${({ theme }) => theme.buttonTextColor};
    `
