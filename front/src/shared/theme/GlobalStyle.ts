import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
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
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        transition: all 0.25s linear;
    }

    .main_container {
        padding: 1rem;
    }

    .error {
        color: red;
    }

    button, submit {
        background-color: ${({ theme }) => theme.buttonBackground};
        color: ${({ theme }) => theme.buttonTextColor};
        padding: 0.5rem 1rem;
    }
    `

export default GlobalStyle
