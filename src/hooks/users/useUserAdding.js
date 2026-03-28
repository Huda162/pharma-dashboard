import { useState } from 'react'
import axios from 'axios'
import { API_ROUTE } from 'src/routes'
import { notifyAdd } from 'src/utils/util'
import { useNavigate } from 'react-router-dom'
import { useFormValidation } from '../general/useFormValidation'

export const useUserAdding = () => {
  const [userName, setUserName] = useState()
  const [password, setPassword] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [roleId, setRoleId] = useState()
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()
  const addUser = async () => {
    setLoading(true)

    let formData = new FormData()
    formData.append('name', userName)
    formData.append('password', password)
    formData.append('phone', phoneNumber)
    formData.append('role_id', roleId)

    const post = await axios
      .post(`${API_ROUTE}/register`, formData)
      .then((res) => {
        setLoading(false)
        notifyAdd()
        setTimeout(() => {
          navigate('/users')
        }, 500)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
        setVisible(true)
      })
    setLoading(false)
  }

  const { handleSubmit, validated } = useFormValidation(addUser)

  return {
    userName,
    setUserName,
    password,
    setPassword,
    phoneNumber,
    setPhoneNumber,
    loading,
    addUser,
    visible,
    setVisible,
    handleSubmit,
    validated,
    roleId,
    setRoleId,
  }
}
