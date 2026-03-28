import { useState } from 'react'
import axios from 'axios'
import { API_ROUTE } from 'src/routes'
import { notifyAdd } from 'src/utils/util'
import { useNavigate } from 'react-router-dom'
import { useFormValidation } from '../general/useFormValidation'
import { useLanguage } from '../general/useLanguage'

export const useBrandAdding = () => {
  const [brandNameAr, setBrandNameAr] = useState('')
  const [categoryNameEng, setCategoryNameEng] = useState('')
  const [categoryNameHeb, setCategoryNameHeb] = useState('')
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState('')
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()
  const addBrand = async () => {
    setLoading(true)
    let formData = new FormData()
    formData.append('image', image)
    formData.append('name', brandNameAr)

    try {
      await axios.post(`${API_ROUTE}/brands`, formData)
      setLoading(false)
      notifyAdd()
      setTimeout(() => {
        navigate('/brands')
      }, 500)
    } catch (error) {
      console.log(error)
      setLoading(false)
      setVisible(true)
    }
  }

  const { handleSubmit, validated } = useFormValidation(addBrand)

  return {
    brandNameAr,
    setBrandNameAr,
    loading,
    addBrand,
    image,
    setImage,
    handleSubmit,
    validated,
    visible,
    setVisible,
  }
}
