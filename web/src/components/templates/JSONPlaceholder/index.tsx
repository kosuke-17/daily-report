import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../atoms/Button'
import Box from '@mui/material/Box'
import { selectArticles } from '../../../redux/slices/articles'
import { useSelector } from 'react-redux'
import Card from '../../organisms/Card'

type UseParamsType = {
  placeholderId: string
}

const JSONPlaceholder = () => {
  const navigate = useNavigate()
  const { placeholderId } = useParams<UseParamsType>()
  const articles = useSelector(selectArticles)
  const article = articles.find((a) => a.id === Number(placeholderId))

  const moveToPlaceHolders = () => {
    navigate('/placeholders')
  }

  return (
    <>
      <h2>JSONPlaceholder</h2>
      {article && <Card title={article.title} body={article.body} />}
      <Box mt={1}>
        <Button text='JSONPlaceholdersに移動' onClick={moveToPlaceHolders} />
      </Box>
    </>
  )
}

export default JSONPlaceholder
