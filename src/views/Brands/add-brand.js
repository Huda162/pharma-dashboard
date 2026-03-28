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
import { useBrandAdding } from 'src/hooks/brands/useBrandAdding'
import { useCategoryAdding } from 'src/hooks/categories/useCategoryAdding'
import { useLanguage } from 'src/hooks/general/useLanguage'
import { useWidth } from 'src/hooks/general/useWidth'

const AddBrand = () => {
  const {
    brandNameAr,
    setBrandNameAr,
    loading,
    addBrand,
    image,
    setImage,
    handleSubmit,
    validated,
    visible,
    setVisible,
  } = useBrandAdding()

  const { width } = useWidth()

  const { isArabic, isEnglish, isHebrew } = useLanguage()

  return (
    <CRow>
      <CCol xs>
        <PageTitle title="علامة تجارية جديدة" icon={<PlusCircle size={25} />} />
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
                      <CCol sm={width < 768 ? 12 : null}>
                        <CFormInput
                          type="text"
                          placeholder="اسم العلامة التجارية باللغة العربية"
                          feedbackInvalid="اسم العلامة التجارية باللغة العربية مطلوب"
                          id="categoryNameAr"
                          label={<LabelWithAsterisk labelText="اسم العلامة التجارية باللغة العربية"/>}
                          required
                          onChange={(e) => {
                            setBrandNameAr(e.target.value)
                          }}
                          value={brandNameAr}
                        />
                      </CCol>
                    )}
                    
                    
                    <div className="mb-3">
                      <CFormInput
                        label={<LabelWithAsterisk labelText="صورة العلامة التجارية"/>}
                        type="file"
                        id="categoryPic"
                        feedbackInvalid="صورة العلامة التجارية مطلوبة"
                        required
                        onChange={(e) => {
                          setImage(e.target.files[0])
                        }}
                      />
                      {image && (
                        <img
                          src={image ? URL.createObjectURL(image) : ''}
                          style={{ margin: '10px' }}
                          width={300}
                          height={300}
                        />
                      )}
                    </div>
                    {loading && brandNameAr !== '' ? (
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
                        <span style={{ fontWeight: 'bolder' }}>اضافه علامة تجارية</span>
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
export default AddBrand
