import { useLoadScript } from '@react-google-maps/api'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { API_ROUTE } from 'src/routes'

export const useOrderDetails = () => {
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState([''])
  const [OrderDetails, setOrderDetails] = useState([])
  const [coordinate, setCoordinates] = useState({ lng: 0, lat: 0 })
  const params = useParams()
  const [visible, setVisible] = useState(false)
  const [openColor, setOpenColor] = useState(false)
  const [selectProduct, setSelectedProduct] = useState('')
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY || '',
  })
  const getOrderDetails = async () => {
    const url = `${API_ROUTE}/orders/${params.id}`
    const response = await fetch(url)
    const item = await response.json()
    setOrder(item['order'])
    setOrderDetails(item['order']['order_details'])
    const lattitude = item.order.lattitude
    const longitude = item.order.longitude
    setCoordinates({ lng: longitude, lat: lattitude })
  }

  useEffect(() => {
    getOrderDetails()
  }, [])
  const totals = OrderDetails.reduce((total, e) => {
    return total + e.sum_all
  }, 0)

  return {
    loading,
    order,
    OrderDetails,
    totals,
    isLoaded,
    visible,
    setVisible,
    coordinate,
    setCoordinates,
    openColor,
    setOpenColor,
    selectProduct,
    setSelectedProduct,
  }
}
