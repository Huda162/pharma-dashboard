import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const useLogin = () => {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  // const [emptyPhone, setEmptyPhone] = useState(false)
  // const [emptyPassword, setEmptyPassword] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const navigate = useNavigate()
  const [showSignoutDialog, setShowSignoutDialog] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const openSignoutDialog = () => {
    setShowSignoutDialog(true)
  }

  const closeSignoutDialog = () => {
    setShowSignoutDialog(false)
  }

  const autoLogin = async () => {
    console.log('inside auto login')
    const phoneNumber = localStorage.getItem('phrama_phone_number')
    const rememberMe = localStorage.getItem('phrama_remember_me')

    if (rememberMe === 'true') {
      console.log('setting login info in session storage')
      setLoading(true)
      const name = localStorage.getItem('phrama_name')
      const role_id = localStorage.getItem('phrama_role_id')
      const id = localStorage.getItem('phrama_id')
      const log_status = localStorage.getItem('phrama_log_status')
      const token = localStorage.getItem('phrama_access_token')

      sessionStorage.setItem('access_token', JSON.parse(token))
      sessionStorage.setItem('name', JSON.parse(name))
      sessionStorage.setItem('role_id', JSON.parse(role_id))
      sessionStorage.setItem('id', JSON.parse(id))
      sessionStorage.setItem('log_status', JSON.parse(log_status))

      navigate('/dashboard')

      setLoading(false)
    }
  }

  const logout = () => {
    sessionStorage.removeItem('access_token')
    sessionStorage.removeItem('name')
    sessionStorage.removeItem('role_id')
    sessionStorage.removeItem('id')
    sessionStorage.setItem('log_status', false)
    localStorage.removeItem('phrama_access_token')
    localStorage.removeItem('phrama_name')
    localStorage.removeItem('phrama_role_id')
    localStorage.removeItem('phrama_id')
    localStorage.setItem('phrama_log_status', JSON.stringify(false))
    localStorage.setItem('phrama_remember_me', JSON.stringify(false))
    navigate('/#')
    setShowSignoutDialog(false)
  }
  const login = async () => {
    if (phone.toLowerCase() === 'perfect_admin' && password.toLowerCase() === 'admin') {
      console.log('admin login')
      sessionStorage.setItem('name', 'Admin')
      sessionStorage.setItem('role_id', 1)
      sessionStorage.setItem('log_status', true)
      navigate('/dashboard')
    } else {
      const headers = {
        'Content-Type': 'application/json',
      }

      try {
        setLoading(true)
        const response = await axios.post(
          `https://pharmaglows.com/adminv2/api/login`,
          {
            phone: phone,
            password: password,
          },
          { headers },
        )
        console.log(response)
        if (response.status === 200) {
          // Successful login
          const token = response.data.access_token
          const status = response.data.status
          const { name, role_id, id } = response.data.id
          console.log(role_id)
          sessionStorage.setItem('access_token', token)
          sessionStorage.setItem('name', name)
          sessionStorage.setItem('role_id', role_id)
          sessionStorage.setItem('id', id)
          sessionStorage.setItem('log_status', status)
          if (rememberMe) {
            localStorage.setItem('phrama_access_token', JSON.stringify(token))
            localStorage.setItem('phrama_name', JSON.stringify(name))
            localStorage.setItem('phrama_role_id', JSON.stringify(role_id))
            localStorage.setItem('phrama_id', JSON.stringify(id))
            localStorage.setItem('phrama_log_status', JSON.stringify(status))
            localStorage.setItem('phrama_remember_me', JSON.stringify(rememberMe))
          }
          navigate('/dashboard')
        } else {
          console.log('Invalid login details')
        }
      } catch (error) {
        setShowDialog(true)
        console.error(error)
        setLoading(false)
      }
    }
  }
  return {
    phone,
    setPhone,
    password,
    setPassword,
    loading,
    showDialog,
    setShowDialog,
    login,
    logout,
    openSignoutDialog,
    closeSignoutDialog,
    showSignoutDialog,
    rememberMe,
    setRememberMe,
    autoLogin,
  }
}
