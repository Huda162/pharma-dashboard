import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { notifyEdit } from 'src/utils/util'
import { API_ROUTE } from 'src/routes'
import axios from 'axios'
import { useLanguage } from '../general/useLanguage'
import { useCurrency } from '../general/useCurrency'

export const useSettings = () => {
  const [loading, setLoading] = useState(false)
  const { isArabic, isEnglish, isHebrew } = useLanguage()
  const { isJUD, isNIS, isUSD } = useCurrency()
  const [isArabicTemp, setIsArabicTemp] = useState(isArabic)
  const [isEnglishTemp, setIsEnglishTemp] = useState(isEnglish)
  const [isHebrewTemp, setIsHebrewTemp] = useState(isHebrew)
  const [isNISTemp, setIsNISTemp] = useState(isNIS)
  const [isUSDTemp, setIsUSDTemp] = useState(isUSD)
  const [isJODTemp, setIsJODTemp] = useState(isJUD)
  const [settings, setSettings] = useState([])
  const [logo, setLogo] = useState('')
  const [updatedLogo, setUpdatedLogo] = useState('')

  const getSettings = async () => {
    console.log('getSettings called')
    setLoading(true)
    try {
      const url = `${API_ROUTE}/settings`
      const response = await fetch(url)
      const item = await response.json()
      setSettings(item['settings'])
      item['settings'].forEach((element) => {
        switch (element.name) {
          case 'is_arabic':
            setIsArabicTemp(element.value)
            localStorage.setItem('isArabic', JSON.stringify(element.value))
            break
          case 'is_english':
            setIsEnglishTemp(element.value)
            localStorage.setItem('isEnglish', JSON.stringify(element.value))
            break
          case 'is_hebrow':
            setIsHebrewTemp(element.value)
            localStorage.setItem('isHebrew', JSON.stringify(element.value))
            break
          case 'is_nis':
            setIsNISTemp(element.value)
            localStorage.setItem('isNIS', JSON.stringify(element.value))
            break
          case 'is_jod':
            setIsJODTemp(element.value)
            localStorage.setItem('isJOD', JSON.stringify(element.value))
            break
          case 'logo':
            setLogo(element.value)
            localStorage.setItem('logo', JSON.stringify(element.value))
            break
          default:
            break
        }
      })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getSettings()
  }, [])

  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)

  const saveChanges = async () => {
    setLoading(true)
    try {
      if (
        (isArabicTemp === 'true' || isEnglishTemp === 'true' || isHebrewTemp === 'true') &&
        (isNISTemp === 'true' || isJODTemp === 'true' || isUSDTemp === 'true')
      ) {
        const formData = new FormData()
        formData.append('is_arabic', isArabicTemp)
        formData.append('is_english', isEnglishTemp)
        formData.append('is_hebrow', isHebrewTemp)
        formData.append('is_nis', isNISTemp)
        formData.append('is_jod', isJODTemp)
        formData.append('logo', updatedLogo)
        axios
          .post(`${API_ROUTE}/update-settings`, formData)
          .then((res) => {
            // Update local storage values here
            localStorage.setItem('isArabic', JSON.stringify(isArabicTemp))
            localStorage.setItem('isEnglish', JSON.stringify(isEnglishTemp))
            localStorage.setItem('isHebrew', JSON.stringify(isHebrewTemp))
            localStorage.setItem('isNIS', JSON.stringify(isNISTemp))
            localStorage.setItem('isJOD', JSON.stringify(isJODTemp))
            localStorage.setItem('isUSD', JSON.stringify(isUSDTemp))

            setLoading(false)
            notifyEdit()
            setTimeout(() => {
              navigate('/dashboard')
            }, 500)
          })
          .catch((err) => {
            console.log(err)
            setLoading(false)
          })
      } else {
        setVisible(true)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    loading,
    setLoading,
    saveChanges,
    visible,
    setVisible,
    isEnglishTemp,
    isArabicTemp,
    isHebrewTemp,
    isNISTemp,
    isJODTemp,
    isUSDTemp,
    setIsArabicTemp,
    setIsEnglishTemp,
    setIsHebrewTemp,
    setIsNISTemp,
    setIsJODTemp,
    setIsUSDTemp,
    getSettings,
    logo,
    setLogo,
    updatedLogo,
    setUpdatedLogo,
  }
}
