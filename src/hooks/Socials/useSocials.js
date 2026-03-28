import { useState, useEffect } from 'react'
import { API_ROUTE } from 'src/routes'
import { useDelete } from '../general/useDelete'

export const useSocials = () => {
  const [socials, setSocials] = useState([])
  const [loading, setLoading] = useState(false)

  const getSocials = async () => {
    const response = await fetch(`${API_ROUTE}/socials`)
    const data = await response.json()
    // eslint-disable-next-line dot-notation
    setSocials(data['socials'])
    setLoading(false)
  }

  const { showDialog, confirmDelete, executeDelete, cancelDelete } = useDelete(
    'socials',
    getSocials,
  )

  useEffect(() => {
    setLoading(true)
    getSocials()
  }, [])

  return {
    socials,
    loading,
    showDialog,
    executeDelete,
    confirmDelete,
    cancelDelete,
  }
}
