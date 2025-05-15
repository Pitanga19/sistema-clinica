import styled from 'styled-components'

export const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 1rem;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
`
