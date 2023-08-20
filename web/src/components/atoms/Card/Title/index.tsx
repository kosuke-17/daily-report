import Typography from '@mui/material/Typography'
import { ReactNode } from 'react'

type TitleProps = { children: ReactNode }

const Title = ({ children }: TitleProps) => {
  return (
    <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
      {children}
    </Typography>
  )
}

export default Title
