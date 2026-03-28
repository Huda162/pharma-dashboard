import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_ROUTE } from 'src/routes'
import { notifyEdit } from 'src/utils/util'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../general/useLanguage'

export const useAboutUsEditing = (aboutId, item) => {
  const { body_ar, body_en, body_he, image } = item
  const navigate = useNavigate()
  const [bodyAr, setBodyAr] = useState('')
  const [bodyEng, setBodyEng] = useState('')
  const [bodyHeb, setBodyHeb] = useState('')
  const [updatedImage, setUpdatedImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const { isArabic, isEnglish, isHebrew } = useLanguage()

  const getAbout = async () => {
    setBodyAr(body_ar)
    setBodyEng(body_en)
    setBodyHeb(body_he)
  }

  useEffect(() => {
    getAbout()
  }, [])

  const update = () => {
    setLoading(true)
    const formData = new FormData()
    {
      isArabic === 'true' ? formData.append('body_ar', bodyAr) : formData.append('body_ar', 'empty')
    }
    {
      isEnglish === 'true'
        ? formData.append('body_en', bodyEng)
        : formData.append('body_en', 'empty')
    }
    {
      isHebrew === 'true'
        ? formData.append('body_he', bodyHeb)
        : formData.append('body_he', 'empty')
    }
    formData.append('image', updatedImage)

    axios
      .post(`${API_ROUTE}/about/${aboutId}?_method=PUT`, formData)
      .then((res) => {
        setLoading(false)
        notifyEdit()
        setTimeout(() => {
          navigate('/about_us')
        }, 500)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
        setVisible(true)
      })
  }
  return {
    bodyAr,
    loading,
    update,
    setBodyAr,
    visible,
    setVisible,
    bodyEng,
    bodyHeb,
    setBodyEng,
    setBodyHeb,
    updatedImage,
    setUpdatedImage,
    image,
  }
}
