import {
  ButtonProps as MUIButtonProps,
  Button as MUIButton,
} from '@mui/material'

/**
 * @see https://mui.com/material-ui/api/button/
 */
type ButtonProps = MUIButtonProps & {
  /** ボタンの名前 */
  text: string
}

const Button = (props: ButtonProps) => {
  const { onClick, sx, text } = props
  return (
    <MUIButton variant='contained' onClick={onClick} sx={sx}>
      {text}
    </MUIButton>
  )
}

export default Button
