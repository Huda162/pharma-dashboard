import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_ROUTE } from 'src/routes'
import { notifyAdd } from 'src/utils/util'
import { useNavigate } from 'react-router-dom'
import { useCategories } from '../categories/useCategories'
import { useFormValidation } from '../general/useFormValidation'
import { useLanguage } from '../general/useLanguage'
import { useBrands } from '../brands/useBrands'

export const useProductAdding = () => {
  const navigate = useNavigate()
  const { isArabic, isEnglish, isHebrew } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [productNameAr, setProductNameAr] = useState('')
  const [productNameEng, setProductNameEng] = useState('')
  const [productNameHeb, setProductNameHeb] = useState('')
  const [productPriceNIS, setProductPriceNIS] = useState('0')
  const [productPriceNISWholesale, setProductPriceNISWholesale] = useState('0')
  const [productPriceUSD, setProductPriceUSD] = useState('0')
  const [productPriceJOD, setProductPriceJOD] = useState('0')
  const [images, setImages] = useState([])
  const [productVideo, setProductVideo] = useState(null)
  const [descriptionAr, setDescriptionAr] = useState('')
  const [descriptionEng, setDescriptionEng] = useState('')
  const [descriptionHeb, setDescriptionHeb] = useState('')
  const [categoryID, setCategoryID] = useState([])
  const [sizes, setSizes] = useState([])
  const [colors, setColors] = useState([])
  const [isMultipleSize, setIsMultipleSize] = useState(false)
  const [isMultipleColor, setIsMultipleColor] = useState(false)
  const { categories } = useCategories()
  const { brands } = useBrands()
  const [brandId, setBrandId] = useState('')
  const [visible, setVisible] = useState(false)
  const [hex, setHex] = useState('')
  const [colorImage, setColorImage] = useState()
  const [colorCode, setColorCode] = useState()
  const [editedColor, setEditedColor] = useState(null)
  const [isOffer, setIsOffer] = useState(false)
  const [discountPercentage, setDiscountPercentage] = useState(0)
  const [stock, setStock] = useState('')
  const [minStock, setMinStock] = useState('')
  const [age, setAge] = useState([])
  const [gender, setGender] = useState('')
  const [season, setSeason] = useState([])
  const [uploadProgress, setUploadProgress] = useState({
    file: null,
    progress: 0,
    visible: false,
    status: null,
  })

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setProductVideo(file)
    if (file.type.startsWith('video/')) {
      const reader = new FileReader()
      reader.onloadstart = () => {
        setUploadProgress({ file, progress: 0, visible: true, status: null })
      }
      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded * 100) / event.total)
          setUploadProgress((prevProgress) => ({
            ...prevProgress,
            progress,
          }))
        }
      }
      reader.onloadend = () => {
        setUploadProgress((prevProgress) => ({
          ...prevProgress,
          progress: 100,
          status: 'success',
        }))
        setTimeout(() => {
          setUploadProgress((prevProgress) => ({
            ...prevProgress,
            visible: false,
          }))
        }, 1000)
      }
      reader.onerror = () => {
        setUploadProgress((prevProgress) => ({
          ...prevProgress,
          visible: false,
          status: 'failure',
        }))
      }
      reader.readAsDataURL(file)
    } else {
      setUploadProgress({ file, progress: 100, visible: false, status: 'success' })
    }
  }
  const addProduct = async () => {
    setLoading(true)
    let stockColors = 0
    if (isMultipleColor) {
      colors.forEach((color) => {
        stockColors += Number(color?.stock)
      })
    }

    let formData = new FormData()
    console.log('start filling form', colors)
    images.forEach((image, index) => {
      formData.append(`image[${index}]`, image)
      if (index === images.length - 1 && productVideo !== null) {
        formData.append(`image[${index + 1}]`, productVideo)
      }
    })

    if (sizes.length > 0) {
      sizes.forEach((size, index) => {
        formData.append(`size[${index}]`, size.size)
        formData.append(`size_price_nis[${index}]`, size.priceNIS)
        formData.append(`size_price_usd[${index}]`, size.priceUSD)
      })
    }
    if (colors.length > 0) {
      colors.forEach((color, index) => {
        formData.append(`color[${index}]`, color.color)
        formData.append(`color_image[${index}]`, color.image)
        formData.append(`color_code[${index}]`, color.code)
      })
    }

    isArabic === 'true'
      ? formData.append('name_ar', productNameAr)
      : formData.append('name_ar', 'empty')
    isEnglish === 'true'
      ? formData.append('name_en', productNameEng)
      : formData.append('name_en', 'empty')
    isHebrew === 'true'
      ? formData.append('name_he', productNameHeb)
      : formData.append('name_he', 'empty')
    isArabic === 'true'
      ? formData.append('description_ar', descriptionAr)
      : formData.append('description_ar', 'empty')
    isEnglish === 'true'
      ? formData.append('description_en', descriptionEng)
      : formData.append('description_en', 'empty')
    isHebrew === 'true'
      ? formData.append('description_he', descriptionHeb)
      : formData.append('description_he', 'empty')
    formData.append('price_nis_retail', productPriceNIS)
    formData.append('price_nis_wholesale', productPriceNISWholesale)
    formData.append('price_usd', productPriceUSD)
    formData.append('price_jod', productPriceJOD)
    categoryID.map((category, index) => {
      formData.append(`category_ids[${index}]`, category)
    })
    formData.append('available', true)
    formData.append('is_offer', isOffer)
    formData.append('discount_percentage', discountPercentage)
    formData.append('brand_id', brandId)
    formData.append('product_stock', isMultipleColor || isMultipleSize ? 0 : stock)
    formData.append('min_stock', isMultipleColor || isMultipleSize ? 0 : stock)
    formData.append('age', age)
    formData.append('gender', gender)
    formData.append('season', season)
    console.log(formData.getAll('name_ar'))
    const resGet = await axios
      .post(`${API_ROUTE}/products`, formData)
      .then((response) => {
        setLoading(false)
        notifyAdd()
        setTimeout(() => {
          if (isMultipleColor || isMultipleSize) {
            navigate(`/edit_stocks/${response.data.product_id}`)
          } else {
            navigate(`/products`)
          }
        }, 500)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
        setVisible(true)
      })
    setLoading(false)
  }

  const { handleSubmit, validated, checkValidated, setCheckValidated } =
    useFormValidation(addProduct)
  useEffect(() => {
    if (colors.length < 1 && isMultipleColor) {
      setCheckValidated(false)
    } else {
      setCheckValidated(true)
    }
  }, [isMultipleColor, colors])

  const handleSizeChange = (index, field, event) => {
    const newSize = [...sizes]
    newSize[index][field] = event.target.value
    setSizes(newSize)
  }
  const addSize = () => {
    setSizes([...sizes, { size: '', priceNIS: '0', priceUSD: '0', priceJOD: '0' }])
  }

  const deleteSize = (index) => {
    const newSize = sizes.filter((size, sizeIndex) => sizeIndex !== index)
    setSizes(newSize)
  }

  const addColor = () => {
    setColors([...colors, { color: '#000000', image: '', code: '' }])
  }

  const deleteColor = (index) => {
    const newColors = colors.filter((color, colorIndex) => colorIndex !== index)
    setColors(newColors)
  }

  const handleColorChange = (index, field, value) => {
    const newColors = [...colors]
    newColors[index][field] = value
    setColors(newColors)
  }
  const handleGenderChange = (selectedGender) => {
    setGender(selectedGender)
  }
  const handleAgeChange = (age) => {
    setAge((prev) => {
      const newAges = prev.includes(age) ? prev.filter((a) => a !== age) : [...prev, age]
      return newAges
    })
  }
  const handleSeasonChange = (selectedSeason) => {
    setSeason((prev) => {
      const newSeasons = prev.includes(selectedSeason)
        ? prev.filter((s) => s !== selectedSeason)
        : [...prev, selectedSeason]
      return newSeasons
    })
  }
  return {
    productNameAr,
    setProductNameAr,
    loading,
    images,
    setImages,
    descriptionAr,
    setDescriptionAr,
    categoryID,
    setCategoryID,
    categories,
    sizes,
    setSizes,
    isMultipleSize,
    setIsMultipleSize,
    addProduct,
    handleSizeChange,
    addSize,
    handleSubmit,
    validated,
    visible,
    setVisible,
    deleteSize,
    productNameEng,
    setProductNameEng,
    productNameHeb,
    setProductNameHeb,
    descriptionEng,
    setDescriptionEng,
    descriptionHeb,
    setDescriptionHeb,
    isMultipleColor,
    setIsMultipleColor,
    colors,
    setColors,
    hex,
    setHex,
    colorImage,
    setColorImage,
    addColor,
    deleteColor,
    handleColorChange,
    editedColor,
    setEditedColor,
    productPriceJOD,
    productPriceNIS,
    productPriceNISWholesale,
    productPriceUSD,
    setProductPriceJOD,
    setProductPriceNIS,
    setProductPriceNISWholesale,
    setProductPriceUSD,
    handleFileChange,
    uploadProgress,
    productVideo,
    setProductVideo,
    checkValidated,
    setCheckValidated,
    brands,
    brandId,
    setBrandId,
    isOffer,
    setIsOffer,
    discountPercentage,
    setDiscountPercentage,
    colorCode,
    setColorCode,
    setColors,
    stock,
    setStock,
    minStock,
    setMinStock,
    age,
    setAge,
    gender,
    setGender,
    season,
    setSeason,
    handleSeasonChange,
    handleGenderChange,
    handleAgeChange,
  }
}
