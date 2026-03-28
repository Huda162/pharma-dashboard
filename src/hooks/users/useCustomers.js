import { useState, useEffect } from 'react'
import { API_ROUTE } from 'src/routes'
import { useDelete } from '../general/useDelete'
import axios from 'axios'
import { notifyDelete, notifyFailed } from 'src/utils/util'
import { useDeleteMarked } from '../general/useDeleteMarked'

export const useCustomers = () => {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(false)

  const getCustomers = async () => {
    const response = await fetch(`${API_ROUTE}/users`)
    const data = await response.json()
    // eslint-disable-next-line dot-notation
    setCustomers(data['users'].filter((user) => user.role_id === 2))
    setLoading(false)
  }

  const { showDialog, confirmDelete, executeDelete, cancelDelete } = useDelete(
    'delete_user',
    getCustomers,
  )

  const {
    showDeleteDialog,
    markedItems,
    setMarkedItems,
    toggleMarkedItem,
    markAll,
    deleteMarked,
    cancelDeleteMarked,
    executeDeleteMarked,
  } = useDeleteMarked(customers, 'delete_user', getCustomers)

  useEffect(() => {
    setLoading(true)
    getCustomers()
  }, [])

  return {
    customers,
    loading,
    showDialog,
    confirmDelete,
    executeDelete,
    cancelDelete,
    toggleMarkedItem,
    markedItems,
    showDeleteDialog,
    markAll,
    deleteMarked,
    cancelDeleteMarked,
    executeDeleteMarked,
  }
}
