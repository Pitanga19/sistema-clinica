import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
    /* Reset básico */
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        border: None;
    }

    body {
        font-family: 'Poppins', sans-serif;
        background-color: ${({ theme }) => theme.background};
        color: ${({ theme }) => theme.text};
        transition: all 0.25s linear;
    }

    /* Quitar estilos de listas */
    ul, ol {
        list-style: none;
    }

    /* Quitar subrayado de enlaces */
    a {
        text-decoration: none;
        color: inherit;
    }
    `

export default GlobalStyle
