import { useState } from 'react'
import axios from 'axios'
import { API_ROUTE } from 'src/routes'
import { notifyAdd } from 'src/utils/util'
import { useNavigate } from 'react-router-dom'
import { useProducts } from '../products/useProducts'
import { useFormValidation } from '../general/useFormValidation'
import { useCategories } from '../categories/useCategories'

export const useSliderAdding = () => {
  const [sliderImage, setSliderImage] = useState('')
  const [sliderImageMobile, setSliderImageMobile] = useState('')
  const [productID, setProductID] = useState('')
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const { products } = useProducts()
  const { categories } = useCategories()
  const navigate = useNavigate()
  const [type, setType] = useState('product')
  const [fileType, setFileType] = useState('image')

  const addSlider = async () => {
    setLoading(true)
    let formData = new FormData()
    if (fileType === 'image') {
      formData.append('image', sliderImage)
    } else {
      formData.append('image', sliderImageMobile)
      formData.append('video', sliderImage)
    }
    formData.append('image_mobile', sliderImageMobile)
    formData.append('data_id', productID)
    formData.append('type', type)
    const response = await axios
      .post(`${API_ROUTE}/sliders`, formData)
      .then((res) => {
        setLoading(false)
        notifyAdd()
        setTimeout(() => {
          navigate('/sliders')
        }, 500)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
        setVisible(true)
      })
  }

  const handleDesktopFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (fileType === 'image') {
        const imageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
        if (imageTypes.includes(file.type)) {
          setSliderImage(file)
        } else {
          alert('يرجى اختيار ملف صورة فقط (JPEG, PNG, GIF, WebP)')
          e.target.value = ''
        }
      } else if (fileType === 'video') {
        const videoTypes = ['video/mp4', 'video/webm', 'video/ogg']
        if (videoTypes.includes(file.type)) {
          setSliderImage(file)
        } else {
          alert('يرجى اختيار ملف فيديو فقط (MP4, WebM, OGG)')
          e.target.value = ''
        }
      }
    }
  }

  const handleMobileFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const imageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
      if (imageTypes.includes(file.type)) {
        setSliderImageMobile(file)
      } else {
        alert('يرجى اختيار ملف صورة فقط للهاتف (JPEG, PNG, GIF, WebP)')
        e.target.value = ''
      }
    }
  }

  const { handleSubmit, validated } = useFormValidation(addSlider)
  return {
    sliderImage,
    setSliderImage,
    sliderImageMobile,
    setSliderImageMobile,
    products,
    productID,
    setProductID,
    loading,
    addSlider,
    handleSubmit,
    validated,
    visible,
    setVisible,
    categories,
    type,
    setType,
    fileType,
    setFileType,
    handleDesktopFileChange,
    handleMobileFileChange,
  }
}
