import styled from 'styled-components'

export const StyledConditionalContainer = styled.div<{ $show: boolean }>`
    display: ${({ $show }) => ($show ? 'flex' : 'none')};
    flex-direction: column;
    gap: 1rem;
`

export const StyledBaseContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
`

export const StyledMainContainer = styled(StyledBaseContainer)`
    min-height: 100vh;
    padding: 2rem;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
`

export const StyledCardContainer = styled(StyledBaseContainer)`
    align-items: center;
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
    padding: 2rem 4rem;
    margin: auto;
`

export const StyledFormContainer = styled(StyledBaseContainer)`
    align-items: flex-start;
`

export const StyledInputContainer = styled(StyledBaseContainer)`
    flex-direction: row;
    width: 100%;
    min-width: 20rem;
    max-width: 30rem;
`

export const StyledButtonContainer = styled(StyledBaseContainer)`
    flex-direction: row-reverse;
    justify-content: flex-start;
    width: 100%;
    min-width: 20rem;
    max-width: 30rem;
    padding: 1rem 0 0;
    gap: 0;
`

export const StyledTableFilterFormContainer = styled(StyledBaseContainer)`
    flex-direction: row;
    align-items: center;
`

export const StyledTableFilterInputContainer = styled(StyledBaseContainer)`
    flex-direction: row;
    width: 8rem;
`
