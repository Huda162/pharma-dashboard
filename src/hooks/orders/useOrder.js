import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_ROUTE } from 'src/routes'
import { useDelete } from '../general/useDelete'
import { notifyEdit } from 'src/utils/util'
import { useDeleteMarked } from '../general/useDeleteMarked'

export const useOrders = () => {
  const [orders, setOrders] = useState([])
  const [links, setLinks] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [dialogStatus, setDialogStatus] = useState(false)
  const [status, setStatus] = useState({})
  const [orderID, setOrderID] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [editMarkedDialog, setEditMarkedDialog] = useState(false)
  const [markedStatus, setMarkedStatus] = useState()

  const getOrders = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_ROUTE}/orders?page=${currentPage}`)
      const data = await response.json()
      setOrders(data['data'])
      setLinks(data['links'])
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const getOrdersByStatus = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_ROUTE}/filter_orders/${selectedStatus}`)
      const data = await response.json()
      setOrders(data['orders'])
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const { showDialog, confirmDelete, executeDelete, cancelDelete } = useDelete('orders', getOrders)

  const {
    showDeleteDialog,
    markedItems,
    setMarkedItems,
    toggleMarkedItem,
    markAll,
    deleteMarked,
    cancelDeleteMarked,
    executeDeleteMarked,
  } = useDeleteMarked(orders, 'orders', getOrders)

  const editMarked = () => {
    setEditMarkedDialog(true)
  }

  const executeEditMarked = async () => {
    setLoading(true)
    try {
      markedItems.forEach(async (id) => {
        const formData = new FormData()
        formData.append('status', markedStatus)
        formData.append('order_id', id)
        try {
          await axios.post(`${API_ROUTE}/update_order_status`, formData)
        } catch (error) {
          console.error(error)
        }
      })
    } catch (error) {
      console.error(error)
    } finally {
      setEditMarkedDialog(false)
      notifyEdit()
      setMarkedItems([])
      setTimeout(() => {
        getOrders()
        setLoading(false)
      }, 500)
    }
  }

  const updateStatus = async () => {
    const formData = new FormData()
    formData.append('status', status[orderID])
    formData.append('order_id', orderID)
    try {
      await axios.post(`${API_ROUTE}/update_order_status`, formData)
    } catch (error) {
      console.error(error)
    } finally {
      setDialogStatus(false)
      getOrders()
      notifyEdit()
    }
  }

  useEffect(() => {
    getOrders()
  }, [currentPage])

  useEffect(() => {
    if (selectedStatus === 'all') {
      getOrders(currentPage)
    } else {
      getOrdersByStatus(selectedStatus)
    }
    console.log(selectedStatus)
  }, [selectedStatus])

  const handlePageClick = (page) => {
    setCurrentPage(page)
  }

  return {
    orders,
    loading,
    showDialog,
    dialogStatus,
    status,
    orderID,
    confirmDelete,
    cancelDelete,
    executeDelete,
    updateStatus,
    setDialogStatus,
    setOrderID,
    setStatus,
    toggleMarkedItem,
    markedItems,
    showDeleteDialog,
    markAll,
    deleteMarked,
    cancelDeleteMarked,
    executeDeleteMarked,
    links,
    handlePageClick,
    getOrdersByStatus,
    selectedStatus,
    setSelectedStatus,
    editMarked,
    executeEditMarked,
    editMarkedDialog,
    setEditMarkedDialog,
    markedStatus,
    setMarkedStatus,
  }
}
