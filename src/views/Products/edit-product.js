/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import {
  CAlert,
  CButton,
  CCardBody,
  CCol,
  CFormCheck,
  CFormInput,
  CFormSwitch,
  CRow,
} from '@coreui/react'
import { useLocation, useParams } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { NotePencil, Trash, X } from 'phosphor-react'
import { Switch } from '@mui/material'
import { useProductEditing } from 'src/hooks/products/useProductEditing'
import PageTitle from 'src/components/PageTitle'
import AppCard from 'src/components/AppCard'
import { AppBreadcrumb } from 'src/components'
import { useLanguage } from 'src/hooks/general/useLanguage'
import { Theme } from 'src/constants/colors'
import { useCurrency } from 'src/hooks/general/useCurrency'
import AppTooltip from 'src/components/Tooltip'
import broken_image from '../../assets/images/image.png'
import { useWidth } from 'src/hooks/general/useWidth'
import { Chrome } from '@uiw/react-color'
import AppDialog from 'src/components/AppDialog'
import CategorySelect from 'src/components/CategorySelect'
import LabelWithAsterisk from 'src/components/LabelWithAsterist'
import SearchableDropdown from 'src/components/SearchableDropdown'
import GenderInput from 'src/components/GenderInput'
import AgeInput from 'src/components/AgeInput'
import SeasonsButtons from 'src/components/SeasonsButtons'

const EditProduct = () => {
  const params = useParams()
  const { state } = useLocation()
  const item = state?.item
  const fromPage = state?.fromPage || 1

  const {
    productNameAr,
    productNameEng,
    productNameHeb,
    productPriceNIS,
    setProductPriceNIS,
    productPriceUSD,
    productPriceJOD,
    setProductPriceJOD,
    setProductPriceUSD,
    categories,
    categoryID,
    descriptionAr,
    descriptionEng,
    descriptionHeb,
    image,
    loading,
    isChecked,
    update,
    setProductNameAr,
    setProductNameEng,
    setProductNameHeb,
    setImage,
    setCategoryID,
    setDescriptionAr,
    setDescriptionEng,
    setDescriptionHeb,
    setIsChecked,
    visible,
    setVisible,
    sizes,
    handleSizeChange,
    addSize,
    deleteSize,
    colors,
    hex,
    setHex,
    colorImage,
    setColorImage,
    addColor,
    deleteColor,
    ProductVideoEdited,
    setProductVideoEdited,
    showDeleteImageDialog,
    setShowDeleteImageDialog,
    DeleteProductImage,
    cancelDeleteImage,
    startDelete,
    isVideoEdited,
    setIsVideoEdited,
    isMultipleSizes,
    isMultipleColors,
    setIsMultipleColors,
    setColors,
    setIsMultipleSizes,
    showColorDialog,
    setShowColorDialog,
    startDeleteColor,
    cancelDeleteColor,
    deleteProductColor,
    saveAndExit,
    brands,
    brandId,
    setBrandId,
    discountPercentage,
    setDiscountPercentage,
    isOffer,
    setIsOffer,
    saveAndStay,
    colorCode,
    setColorCode,
    handleColorChange,
    productPriceNISWholesale,
    setProductPriceNISWholesale,
    stock,
    setStock,
    minStock,
    setMinStock,
    showSizeDialog,
    setShowSizeDialog,
    startDeleteSize,
    cancelDeleteSize,
    deleteProductSize,
    age,
    setAge,
    gender,
    setGender,
    season,
    setSeason,
    handleSeasonChange,
    handleGenderChange,
    handleAgeChange,
  } = useProductEditing(params.id, item, fromPage)

  const { width } = useWidth()

  const { isArabic, isEnglish, isHebrew } = useLanguage()
  const { isJUD, isNIS, isUSD } = useCurrency()

  if (!item) {
    return <div>Product not found</div>
  }

  const MAX_PRODUCT_NAME_LENGTH = 60

  return (
    <CRow>
      <CCol xs>
        <PageTitle title="تعديل المنتج" icon={<NotePencil size={25} />} />
        <AppCard>
          <CCardBody style={{ position: 'relative' }}>
            <div
              className="col-12 flex-row d-flex align-items-center"
              style={{ marginTop: '15px', position: 'absolute', top: -10, right: 0 }}
            >
              <CFormSwitch
                size="lg"
                id="activeApp"
                checked={isChecked === 'true'}
                label="هل المنتج متوفر؟"
                reverse
                style={
                  isChecked === 'true'
                    ? {
                        boxShadow: 'none',
                        backgroundColor: Theme.primary1,
                        borderColor: Theme.primary1,
                        marginLeft: 5,
                      }
                    : { boxShadow: 'none' }
                }
                onChange={() => {
                  isChecked === 'true' ? setIsChecked('false') : setIsChecked('true')
                }}
              />
            </div>
            <div className="column">
              <div className="row pt-5">
                {isArabic === 'true' && (
                  <CCol sm={width < 768 ? 12 : null}>
                    <LabelWithAsterisk
                      labelText="اسم المنتج باللغة العربية"
                      sublabel={`${productNameAr.length}/${MAX_PRODUCT_NAME_LENGTH} حرف`}
                    />{' '}
                    <input
                      type="text"
                      className="form-control"
                      placeholder="اسم المنتج باللغة العربية "
                      aria-label="First name"
                      name="product_name"
                      value={productNameAr}
                      onChange={(e) => {
                        if (e.target.value.length <= MAX_PRODUCT_NAME_LENGTH) {
                          setProductNameAr(e.target.value)
                        }
                      }}
                    />
                  </CCol>
                )}
                {isEnglish === 'true' && (
                  <CCol sm={width < 768 ? 12 : null}>
                    <LabelWithAsterisk
                      labelText="اسم المنتج باللغة الانجليزية"
                      sublabel={`${productNameEng.length}/${MAX_PRODUCT_NAME_LENGTH} حرف`}
                    />{' '}
                    <input
                      type="text"
                      className="form-control"
                      placeholder="اسم المنتج باللغة الانجليزية "
                      aria-label="First name"
                      name="product_name"
                      value={productNameEng}
                      onChange={(e) => {
                        if (e.target.value.length <= MAX_PRODUCT_NAME_LENGTH) {
                          setProductNameEng(e.target.value)
                        }
                      }}
                    />
                  </CCol>
                )}
                {isHebrew === 'true' && (
                  <CCol sm={width < 768 ? 12 : null}>
                    <LabelWithAsterisk
                      labelText="اسم المنتج باللغة العبرية"
                      sublabel={`${productNameHeb.length}/${MAX_PRODUCT_NAME_LENGTH} حرف
`}
                    />{' '}
                    <input
                      type="text"
                      className="form-control"
                      placeholder="اسم المنتج باللغة العبرية "
                      aria-label="First name"
                      name="product_name"
                      value={productNameHeb}
                      onChange={(e) => {
                        if (e.target.value.length <= MAX_PRODUCT_NAME_LENGTH) {
                          setProductNameHeb(e.target.value)
                        }
                      }}
                    />
                  </CCol>
                )}
                <div className="my-3 d-flex ">
                  {isNIS === 'true' && (
                    <>
                      <CCol sm={width < 768 ? 12 : null} style={{ marginLeft: '1rem' }}>
                        <LabelWithAsterisk labelText="سعر الجملة للمنتج بالشيكل " />
                        <input
                          type="text"
                          className="form-control"
                          placeholder="سعر الجملة للمنتج بالشيكل "
                          aria-label="First name"
                          name="product_price"
                          value={productPriceNISWholesale}
                          onChange={(e) => {
                            const value = e.target.value
                            if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
                              setProductPriceNISWholesale(value)
                            }
                          }}
                        />
                      </CCol>
                      <CCol sm={width < 768 ? 12 : null} style={{ marginLeft: '1rem' }}>
                        <LabelWithAsterisk labelText="سعر المفرق للمنتج بالشيكل " />
                        <input
                          type="text"
                          className="form-control"
                          aria-label="First name"
                          name="product_price"
                          value={productPriceNIS}
                          onChange={(e) => {
                            const value = e.target.value
                            if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
                              setProductPriceNIS(value)
                            }
                          }}
                        />
                      </CCol>
                    </>
                  )}
                  {isUSD === 'true' && (
                    <CCol sm={width < 768 ? 12 : null} style={{ marginLeft: '1rem' }}>
                      <LabelWithAsterisk labelText="سعر المنتج بالدولار" />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="سعر المنتج بالدولار "
                        aria-label="First name"
                        name="product_price"
                        value={productPriceUSD}
                        onChange={(e) => {
                          const value = e.target.value
                          if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
                            setProductPriceUSD(value)
                          }
                        }}
                      />
                    </CCol>
                  )}
                  {isJUD === 'true' && (
                    <CCol sm={width < 768 ? 12 : null}>
                      <LabelWithAsterisk labelText="سعر المنتج بالدينار" />{' '}
                      <input
                        type="text"
                        className="form-control"
                        placeholder="سعر المنتج بالدينار "
                        aria-label="First name"
                        name="product_price"
                        value={productPriceJOD}
                        onChange={(e) => {
                          const value = e.target.value
                          if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
                            setProductPriceJOD(value)
                          }
                        }}
                      />
                    </CCol>
                  )}
                </div>
              </div>
              <div className="row">
                {isArabic === 'true' && (
                  <CCol sm={width < 768 ? 12 : null}>
                    <LabelWithAsterisk labelText="الوصف باللغة العربية" />{' '}
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder=" الوصف باللغة العربية "
                      aria-label="First name"
                      name="product_price"
                      value={descriptionAr}
                      onChange={(e) => setDescriptionAr(e.target.value)}
                    />
                  </CCol>
                )}
                {isEnglish === 'true' && (
                  <CCol sm={width < 768 ? 12 : null}>
                    <LabelWithAsterisk labelText="الوصف باللغة الانجليزية" />{' '}
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder=" الوصف باللغة الإنجليزية "
                      aria-label="First name"
                      name="product_price"
                      value={descriptionEng}
                      onChange={(e) => setDescriptionEng(e.target.value)}
                    />
                  </CCol>
                )}
                {isHebrew === 'true' && (
                  <CCol sm={width < 768 ? 12 : null}>
                    <LabelWithAsterisk labelText="الوصف باللغة العبرية" />{' '}
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder=" الوصف باللغة العبرية "
                      aria-label="First name"
                      name="product_price"
                      value={descriptionHeb}
                      onChange={(e) => setDescriptionHeb(e.target.value)}
                    />
                  </CCol>
                )}
              </div>
              <CCol md={12}>
                <CategorySelect
                  categories={categories}
                  value={categoryID}
                  onChange={(e) => {
                    setCategoryID(e.value)
                  }}
                />
              </CCol>
              <CCol md={12}>
                <label className="mb-2">العلامة التجارية</label>
                <SearchableDropdown
                  options={brands ? brands : []}
                  label="name"
                  placeholder="العلامة التجارية للمنتج"
                  id="id"
                  selectedVal={brandId}
                  handleChange={(val) => setBrandId(val)}
                  loading={false}
                  isRequired
                />
              </CCol>
            </div>
            <div className="row" style={{ marginTop: '15px' }}>
              <div className="col-12">
                <LabelWithAsterisk labelText="صورة المنتج" />
                <input
                  className="form-control form-control-sm"
                  id="formFileSm"
                  type="file"
                  name="product_pic"
                  onChange={(e) => {
                    setImage((prevImages) => [...prevImages, ...Array.from(e.target.files)])
                  }}
                  multiple
                />
                {image && image.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                    {image.map((item, index) => (
                      <div className="m-1" style={{ position: 'relative' }} key={index}>
                        {typeof item.url === 'string' && !item.url.endsWith('.mp4') ? (
                          <div>
                            <X
                              size={15}
                              style={{
                                position: 'absolute',
                                top: 15,
                                right: 5,
                                color: 'white',
                                backgroundColor: '#ff3a31',
                                borderRadius: '80%',
                                cursor: 'pointer',
                              }}
                              onClick={() => startDelete(item.id, index)}
                            />
                            <img
                              src={item.url}
                              onError={(e) => {
                                e.target.onError = null
                                e.target.src = broken_image
                              }}
                              alt="product"
                              height="200"
                              style={{ margin: '10px' }}
                            />
                          </div>
                        ) : typeof item.url !== 'string' ? (
                          <div>
                            <X
                              size={15}
                              style={{
                                position: 'absolute',
                                top: 15,
                                right: 5,
                                color: 'white',
                                backgroundColor: '#ff3a31',
                                borderRadius: '80%',
                                cursor: 'pointer',
                              }}
                              onClick={() => setImage(image.filter((_, i) => i !== index))}
                            />
                            <img
                              src={URL.createObjectURL(item)}
                              onError={(e) => {
                                e.target.onError = null
                                e.target.src = broken_image
                              }}
                              alt="product"
                              height="200"
                              style={{ margin: '10px' }}
                            />
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="col-12">
                <label className="form-label">فيديو المنتج</label>
                <input
                  className="form-control form-control-sm"
                  id="formFileSm"
                  type="file"
                  name="product_pic"
                  onChange={(e) => {
                    setProductVideoEdited(e.target.files[0])
                    setIsVideoEdited(true)
                  }}
                  multiple
                />
                {ProductVideoEdited && (
                  <video width="250" height="200" controls>
                    <source src={URL.createObjectURL(ProductVideoEdited)} type="video/mp4" />
                  </video>
                )}
                <>
                  {image?.map((item, index) => (
                    <div className="m-1" style={{ position: 'relative' }} key={index}>
                      {typeof item.url === 'string' && item.url.endsWith('.mp4') && (
                        <div>
                          <X
                            size={15}
                            style={{
                              position: 'absolute',
                              top: 5,
                              right: -15,
                              color: 'white',
                              backgroundColor: '#ff3a31',
                              borderRadius: '80%',
                              cursor: 'pointer',
                            }}
                            onClick={() => startDelete(item.id, index)}
                          />
                          <video width="250" height="200" controls>
                            <source src={item.url} type="video/mp4" />
                          </video>
                        </div>
                      )}
                    </div>
                  ))}
                </>
              </div>
              {!isMultipleColors && (
                <>
                  <CCol sm={width < 768 ? 12 : null}>
                    <LabelWithAsterisk labelText="الكمية بالمخزون" />{' '}
                    <input
                      type="text"
                      className="form-control"
                      placeholder="الكمية بالمخزون "
                      aria-label="First name"
                      name="product_price"
                      value={stock}
                      onChange={(e) => {
                        const value = e.target.value
                        if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
                          setStock(value)
                        }
                      }}
                    />
                  </CCol>
                  <CCol sm={width < 768 ? 12 : null}>
                    <LabelWithAsterisk labelText="الحد الأدنى من الكمية بالمخزون " />{' '}
                    <input
                      type="text"
                      className="form-control"
                      placeholder="الكمية بالمخزون "
                      aria-label="First name"
                      name="product_price"
                      value={minStock}
                      onChange={(e) => {
                        const value = e.target.value
                        if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
                          setMinStock(value)
                        }
                      }}
                    />
                  </CCol>
                </>
              )}

              <CCol md={12}>
                <CFormCheck
                  className="customCheckbox"
                  type="checkbox"
                  id="isOffer"
                  reverse
                  label="إضافة المنتج الى العروض"
                  checked={isOffer === 'true'}
                  onChange={() => {
                    console.log(!isOffer)
                    if (isOffer === 'true') setIsOffer('false')
                    else setIsOffer('true')
                  }}
                />
              </CCol>
              {isOffer && (
                <CCol sm={width < 768 ? 12 : null}>
                  <label className="form-label">نسبة الخصم</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="نسبة الخصم"
                    aria-label="First name"
                    name="product_price"
                    value={discountPercentage}
                    onChange={(e) => {
                      const value = e.target.value

                      if (
                        value === '' ||
                        (/^\d+$/.test(value) && parseInt(value) > 0 && parseInt(value) < 100)
                      ) {
                        setDiscountPercentage(value)
                      }
                    }}
                    inputMode="numeric"
                  />
                </CCol>
              )}
              <>
                {colors.length < 1 ? (
                  <CCol md={12}>
                    <CFormCheck
                      className="customCheckbox"
                      type="checkbox"
                      id="multiColor"
                      reverse
                      feedbackInvalid="يجب اضافة لون واحد على الاقل"
                      label="هل المنتج متعدد الألوان؟"
                      checked={isMultipleColors}
                      onChange={() => {
                        setIsMultipleColors(!isMultipleColors)
                        if (!isMultipleColors) addColor()
                        else setColors([])
                      }}
                    />
                  </CCol>
                ) : null}
              </>
              {isMultipleColors || colors.length > 0 ? (
                <AppCard>
                  <CCardBody>
                    <div style={{ marginTop: '15px' }}>
                      {colors.map((color, index) => (
                        <CRow
                          key={index}
                          style={{
                            borderRadius: '5px',
                            padding: '10px',
                            marginBottom: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            boxShadow: '0px 2px 3px #c8c8c8',
                            position: 'relative',
                          }}
                        >
                          <CCol style={{ marginLeft: '0.5rem' }} sm={width < 768 ? 12 : 2}>
                            <CFormInput
                              type="color"
                              style={{ width: '100%' }}
                              feedbackInvalid="اللون مطلوب"
                              label={index === 0 ? 'اللون' : null}
                              placeholder="اللون"
                              value={color.color}
                              required
                              onChange={(event) =>
                                handleColorChange(index, 'color', event.target.value)
                              }
                            />
                          </CCol>
                          <CCol className="mb-3" sm={width < 768 ? 12 : 2}>
                            <CFormInput
                              label={index === 0 ? 'صورة اللون' : null}
                              type="file"
                              id="categoryPic"
                              feedbackInvalid="صورة اللون مطلوبة"
                              required
                              onChange={(e) => {
                                handleColorChange(index, 'color_image', e.target.files[0])
                              }}
                            />
                          </CCol>
                          <CCol
                            md={2}
                            style={{
                              display: 'felx',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            {color.color_image && (
                              <>
                                {typeof color.color_image === 'string' ? (
                                  <img
                                    src={color.color_image ? color.color_image : ''}
                                    style={{ marginTop: '20px', marginLeft: '10px' }}
                                    height={50}
                                    alt={`color[${index}]`}
                                  />
                                ) : (
                                  <img
                                    src={
                                      color.color_image
                                        ? URL.createObjectURL(color.color_image)
                                        : ''
                                    }
                                    alt={`colors[${index}]`}
                                    style={{ marginTop: '20px', marginLeft: '10px' }}
                                    height={50}
                                  />
                                )}
                              </>
                            )}
                          </CCol>
                          <CCol className="mb-3" sm={width < 768 ? 12 : 2}>
                            <CFormInput
                              label={index === 0 ? 'رمز اللون' : null}
                              type="text"
                              id="categoryPic"
                              feedbackInvalid="رمز اللون مطلوب"
                              required
                              value={color.color_code}
                              onChange={(e) => {
                                handleColorChange(index, 'color_code', e.target.value)
                              }}
                            />
                          </CCol>
                          <CCol sm={width < 768 ? 12 : 1}>
                            <div className="d-grid gap-2 col-4 mx-auto m-1">
                              {index === 0 ? <br /> : null}
                              <AppTooltip
                                type="delete"
                                onClick={() => startDeleteColor(color.id, index)}
                              />
                            </div>
                          </CCol>
                        </CRow>
                      ))}
                      <CButton
                        onClick={addColor}
                        style={{
                          width: '200px',
                          backgroundColor: Theme.primaryLight,
                          border: 'none',
                          marginTop: 10,
                        }}
                      >
                        أضف لون جديد
                      </CButton>
                    </div>
                  </CCardBody>
                </AppCard>
              ) : null}
              <AppCard>
                <CCardBody>
                  <div style={{ marginTop: '15px' }}>
                    {sizes.map((size, index) => (
                      <CRow
                        key={index}
                        style={{
                          borderRadius: '5px',
                          padding: '10px',
                          marginBottom: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          boxShadow: '0px 2px 3px #c8c8c8',
                        }}
                      >
                        <CCol style={{ marginLeft: '0.5rem' }} sm={width < 768 ? 12 : 5}>
                          <CFormInput
                            type="text"
                            label="الحجم"
                            feedbackInvalid="الحجم مطلوب"
                            placeholder="الحجم"
                            value={size.size}
                            required
                            onChange={(event) => handleSizeChange(index, 'size', event)}
                          />
                        </CCol>
                        {isNIS === 'true' && (
                          <CCol style={{ marginLeft: '0.5rem' }} sm={width < 768 ? 12 : null}>
                            <CFormInput
                              type="text"
                              label="السعر بالشيكل"
                              feedbackInvalid="السعر بالشيكل مطلوب"
                              placeholder="السعر بالشيكل"
                              value={size.size_price_nis}
                              required
                              onChange={(event) => handleSizeChange(index, 'size_price_nis', event)}
                            />
                          </CCol>
                        )}
                        {isUSD === 'true' && (
                          <CCol style={{ marginLeft: '0.5rem' }} sm={width < 768 ? 12 : null}>
                            <CFormInput
                              type="text"
                              label="السعر بالدولار"
                              feedbackInvalid="السعر بالدولار مطلوب"
                              placeholder="السعر بالدولار"
                              value={size.size_price_usd}
                              required
                              onChange={(event) => handleSizeChange(index, 'size_price_usd', event)}
                            />
                          </CCol>
                        )}
                        <CCol>
                          <div className="d-grid gap-2 col-4 mx-auto">
                            <br />
                            <AppTooltip
                              type="delete"
                              onClick={() => startDeleteSize(size.id, index)}
                            />
                          </div>
                        </CCol>
                      </CRow>
                    ))}
                    <CButton
                      onClick={addSize}
                      style={{
                        width: '200px',
                        backgroundColor: Theme.primaryLight,
                        border: 'none',
                        marginTop: 10,
                      }}
                    >
                      أضف الحجم
                    </CButton>
                  </div>
                </CCardBody>
              </AppCard>
            </div>

            {loading ? (
              <Spinner animation="border" role="status" style={{ margin: '10px' }}>
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <div className="d-flex gap-2">
                <CButton
                  style={{
                    width: '200px',
                    marginTop: '30px',
                    backgroundColor: Theme.primary1,
                    border: 'none',
                  }}
                  type="submit"
                  onClick={saveAndStay}
                >
                  <span style={{ fontWeight: 'bolder' }}>حفظ</span>
                </CButton>
                <CButton
                  style={{
                    width: '200px',
                    marginTop: '30px',
                    backgroundColor: Theme.primary1,
                    border: 'none',
                  }}
                  type="submit"
                  onClick={saveAndExit}
                >
                  <span style={{ fontWeight: 'bolder' }}>حفظ وخروج</span>
                </CButton>
              </div>
            )}
            <CAlert color="danger" dismissible visible={visible} onClose={() => setVisible(false)}>
              حصل خلل أثناء العملية، يرجى المحاولة فيما بعد
            </CAlert>
            <AppDialog
              title="هل أنت متأكد من رغبتك بحذف صورة المنتج التي تم تحديدها ؟"
              open={showDeleteImageDialog}
              onClose={cancelDeleteImage}
              actionCancel={cancelDeleteImage}
              actionExecute={DeleteProductImage}
              deleteDialog={true}
            />
            <AppDialog
              title="هل أنت متأكد من رغبتك بحذف لون المنتج الذي تم تحديده ؟"
              open={showColorDialog}
              onClose={cancelDeleteColor}
              actionCancel={cancelDeleteColor}
              actionExecute={deleteProductColor}
              deleteDialog={true}
            />
            <AppDialog
              title="هل أنت متأكد من رغبتك بحذف حجم المنتج الذي تم تحديده ؟"
              open={showSizeDialog}
              onClose={cancelDeleteSize}
              actionCancel={cancelDeleteSize}
              actionExecute={deleteProductSize}
              deleteDialog={true}
            />
          </CCardBody>
        </AppCard>
      </CCol>
      <ToastContainer />
    </CRow>
  )
}

export default EditProduct
