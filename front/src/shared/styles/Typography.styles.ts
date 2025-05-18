import styled from 'styled-components'

export const StyledTitle = styled.h1`
    font-size: 2rem;
    font-weight: bold;
`

export const StyledSubtitle = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 0.5rem;
`

export const StyledText = styled.p`
    font-size: 1rem;
`

export const StyledError = styled(StyledText)`
    color: red;
`
