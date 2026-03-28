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
import { useCategoryAdding } from 'src/hooks/categories/useCategoryAdding'
import { useLanguage } from 'src/hooks/general/useLanguage'
import { useWidth } from 'src/hooks/general/useWidth'
import '../../components/test.css'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Dropdown from 'react-multilevel-dropdown'
import CategoryDropdown from 'src/components/CategoryDropdown'
import LabelWithAsterisk from 'src/components/LabelWithAsterist'

const AddCategory = () => {
  const {
    categoryNameAr,
    setCategoryNameAr,
    loading,
    categoryNameEng,
    setCategoryNameEng,
    categoryNameHeb,
    setCategoryNameHeb,
    image,
    setImage,
    handleSubmit,
    validated,
    visible,
    setVisible,
    subCategories,
    selectedCategory,
    setSelectedCategory,
    handleCategorySelect,
    isChild,
    setIsChild,
  } = useCategoryAdding()

  console.log(subCategories)

  const { width } = useWidth()

  const { isArabic, isEnglish, isHebrew } = useLanguage()

  return (
    <CRow>
      <CCol xs>
        <PageTitle title="قسم جديد" icon={<PlusCircle size={25} />} />
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
                          placeholder="اسم القسم باللغة العربية"
                          feedbackInvalid="اسم القسم باللغة العربية مطلوب"
                          id="categoryNameAr"
                          label={<LabelWithAsterisk labelText="اسم القسم باللغة العربية"/>}
                          required
                          onChange={(e) => {
                            setCategoryNameAr(e.target.value)
                          }}
                          value={categoryNameAr}
                        />
                      </CCol>
                    )}
                    {isEnglish === 'true' && (
                      <CCol sm={width < 768 ? 12 : null}>
                        <CFormInput
                          type="text"
                          placeholder="اسم القسم باللغة الانجليزية"
                          feedbackInvalid="اسم القسم باللغة الانجليزية مطلوب"
                          id="categoryNameEng"
                          label={<LabelWithAsterisk labelText="اسم القسم باللغة الانجليزية"/>}
                          required
                          onChange={(e) => {
                            setCategoryNameEng(e.target.value)
                          }}
                          value={categoryNameEng}
                        />
                      </CCol>
                    )}
                    {isHebrew === 'true' && (
                      <CCol sm={width < 768 ? 12 : null}>
                        <CFormInput
                          type="text"
                          placeholder="اسم القسم باللغة العبرية"
                          feedbackInvalid="اسم القسم باللغة العبرية مطلوب"
                          id="categoryNameHeb"
                          label={<LabelWithAsterisk labelText="اسم القسم باللغة العبرية"/>}
                          required
                          onChange={(e) => {
                            setCategoryNameHeb(e.target.value)
                          }}
                          value={categoryNameHeb}
                        />
                      </CCol>
                    )}
                    <div className="mb-3">
                      <CFormInput
                        label={<LabelWithAsterisk labelText="صورة القسم"/>}
                        type="file"
                        id="categoryPic"
                        feedbackInvalid="صورة القسم مطلوبة"
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
                    <CCol md={12}>
                      <CFormCheck
                        className="customCheckbox"
                        type="checkbox"
                        id="multiColor"
                        reverse
                        label="هل هذا القسم قسم فرعي؟"
                        checked={isChild}
                        onChange={() => {
                          setIsChild(!isChild)
                          if (isChild === true) {
                            setSelectedCategory(null)
                          }
                        }}
                      />
                    </CCol>
                    {isChild && (
                      <CRow>
                        <CCol style={{marginTop: '1rem'}}>
                          <p>اختر الفرع الرئيسي لهذا الفرع ...</p>
                          <CategoryDropdown onSelect={handleCategorySelect} />
                        </CCol>
                        <div>القسم التابع له: {selectedCategory?.name_ar} </div>
                      </CRow>
                    )}

                    {loading && categoryNameAr !== '' ? (
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
export default AddCategory
