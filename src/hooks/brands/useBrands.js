import { useState, useEffect } from 'react'
import { API_ROUTE } from 'src/routes'
import { useDelete } from '../general/useDelete'
import { useDeleteMarked } from '../general/useDeleteMarked'

export const useBrands = () => {
  const [brands, setBrands] = useState([])
  const [filterValue, setFilterValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const getBrands = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_ROUTE}/brands`)
      const data = await response.json()
      setBrands(data.brands)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const getFilteredBrands = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_ROUTE}/search_category/${searchQuery}`)
      const data = await response.json()
      setBrands(data['categories'])
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
  } = useDeleteMarked(brands, 'brands', getBrands)

  const { showDialog, confirmDelete, executeDelete, cancelDelete } = useDelete('brands', getBrands)

  useEffect(() => {
    getBrands()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() == '') {
      getBrands()
    } else {
      getFilteredBrands()
    }
  }, [searchQuery])

  const handleOnDragEnd = (result) => {
    if (!result.destination) return
    const items = Array.from(brands)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    console.log(result)
    // const updatedItems = items.map((item, index) => ({
    //   ...item,
    //   order_number: index,
    // }))

    setBrands(items)

    // const request = updatedItems.forEach(async (item) => {
    //   const formData = new FormData()
    //   try{
    //     await axios.put(`${API_ROUTE}/products/${item.id}/order-number`, {order_number: item.order_number})
    //     console.log(item.id, ' updated to ', item.order_number)
    //   }catch(error){
    //     console.error(error)
    //   }
    // })
  }
  return {
    brands,
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
    handleOnDragEnd,
  }
}
