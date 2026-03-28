import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_ROUTE } from 'src/routes'
import { notifyEdit } from 'src/utils/util'
import { useNavigate } from 'react-router-dom'

export const useSocialEditing = (socialId, item) => {
  const { name, url } = item
  const [socialName, setName] = useState('')
  const [sotionUrl, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()
  const getSocail = async () => {
    setName(name)
    setUrl(url)
  }

  useEffect(() => {
    getSocail()
  }, [])

  const update = () => {
    setLoading(true)

    const formData = new FormData()
    formData.append('name', socialName)
    formData.append('url', sotionUrl)

    axios
      .post(`${API_ROUTE}/socials/${socialId}?_method=PUT`, formData)
      .then((res) => {
        setLoading(false)
        notifyEdit()
        setTimeout(() => {
          navigate('/socials')
        }, 500)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
        setVisible(true)
      })
  }
  return {
    name: socialName,
    setName,
    url: sotionUrl,
    setUrl,
    loading,
    update,
    visible,
    setVisible,
  }
}
