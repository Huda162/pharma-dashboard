/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CBadge,
  CFormInput,
  CFormSelect,
  CAlert,
  CSpinner,
  CTooltip,
  CProgress,
} from '@coreui/react'
import { Spinner } from 'react-bootstrap/esm'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { useOrderDetails } from 'src/hooks/orders/useOrderDetails'
import PageTitle from 'src/components/PageTitle'
import { AppBreadcrumb } from 'src/components'
import AppCard from 'src/components/AppCard'
import { Theme } from 'src/constants/colors'
import OrderCard from 'src/components/OrderCard'
import { Equals, Minus, ShoppingCartSimple, X, Info } from 'phosphor-react'
import image from '../../assets/images/image.png'
import { useLanguage } from 'src/hooks/general/useLanguage'
import { useWidth } from 'src/hooks/general/useWidth'

const OrderDetails = () => {
  const {
    loading,
    order,
    OrderDetails,
    totals,
    isLoaded,
    coordinate,
    setCoordinates,
    openColor,
    setOpenColor,
    selectProduct,
    setSelectedProduct,
  } = useOrderDetails()
  const { width } = useWidth()
  const { isArabic, isEnglish, isHebrew } = useLanguage()
  const discount =
    order?.coupon?.type === 'percentage'
      ? (order.sum * order?.coupon?.value) / 100
      : order?.coupon?.value || 0

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return 'warning'
      case 'in_progress':
        return 'info'
      case 'done':
        return 'primary'
      case 'delivered':
        return 'success'
      case 'cancelled':
        return 'danger'
      default:
        return 'secondary'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'معلق'
      case 'in_progress':
        return 'في التوصيل'
      case 'done':
        return 'عالق'
      case 'delivered':
        return 'تم الاستلام'
      case 'cancelled':
        return 'ملغي'
      default:
        return ''
    }
  }

  return (
    <>
      <CRow>
        <CCol xs>
          <PageTitle
            title="تفاصيل الطلبية"
            icon={<ShoppingCartSimple size={25} weight="light" />}
          />

          <AppCard className="mb-4">
            <CCardBody className="p-4">
              <CRow className="mb-4">
                <CCol md={6}>
                  <div className="p-3 border-bottom">
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">اسم الزبون:</span>
                      <span className="fw-semibold">{order.customer_name}</span>
                    </div>
                  </div>
                  <div className="p-3 border-bottom">
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">رقم الهاتف:</span>
                      <span className="fw-semibold">{order.phone}</span>
                    </div>
                  </div>
                  <div className="p-3 border-bottom">
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">المنطقة:</span>
                      <span className="fw-semibold">{order.geoarea}</span>
                    </div>
                  </div>
                </CCol>
                <CCol md={6}>
                  <div className="p-3 border-bottom">
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">المدينة:</span>
                      <span className="fw-semibold">{order.city}</span>
                    </div>
                  </div>
                  <div className="p-3 border-bottom">
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">حالة الطلبية:</span>
                      <CBadge color={getStatusBadge(order.status)}>
                        {getStatusText(order.status)}
                      </CBadge>
                    </div>
                  </div>
                  <div className="p-3 border-bottom">
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">رقم الطلب:</span>
                      <span className="fw-semibold">#{order.id}</span>
                    </div>
                  </div>
                </CCol>
              </CRow>

              <CCard className="mb-4 border-0 shadow-sm">
                <CCardBody className="p-4">
                  <h5 className="fw-bold mb-3">ملاحظات الزبون:</h5>
                  <div className="p-3 bg-light rounded">
                    <p className="mb-0">{order.note || 'لا يوجد ملاحظات'}</p>
                  </div>
                </CCardBody>
              </CCard>

              <CRow className="g-4">
                <CCol lg={7}>
                  <CCard className="h-100 border-0 shadow-sm">
                    <CCardBody className="p-4">
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <h4 className="fw-bold mb-0">منتجات الطلبية</h4>
                        <span className="text-muted">{OrderDetails.length} منتج</span>
                      </div>

                      {loading ? (
                        <div className="text-center py-5">
                          <CSpinner color="primary" />
                        </div>
                      ) : (
                        <div className="table-responsive">
                          <CTable hover borderless className="mb-0">
                            <CTableHead>
                              <CTableRow>
                                <CTableHeaderCell scope="col" className="w-50">
                                  المنتج
                                </CTableHeaderCell>
                                <CTableHeaderCell scope="col" className="text-center">
                                  الكمية
                                </CTableHeaderCell>
                                <CTableHeaderCell scope="col" className="text-end">
                                  السعر
                                </CTableHeaderCell>
                              </CTableRow>
                            </CTableHead>
                            <CTableBody>
                              {OrderDetails.map((item, index) => (
                                <CTableRow key={index} className="align-middle">
                                  <CTableDataCell>
                                    <div className="d-flex align-items-center">
                                      <div className="flex-shrink-0 me-3">
                                        <img
                                          src={item.product_image || image}
                                          onError={(e) => {
                                            e.target.onError = null
                                            e.target.src = image
                                          }}
                                          alt="product"
                                          width="60"
                                          height="60"
                                          className="rounded"
                                          style={{ objectFit: 'cover' }}
                                        />
                                      </div>
                                      <div className="flex-grow-1">
                                        {item.product ? (
                                          <>
                                            <h6 className="mb-1">
                                              {isArabic === 'true' && item.product?.name_ar}
                                            </h6>
                                            <div className="d-flex flex-wrap gap-2 mt-2">
                                              {item.selected_color &&
                                                item.selected_color !== 'undefined' && (
                                                  <CTooltip
                                                    content="اضغط لمعاينة اللون"
                                                    placement="top"
                                                  >
                                                    <CBadge
                                                      color="light"
                                                      className="cursor-pointer d-flex align-items-center gap-1"
                                                      onClick={() => {
                                                        setSelectedProduct(item)
                                                        setOpenColor(true)
                                                      }}
                                                    >
                                                      اللون
                                                      {item.product_color && (
                                                        <span
                                                          className="rounded-circle d-inline-block"
                                                          style={{
                                                            width: '16px',
                                                            height: '16px',
                                                            backgroundImage: `url(${item.product_color.color_image})`,
                                                            backgroundSize: 'cover',
                                                          }}
                                                        />
                                                      )}
                                                    </CBadge>
                                                  </CTooltip>
                                                )}
                                              {item.selected_size &&
                                                item.selected_size !== 'undefined' && (
                                                  <CBadge color="light">
                                                    الحجم: {item.selected_size}
                                                  </CBadge>
                                                )}
                                            </div>
                                          </>
                                        ) : (
                                          <span className="text-danger">منتج محذوف</span>
                                        )}
                                      </div>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell className="text-center">
                                    <div className="d-flex justify-content-center align-items-center gap-2">
                                      <span className="fw-medium">{item.qty}</span>
                                      <X size={16} weight="bold" className="text-muted" />
                                      <span className="fw-medium">₪{item.price}</span>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell className="text-end">
                                    <div className="d-flex justify-content-start align-items-center gap-2">
                                      <span className="fw-bold">₪{item.sum_all}</span>
                                    </div>
                                  </CTableDataCell>
                                </CTableRow>
                              ))}
                            </CTableBody>
                          </CTable>
                        </div>
                      )}
                    </CCardBody>
                  </CCard>
                </CCol>

                <CCol lg={5}>
                  <CCard className="h-100 border-0 shadow-sm">
                    <CCardBody className="p-4">
                      <h4 className="fw-bold mb-4">حسابات الطلبية</h4>

                      <div className="mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <span className="text-muted">سعر المنتجات:</span>
                          <span className="fw-medium">₪{order.sum}</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <span className="text-muted">سعر التوصيل:</span>
                          <span className="fw-medium">₪{order.delivery_price}</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <span className="text-muted">سعر الخصم:</span>
                          <span className="fw-medium text-danger">-₪{discount}</span>
                        </div>
                        <hr className="my-3" />
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="fw-bold">السعر الإجمالي:</span>
                          <span className="fw-bold fs-5">₪{order.total - discount}</span>
                        </div>
                      </div>

                      {order.coupon && (
                        <div className="mt-4 p-3 bg-light rounded">
                          <h6 className="fw-bold mb-2">تفاصيل الكوبون</h6>
                          <div className="d-flex justify-content-between">
                            <span className="text-muted">كود الكوبون:</span>
                            <span className="fw-medium">{order.coupon.code}</span>
                          </div>
                          <div className="d-flex justify-content-between">
                            <span className="text-muted">نوع الخصم:</span>
                            <span className="fw-medium">
                              {order.coupon.type === 'percentage' ? 'نسبة مئوية' : 'مبلغ ثابت'}
                            </span>
                          </div>
                          <div className="d-flex justify-content-between">
                            <span className="text-muted">قيمة الخصم:</span>
                            <span className="fw-medium">
                              {order.coupon.type === 'percentage'
                                ? `${order.coupon.value}%`
                                : `₪${order.coupon.value}`}
                            </span>
                          </div>
                        </div>
                      )}
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CCardBody>
          </AppCard>
        </CCol>
      </CRow>

      <CModal
        alignment="center"
        visible={openColor}
        onClose={() => setOpenColor(false)}
        aria-labelledby="ColorDetailsModal"
        className="almarai-regular"
        backdrop="static"
        size="lg"
      >
        <CModalHeader
          className="justify-content-between border-0 pb-0"
          style={{ direction: 'rtl' }}
        >
          <CModalTitle
            id="ColorDetailsModal"
            className="w-100 text-center"
            style={{
              fontSize: '1.5rem',
              color: Theme.primary1,
              fontWeight: 'bold',
            }}
          >
            تفاصيل المنتج واللون
          </CModalTitle>
        </CModalHeader>
        <CModalBody className="text-right" style={{ direction: 'rtl' }}>
          {selectProduct && (
            <CRow>
              <CCol md={6} className="mb-4 mb-md-0">
                <div className="mb-4">
                  <h5 className="fw-bold mb-2">اسم المنتج:</h5>
                  <div className="p-3 bg-light rounded">
                    <p className="mb-0" style={{ fontSize: '1.1rem' }}>
                      {isArabic === 'true' && selectProduct.product?.name_ar}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <h5 className="fw-bold mb-2">اللون المحدد:</h5>
                  <div className="p-3 bg-light rounded">
                    <p className="mb-2">
                      <span className="fw-medium">رمز اللون:</span>{' '}
                      {selectProduct.product_color?.color_code}
                    </p>
                    {selectProduct.product_color?.color_name && (
                      <p className="mb-0">
                        <span className="fw-medium">اسم اللون:</span>{' '}
                        {selectProduct.product_color?.color_name}
                      </p>
                    )}
                  </div>
                </div>

                {selectProduct.selected_size && (
                  <div>
                    <h5 className="fw-bold mb-2">الحجم المحدد:</h5>
                    <div className="p-3 bg-light rounded">
                      <p className="mb-0" style={{ fontSize: '1.1rem' }}>
                        {selectProduct.selected_size}
                      </p>
                    </div>
                  </div>
                )}
              </CCol>

              <CCol md={6}>
                <div className="d-flex flex-column h-100">
                  <h5 className="fw-bold mb-3">صورة اللون:</h5>
                  {selectProduct.product_color ? (
                    <div className="flex-grow-1 d-flex align-items-center justify-content-center">
                      <img
                        src={selectProduct.product_color.color_image}
                        alt="Selected color"
                        className="img-fluid rounded shadow"
                        style={{
                          maxHeight: '300px',
                          objectFit: 'contain',
                        }}
                        onError={(e) => {
                          e.target.onError = null
                          e.target.src = image
                        }}
                      />
                    </div>
                  ) : (
                    <div className="flex-grow-1 d-flex align-items-center justify-content-center bg-light rounded">
                      <span className="text-muted">لا توجد صورة متاحة</span>
                    </div>
                  )}
                </div>
              </CCol>
            </CRow>
          )}
        </CModalBody>
        <CModalFooter className="justify-content-center border-0 pt-0">
          <CButton
            color="primary"
            onClick={() => setOpenColor(false)}
            style={{ padding: '0.5rem 2rem' }}
          >
            إغلاق
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default OrderDetails
