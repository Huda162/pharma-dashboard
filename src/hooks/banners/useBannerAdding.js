import { useState } from 'react'
import axios from 'axios'
import { API_ROUTE } from 'src/routes'
import { notifyAdd } from 'src/utils/util'
import { useNavigate } from 'react-router-dom'
import { useFormValidation } from '../general/useFormValidation'
import { useLanguage } from '../general/useLanguage'

export const useBannerAdding = () => {
  const [bannerName, setBannerName] = useState('')
  const [bannerImage, setBannerImage] = useState('')
  const [bannerImageEn, setBannerImageEn] = useState('')
  const [bannerImageMobile, setBannerImageMobile] = useState('')
  const [bannerImageMobileEn, setBannerImageMobileEn] = useState('')
  const [bannerTitleAr, setBannerTitleAr] = useState('')
  const [bannerTitleEn, setBannerTitleEn] = useState('')
  const [bannerTitleHeb, setBannerTitleHeb] = useState('')
  const [type, setType] = useState('product')
  const [dataId, setDataId] = useState('')
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()
  const { isArabic, isEnglish, isHebrew } = useLanguage()

  const addBanner = async () => {
    setLoading(true)
    console.log(
      bannerName,
      bannerTitleAr,
      bannerTitleEn,
      bannerTitleHeb,
      type,
      dataId,
      bannerImage,
      bannerImageMobile,
    )
    let formData = new FormData()
    formData.append('name', bannerName)
    formData.append('image', bannerImage)
    formData.append('image_en', bannerImageEn)
    formData.append('image_mobile', bannerImageMobile)
    formData.append('image_mobile_en', bannerImageMobileEn)

    isArabic === 'true'
      ? formData.append('title_ar', bannerTitleAr)
      : formData.append('title_ar', 'empty')

    isEnglish === 'true'
      ? formData.append('title_en', bannerTitleEn)
      : formData.append('title_en', 'empty')

    isHebrew === 'true'
      ? formData.append('title_he', bannerTitleHeb)
      : formData.append('title_he', 'empty')

    formData.append('type', type)
    formData.append('data_id', dataId)
    console.log('all added')
    try {
      const resGet = await axios.post(`${API_ROUTE}/banners`, formData)
      setLoading(false)
      notifyAdd()
      setTimeout(() => {
        navigate('/banners')
      }, 500)
    } catch (error) {
      console.log(error)
      setLoading(false)
      setVisible(true)
    }
  }

  const { handleSubmit, validated } = useFormValidation(addBanner)

  return {
    bannerName,
    setBannerName,
    bannerImage,
    setBannerImage,
    bannerImageEn,
    setBannerImageEn,
    bannerImageMobile,
    setBannerImageMobile,
    bannerImageMobileEn,
    setBannerImageMobileEn,
    handleSubmit,
    validated,
    loading,
    visible,
    setVisible,
    bannerTitleAr,
    setBannerTitleAr,
    bannerTitleEn,
    setBannerTitleEn,
    bannerTitleHeb,
    setBannerTitleHeb,
    type,
    setType,
    dataId,
    setDataId,
  }
}
