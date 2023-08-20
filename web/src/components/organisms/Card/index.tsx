import { Card as MuiCard, CardContent as MuiCardContent } from '@mui/material'
import Title from '../../atoms/Card/Title'
import CardBody from '../../atoms/Card/Body'

type CardProps = {
  title: string
  body: string
}

const Card = ({ title, body }: CardProps) => {
  return (
    <MuiCard elevation={5}>
      <MuiCardContent>
        <Title>{title}</Title>
        <CardBody>{body}</CardBody>
      </MuiCardContent>
    </MuiCard>
  )
}

export default Card
