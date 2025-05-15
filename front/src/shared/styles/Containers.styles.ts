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

export const StyledCard = styled.div`
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    box-shadow: 0 .5rem 1rem rgba(0, 0, 0, 0.5);
    padding: 2rem 1rem;
    margin: 1rem auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const StyledFormContainer = styled.div`
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
`

export const StyledInputContainer = styled.div`
    width: 100%;
    min-width: 20rem;
    max-width: 30rem;
`
