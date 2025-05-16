import styled from 'styled-components';

export const StyledButton = styled.button`
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    background-color: ${({ theme }) => theme.buttonBackground};
    color: ${({ theme }) => theme.buttonTextColor};
    &:hover {
        background-color: ${({ theme }) => theme.buttonHoverBackground};
    `;

export const StyledInLineButton = styled(StyledButton)`
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    `;

export const StyledDeleteButton = styled(StyledInLineButton)`
    background-color: red;
    color: white;
    `;

export const StyledNavigationButton = styled(StyledButton)`
    padding: 0.5rem 2rem;rem;
    font-size: 1.2rem;
    `;

export const StyledConfirmButton = styled(StyledNavigationButton)`
    background-color: green;
    color: white;
    `;

export const StyledCancelButton = styled(StyledNavigationButton)`
    background-color: gray;
    color: white;
    `;

export const StyledNavBarButton = styled(StyledButton)`
    padding: 0.5rem 1rem;
    border-radius: 0;
    `;
