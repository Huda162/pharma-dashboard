const useDragEnd = (items, setItems, path) => {

    const handleOnDragEnd = async(result) => {
        if (!result.destination) return
        console.log(result)
        const newItems = Array.from(items)
        const [reorderedItem] = newItems.splice(result.source.index, 1)
        newItems.splice(result.destination.index, 0, reorderedItem)
        
        setItems(items)
          try{
            await axios.put(`${API_ROUTE}/products/${result.draggableId}/order-number`, {order_number: result.destination.index + 1})
          }catch(error){
            console.error(error)
          }
    
      }

      return {
        handleOnDragEnd
      }
}