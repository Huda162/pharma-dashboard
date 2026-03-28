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
import LabelWithAsterisk from 'src/components/LabelWithAsterist'

const EditBrand = () => {
  const params = useParams()
  const { state } = useLocation()
  const item = state?.item
  const {
    brandImage,
    setUpdatedImage,
    loading,
    update,
    updatedImage,
    brandNameAr,
    setBrandNameAr,
    visible,
    setVisible,
  } = useBrandEditing(params.id, item)
  const { width } = useWidth()

  const { isArabic, isEnglish, isHebrew } = useLanguage()
  if (!item) {
    return <div>Product not found</div>
  }
  return (
    <CRow>
      <CCol xs>
        <PageTitle title="تعديل علامة تجارية" icon={<NotePencil size={25} />} />
        <AppCard>
          <CCardBody>
            <div className="column">
              <div className="row">
                {isArabic === 'true' && (
                  <CCol sm={width < 768 ? 12 : null}>
                    <LabelWithAsterisk labelText="اسم العلامة التجارية باللغة العربية" />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="اسم العلامة التجارية باللغة العربية "
                      aria-label="First name"
                      name="product_name"
                      value={brandNameAr}
                      onChange={(e) => setBrandNameAr(e.target.value)}
                    />
                  </CCol>
                )}
              </div>
            </div>
            <div className="row" style={{ marginTop: '15px' }}>
              <div className="col">
                <LabelWithAsterisk labelText="صورة العلامة التجارية " />
                <input
                  className="form-control form-control-sm"
                  id="formFileSm"
                  type="file"
                  name="product_pic"
                  onChange={(e) => setUpdatedImage(e.target.files[0])}
                />
                {updatedImage ? (
                  <img
                    src={updatedImage ? URL.createObjectURL(updatedImage) : image}
                    onError={(e) => {
                      e.target.onError = null
                      e.target.src = image
                    }}
                    width={300}
                    height={300}
                    style={{ margin: '10px' }}
                  />
                ) : (
                  <img
                    src={brandImage ? brandImage : image}
                    onError={(e) => {
                      e.target.onError = null
                      e.target.src = image
                    }}
                    width={300}
                    height={300}
                    style={{ margin: '10px' }}
                  />
                )}
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

export default EditBrand
