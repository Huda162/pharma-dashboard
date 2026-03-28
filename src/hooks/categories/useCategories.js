import { useState, useEffect } from 'react'
import { API_ROUTE } from 'src/routes'
import { useDelete } from '../general/useDelete'
import { useDeleteMarked } from '../general/useDeleteMarked'
import { arrayMove } from '@dnd-kit/sortable'
import axios from 'axios'

export const useCategories = () => {
  const [categories, setCategories] = useState([])
  const [filterValue, setFilterValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [dragMode, setDragMode] = useState(false)

  const getCategories = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_ROUTE}/categories`)
      const data = await response.json()
      setCategories(data.categories)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const getFilteredCategories = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_ROUTE}/search_category/${searchQuery}`)
      const data = await response.json()
      setCategories(data['categories'])
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const {
    showDeleteDialog,
    markedItems,
    setMarkedItems,
    toggleMarkedItem,
    markAll,
    deleteMarked,
    cancelDeleteMarked,
    executeDeleteMarked,
  } = useDeleteMarked(categories, 'categories', getCategories)

  const { showDialog, confirmDelete, executeDelete, cancelDelete } = useDelete(
    'categories',
    getCategories,
  )

  useEffect(() => {
    getCategories()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() == '') {
      getCategories()
    } else {
      getFilteredCategories()
    }
  }, [searchQuery])

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (active.id !== over.id) {
      const oldIndex = categories.findIndex((item) => item.id === active.id)
      const newIndex = categories.findIndex((item) => item.id === over.id)
      const newProducts = arrayMove(categories, oldIndex, newIndex)
      setCategories(newProducts)

      axios
        .put(`${API_ROUTE}/categories/${active.id}/order-number`, {
          order_number: newIndex + 1,
        })
        .catch(console.error)
    }
  }
  const toggleDragMode = () => {
    setDragMode(!dragMode)
  }
  return {
    categories,
    loading,
    showDialog,
    confirmDelete,
    executeDelete,
    cancelDelete,
    setFilterValue,
    markedItems,
    setMarkedItems,
    showDeleteDialog,
    toggleMarkedItem,
    markAll,
    deleteMarked,
    cancelDeleteMarked,
    executeDeleteMarked,
    searchQuery,
    setSearchQuery,
    handleDragEnd,
    toggleDragMode,
    dragMode,
  }
}
