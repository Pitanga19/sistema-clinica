const DARK_MAIN_COLOR = '#313c4d'
const DARK_TEXT_COLOR = '#E0E0E0'
const DARK_TABLE_BORDER_COLOR = '#4b5461'
const LIGHT_MAIN_COLOR = '#f4f2f3'
const LIGHT_TEXT_COLOR = '#202020'
const LIGHT_TABLE_BORDER_COLOR = '#d4d2d3'

const DARK_BUTTON_COLOR = LIGHT_MAIN_COLOR
const DARK_HOVER_COLOR = '#d4d2d3'
const DARK_BUTTON_TEXT_COLOR = LIGHT_TEXT_COLOR

const LIGHT_BUTTON_COLOR = DARK_MAIN_COLOR
const LIGHT_HOVER_COLOR = '#101936'
const LIGHT_BUTTON_TEXT_COLOR = DARK_TEXT_COLOR

export const darkTheme = {
    background: DARK_MAIN_COLOR,
    text: DARK_TEXT_COLOR,
    buttonBackground: DARK_BUTTON_COLOR,
    buttonHoverBackground: DARK_HOVER_COLOR,
    buttonTextColor: DARK_BUTTON_TEXT_COLOR,
    tableBorderColor: DARK_TABLE_BORDER_COLOR
}

export const lightTheme = {
    background: LIGHT_MAIN_COLOR,
    text: LIGHT_TEXT_COLOR,
    buttonBackground: LIGHT_BUTTON_COLOR,
    buttonHoverBackground: LIGHT_HOVER_COLOR,
    buttonTextColor: LIGHT_BUTTON_TEXT_COLOR,
    tableBorderColor: LIGHT_TABLE_BORDER_COLOR
}

export type Theme = typeof darkTheme | typeof lightTheme
