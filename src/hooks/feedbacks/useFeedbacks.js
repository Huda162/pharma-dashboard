import { useState, useEffect } from 'react'
import { API_ROUTE } from 'src/routes'
import { useDelete } from '../general/useDelete'
import { notifyDelete, notifyFailed } from 'src/utils/util'
import axios from 'axios'

export const useFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([])
  const [loading, setLoading] = useState(false)
  const [itemOffset, setItemOffset] = useState(0)
  const itemsPerPage = 10
  const [markedFeedbacks, setMarkedFeedbacks] = useState([])
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const getFeedbacks = async () => {
    const response = await fetch(`${API_ROUTE}/feedbacks`)
    const data = await response.json()
    // eslint-disable-next-line dot-notation
    setFeedbacks(data['feedbacks'])
    setLoading(false)
    setItemOffset(0)
  }

  const toggleMarkedFeedback = (id) => {
    if (markedFeedbacks.find((itemId) => itemId == id)) {
      const newFeedbacks = markedFeedbacks.filter((itemId) => itemId !== id)
      setMarkedFeedbacks([...newFeedbacks])
    } else {
      const newFeedbacks = [...markedFeedbacks, id]
      setMarkedFeedbacks([...newFeedbacks])
    }
  }

  const markAll = () => {
    if (markedFeedbacks.length == feedbacks.length) {
      setMarkedFeedbacks([])
    } else {
      const newFeedbacks = feedbacks.map((item) => item.id)
      setMarkedFeedbacks([...newFeedbacks])
    }
  }

  const deleteMarked = () => {
    setShowDeleteDialog(true)
  }

  const cancelDeleteMarked = () => {
    setShowDeleteDialog(false)
  }

  const executeDeleteMarked = () => {
    try {
      const newFeedbacks = markedFeedbacks.map(async (item) => {
        try {
          await axios.delete(`${API_ROUTE}/feedbacks/${item}`)
        } catch (error) {
          console.error(error)
          notifyFailed()
        } finally {
          getFeedbacks()
        }
      })
    } catch (error) {
      console.error(error)
      notifyFailed()
    } finally {
      setShowDeleteDialog(false)
      getFeedbacks()
      notifyDelete()
      setMarkedFeedbacks([])
    }
  }

  const { showDialog, confirmDelete, executeDelete, cancelDelete } = useDelete(
    'feedbacks',
    getFeedbacks,
  )

  useEffect(() => {
    setLoading(true)
    getFeedbacks()
  }, [])

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage
    setItemOffset(newOffset)
  }

  return {
    feedbacks,
    loading,
    showDialog,
    itemOffset,
    confirmDelete,
    executeDelete,
    cancelDelete,
    toggleMarkedFeedback,
    markedFeedbacks,
    markAll,
    deleteMarked,
    cancelDeleteMarked,
    executeDeleteMarked,
    showDeleteDialog,
  }
}
