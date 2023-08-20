import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Root = () => {
  const navigate = useNavigate()

  /**
   * dailyReports一覧を初期表示
   */
  useEffect(() => {
    navigate('/daily-reports')
  }, [navigate])

  return <></>
}

export default Root
