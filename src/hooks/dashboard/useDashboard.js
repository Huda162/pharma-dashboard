import { useEffect, useState } from 'react'
import { API_ROUTE } from 'src/routes'

export const useDashboard = () => {
  const [dashboard, setDashboard] = useState()
  const [sliders, setSliders] = useState()
  const [categories, setCategories] = useState()
  const [products, setProducts] = useState()
  const [orders, setOrders] = useState()
  const [bestSellingProducts, setBestSellingProducts] = useState([])
  const [bestUsers, setBestUsers] = useState()
  const [loading, setLoading] = useState()

  const getDashboard = async () => {
    setLoading(true)
    console.log('inside use dashboard')
    const response = await fetch(`${API_ROUTE}/dashboard`)
    const data = await response.json()
    setDashboard(data)
    setSliders(data.sliders)
    setCategories(data.categories)
    setProducts(data.products)
    setOrders(data.orders)
    setBestSellingProducts(data.best_sellers_products)
    setBestUsers(data.best_users)
    setLoading(false)
  }

  useEffect(() => {
    getDashboard()
  }, [])

  return {
    orders,
    products,
    sliders,
    categories,
    dashboard,
    bestSellingProducts,
    bestUsers,
    loading,
  }
}
