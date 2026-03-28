import { useState, useEffect } from 'react'
import { API_ROUTE } from 'src/routes'
import { useDelete } from '../general/useDelete'
import axios from 'axios'
import { notifyDelete, notifyFailed } from 'src/utils/util'
import { useDeleteMarked } from '../general/useDeleteMarked'

export const useUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  const getUsres = async () => {
    const response = await fetch(`${API_ROUTE}/users`)
    const data = await response.json()
    // eslint-disable-next-line dot-notation
    setUsers(data['users'].filter((user) => user.role_id === 1 || user.role_id === 2))
    setLoading(false)
  }

  const { showDialog, confirmDelete, executeDelete, cancelDelete } = useDelete(
    'delete_user',
    getUsres,
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
  } = useDeleteMarked(users, 'delete_user', getUsres)

  useEffect(() => {
    setLoading(true)
    getUsres()
  }, [])

  return {
    users,
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
