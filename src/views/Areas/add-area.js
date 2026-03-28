/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import { CAlert, CButton, CCardBody, CCol, CForm, CFormInput, CRow } from '@coreui/react'
import { PlusCircle } from 'phosphor-react'
import { useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AppBreadcrumb } from 'src/components'
import AppCard from 'src/components/AppCard'
import LabelWithAsterisk from 'src/components/LabelWithAsterist'
import PageTitle from 'src/components/PageTitle'
import { Theme } from 'src/constants/colors'
import { useAreaAdding } from 'src/hooks/areas/useAreaAdding'
import { useBrandAdding } from 'src/hooks/brands/useBrandAdding'
import { useCategoryAdding } from 'src/hooks/categories/useCategoryAdding'
import { useLanguage } from 'src/hooks/general/useLanguage'
import { useWidth } from 'src/hooks/general/useWidth'

const AddArea = () => {
  const {
    areaName,
    setAreaName,
    deliveryPrice,
    setDeliveryPrice,
    loading,
    addArea,
    handleSubmit,
    validated,
    visible,
    setVisible,
    areaNameAr,
    setAreaNameAr,
    areaNameEn,
    setAreaNameEn,
  } = useAreaAdding()

  const { width } = useWidth()

  const { isArabic, isEnglish, isHebrew } = useLanguage()

  return (
    <CRow>
      <CCol xs>
        <PageTitle title="منطقة جديدة" icon={<PlusCircle size={25} />} />
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
                    {isArabic === 'true' && (
                      <CCol sm={12}>
                        <CFormInput
                          type="text"
                          placeholder="اسم المنطقة باللغة العربية"
                          feedbackInvalid="اسم المنطقة باللغة العربية مطلوب"
                          id="categoryNameAr"
                          label={<LabelWithAsterisk labelText="اسم المنطقة باللغة العربية" />}
                          required
                          onChange={(e) => {
                            setAreaNameAr(e.target.value)
                          }}
                          value={areaNameAr}
                        />
                      </CCol>
                    )}
                    {isEnglish === 'true' && (
                      <CCol sm={12}>
                        <CFormInput
                          type="text"
                          placeholder="اسم المنطقة باللغة الانجليزية"
                          feedbackInvalid="اسم المنطقة باللغة الانجليزية مطلوب"
                          id="categoryNameAr"
                          label={<LabelWithAsterisk labelText="اسم المنطقة باللغة الانجليزية" />}
                          required
                          onChange={(e) => {
                            setAreaNameEn(e.target.value)
                          }}
                          value={areaNameEn}
                        />
                      </CCol>
                    )}
                    {isHebrew === 'true' && (
                      <CCol sm={12}>
                        <CFormInput
                          type="text"
                          placeholder="اسم المنطقة باللغة العبرية"
                          feedbackInvalid="اسم المنطقة باللغة العبرية مطلوب"
                          id="categoryNameAr"
                          label={<LabelWithAsterisk labelText="اسم المنطقة باللغة العبرية" />}
                          required
                          onChange={(e) => {
                            setAreaName(e.target.value)
                          }}
                          value={areaName}
                        />
                      </CCol>
                    )}
                    <CCol sm={12}>
                      <CFormInput
                        type="text"
                        placeholder="سعر التوصيل"
                        feedbackInvalid="سعر التوصيل مطلوب"
                        id="categoryNameAr"
                        label={<LabelWithAsterisk labelText="سعر التوصيل" />}
                        required
                        onChange={(e) => {
                          const value = e.target.value
                          if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
                            setDeliveryPrice(e.target.value)
                          }
                        }}
                        value={deliveryPrice}
                      />
                    </CCol>
                    {loading && areaName !== '' ? (
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
                        <span style={{ fontWeight: 'bolder' }}>اضافة منطقة</span>
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
export default AddArea
