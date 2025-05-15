import styled from 'styled-components'

export const StyledInput = styled.input`
    padding: 0.5rem;
    border: 1px solid ${({ theme }) => theme.buttonBackground};
    border-radius: 6px;
    width: 100%;
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
`

export const StyledTextArea = styled.textarea`
    padding: 0.5rem;
    border: 1px solid ${({ theme }) => theme.buttonBackground};
    border-radius: 6px;
    width: 100%;
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
`

export const StyledSelect = styled.select`
    padding: 0.5rem;
    border: 1px solid ${({ theme }) => theme.buttonBackground};
    border-radius: 6px;
    width: 100%;
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    option {
        background-color: ${({ theme }) => theme.background};
        color: ${({ theme }) => theme.text};
    }
    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px ${({ theme }) => theme.buttonBackground};
    }
    &:hover {
        background-color: ${({ theme }) => theme.buttonHoverBackground};
    }
    `

export const StyledCheckbox = styled.input`
    margin-right: 0.5rem;
    cursor: pointer;
    accent-color: ${({ theme }) => theme.buttonBackground};
    &:checked {
        background-color: ${({ theme }) => theme.buttonBackground};
    }
    &:hover {
        background-color: ${({ theme }) => theme.buttonHoverBackground};
    }
    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px ${({ theme }) => theme.buttonBackground};
    }
    &:disabled {
        cursor: not-allowed;
        background-color: ${({ theme }) => theme.buttonBackground};
        opacity: 0.5;
    }
    `

    export const StyledLabel = styled.label`
    width: 100%;
    display: flex;
    align-items: start;
    font-size: 1rem;
    `
