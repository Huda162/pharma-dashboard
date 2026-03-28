import { useState, useEffect } from 'react'
import { API_ROUTE } from 'src/routes'
import { useDelete } from '../general/useDelete'

export const useCopons = () => {
  const [copons, setCopons] = useState([])
  const [loading, setLoading] = useState(false)

  const getCopons = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_ROUTE}/copons`)
      const data = await response.json()
      setCopons(data['copons'])
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const { showDialog, confirmDelete, executeDelete, cancelDelete } = useDelete('copons', getCopons)

  useEffect(() => {
    setLoading(true)
    getCopons()
  }, [])

  return {
    copons,
    loading,
    showDialog,
    confirmDelete,
    executeDelete,
    cancelDelete,
  }
}
