import { useState } from 'react'
import axios from 'axios'
import { API_ROUTE } from 'src/routes'
import { notifyAdd } from 'src/utils/util'
import { useNavigate } from 'react-router-dom'
import { useFormValidation } from '../general/useFormValidation'

export const useCoponAdding = () => {
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [valueNIS, setValueNIS] = useState('')
  const [endDate, setEndDate] = useState('')
  const [type, setType] = useState('')
  // const [valueUSD, setValueUSD] = useState('')
  // const [valueJUD, setValueJUD] = useState('')
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)

  const addCopon = async () => {
    setLoading(true)
    let formData = new FormData()

    formData.append('code', code)
    formData.append('type', type)
    formData.append('value', valueNIS)
    formData.append('name', name)
    formData.append('end_date', endDate)

    const resGet = await axios
      .post(`${API_ROUTE}/copons`, formData)
      .then((response) => {
        setLoading(false)
        notifyAdd()
        setTimeout(() => {
          navigate('/coupons')
        }, 500)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
        setVisible(true)
      })
    setLoading(false)
  }

  const { handleSubmit, validated } = useFormValidation(addCopon)

  return {
    code,
    setCode,
    loading,
    addCopon,
    visible,
    setVisible,
    valueNIS,
    setValueNIS,
    // valueJUD,
    // valueUSD,
    // setValueUSD,
    // setValueJUD,
    handleSubmit,
    validated,
    name,
    setName,
    endDate,
    setEndDate,
    type,
    setType,
  }
}
