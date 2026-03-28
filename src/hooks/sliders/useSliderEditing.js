import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_ROUTE } from 'src/routes'
import { notifyEdit } from 'src/utils/util'
import { useNavigate } from 'react-router-dom'
import { useProducts } from '../products/useProducts'
import { useCategories } from '../categories/useCategories'

export const useSliderEditing = (sliderId, item) => {
  const { image, image_mobile, type, data_id } = item
  const navigate = useNavigate()
  const [sliderPic, setSliderPic] = useState()
  const [sliderPicMobile, setSliderPicMobile] = useState()
  const [productID, setProductID] = useState('')
  const [productName, setProductName] = useState('')
  const [imagePC, setImagePC] = useState('')
  const [imageMobile, setImageMobile] = useState('')
  const [loading, setLoading] = useState(false)
  const { products } = useProducts()
  const { categories } = useCategories()
  const [visible, setVisible] = useState(false)
  const [sliderType, setSliderType] = useState()
  const [fileType, setFileType] = useState('image')

  const getSlider = async () => {
    const url = `${API_ROUTE}/sliders/${sliderId}`
    const response = await fetch(url)
    const item = await response.json()
    setSliderPic(image)
    setSliderPicMobile(image_mobile)
    setProductID(data_id)
    setSliderType(type)
  }

  useEffect(() => {
    getSlider()
  }, [])

  const update = () => {
    setLoading(true)
    const formData = new FormData()
    formData.append('data_id', productID || 0)
    formData.append('image', imagePC)
    formData.append('image_mobile', imageMobile)
    formData.append('type', sliderType)
    if (fileType === 'image') {
      formData.append('image', imagePC)
    } else {
      formData.append('image', imageMobile)
      formData.append('video', imagePC)
    }
    axios
      .post(`${API_ROUTE}/sliders/${sliderId}?_method=PUT`, formData)
      .then((res) => {
        setLoading(false)
        notifyEdit()
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
          setImagePC(file)
        } else {
          alert('يرجى اختيار ملف صورة فقط (JPEG, PNG, GIF, WebP)')
          e.target.value = ''
        }
      } else if (fileType === 'video') {
        const videoTypes = ['video/mp4', 'video/webm', 'video/ogg']
        if (videoTypes.includes(file.type)) {
          setImagePC(file)
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
        setImageMobile(file)
      } else {
        alert('يرجى اختيار ملف صورة فقط للهاتف (JPEG, PNG, GIF, WebP)')
        e.target.value = ''
      }
    }
  }
  return {
    sliderPic,
    sliderPicMobile,
    products,
    productID,
    setProductID,
    image: imagePC,
    setImage: setImagePC,
    image_mobile: imageMobile,
    setImageMobile,
    loading,
    update,
    visible,
    setVisible,
    type: sliderType,
    setType: setSliderType,
    categories,
    fileType,
    setFileType,
    handleDesktopFileChange,
    handleMobileFileChange,
  }
}
