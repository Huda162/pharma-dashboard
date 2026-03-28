import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_ROUTE } from 'src/routes'
import { notifyEdit } from 'src/utils/util'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../general/useLanguage'

export const useCategoryEditing = (categoryId, item) => {
  const { name_ar, name_en, name_he, image, parent_id } = item
  const [categoryImage, setCategoryImage] = useState('')
  const [categoryNameAr, setCategoryNameAr] = useState('')
  const [categoryNameEng, setCategoryNameEng] = useState('')
  const [categoryNameHeb, setCategoryNameHeb] = useState('')
  const [updatedImage, setUpdatedImage] = useState('')
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const { isArabic, isEnglish, isHebrew } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [isChild, setIsChild] = useState(false)
  const [parent, setParent] = useState('')
  const [isMainParent, setIsMainParent] = useState(false)

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
  }

  const getcategory = async () => {
    // const url = `${API_ROUTE}/categories/${categoryId}`
    // const response = await fetch(url)
    // const item = await response.json()
    setCategoryNameAr(name_ar)
    setCategoryNameEng(name_en)
    setCategoryNameHeb(name_he)
    setCategoryImage(image)
    setParent(parent_id)
  }

  useEffect(() => {
    getcategory()
  }, [])

  const update = () => {
    setLoading(true)
    const formData = new FormData()
    {
      isArabic === 'true'
        ? formData.append('name_ar', categoryNameAr)
        : formData.append('name_ar', 'empty')
    }
    {
      isEnglish === 'true'
        ? formData.append('name_en', categoryNameEng)
        : formData.append('name_en', 'empty')
    }
    {
      isHebrew === 'true'
        ? formData.append('name_he', categoryNameHeb)
        : formData.append('name_he', 'empty')
    }
    formData.append('image', updatedImage)
    isChild
      ? formData.append('parent_id', selectedCategory.id)
      : isMainParent
      ? formData.append('parent_id', 0)
      : formData.append('parent_id', parent)

    axios
      .post(`${API_ROUTE}/categories/${categoryId}?_method=PUT`, formData)
      .then((res) => {
        setLoading(false)
        notifyEdit()
        setTimeout(() => {
          navigate('/categories')
        }, 500)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
        setVisible(true)
      })
  }

  return {
    categoryImage,
    setUpdatedImage,
    loading,
    update,
    updatedImage,
    categoryNameAr,
    categoryNameEng,
    categoryNameHeb,
    setCategoryNameAr,
    setCategoryNameEng,
    setCategoryNameHeb,
    visible,
    setVisible,
    parent,
    isChild,
    setIsChild,
    selectedCategory,
    setSelectedCategory,
    handleCategorySelect,
    isMainParent,
    setIsMainParent,
  }
}
