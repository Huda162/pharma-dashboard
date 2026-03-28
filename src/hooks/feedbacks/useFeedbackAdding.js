import { useState } from 'react'
import axios from 'axios'
import { API_ROUTE } from 'src/routes'
import { notifyAdd } from 'src/utils/util'
import { useNavigate } from 'react-router-dom'
import { useFormValidation } from '../general/useFormValidation'

export const useFeedbackAdding = () => {
  const [customerName, setCustomerName] = useState('')
  const [body, setBody] = useState('')
  const [image, setImage] = useState('')
  const [visible, setVisible] = useState(false)

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const addFeedback = async () => {
    setLoading(true)
    let formData = new FormData()
    formData.append('image', image)
    formData.append('customer_name', customerName)
    formData.append('body', body)

    try {
      await axios.post(`${API_ROUTE}/feedbacks`, formData)
      setLoading(false)
      notifyAdd()
      setTimeout(() => {
        navigate('/feedbacks')
      }, 500)
    } catch (error) {
      console.log(error)
      setLoading(false)
      setVisible(true)
    }
  }

  const { handleSubmit, validated } = useFormValidation(addFeedback)

  return {
    customerName,
    setCustomerName,
    body,
    setBody,
    image,
    setImage,
    loading,
    addFeedback,
    handleSubmit,
    validated,
    visible,
    setVisible,
  }
}
