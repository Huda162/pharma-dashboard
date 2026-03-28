import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_ROUTE } from 'src/routes'
import { notifyEdit } from 'src/utils/util'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../general/useLanguage'

export const useAreaEditing = (areaId, item) => {
  const { area_name, area_name_ar, area_name_en, delivery_price } = item
  const [areaName, setAreaName] = useState('')
  const [areaNameAr, setAreaNameAr] = useState('')
  const [areaNameEn, setAreaNameEn] = useState('')
  const [deliveryPrice, setDeliveryPrice] = useState('')
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)

  const getArea = async () => {
    setAreaName(area_name)
    setAreaNameAr(area_name_ar)
    setAreaNameEn(area_name_en)
    setDeliveryPrice(delivery_price)
  }

  useEffect(() => {
    getArea()
  }, [])

  const update = () => {
    setLoading(true)
    const formData = new FormData()

    formData.append('area_name', areaName)
    formData.append('area_name_ar', areaNameAr)
    formData.append('area_name_en', areaNameEn)
    formData.append('delivery_price', deliveryPrice)

    axios
      .post(`${API_ROUTE}/areas/${areaId}?_method=PUT`, formData)
      .then((res) => {
        setLoading(false)
        notifyEdit()
        setTimeout(() => {
          navigate('/areas')
        }, 500)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
        setVisible(true)
      })
  }

  return {
    loading,
    update,
    areaName,
    setAreaName,
    areaNameAr,
    setAreaNameAr,
    areaNameEn,
    setAreaNameEn,
    deliveryPrice,
    setDeliveryPrice,
    visible,
    setVisible,
  }
}
