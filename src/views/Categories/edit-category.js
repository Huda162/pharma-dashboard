/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { CAlert, CButton, CCardBody, CCol, CFormCheck, CRow } from '@coreui/react'
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
import { useCategories } from 'src/hooks/categories/useCategories'
import CategoryDropdown from 'src/components/CategoryDropdown'
import LabelWithAsterisk from 'src/components/LabelWithAsterist'

const EditCategory = () => {
  const params = useParams()
  const { state } = useLocation()
  const item = state?.item
  const {
    categoryImage,
    setUpdatedImage,
    update,
    loading,
    updatedImage,
    categoryNameAr,
    categoryNameEng,
    categoryNameHeb,
    setCategoryNameAr,
    setCategoryNameEng,
    setCategoryNameHeb,
    visible,
    setVisible,
    parent,
    isChild,
    setIsChild,
    selectedCategory,
    setSelectedCategory,
    handleCategorySelect,
    isMainParent,
    setIsMainParent
  } = useCategoryEditing(params.id, item)
  const { width } = useWidth()
  const { categories } = useCategories()

  const category = categories.find((category) => category.id === parent)

  const { isArabic, isEnglish, isHebrew } = useLanguage()
  if (!item) {
    return <div>Product not found</div>
  }
  return (
    <CRow>
      <CCol xs>
        <PageTitle title="تعديل القسم" icon={<NotePencil size={25} />} />
        <AppCard>
          <CCardBody>
            <div className="column">
              <div className="row">
                {isArabic === 'true' && (
                  <CCol sm={width < 768 ? 12 : null}>
                    <LabelWithAsterisk labelText="اسم القسم باللغة العربية"/>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="اسم القسم باللغة العربية "
                      aria-label="First name"
                      name="product_name"
                      value={categoryNameAr}
                      onChange={(e) => setCategoryNameAr(e.target.value)}
                    />
                  </CCol>
                )}
                {isEnglish === 'true' && (
                  <CCol sm={width < 768 ? 12 : null}>
                    <LabelWithAsterisk labelText="اسم القسم باللغة الانجليزية"/>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="اسم القسم باللغة الانجليزية "
                      aria-label="First name"
                      name="product_name"
                      value={categoryNameEng}
                      onChange={(e) => setCategoryNameEng(e.target.value)}
                    />
                  </CCol>
                )}
                {isHebrew === 'true' && (
                  <CCol sm={width < 768 ? 12 : null}>
                    <LabelWithAsterisk labelText="اسم القسم باللغة العبرية"/>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="اسم القسم باللغة العبرية "
                      aria-label="First name"
                      name="product_name"
                      value={categoryNameHeb}
                      onChange={(e) => setCategoryNameHeb(e.target.value)}
                    />
                  </CCol>
                )}
              </div>
            </div>
            <div className="row" style={{ marginTop: '15px' }}>
              <div className="col">
                <LabelWithAsterisk labelText="صورة المنتج"/>
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
                    src={categoryImage ? categoryImage : image}
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
            {parent === 0 ?
            <div>
              هذا القسم رئيسي غير تابع لأي قسم آخر
            </div>
            :<div>
              هذا القسم تابع للقسم <b style={{color: Theme.primary1}}>{category?.name_ar}</b>
              <CCol md={12}>
              <CFormCheck
                className="customCheckbox"
                type="checkbox"
                id="multiColor"
                reverse
                disabled= {isChild}
                label="هل تود جعله رئيسي؟"
                checked={isMainParent}
                onChange={() => {
                  setIsMainParent(!isMainParent)
                  if (isMainParent === false) {
                    setIsChild(false)
                  }
                }}
              />
            </CCol>
            </div>}
            
            <CCol md={12}>
              <CFormCheck
                className="customCheckbox"
                type="checkbox"
                id="multiColor"
                reverse
                label="هل تود تغيير القسم الذي يتبع له؟"
                checked={isChild}
                disabled={isMainParent}
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
                <div>القسم التابع له: <b style={{color: Theme.primaryLight}}>{selectedCategory?.name_ar} </b></div>
              </CRow>
            )}
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

export default EditCategory
