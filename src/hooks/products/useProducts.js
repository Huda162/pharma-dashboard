import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_ROUTE } from 'src/routes'
import { notifyEdit, notifyEdit2 } from 'src/utils/util'
import { useDelete } from '../general/useDelete'
import { useDeleteMarked } from '../general/useDeleteMarked'

export const useProducts = (pageParam) => {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [links, setLinks] = useState([])
  const [currentPage, setCurrentPage] = useState(pageParam ? parseInt(pageParam) : 1)
  const [categoryFilter, setCategoryFilter] = useState()
  const [searchQuery, setSearchQuery] = useState('')
  // const [loadingSwitch, setLoadingSwitch] = useState(false)
  const [loadingId, setLoadingId] = useState()
  const [sortKey, setSortKey] = useState('')
  const [selectedProduct, setSelectedProduct] = useState()
  const [productDialog, setProductDialog] = useState(false)
  const [loadingOfferId, setLoadingOfferId] = useState()
  const [offerDialog, setOfferDialog] = useState(false)
  const [discount, setDiscount] = useState('')
  const [offerId, setOfferId] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [priceType, setPriceType] = useState('')
  const [tempPrice, setTempPrice] = useState('')
  const [oldPrice, setOldPrice] = useState('')
  const [total, setTotal] = useState('')
  const [filter, setFilter] = useState('all')
  const [loadingUpdate, setLoadingUpdate] = useState(false)
  const [gender, setGender] = useState('')

  const handlePriceClick = (id, type, currentPrice) => {
    setEditingId(id)
    setPriceType(type)
    setTempPrice(currentPrice)
    setOldPrice(currentPrice)
  }

  const handlePriceChange = (e) => {
    setTempPrice(e.target.value)
  }

  const handleSavePrice = async () => {
    setLoadingUpdate(editingId)
    const updatedProducts = products.map((product) =>
      product.id === editingId
        ? priceType === 'stock'
          ? { ...product, product_stock: tempPrice }
          : priceType === 'retail'
          ? { ...product, price_nis_retail: tempPrice }
          : { ...product, price_nis_wholesale: tempPrice }
        : product,
    )
    setProducts(updatedProducts)

    try {
      await axios.patch(
        `${API_ROUTE}/products/${editingId}`,
        priceType === 'stock'
          ? { product_stock: tempPrice }
          : priceType === 'retail'
          ? { price_nis_retail: tempPrice }
          : { price_nis_wholesale: tempPrice },
      )
      notifyEdit2()
      setLoadingUpdate(null)
      setEditingId(null)
      setPriceType('')
      setTempPrice('')
    } catch (error) {
      console.error(error)
      const failedProductsUpdate = products.map((product) =>
        product.id === editingId
          ? priceType === 'stock'
            ? { ...product, product_stock: oldPrice }
            : priceType === 'retail'
            ? { ...product, price_nis_retail: oldPrice }
            : { ...product, price_nis_wholesale: oldPrice }
          : product,
      )
      setProducts(failedProductsUpdate)
    }
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setPriceType('')
    setTempPrice('')
    setLoadingUpdate(null)
    setOldPrice('')
  }

  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return description.slice(0, maxLength) + '...'
    }
    return description
  }

  const openOfferDialog = (id, itemDiscount) => {
    setDiscount(itemDiscount === '0' ? '1' : itemDiscount)
    setOfferId(id)
    setOfferDialog(true)
  }

  const getProducts = async () => {
    setLoading(true)
    const params = new URLSearchParams()

    if (filter === 'without_brand') params.append('without_brand', 'true')
    if (filter === 'zero_price') params.append('zero_price', 'true')
    if (filter === 'stock_zero_or_less') params.append('stock_zero_or_less', 'true')
    if (filter === 'without_category') params.append('without_category', 'true')
    const response = await fetch(`${API_ROUTE}/products?page=${currentPage}&${params.toString()}`)
    const data = await response.json()
    setProducts(data['products']['data'])
    setLinks(data['products']['links'])
    setTotal(data['counts'])
    setLoading(false)
  }

  const getFilteredProducts = async () => {
    const response = await fetch(
      `${API_ROUTE}/filter_products?page=${currentPage}&name=${searchQuery}&gender=${gender}`,
    )
    const data = await response.json()
    setProducts(data?.products?.data)
    setLinks(data?.products?.links)
    setLoading(false)
  }

  const getProductsByCategory = async () => {
    const response = await fetch(
      `${API_ROUTE}/products_by_category/${categoryFilter}?page=${currentPage}`,
    )
    const data = await response.json()
    setProducts(data['products']['data'])
    setLinks(data['products']['links'])
    setLoading(false)
  }

  const updateAvailability = async (id, availability) => {
    setLoadingId(id)
    const updatedProducts = products.map((product) =>
      product.id === id
        ? { ...product, available: availability === 'true' ? 'false' : 'true' }
        : product,
    )
    setProducts(updatedProducts)

    const formData = new FormData()
    formData.append('product_id', id)
    formData.append('available', availability === 'true' ? 'false' : 'true')

    try {
      await axios.post(`${API_ROUTE}/update_product_status`, formData)
      notifyEdit2()
      setLoadingId(null)
    } catch (error) {
      console.error(error)
      const failedProductsUpdate = products.map((product) =>
        product.id === id ? { ...product, available: availability } : product,
      )
      setProducts(failedProductsUpdate)
    }
  }
  const updateOffer = async (id, isOffer) => {
    setLoadingOfferId(id)
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, is_offer: isOffer === 'true' ? 'false' : 'true' } : product,
    )
    setProducts(updatedProducts)

    const formData = new FormData()
    formData.append('product_id', id)
    formData.append('is_offer', isOffer === 'true' ? 'false' : 'true')
    formData.append('discount_percentage', discount)

    try {
      await axios.post(`${API_ROUTE}/update_product_is_offer_status`, formData)
      notifyEdit2()
      setLoadingOfferId(null)
    } catch (error) {
      console.error(error)
      const failedProductsUpdate = products.map((product) =>
        product.id === id ? { ...product, is_offer: isOffer } : product,
      )
      setProducts(failedProductsUpdate)
    }
    setOfferDialog(false)
  }

  const { showDialog, confirmDelete, executeDelete, cancelDelete } = useDelete(
    'products',
    getProducts,
  )

  const {
    showDeleteDialog,
    markedItems,
    toggleMarkedItem,
    markAll,
    deleteMarked,
    cancelDeleteMarked,
    executeDeleteMarked,
  } = useDeleteMarked(products, 'products', getProducts)

  useEffect(() => {
    if (searchQuery.trim() === '' && (categoryFilter === '' || categoryFilter === undefined)) {
      getProducts()
    } else if (searchQuery.trim() !== '') {
      getFilteredProducts()
    } else if (categoryFilter !== '' || categoryFilter !== undefined) {
      getProductsByCategory()
    }
  }, [currentPage, filter])

  useEffect(() => {
    if (searchQuery.trim() === '' && gender.trim() === '') {
      getProducts()
    } else {
      getFilteredProducts()
    }
  }, [searchQuery, gender])

  useEffect(() => {
    if (categoryFilter === '' || categoryFilter === undefined) {
      getProducts()
    } else {
      getProductsByCategory()
    }
  }, [categoryFilter])

  const handlePageClick = (page) => {
    setCurrentPage(page)
  }

  const handleDeletePage = () => {
    deleteMarked()
    setCurrentPage(1)
  }

  const handleOnDragEnd = async (result) => {
    if (!result.destination) return
    const items = Array.from(products)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    console.log(result)

    setProducts(items)
    try {
      await axios.put(`${API_ROUTE}/products/${result.draggableId}/order-number`, {
        order_number: result.destination.index + 1,
      })
    } catch (error) {
      console.error(error)
    }
  }

  return {
    products,
    loading,
    showDialog,
    confirmDelete,
    executeDelete,
    cancelDelete,
    handlePageClick,
    truncateDescription,
    categoryFilter,
    setCategoryFilter,
    toggleMarkedItem,
    markedItems,
    markAll,
    deleteMarked,
    cancelDeleteMarked,
    executeDeleteMarked,
    showDeleteDialog,
    currentPage,
    setCurrentPage,
    links,
    updateAvailability,
    searchQuery,
    setSearchQuery,
    handleDeletePage,
    loadingId,
    setProducts,
    handleOnDragEnd,
    sortKey,
    setSortKey,
    selectedProduct,
    setSelectedProduct,
    productDialog,
    setProductDialog,
    updateOffer,
    loadingOfferId,
    offerDialog,
    setOfferDialog,
    discount,
    setDiscount,
    openOfferDialog,
    offerId,
    editingId,
    setEditingId,
    priceType,
    setPriceType,
    tempPrice,
    setTempPrice,
    handlePriceChange,
    handlePriceClick,
    handleSavePrice,
    handleCancelEdit,
    total,
    filter,
    setFilter,
    loadingUpdate,
    gender,
    setGender,
  }
}
