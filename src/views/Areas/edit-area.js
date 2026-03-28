/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { CAlert, CButton, CCardBody, CCol, CRow } from '@coreui/react'
import { useLocation, useParams } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useCategoryEditing } from 'src/hooks/categories/useCategoryEditing'
import PageTitle from 'src/components/PageTitle'
import AppCard from 'src/components/AppCard'
import { AppBreadcrumb } from 'src/components'
import { NotePencil } from 'phosphor-react'
import { useLanguage } from 'src/hooks/general/useLanguage'
import { Theme } from 'src/constants/colors'
import image from '../../assets/images/image.png'
import { useWidth } from 'src/hooks/general/useWidth'
import { useBrandEditing } from 'src/hooks/brands/useBrandEditing'
import { useAreaEditing } from 'src/hooks/areas/useAreaEditing'
import LabelWithAsterisk from 'src/components/LabelWithAsterist'

const EditArea = () => {
  const params = useParams()
  const { state } = useLocation()
  const item = state?.item
  const {
    loading,
    update,
    areaName,
    setAreaName,
    areaNameAr,
    setAreaNameAr,
    areaNameEn,
    setAreaNameEn,
    deliveryPrice,
    setDeliveryPrice,
    visible,
    setVisible,
  } = useAreaEditing(params.id, item)
  const { width } = useWidth()

  const { isArabic, isEnglish, isHebrew } = useLanguage()
  if (!item) {
    return <div>Product not found</div>
  }
  return (
    <CRow>
      <CCol xs>
        <PageTitle title="تعديل المنطقة" icon={<NotePencil size={25} />} />
        <AppCard>
          <CCardBody>
            <div className="column">
              <div className="row pt-3">
                {isArabic === 'true' && (
                  <CCol sm={width < 768 ? 12 : null}>
                    <LabelWithAsterisk labelText="اسم المنطقة باللغة العربية" />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="اسم المنطقة باللغة العربية "
                      aria-label="First name"
                      name="product_name"
                      value={areaNameAr}
                      onChange={(e) => setAreaNameAr(e.target.value)}
                    />
                  </CCol>
                )}
                {isEnglish === 'true' && (
                  <CCol sm={width < 768 ? 12 : null}>
                    <LabelWithAsterisk labelText="اسم المنطقة باللغة الانجليزية" />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="اسم المنطقة باللغة الانجليزية "
                      aria-label="First name"
                      name="product_name"
                      value={areaNameEn}
                      onChange={(e) => setAreaNameEn(e.target.value)}
                    />
                  </CCol>
                )}
                {isHebrew === 'true' && (
                  <CCol sm={width < 768 ? 12 : null}>
                    <LabelWithAsterisk labelText="اسم المنطقة باللغة العربية" />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="اسم المنطقة باللغة العبرية "
                      aria-label="First name"
                      name="product_name"
                      value={areaName}
                      onChange={(e) => setAreaName(e.target.value)}
                    />
                  </CCol>
                )}
              </div>
              <div className="row">
                <CCol sm={width < 768 ? 12 : null}>
                  <LabelWithAsterisk labelText="سعر التوصيل" />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="سعر التوصيل "
                    aria-label="First name"
                    name="product_name"
                    value={deliveryPrice}
                    onChange={(e) => {
                      const value = e.target.value
                      if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
                        setDeliveryPrice(e.target.value)
                      }
                    }}
                  />
                </CCol>
              </div>
            </div>
            {loading ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <CButton
                style={{
                  width: '200px',
                  marginTop: '30px',
                  backgroundColor: Theme.primary1,
                  border: 'none',
                }}
                type="submit"
                onClick={update}
              >
                <span style={{ fontWeight: 'bolder' }}>حفظ</span>
              </CButton>
            )}
            <CAlert color="danger" dismissible visible={visible} onClose={() => setVisible(false)}>
              حصل خلل أثناء العملية، يرجى المحاولة فيما بعد
            </CAlert>
          </CCardBody>
          {/* )} */}
        </AppCard>
      </CCol>
      <ToastContainer />
    </CRow>
  )
}

export default EditArea
