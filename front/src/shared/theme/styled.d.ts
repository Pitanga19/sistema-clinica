import 'styled-components'

declare module 'styled-components' {
    export interface DefaultTheme {
        background: string
        text: string
        buttonBackground: string
        buttonHoverBackground: string
        buttonTextColor: string
    }
}
