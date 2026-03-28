import { useState, useEffect } from 'react'
import { API_ROUTE } from 'src/routes'

export const useAllProducts = () => {
  const [products, setProducts] = useState()
  const getAllProducts = async () => {
    console.log('inside get all products')
    const response = await fetch(`${API_ROUTE}/all_products`)
    const data = await response.json()
    setProducts(data)
    console.log('data', data)
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  return {
    products,
  }
}
