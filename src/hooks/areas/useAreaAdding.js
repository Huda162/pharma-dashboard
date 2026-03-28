import { useState } from 'react'
import axios from 'axios'
import { API_ROUTE } from 'src/routes'
import { notifyAdd } from 'src/utils/util'
import { useNavigate } from 'react-router-dom'
import { useFormValidation } from '../general/useFormValidation'
import { useLanguage } from '../general/useLanguage'

export const useAreaAdding = () => {
  const [areaName, setAreaName] = useState('')
  const [areaNameAr, setAreaNameAr] = useState('')
  const [areaNameEn, setAreaNameEn] = useState('')
  const [deliveryPrice, setDeliveryPrice] = useState('')
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()
  const addArea = async () => {
    setLoading(true)
    let formData = new FormData()
    formData.append('delivery_price', deliveryPrice)
    formData.append('area_name', areaName)
    formData.append('area_name_ar', areaNameAr)
    formData.append('area_name_en', areaNameEn)

    try {
      await axios.post(`${API_ROUTE}/areas`, formData)
      setLoading(false)
      notifyAdd()
      setTimeout(() => {
        navigate('/areas')
      }, 500)
    } catch (error) {
      console.log(error)
      setLoading(false)
      setVisible(true)
    }
  }

  const { handleSubmit, validated } = useFormValidation(addArea)

  return {
    areaName,
    setAreaName,
    areaNameAr,
    setAreaNameAr,
    areaNameEn,
    setAreaNameEn,
    deliveryPrice,
    setDeliveryPrice,
    loading,
    addArea,
    handleSubmit,
    validated,
    visible,
    setVisible,
  }
}
