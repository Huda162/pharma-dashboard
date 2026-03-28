import React, { useState } from 'react'
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCarousel,
  CCarouselItem,
  CCol,
  CImage,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTooltip,
} from '@coreui/react'
import { useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PageTitle from 'src/components/PageTitle'
import AppCard from 'src/components/AppCard'
import { Theme } from 'src/constants/colors'
import image from '../../assets/images/image.png'
import { useLanguage } from 'src/hooks/general/useLanguage'
import { useCurrency } from 'src/hooks/general/useCurrency'
import { useWidth } from 'src/hooks/general/useWidth'
import { AppBreadcrumb } from 'src/components'
import { useCategories } from 'src/hooks/categories/useCategories'

const ViewProduct = () => {
  const { state } = useLocation()
  const item = state?.item

  const {
    name_ar,
    name_en,
    name_he,
    description_ar,
    description_en,
    description_he,
    price_nis,
    price_usd,
    price_jod,
    images,
    product_sizes,
    product_colors,
    category_id,
  } = item

  const { categories } = useCategories()

  const category = categories.find((category) => category.id === category_id)
  const { isArabic, isEnglish, isHebrew } = useLanguage()
  const { isJUD, isNIS, isUSD } = useCurrency()
  const [selectedLang, setSelectedLang] = useState('ar')
  const { width } = useWidth()

  if (!item) {
    return <div>Product not found</div>
  }

  return (
    <CRow>
      <CCol xs>
        <PageTitle title="تفاصيل المنتج" />
        <CNav variant="underline" className="justify-content-center m-3">
          {isArabic === 'true' && (
            <CNavItem>
              <CNavLink
                style={
                  isArabic === 'false'
                    ? null
                    : selectedLang === 'ar'
                    ? { fontWeight: 'bold', color: Theme.grayDark }
                    : { color: Theme.primaryLight }
                }
                active={selectedLang === 'ar'}
                disabled={isArabic === 'false'}
                onClick={() => {
                  setSelectedLang('ar')
                }}
              >
                باللغة العربية
              </CNavLink>
            </CNavItem>
          )}
          {isEnglish === 'true' && (
            <CNavItem>
              <CNavLink
                style={
                  isEnglish === 'false'
                    ? null
                    : selectedLang === 'en'
                    ? { fontWeight: 'bold', color: Theme.grayDark }
                    : { color: Theme.primaryLight }
                }
                active={selectedLang === 'en'}
                disabled={isEnglish === 'false'}
                onClick={() => {
                  setSelectedLang('en')
                }}
              >
                {' '}
                باللغة الانجليزية
              </CNavLink>
            </CNavItem>
          )}
          {isHebrew === 'true' && (
            <CNavItem>
              <CNavLink
                style={
                  isHebrew === 'false'
                    ? null
                    : selectedLang === 'he'
                    ? { fontWeight: 'bold', color: Theme.grayDark }
                    : { color: Theme.primaryLight }
                }
                active={selectedLang === 'he'}
                disabled={isHebrew === 'false'}
                onClick={() => {
                  setSelectedLang('he')
                }}
              >
                {' '}
                باللغة العبرية
              </CNavLink>
            </CNavItem>
          )}
        </CNav>
        <AppCard>
          <CCardBody>
            <div className="row" style={{ marginTop: '15px' }}>
              <CCol sm={width < 768 ? 12 : 6}>
                <CCarousel
                  controls
                  indicators
                  dark
                  style={{
                    height: '80%',
                    width: '100%',
                    backgroundColor: Theme.base,
                    boxShadow: '0px 2px 3px #c8c8c8',
                    paddingTop: '5rem',
                    paddingBottom: '5rem',
                  }}
                  className="d-flex align-items-center rounded"
                >
                  {images?.map((img, index) => (
                    <CCarouselItem key={index}>
                      <div className="d-flex align-items-center justify-content-center">
                        <CImage
                          className="d-block w-75 h-75"
                          src={img.url || image}
                          onError={(e) => {
                            e.target.onError = null
                            e.target.src = image
                          }}
                          style={{ borderRadius: 5 }}
                        />
                      </div>
                    </CCarouselItem>
                  ))}
                </CCarousel>
              </CCol>
              <CCol sm={width < 768 ? 12 : 6}>
                {category && (
                  <div className="float-sm-start">
                    <CBadge color="light" shape="rounded-pill">
                      <span
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          color: 'black',
                        }}
                      >
                        <CImage
                          className="d-block"
                          src={category.image}
                          style={{ borderRadius: 5, width: 25, height: 25, display: 'inline' }}
                        />
                        {category.name_ar}
                      </span>
                    </CBadge>
                  </div>
                )}

                {selectedLang === 'ar' && (
                  <h2 style={{ color: Theme.primary1, fontWeight: 'bold' }}>{name_ar}</h2>
                )}
                {selectedLang === 'en' && (
                  <h2 style={{ color: Theme.primary1, fontWeight: 'bold' }}>{name_en}</h2>
                )}
                {selectedLang === 'he' && (
                  <h2 style={{ color: Theme.primary1, fontWeight: 'bold' }}>{name_he}</h2>
                )}
                <div className="d-flex">
                  {isNIS === 'true' && (
                    <div
                      style={{
                        backgroundColor: Theme.base,
                        borderRadius: 5,
                        padding: '0.5rem',
                        margin: 5,
                        boxShadow: '0px 1px 2px #c8c8c8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <h4 style={{ margin: 0 }}> {price_nis} ₪</h4>
                    </div>
                  )}
                  {isUSD === 'true' && (
                    <div
                      style={{
                        backgroundColor: Theme.base,
                        borderRadius: 5,
                        padding: '0.5rem',
                        margin: 5,
                        boxShadow: '0px 1px 2px #c8c8c8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <h4 style={{ margin: 0 }}> {price_usd} $</h4>
                    </div>
                  )}
                  {isJUD === 'true' && (
                    <div
                      style={{
                        backgroundColor: Theme.base,
                        borderRadius: 5,
                        padding: '0.5rem',
                        margin: 5,
                        boxShadow: '0px 1px 2px #c8c8c8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <h4 style={{ margin: 0 }}> {price_jod} د.أ</h4>
                    </div>
                  )}
                </div>
                {selectedLang === 'ar' && <p>{description_ar}</p>}
                {selectedLang === 'en' && <p>{description_en}</p>}
                {selectedLang === 'he' && <p>{description_he}</p>}
                {product_sizes?.length > 0 && (
                  <CCard className="mb-4">
                    <CCardBody>
                      <div style={{ marginTop: '15px' }}>
                        <p>الأحجام</p>
                        {product_sizes.map((size, index) => (
                          <CTooltip content={size.size_price_nis} trigger={['hover']} key={index}>
                            <span className="d-inline-block" tabIndex={0}>
                              <CButton
                                color="secondary"
                                shape="rounded-pill"
                                style={{ marginLeft: 3 }}
                              >
                                {size.size}
                              </CButton>
                            </span>
                          </CTooltip>
                        ))}
                      </div>
                    </CCardBody>
                  </CCard>
                )}

                {product_colors?.length > 0 && (
                  <CCard className="mb-4">
                    <CCardBody>
                      <p>الألوان</p>
                      <div style={{ marginTop: '15px' }} className="d-flex">
                        {product_colors.map((color, index) => (
                          <>
                            {color.color_image ? (
                              <img
                                src={color.color_image ? color.color_image : ''}
                                onError={(e) => {
                                  e.target.onError = null
                                  e.target.src = image
                                }}
                                width="50"
                                height="50"
                                alt={`colorImage`}
                                style={{ margin: '10px' }}
                              />
                            ) : (
                              <div
                                key={index}
                                style={{
                                  width: 50,
                                  height: 50,
                                  backgroundColor: color.color,
                                  margin: 10,
                                  borderRadius: 5,
                                  border: '1px solid gray',
                                }}
                              />
                            )}
                          </>
                        ))}
                      </div>
                    </CCardBody>
                  </CCard>
                )}
              </CCol>
            </div>
          </CCardBody>
        </AppCard>
      </CCol>
      <ToastContainer />
    </CRow>
  )
}

export default ViewProduct
