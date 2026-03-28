import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_ROUTE } from 'src/routes'
import { notifyDelete, notifyEdit, notifyFailed } from 'src/utils/util'
import { useNavigate } from 'react-router-dom'
import { useCategories } from '../categories/useCategories'
import { useLanguage } from '../general/useLanguage'
import { useFormValidation } from '../general/useFormValidation'

export const useStockAdding = (sizes, colors, productId) => {
  const [productSizes, setProductSizes] = useState([])
  const [productColors, setProductColors] = useState([])
  const [stocks, setStocks] = useState([])
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)

  const getProduct = async () => {
    setProductColors(colors)
    setProductSizes(sizes)
    const newStocks = colors?.map((color) => {
      return {
        color: color,
        sizes: [],
      }
    })
    setStocks(newStocks)
    console.log(newStocks)
  }

  const navigate = useNavigate()

  useEffect(() => {
    getProduct()
  }, [])

  const handleSelectColor = () => {}

  const addStock = () => {
    setLoading(true)
    let stocksToSubmit = []
    stocks?.forEach((stock) => {
      stock?.sizes?.forEach((size) => {
        const newStock = {
          product_id: productId,
          size_id: size.size,
          color_id: stock.color.id,
          qty: size.qty,
        }
        stocksToSubmit.push(newStock)
      })
    })

    console.log(stocksToSubmit)

    axios
      .post(`${API_ROUTE}/add_products_second_stage`, { stocks: stocksToSubmit })
      .then((res) => {
        setLoading(false)
        notifyEdit()
        setTimeout(() => {
          navigate('/products')
        }, 500)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
        setVisible(true)
      })
  }

  const handleSelectSize = (sizeId, colorId) => {
    const newStocks = [...stocks]
    newStocks.forEach((element) => {
      if (element.color.id === colorId) {
        if (element.sizes.find((size) => size.size === sizeId)) {
          element.sizes = element.sizes.filter((size) => size.size !== sizeId)
        } else {
          element.sizes = [...element.sizes, { size: sizeId, qty: 0 }]
        }
      }
    })
    setStocks(newStocks)
    console.log(newStocks)
  }
  const handleQtyChange = (colorId, sizeId, value) => {
    const newStocks = [...stocks]
    newStocks.forEach((element) => {
      if (element.color.id === colorId) {
        element.sizes.forEach((size) => {
          if (size.size === sizeId) {
            size.qty = value
          }
        })
      }
    })
    setStocks(newStocks)
    console.log(newStocks)
  }
  const selectAllSizes = (colorId) => {
    const newStocks = [...stocks]
    newStocks.forEach((element) => {
      if (element.color.id === colorId) {
        if (element.sizes.length === productSizes.length) {
          element.sizes = []
        } else {
          productSizes.forEach((size) => {
            element.sizes = [...element.sizes, { size: size.id, qty: 0 }]
          })
        }
      }
    })
    setStocks(newStocks)
    console.log(newStocks)
  }

  useEffect(() => {
    productColors?.forEach((color, index) => {
      selectAllSizes(color.id)
    })
  }, [productColors])

  const { handleSubmit, validated } = useFormValidation(addStock)
  return {
    productColors,
    productSizes,
    stocks,
    handleSubmit,
    validated,
    handleSelectSize,
    loading,
    visible,
    setVisible,
    handleQtyChange,
    selectAllSizes,
  }
}
