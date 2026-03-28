/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormInput,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CRow,
} from '@coreui/react'
import { useLocation, useParams } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useCategoryEditing } from 'src/hooks/categories/useCategoryEditing'
import PageTitle from 'src/components/PageTitle'
import AppCard from 'src/components/AppCard'
import { AppBreadcrumb } from 'src/components'
import { MagnifyingGlass, Minus, NotePencil, Plus, X } from 'phosphor-react'
import { useLanguage } from 'src/hooks/general/useLanguage'
import { Theme } from 'src/constants/colors'
import image from '../../assets/images/image.png'
import { useWidth } from 'src/hooks/general/useWidth'
import { useBrandEditing } from 'src/hooks/brands/useBrandEditing'
import { usePackageEditing } from 'src/hooks/babyPackages/usePackageEditing'
import LabelWithAsterisk from 'src/components/LabelWithAsterist'

const EditPackage = () => {
  const params = useParams()
  const { state } = useLocation()
  const item = state?.item
  const {
    nameAr,
    setNameAr,
    nameEn,
    setNameEn,
    birthMonth,
    setMonth,
    months,
    babyGender,
    setGender,
    genders,
    products,
    searchQuery,
    setSearchQuery,
    selectedProducts,
    handleProductChange,
    removeProduct,
    updateProductQuantity,
    loading,
    visible,
    setVisible,
    update,
    productsLoading,
    allProducts,
    nameHe,
    setNameHe,
    updateProductCategory,
  } = usePackageEditing(params.id, item)
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
                <div className="column">
                  <CRow>
                    {isArabic === 'true' && (
                      <CCol sm={width < 768 ? 12 : null}>
                        <CFormTextarea
                          type="text"
                          placeholder="وصف المجموعة باللغة العربية"
                          feedbackInvalid="وصف المجموعة باللغة العربية مطلوب"
                          id="categoryNameAr"
                          label={<LabelWithAsterisk labelText="وصف المجموعة باللغة العربية" />}
                          required
                          onChange={(e) => {
                            setNameAr(e.target.value)
                          }}
                          value={nameAr}
                        />
                      </CCol>
                    )}
                    {isEnglish === 'true' && (
                      <CCol sm={width < 768 ? 12 : null}>
                        <CFormTextarea
                          type="text"
                          placeholder="وصف المجموعة باللغة الانجليزية"
                          feedbackInvalid="وصف المجموعة باللغة الانجليزية مطلوب"
                          id="categoryNameAr"
                          label={<LabelWithAsterisk labelText="وصف المجموعة باللغة الانجليزية" />}
                          required
                          onChange={(e) => {
                            setNameEn(e.target.value)
                          }}
                          value={nameEn}
                        />
                      </CCol>
                    )}
                    {isHebrew === 'true' && (
                      <CCol sm={width < 768 ? 12 : null}>
                        <CFormTextarea
                          type="text"
                          placeholder="وصف المجموعة باللغة العبرية"
                          feedbackInvalid="وصف المجموعة باللغة العبرية مطلوب"
                          id="categoryNameAr"
                          label={<LabelWithAsterisk labelText="وصف المجموعة باللغة العبرية" />}
                          required
                          onChange={(e) => {
                            setNameHe(e.target.value)
                          }}
                          value={nameHe}
                        />
                      </CCol>
                    )}
                  </CRow>
                  <CRow>
                    <CCol md={6}>
                      <CFormSelect
                        id="productCategory"
                        label={<LabelWithAsterisk labelText="اختر جنس المولود" />}
                        value={babyGender}
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <option selected="" value="">
                          {' '}
                          اختر جنس المولود
                        </option>
                        {genders?.map((item, index) => (
                          <option value={item.value} key={item.value}>
                            {item.label}
                          </option>
                        ))}
                      </CFormSelect>
                    </CCol>
                    <CCol md={6}>
                      <CFormSelect
                        feedbackInvalid="الشهر مطلوب"
                        id="month"
                        label={<LabelWithAsterisk labelText="الشهر" />}
                        required
                        onChange={(e) => {
                          setMonth(e.target.value)
                        }}
                        value={birthMonth}
                      >
                        <option value="">اختر الشهر</option>
                        <option value="1">يناير</option>
                        <option value="2">فبراير</option>
                        <option value="3">مارس</option>
                        <option value="4">أبريل</option>
                        <option value="5">مايو</option>
                        <option value="6">يونيو</option>
                        <option value="7">يوليو</option>
                        <option value="8">أغسطس</option>
                        <option value="9">سبتمبر</option>
                        <option value="10">أكتوبر</option>
                        <option value="11">نوفمبر</option>
                        <option value="12">ديسمبر</option>
                      </CFormSelect>
                    </CCol>
                  </CRow>

                  <CRow className="mt-4">
                    <label className="mb-3">{<LabelWithAsterisk labelText="المنتجات" />}</label>

                    <CRow>
                      <CCol lg={8} md={7}>
                        <CInputGroup className="mb-4">
                          <CFormInput
                            type="text"
                            placeholder="ابحث عن المنتجات..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                          <CButton
                            type="button"
                            style={{ backgroundColor: Theme.primary1, border: 'none' }}
                          >
                            <MagnifyingGlass size={20} />
                          </CButton>
                        </CInputGroup>

                        {productsLoading ? (
                          <div className="text-center py-5">
                            <Spinner animation="border" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </Spinner>
                            <p className="mt-2">جاري تحميل المنتجات...</p>
                          </div>
                        ) : (
                          <div
                            style={{
                              maxHeight: '500px',
                              overflowY: 'auto',
                              padding: '10px',
                              border: '1px solid #e0e0e0',
                              borderRadius: '8px',
                            }}
                          >
                            <CRow>
                              {allProducts.length > 0 ? (
                                allProducts.map((product) => (
                                  <CCol lg={4} md={6} sm={6} key={product.id} className="mb-3">
                                    <CCard
                                      className="h-100 product-card"
                                      style={{
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        border: selectedProducts.some((p) => p.id === product.id)
                                          ? `2px solid ${Theme.primary1}`
                                          : '1px solid #ddd',
                                      }}
                                      onClick={() => handleProductChange(product)}
                                    >
                                      <CCardBody className="d-flex flex-column p-3">
                                        <div className="text-center mb-2">
                                          {product.images ? (
                                            <img
                                              src={product.images?.[0].url}
                                              alt={product.name_ar}
                                              style={{
                                                width: '80px',
                                                height: '80px',
                                                objectFit: 'cover',
                                                borderRadius: '8px',
                                              }}
                                            />
                                          ) : (
                                            <div
                                              style={{
                                                width: '80px',
                                                height: '80px',
                                                backgroundColor: '#f8f9fa',
                                                borderRadius: '8px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                margin: '0 auto',
                                              }}
                                            >
                                              <span style={{ color: '#6c757d', fontSize: '12px' }}>
                                                لا توجد صورة
                                              </span>
                                            </div>
                                          )}
                                        </div>

                                        <h6
                                          className="text-center mb-2"
                                          style={{
                                            fontSize: '14px',
                                            fontWeight: 'bold',
                                            minHeight: '40px',
                                          }}
                                        >
                                          {product.name_ar}
                                        </h6>

                                        {product.price_nis_retail && (
                                          <p
                                            className="text-center mb-0"
                                            style={{
                                              color: Theme.primary1,
                                              fontWeight: 'bold',
                                              fontSize: '14px',
                                            }}
                                          >
                                            ₪{product.price_nis_retail}
                                          </p>
                                        )}

                                        {selectedProducts.some((p) => p.id === product.id) && (
                                          <div className="text-center mt-2">
                                            <span
                                              style={{
                                                color: Theme.primary1,
                                                fontSize: '12px',
                                                fontWeight: 'bold',
                                              }}
                                            >
                                              ✓ مضاف
                                            </span>
                                          </div>
                                        )}
                                      </CCardBody>
                                    </CCard>
                                  </CCol>
                                ))
                              ) : (
                                <CCol xs={12}>
                                  <div className="text-center py-4">
                                    <p style={{ color: '#6c757d' }}>
                                      {searchQuery
                                        ? 'لا توجد منتجات مطابقة للبحث'
                                        : 'لا توجد منتجات متاحة'}
                                    </p>
                                  </div>
                                </CCol>
                              )}
                            </CRow>
                          </div>
                        )}
                      </CCol>

                      <CCol lg={4} md={5}>
                        <CCard
                          style={{
                            border: '2px solid #e9ecef',
                            height: 'fit-content',
                            maxHeight: '500px',
                          }}
                        >
                          <CCardBody>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <h5 style={{ margin: 0, fontWeight: 'bold' }}>المنتجات المختارة</h5>
                              <span
                                style={{
                                  backgroundColor: Theme.primary1,
                                  color: 'white',
                                  borderRadius: '50%',
                                  width: '25px',
                                  height: '25px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '12px',
                                  fontWeight: 'bold',
                                }}
                              >
                                {selectedProducts.length}
                              </span>
                            </div>

                            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                              {selectedProducts.length > 0 ? (
                                selectedProducts.map((item) => (
                                  <CCard
                                    key={item.id}
                                    className="mb-2"
                                    style={{ border: '1px solid #dee2e6' }}
                                  >
                                    <CCardBody className="p-3">
                                      <div className="d-flex justify-content-between align-items-start mb-2">
                                        <h6
                                          style={{
                                            margin: 0,
                                            fontSize: '14px',
                                            fontWeight: 'bold',
                                          }}
                                        >
                                          {item.name_ar}
                                        </h6>
                                        <button
                                          type="button"
                                          onClick={() => removeProduct(item.id)}
                                          style={{
                                            backgroundColor: 'transparent',
                                            border: 'none',
                                            color: '#dc3545',
                                            padding: '2px',
                                            borderRadius: '3px',
                                            cursor: 'pointer',
                                          }}
                                        >
                                          <X size={16} />
                                        </button>
                                      </div>
                                      <div>
                                        <p style={{ fontSize: '12px', marginBottom: '8px' }}>
                                          العرض في:
                                        </p>
                                        <div
                                          style={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: '6px',
                                          }}
                                        >
                                          {item.categories && item.categories.length > 0 ? (
                                            item.categories.map((category) => (
                                              <button
                                                key={category.id}
                                                type="button"
                                                onClick={() =>
                                                  updateProductCategory(item.id, category.id)
                                                }
                                                style={{
                                                  padding: '4px 10px',
                                                  fontSize: '11px',
                                                  borderRadius: '16px',
                                                  border: `1px solid ${
                                                    item.selectedCategory === category.id
                                                      ? Theme.primary1
                                                      : '#dee2e6'
                                                  }`,
                                                  backgroundColor:
                                                    item.selectedCategory === category.id
                                                      ? Theme.primary1
                                                      : '#f8f9fa',
                                                  color:
                                                    item.selectedCategory === category.id
                                                      ? '#fff'
                                                      : '#495057',
                                                  cursor: 'pointer',
                                                  transition: 'all 0.2s',
                                                  fontWeight:
                                                    item.selectedCategory === category.id
                                                      ? 'bold'
                                                      : 'normal',
                                                  outline: 'none',
                                                }}
                                                onMouseEnter={(e) => {
                                                  if (item.selectedCategory !== category.id) {
                                                    e.target.style.backgroundColor = '#e9ecef'
                                                    e.target.style.borderColor = '#adb5bd'
                                                  }
                                                }}
                                                onMouseLeave={(e) => {
                                                  if (item.selectedCategory !== category.id) {
                                                    e.target.style.backgroundColor = '#f8f9fa'
                                                    e.target.style.borderColor = '#dee2e6'
                                                  }
                                                }}
                                              >
                                                {category.name_ar}
                                              </button>
                                            ))
                                          ) : (
                                            <span style={{ fontSize: '12px', color: '#6c757d' }}>
                                              لا توجد فئات
                                            </span>
                                          )}
                                        </div>
                                      </div>  
                                      <div className="d-flex align-items-center justify-content-between">
                                        <span style={{ fontSize: '12px', color: '#6c757d' }}>
                                          الكمية:
                                        </span>
                                        <div className="d-flex align-items-center">
                                          <button
                                            type="button"
                                            onClick={() =>
                                              updateProductQuantity(
                                                item.id,
                                                Math.max(1, (item.quantity || 1) - 1),
                                              )
                                            }
                                            style={{
                                              backgroundColor: '#f8f9fa',
                                              border: '1px solid #dee2e6',
                                              width: '30px',
                                              height: '30px',
                                              borderRadius: '4px',
                                              display: 'flex',
                                              alignItems: 'center',
                                              justifyContent: 'center',
                                              cursor: 'pointer',
                                            }}
                                          >
                                            <Minus size={12} />
                                          </button>
                                          <span
                                            style={{
                                              margin: '0 10px',
                                              fontWeight: 'bold',
                                              minWidth: '20px',
                                              textAlign: 'center',
                                            }}
                                          >
                                            {item.quantity || 1}
                                          </span>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              updateProductQuantity(
                                                item.id,
                                                (item.quantity || 1) + 1,
                                              )
                                            }
                                            style={{
                                              backgroundColor: '#f8f9fa',
                                              border: '1px solid #dee2e6',
                                              width: '30px',
                                              height: '30px',
                                              borderRadius: '4px',
                                              display: 'flex',
                                              alignItems: 'center',
                                              justifyContent: 'center',
                                              cursor: 'pointer',
                                            }}
                                          >
                                            <Plus size={12} />
                                          </button>
                                        </div>
                                      </div>
                                    </CCardBody>
                                  </CCard>
                                ))
                              ) : (
                                <div className="text-center py-4" style={{ color: '#6c757d' }}>
                                  <p>لم يتم اختيار أي منتجات بعد</p>
                                  <small>انقر على أي منتج من القائمة لإضافته</small>
                                </div>
                              )}
                            </div>
                          </CCardBody>
                        </CCard>
                      </CCol>
                    </CRow>
                  </CRow>
                </div>
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

export default EditPackage
