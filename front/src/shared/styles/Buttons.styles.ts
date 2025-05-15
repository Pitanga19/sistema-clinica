import styled from 'styled-components';

export const StyledButton = styled.button`
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    background-color: ${({ theme }) => theme.buttonBackground};
    color: ${({ theme }) => theme.buttonTextColor};
    &:hover {
        background-color: ${({ theme }) => theme.buttonHoverBackground};
    `;

export const StyledConfirmButton = styled(StyledButton)`
    background-color: green;
    color: white;
    `;

export const StyledDeleteButton = styled(StyledButton)`
    background-color: red;
    color: white;
    `;

export const StyledCancelButton = styled(StyledButton)`
    background-color: gray;
    color: white;
    `;

export const StyledNavBarButton = styled(StyledButton)`
    font-size: 1.2rem;
    border-radius: 0;
    `;
