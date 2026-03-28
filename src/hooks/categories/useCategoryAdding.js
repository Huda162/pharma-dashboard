import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_ROUTE } from 'src/routes'
import { notifyAdd } from 'src/utils/util'
import { useNavigate } from 'react-router-dom'
import { useFormValidation } from '../general/useFormValidation'
import { useLanguage } from '../general/useLanguage'
import { useCategories } from './useCategories'

export const useCategoryAdding = () => {
  const [categoryNameAr, setCategoryNameAr] = useState('')
  const [categoryNameEng, setCategoryNameEng] = useState('')
  const [categoryNameHeb, setCategoryNameHeb] = useState('')
  const { isArabic, isEnglish, isHebrew } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState('')
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [isChild, setIsChild] = useState(false)

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
  }
  const addCategory = async () => {
    setLoading(true)
    let formData = new FormData()
    formData.append('image', image)
    isArabic === 'true'
      ? formData.append('name_ar', categoryNameAr)
      : formData.append('name_ar', 'empty')
    isEnglish === 'true'
      ? formData.append('name_en', categoryNameEng)
      : formData.append('name_en', 'empty')
    isHebrew === 'true'
      ? formData.append('name_he', categoryNameHeb)
      : formData.append('name_he', 'empty')
    selectedCategory
      ? formData.append('parent_id', selectedCategory.id)
      : formData.append('parent_id', 0)
    try {
      await axios.post(`${API_ROUTE}/categories`, formData)
      setLoading(false)
      notifyAdd()
      setTimeout(() => {
        navigate('/categories')
      }, 500)
    } catch (error) {
      console.log(error)
      setLoading(false)
      setVisible(true)
    }
  }

  const { handleSubmit, validated } = useFormValidation(addCategory)

  return {
    categoryNameAr,
    setCategoryNameAr,
    categoryNameEng,
    setCategoryNameEng,
    categoryNameHeb,
    setCategoryNameHeb,
    loading,
    addCategory,
    image,
    setImage,
    handleSubmit,
    validated,
    visible,
    setVisible,
    selectedCategory,
    setSelectedCategory,
    handleCategorySelect,
    isChild,
    setIsChild,
  }
}
