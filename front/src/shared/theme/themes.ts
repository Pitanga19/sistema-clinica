const DARK_MAIN_COLOR = '#110022'
const DARK_TEXT_COLOR = '#E0E0E0'
const LIGHT_MAIN_COLOR = '#EEDDFF'
const LIGHT_TEXT_COLOR = '#202020'

export const darkTheme = {
    background: DARK_MAIN_COLOR,
    text: DARK_TEXT_COLOR,
    buttonBackground: LIGHT_MAIN_COLOR,
    buttonTextColor: LIGHT_TEXT_COLOR,
}

export const lightTheme = {
    background: LIGHT_MAIN_COLOR,
    text: LIGHT_TEXT_COLOR,
    buttonBackground: DARK_MAIN_COLOR,
    buttonTextColor: DARK_TEXT_COLOR,
}

export type Theme = typeof darkTheme | typeof lightTheme
