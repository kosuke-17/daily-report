import { ReactNode } from 'react'
import Typography from '@mui/material/Typography'

type CardBodyProps = { children: ReactNode }

const CardBody = ({ children }: CardBodyProps) => {
  return (
    <Typography variant='body2' sx={{ color: 'text.secondary' }}>
      {children}
    </Typography>
  )
}

export default CardBody
