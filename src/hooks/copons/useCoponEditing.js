import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_ROUTE } from 'src/routes'
import { notifyEdit } from 'src/utils/util'
import { useNavigate } from 'react-router-dom'

export const useCoponEditing = (coponId, item) => {
  const { code, value, name, end_date, type } = item
  const navigate = useNavigate()
  const [coponCode, setCode] = useState('')
  const [coponValue, setValue] = useState('')
  const [coponName, setName] = useState('')
  const [endDate, setEndDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [coponType, setType] = useState('')

  const getCopon = async () => {
    setCode(code)
    setValue(value)
    setName(name)
    setEndDate(end_date)
    setType(type)
  }

  useEffect(() => {
    getCopon()
  }, [])

  const update = () => {
    setLoading(true)
    const formData = new FormData()
    formData.append('code', coponCode)
    formData.append('value', coponValue)
    formData.append('name', coponName)
    formData.append('end_date', endDate)
    formData.append('type', coponType)
    axios
      .post(`${API_ROUTE}/copons/${coponId}?_method=PUT`, formData)
      .then((res) => {
        setLoading(false)
        notifyEdit()
        setTimeout(() => {
          navigate('/coupons')
        }, 500)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
        setVisible(true)
      })
  }
  return {
    code: coponCode,
    value: coponValue,
    name: coponName,
    endDate,
    setName,
    setValue,
    setCode,
    setEndDate,
    loading,
    update,
    visible,
    coponType,
    setType,
    setVisible,
  }
}
