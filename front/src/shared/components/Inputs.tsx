import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react"
import {
    StyledInput,
    StyledTextArea,
    StyledSelect,
    StyledCheckbox,
} from '../styles/Inputs.styles'

export const TextInput = (props: InputHTMLAttributes<HTMLInputElement>) => {
    return <StyledInput {...props} />
}

export const TextArea = (props: TextareaHTMLAttributes<HTMLTextAreaElement>) => {
    return <StyledTextArea {...props} />
}

export const Select = (props: InputHTMLAttributes<HTMLSelectElement>) => {
    return <StyledSelect {...props} />
}

export const Checkbox = (props: InputHTMLAttributes<HTMLInputElement>) => {
    return <StyledCheckbox type="checkbox" {...props} />
}
