/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormCheck,
  CFormSelect,
  CRow,
} from '@coreui/react'
import { useLocation, useParams } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useBannersEditing } from 'src/hooks/banners/useBannersEditing'
import PageTitle from 'src/components/PageTitle'
import AppCard from 'src/components/AppCard'
import { AppBreadcrumb } from 'src/components'
import { NotePencil } from 'phosphor-react'
import { Theme } from 'src/constants/colors'
import image from '../../assets/images/image.png'
import { useLanguage } from 'src/hooks/general/useLanguage'
import { useWidth } from 'src/hooks/general/useWidth'

const EditBanner = () => {
  const params = useParams()
  const { state } = useLocation()
  const item = state?.item
  const {
    bannerName,
    bannerImage,
    bannerImageUpdated,
    bannerImageMobile,
    bannerImageMobileUpdated,
    setBannerName,
    setBannerImage,
    setBannerImageUpdated,
    setBannerImageMobile,
    setBannerImageMobileUpdated,
    bannerImageEn,
    bannerImageEnUpdated,
    bannerImageMobileEn,
    bannerImageMobileEnUpdated,
    setBannerImageEn,
    setBannerImageEnUpdated,
    setBannerImageMobileEn,
    setBannerImageMobileEnUpdated,
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
    type,
    setType,
    dataId,
    setDataId,
  } = useBannersEditing(params.id, item)

  const { isArabic, isEnglish, isHebrew } = useLanguage()
  const { width } = useWidth()

  if (!item) {
    return <div>Product not found</div>
  }

  return (
    <CRow>
      <CCol xs>
        <PageTitle title="تعديل البانر" icon={<NotePencil size={25} />} />
        <AppCard>
          <CCardBody>
            <div className="row" style={{ marginTop: '15px' }}>
              <div className="col">
                <label className="form-label"> اسم البانر </label>
                <input
                  className="form-control form-control-sm"
                  id="formFileSm"
                  type="text"
                  name="product_pic"
                  value={bannerName}
                  onChange={(e) => setBannerName(e.target.value)}
                />
              </div>
            </div>
            <div className="row" style={{ marginTop: '15px' }}>
              {isArabic == 'true' && (
                <CCol CCol sm={width < 768 ? 12 : null}>
                  <label className="form-label"> عنوان البانر بالعربية </label>
                  <input
                    className="form-control form-control-sm"
                    id="formFileSm"
                    type="text"
                    name="product_pic"
                    value={bannerTitleAr}
                    onChange={(e) => setBannerTitleAr(e.target.value)}
                  />
                </CCol>
              )}
              {isEnglish == 'true' && (
                <CCol CCol sm={width < 768 ? 12 : null}>
                  <label className="form-label"> عنوان البانر بالانجليزية </label>
                  <input
                    className="form-control form-control-sm"
                    id="formFileSm"
                    type="text"
                    name="product_pic"
                    value={bannerTitleEn}
                    onChange={(e) => setBannerTitleEn(e.target.value)}
                  />
                </CCol>
              )}
              {isHebrew == 'true' && (
                <CCol CCol sm={width < 768 ? 12 : null}>
                  <label className="form-label"> عنوان البانر بالعبرية </label>
                  <input
                    className="form-control form-control-sm"
                    id="formFileSm"
                    type="text"
                    name="product_pic"
                    value={bannerTitleHeb}
                    onChange={(e) => setBannerTitleHeb(e.target.value)}
                  />
                </CCol>
              )}
            </div>
            <div className="row" style={{ marginTop: '15px' }}>
              <div className="col">
                <label className="form-label">صورة البانر </label>
                <input
                  className="form-control form-control-sm"
                  id="formFileSm"
                  type="file"
                  name="product_pic"
                  onChange={(e) => setBannerImageUpdated(e.target.files[0])}
                />
                {bannerImageUpdated ? (
                  <img
                    src={bannerImageUpdated ? URL.createObjectURL(bannerImageUpdated) : ''}
                    width={300}
                    height={300}
                    style={{ margin: '10px' }}
                  />
                ) : (
                  <img src={bannerImage} width={300} height={300} style={{ margin: '10px' }} />
                )}
              </div>
              <div className="col">
                <label className="form-label">صورة البانر باللغة الانجليزية </label>
                <input
                  className="form-control form-control-sm"
                  id="formFileSm"
                  type="file"
                  name="product_pic"
                  onChange={(e) => setBannerImageEnUpdated(e.target.files[0])}
                />
                {bannerImageEnUpdated ? (
                  <img
                    src={bannerImageEnUpdated ? URL.createObjectURL(bannerImageEnUpdated) : ''}
                    width={300}
                    height={300}
                    style={{ margin: '10px' }}
                  />
                ) : (
                  <img src={bannerImageEn} width={300} height={300} style={{ margin: '10px' }} />
                )}
              </div>
            </div>

            <div className="row" style={{ marginTop: '15px' }}>
              <div className="col">
                <label className="form-label">صورة البانر للهاتف</label>
                <input
                  className="form-control form-control-sm"
                  id="formFileSm"
                  type="file"
                  name="product_pic"
                  onChange={(e) => setBannerImageMobileUpdated(e.target.files[0])}
                />

                {bannerImageMobileUpdated ? (
                  <img
                    src={
                      bannerImageMobileUpdated ? URL.createObjectURL(bannerImageMobileUpdated) : ''
                    }
                    width={300}
                    height={300}
                    style={{ margin: '10px' }}
                  />
                ) : (
                  <img
                    src={bannerImageMobile}
                    width={300}
                    height={300}
                    style={{ margin: '10px' }}
                  />
                )}
              </div>
              <div className="col">
                <label className="form-label">صورة البانر للهاتف باللغة الانجليزية</label>
                <input
                  className="form-control form-control-sm"
                  id="formFileSm"
                  type="file"
                  name="product_pic"
                  onChange={(e) => setBannerImageMobileEnUpdated(e.target.files[0])}
                />

                {bannerImageMobileEnUpdated ? (
                  <img
                    src={
                      bannerImageMobileEnUpdated
                        ? URL.createObjectURL(bannerImageMobileEnUpdated)
                        : ''
                    }
                    width={300}
                    height={300}
                    style={{ margin: '10px' }}
                  />
                ) : (
                  <img
                    src={bannerImageMobileEn}
                    width={300}
                    height={300}
                    style={{ margin: '10px' }}
                  />
                )}
              </div>
              <CCol md={12}>هذا البانر تابع لـ</CCol>
              <CCol md={2} className="d-flex justify-content-between">
                <CFormCheck
                  button={{ color: 'secondary', variant: 'outline' }}
                  type="radio"
                  name="options-outlined"
                  id="secondary-outlined"
                  autoComplete="off"
                  label="منتج"
                  value="product"
                  checked={type === 'product'}
                  onChange={(e) => {
                    setType(e.target.value)
                  }}
                />
                <CFormCheck
                  button={{ color: 'secondary', variant: 'outline' }}
                  type="radio"
                  name="options-outlined"
                  id="danger-outlined"
                  autoComplete="off"
                  label="قسم رئيسي"
                  value="category"
                  checked={type === 'category'}
                  onChange={(e) => {
                    setType(e.target.value)
                  }}
                />
              </CCol>
              {type == 'product' ? (
                <CCol md={12}>
                  <CFormSelect
                    id="productCategory"
                    label="اختر المنتج"
                    feedbackInvalid=" المنتج مطلوب"
                    value={dataId}
                    onChange={(e) => setDataId(e.target.value)}
                    required
                  >
                    <option selected="" value="">
                      {' '}
                      اختر المنتج
                    </option>
                    {products?.map((item, index) => (
                      <option value={item.id} key={item.id}>
                        {item.name_ar}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
              ) : (
                <CCol md={12}>
                  <CFormSelect
                    id="productCategory"
                    label="اختر القسم"
                    feedbackInvalid=" القسم مطلوب"
                    value={dataId}
                    onChange={(e) => setDataId(e.target.value)}
                    required
                  >
                    <option selected="" value="">
                      {' '}
                      اختر القسم
                    </option>
                    {categories.map((item, index) => (
                      <option value={item.id} key={item.id}>
                        {item.name_ar}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
              )}
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
        </AppCard>
      </CCol>
      <ToastContainer />
    </CRow>
  )
}

export default EditBanner
