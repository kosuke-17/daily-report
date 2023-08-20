import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../atoms/Button'
import Box from '@mui/material/Box'

type UseParamsType = {
  placeholderId: string
}

const JSONPlaceholder = () => {
  const navigate = useNavigate()
  const { placeholderId } = useParams<UseParamsType>()

  const moveToPlaceHolders = () => {
    navigate('/placeholders')
  }

  return (
    <>
      <h2>JSONPlaceholder</h2>
      {placeholderId}
      <Box mt={1}>
        <Button text='JSONPlaceholdersに移動' onClick={moveToPlaceHolders} />
      </Box>
    </>
  )
}

export default JSONPlaceholder
