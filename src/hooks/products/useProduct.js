import { useState, useEffect } from 'react'
import { API_ROUTE } from 'src/routes'
import { useCategories } from '../categories/useCategories'

export const useProduct = (productId, item) => {
  const [productNameAr, setProductNameAr] = useState('')
  const [productNameEng, setProductNameEng] = useState('')
  const [productNameHeb, setProductNameHeb] = useState('')
  const [productPriceNIS, setProductPriceNIS] = useState('')
  const [productPriceUSD, setProductPriceUSD] = useState('')
  const [productPriceJOD, setProductPriceJOD] = useState('')
  const [categoryID, setCategoryID] = useState('')
  const [descriptionAr, setDescriptionAr] = useState('')
  const [descriptionEng, setDescriptionEng] = useState('')
  const [descriptionHeb, setDescriptionHeb] = useState('')
  const [images, setImages] = useState([])
  const { categories } = useCategories()
  const [sizes, setSizes] = useState([])
  const [colors, setColors] = useState([])

  const getProduct = async () => {
    const url = `${API_ROUTE}/products/${productId}`
    const response = await fetch(url)
    const item = await response.json()
    setProductNameAr(item['product']['name_ar'])
    setProductNameEng(item['product']['name_en'])
    setProductNameHeb(item['product']['name_he'])
    setProductPriceNIS(item['product']['price_nis'])
    setProductPriceUSD(item['product']['price_usd'])
    setProductPriceJOD(item['product']['price_jod'])
    setImages(item['product']['images'])
    setCategoryID(item['product']['category_id'])
    setDescriptionAr(item['product']['description_ar'])
    setDescriptionEng(item['product']['description_en'])
    setDescriptionHeb(item['product']['description_he'])
    setSizes(item['product']['product_sizes'])
    setColors(item['product']['product_colors'])
  }

  useEffect(() => {
    getProduct()
  }, [])
  return {
    productNameAr,
    productNameEng,
    productNameHeb,
    productPriceNIS,
    productPriceUSD,
    productPriceJOD,
    categoryID,
    descriptionAr,
    descriptionEng,
    descriptionHeb,
    images,
    sizes,
    categories,
    colors
  }
}
