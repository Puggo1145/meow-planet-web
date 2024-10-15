// components
import { Input } from "./input"
// types
import type { ComponentProps } from "react"


interface ILabelInputProps extends ComponentProps<"input"> {
    label: string
}

const LabelInput = ({ label, ...props }: ILabelInputProps) => {
  return (
    <div className="flex flex-col gap-y-2">
        <label className="ml-2 text-xs text-gray-400">
            {label}
        </label>
        <Input {...props} />
    </div>
  )
}

export default LabelInput