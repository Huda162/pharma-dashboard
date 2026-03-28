import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_ROUTE } from 'src/routes'
import { notifyEdit } from 'src/utils/util'
import { useNavigate } from 'react-router-dom'
import { useProducts } from '../products/useProducts'
import { useCategories } from '../categories/useCategories'
import { useLanguage } from '../general/useLanguage'

export const useBannersEditing = (bannerId, item) => {
  const {
    name,
    title_ar,
    title_en,
    title_he,
    image,
    image_mobile,
    type,
    data_id,
    image_en,
    image_mobile_en,
  } = item
  const [bannerName, setBannerName] = useState('')
  const [bannerImage, setBannerImage] = useState('')
  const [bannerImageEn, setBannerImageEn] = useState('')
  const [bannerImageMobile, setBannerImageMobile] = useState('')
  const [bannerImageMobileEn, setBannerImageMobileEn] = useState('')
  const [bannerTitleAr, setBannerTitleAr] = useState('')
  const [bannerTitleEn, setBannerTitleEn] = useState('')
  const [bannerTitleHeb, setBannerTitleHeb] = useState('')
  const [bannerType, setType] = useState('product')
  const [dataId, setDataId] = useState('')
  const [bannerImageUpdated, setBannerImageUpdated] = useState()
  const [bannerImageEnUpdated, setBannerImageEnUpdated] = useState()
  const [bannerImageMobileUpdated, setBannerImageMobileUpdated] = useState()
  const [bannerImageMobileEnUpdated, setBannerImageMobileEnUpdated] = useState()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const { products } = useProducts()
  const { categories } = useCategories()
  const { isArabic, isEnglish, isHebrew } = useLanguage()
  console.log(bannerId)

  const getBanner = async () => {
    setBannerName(name)
    setBannerImage(image)
    setBannerImageEn(image_en)
    setBannerImageMobile(image_mobile)
    setBannerImageMobileEn(image_mobile_en)
    setBannerTitleAr(title_ar)
    setBannerTitleEn(title_en)
    setBannerTitleHeb(title_he)
    setType(type)
    setDataId(data_id)
  }

  useEffect(() => {
    getBanner()
  }, [])

  const update = () => {
    setLoading(true)
    const formData = new FormData()
    formData.append('name', bannerName)
    formData.append('image', bannerImageUpdated)
    formData.append('image_en', bannerImageEnUpdated)
    formData.append('image_mobile', bannerImageMobileUpdated)
    formData.append('image_mobile_en', bannerImageMobileEnUpdated)
    formData.append('type', bannerType)
    formData.append('data_id', dataId)
    {
      isArabic === 'true'
        ? formData.append('title_ar', bannerTitleAr)
        : formData.append('title_ar', 'empty')
    }
    {
      isEnglish === 'true'
        ? formData.append('title_en', bannerTitleEn)
        : formData.append('title_en', 'empty')
    }
    {
      isHebrew === 'true'
        ? formData.append('title_he', bannerTitleHeb)
        : formData.append('title_he', 'empty')
    }
    axios
      .post(`${API_ROUTE}/banners/${bannerId}?_method=PUT`, formData)
      .then((res) => {
        setLoading(false)
        notifyEdit()
        setTimeout(() => {
          navigate('/banners')
        }, 500)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
        setVisible(true)
      })
  }
  return {
    bannerName,
    bannerImage,
    bannerImageUpdated,
    bannerImageMobile,
    bannerImageMobileUpdated,
    bannerImageEn,
    bannerImageEnUpdated,
    bannerImageMobileEn,
    bannerImageMobileEnUpdated,
    setBannerImageEn,
    setBannerImageEnUpdated,
    setBannerImageMobileEn,
    setBannerImageMobileEnUpdated,
    setBannerName,
    setBannerImage,
    setBannerImageUpdated,
    setBannerImageMobile,
    setBannerImageMobileUpdated,
    loading,
    update,
    visible,
    setVisible,
    products,
    categories,
    bannerTitleAr,
    bannerTitleEn,
    bannerTitleHeb,
    setBannerTitleAr,
    setBannerTitleEn,
    setBannerTitleHeb,
    type: bannerType,
    setType,
    dataId,
    setDataId,
  }
}
