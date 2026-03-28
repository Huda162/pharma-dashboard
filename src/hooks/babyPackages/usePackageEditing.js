import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_ROUTE } from 'src/routes'
import { notifyEdit } from 'src/utils/util'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../general/useLanguage'
import { useProducts } from '../products/useProducts'

export const usePackageEditing = (categoryId, item) => {
  const { name_ar, name_en, name_he, gender, month, products } = item
  const [nameAr, setNameAr] = useState('')
  const [nameEn, setNameEn] = useState('')
  const [nameHe, setNameHe] = useState('')
  const [babyGender, setGender] = useState('')
  const [birthMonth, setMonth] = useState('')
  const [selectedProducts, setSelectedProducts] = useState([])
  const [productsToSubmit, setProductsToSubmit] = useState([])
  const {
    products: allProducts,
    searchQuery,
    setSearchQuery,
    loading: productsLoading,
  } = useProducts()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const genders = [
    { value: 'female', label: 'أنثى' },
    { value: 'male', label: 'ذكر' },
  ]
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  const getPackage = async () => {
    setNameAr(name_ar)
    setNameEn(name_en)
    setNameHe(name_he)
    setGender(gender)
    setMonth(month)
    if (products && products.length > 0) {
      const transformedSelectedProducts = products.map((product) => ({
        id: product.id,
        name_ar: product.name_ar,
        name_en: product.name_en,
        price: product.price_nis_retail,
        image: product.image,
        quantity: product.pivot.quantity || 1,
        categories: product.categories,
        selectedCategory: product.pivot.selected_category_id,
      }))

      const transformedProductsToSubmit = products.map((product) => ({
        product_id: product.id,
        quantity: product.pivot.quantity || 1,
        selected_category_id: product.pivot.selected_category_id,
      }))

      setSelectedProducts(transformedSelectedProducts)
      setProductsToSubmit(transformedProductsToSubmit)
    }
  }

  useEffect(() => {
    getPackage()
  }, [])

  const update = () => {
    setLoading(true)
    const data = {
      name_ar: nameAr,
      name_en: nameEn,
      name_he: nameHe,
      gender: babyGender,
      month: birthMonth,
      products: productsToSubmit,
    }

    axios
      .put(`${API_ROUTE}/baby-packages/${categoryId}`, data)
      .then((res) => {
        setLoading(false)
        notifyEdit()
        setTimeout(() => {
          navigate('/packages')
        }, 500)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
        setVisible(true)
      })
  }
  const handleProductChange = (selectedProduct) => {
    if (selectedProduct && !selectedProducts.some((product) => product.id === selectedProduct.id)) {
      const defaultCategory =
        selectedProduct?.category_ids?.[0] || selectedProduct?.categories?.[0]?.id

      const newSelectedProduct = {
        ...selectedProduct,
        quantity: 1,
        selectedCategory: defaultCategory,
      }
      setSelectedProducts([...selectedProducts, newSelectedProduct])
      setProductsToSubmit([
        ...productsToSubmit,
        {
          product_id: newSelectedProduct.id,
          quantity: 1,
          selected_category_id: newSelectedProduct.selectedCategory,
        },
      ])

      setSearchQuery('')
    }
  }
  const updateProductCategory = (productId, categoryId) => {
    setSelectedProducts((prev) =>
      prev.map((product) =>
        product.id === productId ? { ...product, selectedCategory: categoryId } : product,
      ),
    )
    setProductsToSubmit((prev) =>
      prev.map((product) =>
        product.product_id === productId
          ? { ...product, selected_category_id: categoryId }
          : product,
      ),
    )
  }
  const removeProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter((product) => product.id !== productId))
    setProductsToSubmit(productsToSubmit.filter((product) => product.product_id !== productId))
  }

  const updateProductQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return

    const updatedSelectedProducts = selectedProducts.map((product) =>
      product.id === productId ? { ...product, quantity: newQuantity } : product,
    )
    setSelectedProducts(updatedSelectedProducts)

    const updatedProductsToSubmit = productsToSubmit.map((product) =>
      product.product_id === productId ? { ...product, quantity: newQuantity } : product,
    )
    setProductsToSubmit(updatedProductsToSubmit)
  }
  return {
    nameAr,
    setNameAr,
    nameEn,
    setNameEn,
    birthMonth,
    setMonth,
    months,
    babyGender,
    setGender,
    genders,
    allProducts,
    searchQuery,
    setSearchQuery,
    selectedProducts,
    handleProductChange,
    removeProduct,
    updateProductQuantity,
    loading,
    visible,
    setVisible,
    update,
    productsLoading,
    nameHe,
    setNameHe,
    updateProductCategory,
  }
}
