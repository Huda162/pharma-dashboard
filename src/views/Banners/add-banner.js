/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {
  CAlert,
  CButton,
  CCardBody,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormSelect,
  CRow,
} from '@coreui/react'
import { PlusCircle } from 'phosphor-react'
import { useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AppBreadcrumb } from 'src/components'
import AppCard from 'src/components/AppCard'
import PageTitle from 'src/components/PageTitle'
import { Theme } from 'src/constants/colors'
import { useBannerAdding } from 'src/hooks/banners/useBannerAdding'
import { useCategories } from 'src/hooks/categories/useCategories'
import { useLanguage } from 'src/hooks/general/useLanguage'
import { useWidth } from 'src/hooks/general/useWidth'
import { useProducts } from 'src/hooks/products/useProducts'

const AddBanner = () => {
  const {
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
  } = useBannerAdding()

  const { width } = useWidth()
  const { isArabic, isEnglish, isHebrew } = useLanguage()
  const { categories } = useCategories()
  const { products } = useProducts()

  return (
    <CRow>
      <CCol xs>
        <PageTitle title="بانر جديد" icon={<PlusCircle size={25} />} />
        <AppCard>
          <CCardBody>
            <div className="column">
              <div className="row">
                <div className="col">
                  <CForm
                    className="row g-3 needs-validation"
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                  >
                    <CCol sm={12}>
                      <CFormInput
                        type="text"
                        placeholder=" اسم البانر"
                        feedbackInvalid=" اسم البانر"
                        id="categoryNameAr"
                        label=" اسم البانر"
                        required
                        onChange={(e) => {
                          setBannerName(e.target.value)
                        }}
                        value={bannerName}
                      />
                    </CCol>
                    {isArabic == 'true' && (
                      <CCol sm={width < 768 ? 12 : null}>
                        <CFormInput
                          type="text"
                          placeholder=" عنوان البانر بالعربية"
                          feedbackInvalid=" عنوان البانر بالعربية"
                          id="categoryNameAr"
                          label=" عنوان البانر بالعربية"
                          required
                          onChange={(e) => {
                            setBannerTitleAr(e.target.value)
                          }}
                          value={bannerTitleAr}
                        />
                      </CCol>
                    )}
                    {isEnglish == 'true' && (
                      <CCol sm={width < 768 ? 12 : null}>
                        <CFormInput
                          type="text"
                          placeholder=" عنوان البانر بالانجليزية"
                          feedbackInvalid=" عنوان البانر بالانجليزية"
                          id="categoryNameAr"
                          label=" عنوان البانر بالانجليزية"
                          required
                          onChange={(e) => {
                            setBannerTitleEn(e.target.value)
                          }}
                          value={bannerTitleEn}
                        />
                      </CCol>
                    )}
                    {isHebrew == 'true' && (
                      <CCol sm={width < 768 ? 12 : null}>
                        <CFormInput
                          type="text"
                          placeholder=" عنوان البانر بالعبرية"
                          feedbackInvalid=" عنوان البانر بالعبرية"
                          id="categoryNameAr"
                          label=" عنوان البانر بالعبرية"
                          required
                          onChange={(e) => {
                            setBannerTitleHeb(e.target.value)
                          }}
                          value={bannerTitleHeb}
                        />
                      </CCol>
                    )}
                    <div className="mb-3">
                      <CFormInput
                        label="صورة البانر"
                        type="file"
                        id="categoryPic"
                        feedbackInvalid="صورة البانر مطلوبة"
                        required
                        onChange={(e) => {
                          setBannerImage(e.target.files[0])
                        }}
                      />
                      {bannerImage && (
                        <img
                          src={bannerImage ? URL.createObjectURL(bannerImage) : ''}
                          style={{ margin: '10px' }}
                          width={300}
                          height={300}
                        />
                      )}
                    </div>
                    <div className="mb-3">
                      <CFormInput
                        label="صورة البانر باللغة الانجليزية"
                        type="file"
                        id="categoryPic"
                        feedbackInvalid="صورة البانر باللغة الانجليزية مطلوبة"
                        required
                        onChange={(e) => {
                          setBannerImageEn(e.target.files[0])
                        }}
                      />
                      {bannerImageEn && (
                        <img
                          src={bannerImageEn ? URL.createObjectURL(bannerImageEn) : ''}
                          style={{ margin: '10px' }}
                          width={300}
                          height={300}
                        />
                      )}
                    </div>
                    <div className="mb-3">
                      <CFormInput
                        label="صورة للموبايل"
                        type="file"
                        id="categoryPic"
                        feedbackInvalid="صورة للموبايل مطلوبة"
                        required
                        onChange={(e) => {
                          setBannerImageMobile(e.target.files[0])
                        }}
                      />
                      {bannerImageMobile && (
                        <img
                          src={bannerImageMobile ? URL.createObjectURL(bannerImageMobile) : ''}
                          style={{ margin: '10px' }}
                          width={300}
                          height={300}
                        />
                      )}
                    </div>
                    <div className="mb-3">
                      <CFormInput
                        label="صورة للموبايل باللغة الانجليزية"
                        type="file"
                        id="categoryPic"
                        feedbackInvalid="صورة للموبايل باللغة الانجليزية مطلوبة"
                        required
                        onChange={(e) => {
                          setBannerImageMobileEn(e.target.files[0])
                        }}
                      />
                      {bannerImageMobileEn && (
                        <img
                          src={bannerImageMobileEn ? URL.createObjectURL(bannerImageMobileEn) : ''}
                          style={{ margin: '10px' }}
                          width={300}
                          height={300}
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
                          <option selected="" value=""> اختر المنتج</option>
                          {products.map((item, index) => (
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
                          <option selected="" value=""> اختر القسم</option>
                          {categories.map((item, index) => (
                            <option value={item.id} key={item.id}>
                              {item.name_ar}
                            </option>
                          ))}
                        </CFormSelect>
                      </CCol>
                    )}

                    {loading ? (
                      <Spinner animation="border" role="status" style={{ margin: '10px' }}>
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
                      >
                        <span style={{ fontWeight: 'bolder' }}>اضافه قسم</span>
                      </CButton>
                    )}
                    <CAlert
                      color="danger"
                      dismissible
                      visible={visible}
                      onClose={() => setVisible(false)}
                    >
                      حصل خلل أثناء العملية، يرجى المحاولة فيما بعد
                    </CAlert>
                  </CForm>
                </div>
              </div>
            </div>
          </CCardBody>
        </AppCard>
      </CCol>
      <ToastContainer />
    </CRow>
  )
}

export default AddBanner
