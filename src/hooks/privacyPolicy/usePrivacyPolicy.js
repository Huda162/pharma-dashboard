import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_ROUTE } from 'src/routes'
import { notifyDelete } from 'src/utils/util'

export const usePrivacyPolicy = () => {
    const [deleteId, setDeleteId] = useState('')
  const [loading, setLoading] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const {categories} = useCategories()

  const confirmDelete = (id) => {
    setDeleteId(id)
    setShowDialog(true)
  }

  const cancelDelete = () => {
    setDeleteId(null)
    setShowDialog(false)
  }

  const executeDelete = async () => {
    try {
      await axios.delete(`${API_ROUTE}/categories/${deleteId}`)
      getCategories()
    } catch (error) {
      console.error(error)
    } finally {
      setDeleteId(null)
      setShowDialog(false)
    }
  }
  useEffect(() => {
    getCategories()
  }, [])

  return{
    
  }
}