import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_ROUTE } from 'src/routes'
import { notifyEdit } from 'src/utils/util'
import { useDelete } from '../general/useDelete'
import { useDeleteMarked } from '../general/useDeleteMarked'

export const useSliders = () => {
  const [sliders, setSliders] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingId, setLoadingId] = useState()

  const getSliders = async () => {
    const response = await fetch(`${API_ROUTE}/sliders`)
    const data = await response.json()
    // eslint-disable-next-line dot-notation
    setSliders(data['sliders'])
    setLoading(false)
  }
  const { showDialog, confirmDelete, executeDelete, cancelDelete } = useDelete(
    'sliders',
    getSliders,
  )

  const {
    showDeleteDialog,
    markedItems,
    toggleMarkedItem,
    markAll,
    deleteMarked,
    cancelDeleteMarked,
    executeDeleteMarked,
  } = useDeleteMarked(sliders, 'sliders', getSliders)

  const changeActiveStatus = async (id, activeState) => {
    setLoadingId(id)
    const formData = new FormData()
    formData.append('slider_id', id)
    if (activeState === 'true') {
      formData.append('active', 'false')
    } else {
      formData.append('active', 'true')
    }
    try {
      await axios.post(`${API_ROUTE}/update_slider_status`, formData)
    } catch (error) {
      console.error(error)
    } finally {
      getSliders()
      notifyEdit()
      setLoadingId(null)
    }
  }

  useEffect(() => {
    setLoading(true)
    getSliders()
  }, [])

  return {
    loading,
    showDialog,
    sliders,
    confirmDelete,
    executeDelete,
    cancelDelete,
    toggleMarkedItem,
    markedItems,
    markAll,
    deleteMarked,
    cancelDeleteMarked,
    executeDeleteMarked,
    showDeleteDialog,
    changeActiveStatus,
    loadingId,
  }
}
