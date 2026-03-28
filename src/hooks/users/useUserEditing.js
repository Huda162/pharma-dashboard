import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_ROUTE } from 'src/routes'
import { notifyEdit } from 'src/utils/util'
import { useNavigate } from 'react-router-dom'

export const useUserEditing = (userId, item) => {
  const { name, phone, role_id } = item
  const [loading, setLoading] = useState(false)
  const [userNameAr, setUserNameAr] = useState('')
  const [phoneNumber, setPhoneNumber] = useState()
  const [roleId, setRoleId] = useState()
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()
  const getuser = async () => {
    setUserNameAr(name)
    setPhoneNumber(phone)
    setRoleId(role_id)
  }

  useEffect(() => {
    getuser()
  }, [])

  const update = () => {
    setLoading(true)
    const formData = new FormData()
    formData.append('user_id', userId)
    formData.append('name', userNameAr)
    formData.append('phone', phoneNumber)
    formData.append('role_id', roleId)

    axios
      .post(`${API_ROUTE}/update_user`, formData)
      .then((res) => {
        setLoading(false)
        notifyEdit()
        setTimeout(() => {
          navigate('/users')
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
    userNameAr,
    setUserNameAr,
    phoneNumber,
    setPhoneNumber,
    update,
    visible,
    setVisible,
    roleId,
    setRoleId,
  }
}
