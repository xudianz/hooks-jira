import { Select } from "antd";
import { Row } from "types";

// 获取组件的props类型
type SelectProps = React.ComponentProps<typeof Select>

// Omit删除类型中的某些key
interface IdSelectProps extends Omit<SelectProps, 'value' | 'onChange' | 'options'> {
  value?: Row | undefined | null,
  onChange?: (value?: number) => void,
  defaultOptionName?: string,
  options?: {
    name: string,
    id: number
  }[]
}

const toNumber = (value: unknown) => isNaN(Number(value)) ? 0 : Number(value)

export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props

  return (
    <Select
      value={options?.length ? toNumber(value) : 0}
      onChange={value => onChange?.(toNumber(value) || undefined)}
      {...restProps}
    >
      {
        defaultOptionName ? 
        <Select.Option value={0}>{defaultOptionName}</Select.Option> : null
      }
      {
        options?.map(option => <Select.Option value={option.id} key={option.id}>{option.name}</Select.Option>)
      }
    </Select>
  )
}
