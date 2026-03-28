import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_ROUTE } from 'src/routes'
import { notifyEdit } from 'src/utils/util'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../general/useLanguage'

export const useBrandEditing = (categoryId, item) => {
  const { name, image } = item
  const [brandImage, setBrandImage] = useState('')
  const [brandNameAr, setBrandNameAr] = useState('')
  const [updatedImage, setUpdatedImage] = useState('')
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)

  const getcategory = async () => {
    // const url = `${API_ROUTE}/categories/${categoryId}`
    // const response = await fetch(url)
    // const item = await response.json()
    setBrandNameAr(name)
    // setCategoryNameEng(name_en)
    // setCategoryNameHeb(name_he)
    setBrandImage(image)
  }

  useEffect(() => {
    getcategory()
  }, [])

  const update = () => {
    setLoading(true)
    const formData = new FormData()

    formData.append('name', brandNameAr)
    formData.append('image', updatedImage)

    axios
      .post(`${API_ROUTE}/brands/${categoryId}?_method=PUT`, formData)
      .then((res) => {
        setLoading(false)
        notifyEdit()
        setTimeout(() => {
          navigate('/brands')
        }, 500)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
        setVisible(true)
      })
  }

  return {
    brandImage,
    setUpdatedImage,
    loading,
    update,
    updatedImage,
    brandNameAr,
    setBrandNameAr,
    visible,
    setVisible,
  }
}
