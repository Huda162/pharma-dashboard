import { useState, useEffect } from 'react'
import { API_ROUTE } from 'src/routes'
import { useDelete } from '../general/useDelete'

export const useBanners = () => {
  const [banners, setBanners] = useState([])
  const [selectedLanguage, setSelectedLanguage] = useState('ar')
  const [loading, setLoading] = useState(false)

  const getBanners = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_ROUTE}/banners`)
      const data = await response.json()
      setBanners(data.banners)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const { showDialog, confirmDelete, executeDelete, cancelDelete } = useDelete(
    'banners',
    getBanners,
  )

  useEffect(() => {
    getBanners()
  }, [])

  return {
    banners,
    loading,
    showDialog,
    confirmDelete,
    cancelDelete,
    executeDelete,
    selectedLanguage,
    setSelectedLanguage,
  }
}
