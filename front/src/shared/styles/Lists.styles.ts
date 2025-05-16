import styled from 'styled-components';

export const StyledList = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 0.5rem;
    list-style-type: none;
    `;

export const StyledListItem = styled.li`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    `;

export const StyledDetailItem = styled(StyledListItem)`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    `;

export const StyledDetailTitle = styled.dt`
    font-size: 0.6rem;
    text-transform: uppercase;
    `;

export const StyledDetailDescription = styled.dd`
    font-weight: bold;
    `;
