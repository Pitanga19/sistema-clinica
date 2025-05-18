import type { ReactNode, InputHTMLAttributes, TextareaHTMLAttributes } from "react"
import {
    StyledTextInput,
    StyledTextArea,
    StyledSelect,
    StyledOption,
    StyledCheckbox,
    StyledLabel
} from '../styles/Inputs.styles'

type LabelProps = {
    htmlFor: string
    children: ReactNode
}

export const TextInput = (props: InputHTMLAttributes<HTMLInputElement>) => {
    return <StyledTextInput {...props} />
}

export const TextArea = (props: TextareaHTMLAttributes<HTMLTextAreaElement>) => {
    return <StyledTextArea {...props} />
}

export const Select = (props: InputHTMLAttributes<HTMLSelectElement>) => {
    return <StyledSelect {...props} />
}

export const Option = (props: InputHTMLAttributes<HTMLOptionElement>) => {
    return <StyledOption {...props} />
}

export const Checkbox = (props: InputHTMLAttributes<HTMLInputElement>) => {
    return <StyledCheckbox type="checkbox" {...props} />
}

export const Label = ({ htmlFor, children }: LabelProps) => {
    return <StyledLabel htmlFor={htmlFor}>{children}</StyledLabel>
}
