import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_ROUTE } from 'src/routes'
import { notifyDelete, notifyEdit, notifyFailed } from 'src/utils/util'
import { useNavigate } from 'react-router-dom'
import { useCategories } from '../categories/useCategories'
import { useLanguage } from '../general/useLanguage'
import { useFormValidation } from '../general/useFormValidation'

export const useStockEditing = (productId) => {
  const [productSizes, setProductSizes] = useState([])
  const [productColors, setProductColors] = useState([])
  const [stocks, setStocks] = useState([])
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)

  const getProduct = async () => {
    try {
      const url = `${API_ROUTE}/products/${productId}`
      const response = await fetch(url)
      const item = await response.json()

      const sizes = item?.product?.product_sizes || []
      const colors = item?.product?.product_colors || []
      const existingStocks = item?.product?.product_variants || []
      console.log(existingStocks)

      setProductSizes(sizes)
      setProductColors(colors)

      const newStocks = initializeStocks(colors, sizes, existingStocks)
      setStocks(newStocks)
    } catch (error) {
      console.error('Error fetching product:', error)
      setVisible(true)
    }
  }

  const initializeStocks = (colors, sizes, existingStocks) => {
    const stocksArray = []

    // Case 1: No colors but have sizes - create a "default" color entry for sizes
    if ((!colors || colors.length === 0) && sizes.length > 0) {
      const defaultColor = {
        id: 'default-color',
        name: 'Default Color',
        color: '#cccccc',
        color_image: null,
        isDefault: true,
      }

      const sizesWithStock = sizes.map((size) => {
        const existingStock = existingStocks.find(
          (stock) => stock.product_size_id === size.id && !stock.product_color_id,
        )
        return {
          size: size.id,
          qty: existingStock?.stock || 0,
          min_stock: existingStock?.min_stock || 0,
          price_nis: existingStock?.price_nis || 0,
          sku: existingStock?.sku || '',
        }
      })

      stocksArray.push({
        color: defaultColor,
        sizes: sizesWithStock,
        colorStock: 0, // Initialize color stock for default color
      })
    }

    // Case 2: Have colors but no sizes - create color entries with color-level stock
    if (colors.length > 0 && (!sizes || sizes.length === 0)) {
      colors.forEach((color) => {
        const existingColorStock = existingStocks.find(
          (stock) => stock.product_color_id === color.id && !stock.product_size_id,
        )

        stocksArray.push({
          color: color,
          sizes: [],
          colorStock: existingColorStock?.stock || 0,
          min_stock: existingColorStock?.min_stock || 0,
          price_nis: existingColorStock?.price_nis || 0,
          sku: existingColorStock?.sku || '',
        })
      })
    }

    if (colors.length > 0 && sizes.length > 0) {
      colors.forEach((color) => {
        const colorSizes = sizes.map((size) => {
          const existingStock = existingStocks.find(
            (stock) => stock.product_color_id === color.id && stock.product_size_id === size.id,
          )
          return {
            size: size.id,
            qty: existingStock?.stock || 0,
            min_stock: existingStock?.min_stock || 0,
            price_nis: existingStock?.price_nis || 0,
            sku: existingStock?.sku || '',
          }
        })

        const existingColorStock = existingStocks.find(
          (stock) => stock.product_color_id === color.id && !stock.prodcut_size_id,
        )

        stocksArray.push({
          color: color,
          sizes: colorSizes,
          colorStock: existingColorStock?.stock || 0,
          min_stock: existingColorStock?.min_stock || 0,
          price_nis: existingColorStock?.price_nis || 0,
          sku: existingColorStock?.sku || '',
        })
      })
    }

    // Case 4: No colors and no sizes - create empty default entry
    if ((!colors || colors.length === 0) && (!sizes || sizes.length === 0)) {
      const defaultColor = {
        id: 'default-color',
        name: 'Default Product',
        color: '#cccccc',
        color_image: null,
        isDefault: true,
      }

      stocksArray.push({
        color: defaultColor,
        sizes: [],
        colorStock: 0,
        min_stock: 0,
        price_nis: 0,
        sku: '',
      })
    }

    return stocksArray
  }

  const navigate = useNavigate()

  useEffect(() => {
    if (productId) {
      getProduct()
    }
  }, [productId])

  const addStock = () => {
    setLoading(true)

    const stocksToSubmit = prepareStocksForSubmission()

    console.log('Submitting stocks:', stocksToSubmit)

    if (stocksToSubmit.length === 0) {
      notifyFailed('No stock data to submit')
      setLoading(false)
      return
    }

    axios
      .post(`${API_ROUTE}/products/${productId}?_method=PUT`, { variant_stocks: stocksToSubmit })
      .then((res) => {
        setLoading(false)
        notifyEdit()
        setTimeout(() => {
          navigate('/products')
        }, 500)
      })
      .catch((err) => {
        console.error('Error submitting stocks:', err)
        setLoading(false)
        setVisible(true)
        notifyFailed('Failed to update stock')
      })
  }
  useEffect(() => {
    console.log(stocks)
    console.log(prepareStocksForSubmission())
  }, [stocks])
  const prepareStocksForSubmission = () => {
    const stocksToSubmit = []

    stocks.forEach((stock) => {
      if (stock.colorStock != null && stock.colorStock !== '' && !isNaN(stock.colorStock)) {
        const colorStock = {
          product_size_id: null,
          product_color_id: stock.color.id === 'default-color' ? null : stock.color.id,
          stock: parseInt(stock.colorStock) || 0,
          min_stock: parseInt(stock.min_stock) || 0,
          sku: stock.sku || '',
          price_nis: parseFloat(stock.price_nis) || 0,
        }
        stocksToSubmit.push(colorStock)
      }

      // Submit size-level stock
      stock.sizes.forEach((size) => {
        if (size.qty != null && size.qty !== '' && !isNaN(size.qty)) {
          const sizeStock = {
            product_size_id: size.size,
            product_color_id: stock.color.id === 'default-color' ? null : stock.color.id,
            stock: parseInt(size.qty) || 0,
            min_stock: parseInt(size.min_stock) || 0,
            sku: size.sku || '',
            price_nis: parseFloat(size.price_nis) || 0,
          }
          stocksToSubmit.push(sizeStock)
        }
      })
    })

    return stocksToSubmit
  }

  const handleSelectSize = (sizeId, colorId) => {
    setStocks((prevStocks) => {
      return prevStocks.map((stock) => {
        if (stock.color.id === colorId) {
          const existingSizeIndex = stock.sizes.findIndex((size) => size.size === sizeId)

          if (existingSizeIndex > -1) {
            const updatedSizes = stock.sizes.filter((size) => size.size !== sizeId)
            return { ...stock, sizes: updatedSizes }
          } else {
            const newSize = {
              size: sizeId,
              qty: 0,
              min_stock: 0,
              price_nis: 0,
              sku: '',
            }
            return { ...stock, sizes: [...stock.sizes, newSize] }
          }
        }
        return stock
      })
    })
  }

  const handleQtyChange = (colorId, sizeId, value) => {
    setStocks((prevStocks) => {
      return prevStocks.map((stock) => {
        if (stock.color.id === colorId) {
          const updatedSizes = stock.sizes.map((size) => {
            if (size.size === sizeId) {
              return { ...size, qty: value }
            }
            return size
          })
          return { ...stock, sizes: updatedSizes }
        }
        return stock
      })
    })
  }
  const handleMinQtyChange = (colorId, sizeId, value) => {
    setStocks((prevStocks) => {
      return prevStocks.map((stock) => {
        if (stock.color.id === colorId) {
          const updatedSizes = stock.sizes.map((size) => {
            if (size.size === sizeId) {
              return { ...size, min_stock: value }
            }
            return size
          })
          return { ...stock, sizes: updatedSizes }
        }
        return stock
      })
    })
  }

  const handleColorStockChange = (colorId, value) => {
    setStocks((prevStocks) => {
      return prevStocks.map((stock) => {
        if (stock.color.id === colorId) {
          return { ...stock, colorStock: value }
        }
        return stock
      })
    })
  }
  const handleColorMinStockChange = (colorId, value) => {
    setStocks((prevStocks) => {
      return prevStocks.map((stock) => {
        if (stock.color.id === colorId) {
          return { ...stock, min_stock: value }
        }
        return stock
      })
    })
  }

  const handleFieldChange = (colorId, field, value) => {
    setStocks((prevStocks) => {
      return prevStocks.map((stock) => {
        if (stock.color.id === colorId) {
          return { ...stock, [field]: value }
        }
        return stock
      })
    })
  }

  const selectAllSizes = (colorId) => {
    setStocks((prevStocks) => {
      return prevStocks.map((stock) => {
        if (stock.color.id === colorId) {
          const hasAllSizes = productSizes.every((productSize) =>
            stock.sizes.some((size) => size.size === productSize.id),
          )

          if (hasAllSizes) {
            // Remove all sizes
            return { ...stock, sizes: [] }
          } else {
            // Add all sizes with default values
            const allSizes = productSizes.map((productSize) => {
              const existingSize = stock.sizes.find((size) => size.size === productSize.id)
              return (
                existingSize || {
                  size: productSize.id,
                  qty: 0,
                  min_stock: 0,
                  price_nis: 0,
                  sku: '',
                }
              )
            })
            return { ...stock, sizes: allSizes }
          }
        }
        return stock
      })
    })
  }

  const isSizeSelected = (colorId, sizeId) => {
    const stock = stocks.find((s) => s.color.id === colorId)
    return stock ? stock.sizes.some((size) => size.size === sizeId) : false
  }

  const getSizeQuantity = (colorId, sizeId) => {
    const stock = stocks.find((s) => s.color.id === colorId)
    if (!stock) return 0

    const size = stock.sizes.find((s) => s.size === sizeId)
    return size ? size.qty : 0
  }
  const getSizeMinQuantity = (colorId, sizeId) => {
    const stock = stocks.find((s) => s.color.id === colorId)
    if (!stock) return 0

    const size = stock.sizes.find((s) => s.size === sizeId)
    return size ? size.min_stock : 0
  }

  const getColorStock = (colorId) => {
    const stock = stocks.find((s) => s.color.id === colorId)
    return stock ? stock.colorStock : 0
  }

  const { handleSubmit, validated } = useFormValidation(addStock)

  return {
    productColors,
    productSizes,
    stocks,
    handleSubmit,
    validated,
    handleSelectSize,
    handleQtyChange,
    handleMinQtyChange,
    handleColorStockChange,
    handleColorMinStockChange,
    handleFieldChange,
    loading,
    visible,
    setVisible,
    selectAllSizes,
    isSizeSelected,
    getSizeQuantity,
    getSizeMinQuantity,
    getColorStock,
    hasColors: productColors.length > 0,
    hasSizes: productSizes.length > 0,
    hasData: productColors.length > 0 || productSizes.length > 0,
  }
}
