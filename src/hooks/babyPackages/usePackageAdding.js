import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_ROUTE } from 'src/routes'
import { notifyAdd } from 'src/utils/util'
import { useNavigate } from 'react-router-dom'
import { useFormValidation } from '../general/useFormValidation'
import { useProducts } from '../products/useProducts'

export const usePackageAdding = () => {
  const [nameAr, setNameAr] = useState('')
  const [nameEn, setNameEn] = useState('')
  const [nameHe, setNameHe] = useState('')
  const [month, setMonth] = useState('')
  const [selectedProducts, setSelectedProducts] = useState([])
  const [productsToSubmit, setProductsToSubmit] = useState([])
  const {
    products,
    searchQuery,
    setSearchQuery,
    loading: productsLoading,
    gender,
    setGender,
  } = useProducts()
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()
  const genders = [
    { value: 'female', label: 'أنثى' },
    { value: 'male', label: 'ذكر' },
  ]
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  const addPackage = async () => {
    setLoading(true)
    const data = {
      name_ar: nameAr,
      name_en: nameEn,
      name_he: nameHe,
      gender: gender,
      month: month,
      products: productsToSubmit,
    }

    try {
      await axios.post(`${API_ROUTE}/baby-packages`, data)
      setLoading(false)
      notifyAdd()
      setTimeout(() => {
        navigate('/packages')
      }, 500)
    } catch (error) {
      console.log(error)
      setLoading(false)
      setVisible(true)
    }
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

  const { handleSubmit, validated } = useFormValidation(addPackage)

  return {
    nameAr,
    setNameAr,
    nameEn,
    setNameEn,
    month,
    setMonth,
    months,
    gender,
    setGender,
    genders,
    products,
    searchQuery,
    setSearchQuery,
    selectedProducts,
    handleProductChange,
    removeProduct,
    updateProductQuantity,
    loading,
    addPackage,
    handleSubmit,
    validated,
    visible,
    setVisible,
    productsLoading,
    nameHe,
    setNameHe,
    updateProductCategory,
  }
}
