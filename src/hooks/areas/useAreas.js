import { useState, useEffect } from 'react'
import { API_ROUTE } from 'src/routes'
import { useDelete } from '../general/useDelete'
import { useDeleteMarked } from '../general/useDeleteMarked'

export const useAreas = () => {
  const [areas, setAreas] = useState([])
  const [filterValue, setFilterValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const getAreas = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_ROUTE}/areas`)
      const data = await response.json()
      setAreas(data.areas)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const getFilteredAreas = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_ROUTE}/search_category/${searchQuery}`)
      const data = await response.json()
      setAreas(data['categories'])
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
  } = useDeleteMarked(areas, 'areas', getAreas)

  const { showDialog, confirmDelete, executeDelete, cancelDelete } = useDelete('areas', getAreas)

  useEffect(() => {
    getAreas()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() == '') {
      getAreas()
    } else {
      getFilteredAreas()
    }
  }, [searchQuery])

  const handleOnDragEnd = (result) => {
    if (!result.destination) return
    const items = Array.from(areas)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    console.log(result)
    // const updatedItems = items.map((item, index) => ({
    //   ...item,
    //   order_number: index,
    // }))

    setAreas(items)

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
    areas,
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
