import { useState } from 'react'
import { notifyDelete, notifyFailed } from 'src/utils/util'
import axios from 'axios'
import { API_ROUTE } from 'src/routes'

export const useDeleteMarked = (items, path, refreshFunction) => {
  const [markedItems, setMarkedItems] = useState([])
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const toggleMarkedItem = (id) => {
    if (markedItems.find((itemId) => itemId === id)) {
      const newItems = markedItems.filter((itemId) => itemId !== id)
      setMarkedItems([...newItems])
    } else {
      const newItems = [...markedItems, id]
      setMarkedItems([...newItems])
    }
  }

  const markAll = () => {
    const allCurrentItemsMarked = items.every((item) => markedItems.includes(item.id))

    if (allCurrentItemsMarked) {
      setMarkedItems((prev) => prev.filter((id) => !items.some((item) => item.id === id)))
    } else {
      const currentPageIds = items.map((item) => item.id)
      setMarkedItems((prev) => [...new Set([...prev, ...currentPageIds])])
    }
  }

  const deleteMarked = () => {
    setShowDeleteDialog(true)
  }

  const cancelDeleteMarked = () => {
    setShowDeleteDialog(false)
  }

  const executeDeleteMarked = async () => {
    try {
      await Promise.all(markedItems.map((item) => axios.delete(`${API_ROUTE}/${path}/${item}`)))
      notifyDelete()
    } catch (error) {
      console.error(error)
      notifyFailed()
    } finally {
      setShowDeleteDialog(false)
      refreshFunction()
      setMarkedItems([])
    }
  }

  return {
    showDeleteDialog,
    markedItems,
    setMarkedItems,
    toggleMarkedItem,
    markAll,
    deleteMarked,
    cancelDeleteMarked,
    executeDeleteMarked,
  }
}
