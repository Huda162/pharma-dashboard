import { useState } from 'react'
import axios from 'axios'
import { API_ROUTE } from 'src/routes'
import { notifyDelete, notifyFailed } from 'src/utils/util'

export const useDelete = (path, refreshFunction) => {
  const [showDialog, setShowDialog] = useState(false)
  const [deleteID, setDeleteID] = useState(null)

  const confirmDelete = (id) => {
    setDeleteID(id)
    setShowDialog(true)
  }
  const cancelDelete = (id) => {
    setDeleteID(null)
    setShowDialog(false)
  }
  const executeDelete = async () => {
    try {
      await axios.delete(`${API_ROUTE}/${path}/${deleteID}`)
      notifyDelete()
      refreshFunction()
    } catch (error) {
      console.error(error)
      notifyFailed()
    } finally {
      setDeleteID(null)
      setShowDialog(false)
    }
  }
  return {
    showDialog,
    setShowDialog,
    confirmDelete,
    executeDelete,
    cancelDelete,
  }
}
