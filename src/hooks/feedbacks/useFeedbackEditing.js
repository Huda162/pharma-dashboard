import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_ROUTE } from 'src/routes'
import { notifyEdit } from 'src/utils/util'
import { useNavigate } from 'react-router-dom'

export const useFeedbackEditing = (feedbackId) => {
  const navigate = useNavigate()
  const [customerNameAr, setCustomerNameAr] = useState('')
  const [customerNameEng, setCustomerNameEng] = useState('')
  const [customerNameHeb, setCustomerNameHeb] = useState('')
  const [image, setImage] = useState('')
  const [body_ar, setBody_ar] = useState('')
  const [body_en, setBody_en] = useState('')
  const [body_heb, setBody_heb] = useState('')
  const [updatedImage, setUpdatedImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)

  const getFeedback = async () => {
    const url = `${API_ROUTE}/feedbacks/${feedbackId}`
    const response = await fetch(url)
    const item = await response.json()
    setImage(item['feedback']?.['image'])
    setCustomerNameAr(item['feedback']?.['customer_name'])
    setBody_ar(item['feedback']?.['body_ar'])
    setBody_en(item['feedback']?.['body_en'])
  }

  useEffect(() => {
    getFeedback()
  }, [])

  const update = () => {
    setLoading(true)
    const formData = new FormData()
    formData.append('customer_name', customerNameAr)
    formData.append('image', updatedImage)
    formData.append('body_ar', body_ar)
    formData.append('body_en', body_en)

    axios
      .post(`${API_ROUTE}/feedbacks/${feedbackId}?_method=PUT`, formData)
      .then((res) => {
        setLoading(false)
        notifyEdit()
        setTimeout(() => {
          navigate('/feedbacks')
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
    customerNameAr,
    customerNameEng,
    customerNameHeb,
    image,
    body_ar,
    body_en,
    body_heb,
    updatedImage,
    setCustomerNameAr,
    setCustomerNameEng,
    setCustomerNameHeb,
    setBody_ar,
    setBody_en,
    setBody_heb,
    setUpdatedImage,
    update,
    visible,
    setVisible,
  }
}
