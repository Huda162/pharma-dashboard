/* eslint-disable react/prop-types */
import { Dialog, DialogActions, DialogTitle, Button } from '@mui/material'
import { Theme } from 'src/constants/colors'
import '../layout/layout.css'
import {
  CButton,
  CCard,
  CCardBody,
  CCarousel,
  CCarouselItem,
  CImage,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CNav,
  CNavItem,
  CNavLink,
  CTooltip,
} from '@coreui/react'
import React, { useState } from 'react'
import broken from '../assets/images/image.png'
import { Tag } from 'phosphor-react'
import AppCard from './AppCard'
import { useLanguage } from 'src/hooks/general/useLanguage'

const ProductDialog = ({ product, open, onClose }) => {
  const [selectedLang, setSelectedLang] = useState('ar')
  const { isArabic, isEnglish, isHebrew } = useLanguage()
  return (
    <CModal
      alignment="center"
      scrollable
      visible={open}
      onClose={onClose}
      aria-labelledby="VerticallyCenteredExample"
      className="almarai-regular "
    >
      <CModalHeader>
        <CModalTitle style={{ marginLeft: 'auto' }} id="VerticallyCenteredExample">
          تفاصيل المنتج
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCarousel
          controls
          indicators
          dark
          style={{
            height: '50%',
            width: '100%',
            // backgroundColor: Theme.base,
            // boxShadow: '0px 2px 3px #c8c8c8',
            paddingTop: '1rem',
            paddingBottom: '3rem',
          }}
          className="d-flex align-items-center rounded"
        >
          {product?.images.map((img, index) => (
            <CCarouselItem key={index}>
              <div className="d-flex align-items-center justify-content-center">
                <CImage
                  className="d-block w-75"
                  src={img.url || broken}
                  onError={(e) => {
                    e.target.onError = null
                    e.target.src = broken
                  }}
                  style={{ borderRadius: 5 }}
                />
              </div>
            </CCarouselItem>
          ))}
        </CCarousel>
        <CNav variant="tabs" className="justify-content-center m-3">
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
        {selectedLang === 'ar' && (
          <div className="d-flex align-items-center justify-content-end my-1">
            <h4 style={{ color: Theme.primary1, fontWeight: 'bold' }}>{product?.name_ar}</h4>
          </div>
        )}
        {selectedLang === 'en' && (
          <div className="d-flex align-items-center justify-content-start my-1">
            <h4 style={{ color: Theme.primary1, fontWeight: 'bold' }}>{product?.name_en}</h4>
          </div>
        )}
        {selectedLang === 'he' && (
          <div className="d-flex align-items-center justify-content-start my-1">
            <h4 style={{ color: Theme.primary1, fontWeight: 'bold' }}>{product?.name_he}</h4>
          </div>
        )}
        {selectedLang === 'ar' && (
          <div className="d-flex align-items-center justify-content-end my-1">
            <h5 style={{ color: Theme.grayDark, fontWeight: 'bold' }}>
              ₪{product?.price_nis}
              <Tag />
            </h5>
          </div>
        )}
        {selectedLang === 'en' && (
          <div className="d-flex align-items-center justify-content-start my-1">
            <h5 style={{ color: Theme.grayDark, fontWeight: 'bold' }}>
              <Tag />${product?.price_usd}
            </h5>
          </div>
        )}
        {selectedLang === 'he' && (
          <div className="d-flex align-items-center justify-content-start my-1">
            <h5 style={{ color: Theme.grayDark, fontWeight: 'bold' }}>
              <Tag />${product?.price_nis}
            </h5>
          </div>
        )}
        {selectedLang === 'ar' && (
          <div className="d-flex align-items-center justify-content-end my-1">
            <h6 style={{ color: Theme.grayDark, textAlign: 'end' }}>{product?.description_ar}</h6>
          </div>
        )}
        {selectedLang === 'en' && (
          <div className="d-flex align-items-center justify-content-start my-1">
            <h6 style={{ color: Theme.grayDark }}>{product?.description_en}</h6>
          </div>
        )}
        {selectedLang === 'he' && (
          <div className="d-flex align-items-center justify-content-start my-1">
            <h6 style={{ color: Theme.grayDark }}>{product?.description_he}</h6>
          </div>
        )}

        {product?.product_sizes?.length > 0 && (
          <AppCard className="mb-4">
            <CCardBody>
              <div
                className={
                  selectedLang === 'ar' ? 'd-flex align-items-end justify-content-start' : ''
                }
                style={{ marginTop: '15px', flexDirection: 'column' }}
              >
                {selectedLang === 'ar' && <p>الأحجام</p>}
                {selectedLang === 'en' && <p>sizes</p>}
                {selectedLang === 'he' && <p>sizes</p>}
                <div>
                  {product.product_sizes.map((size, index) => (
                    <CTooltip
                      content={
                        selectedLang === 'en'
                          ? `$${size.size_price_usd}`
                          : `₪${size.size_price_nis}`
                      }
                      trigger={['hover']}
                      key={index}
                    >
                      <span className="d-inline-block" tabIndex={0}>
                        <CButton
                          shape="rounded-pill"
                          style={{
                            marginLeft: 3,
                            backgroundColor: Theme.primaryLight,
                            border: 'none',
                          }}
                        >
                          {size.size}
                        </CButton>
                      </span>
                    </CTooltip>
                  ))}
                </div>
              </div>
            </CCardBody>
          </AppCard>
        )}
      </CModalBody>
      <CModalFooter>
        <CButton style={{ backgroundColor: Theme.primaryRed, color: 'white', border: 'none' }}>
          اغلاق
        </CButton>
      </CModalFooter>
    </CModal>

    /* <Dialog
      open={open}
      onClose={onClose}
      className="almarai-regular"
    >
      <DialogTitle
        id="alert-dialog-title"
        color="white"
        style={{ color: Theme.primaryRed }}
      >
        {title}
      </DialogTitle>
      <DialogActions>
        {deleteDialog ? (
          <>
            <Button onClick={actionCancel} style={{color: Theme.gray}}>إلغاء</Button>
            <Button
              onClick={actionExecute}
              style={{ backgroundColor: Theme.primaryRed, color: 'white' }}
            >
              نعم بالتأكيد
            </Button>
          </>
        ) : (
          <Button onClick={onClose}>حسنا</Button>
        )}
      </DialogActions>
    </Dialog> */
  )
}

export default ProductDialog
