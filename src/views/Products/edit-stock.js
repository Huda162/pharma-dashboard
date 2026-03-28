/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {
  CButton,
  CCardBody,
  CCol,
  CRow,
  CForm,
  CFormInput,
  CFormCheck,
  CAlert,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import { Spinner } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CheckSquare, Info, NotePencil, Warning } from 'phosphor-react'
import { AppBreadcrumb } from 'src/components'
import PageTitle from 'src/components/PageTitle'
import { Theme } from 'src/constants/colors'
import AppCard from 'src/components/AppCard'
import { useLanguage } from 'src/hooks/general/useLanguage'
import '../../components/test.css'
import { useCurrency } from 'src/hooks/general/useCurrency'
import { useWidth } from 'src/hooks/general/useWidth'
import { useParams } from 'react-router-dom'
import image from '../../assets/images/image.png'
import { useStockEditing } from 'src/hooks/products/useStockEditing'

// ... imports remain the same ...

const EditStock = () => {
  const params = useParams()
  const { width } = useWidth()

  const {
    productSizes,
    productColors,
    stocks,
    handleSubmit,
    validated,
    handleSelectSize,
    loading,
    visible,
    setVisible,
    handleQtyChange,
    handleMinQtyChange,
    handleColorStockChange,
    handleColorMinStockChange,
    selectAllSizes,
    isSizeSelected,
    getSizeQuantity,
    getSizeMinQuantity,
    getColorStock,
    hasColors,
    hasSizes,
    hasData,
  } = useStockEditing(params.id)


  const { isArabic, isEnglish, isHebrew } = useLanguage()
  const { isJUD, isNIS, isUSD } = useCurrency()

  // Render empty state if no data
  if (!hasData) {
    return (
      <CRow>
        <CCol xs>
          <PageTitle title="تعديل مخزون المنتج" icon={<NotePencil size={25} />} />
          <AppCard>
            <CCardBody className="text-center p-5">
              <Warning size={48} className="text-muted mb-3" />
              <h5 className="text-muted">لا توجد بيانات للمنتج</h5>
              <p className="text-muted mb-4">لا توجد ألوان أو مقاسات متاحة لهذا المنتج</p>
              <CButton
                onClick={() => window.history.back()}
                style={{
                  backgroundColor: Theme.primary1,
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 20px',
                }}
              >
                العودة للخلف
              </CButton>
            </CCardBody>
          </AppCard>
        </CCol>
      </CRow>
    )
  }

  return (
    <CRow>
      <CCol xs>
        <PageTitle title="تعديل مخزون المنتج" icon={<NotePencil size={25} />} />
        <AppCard>
          <CCardBody className="p-4">
            <div className="container-fluid">
              <div className="row justify-content-center">
                <div className="col-12">
                  {/* Information Banner */}
                  {!hasColors && hasSizes && (
                    <CAlert color="info" className="mb-4">
                      <div className="d-flex align-items-center">
                        <Warning size={20} className="me-2" />
                        <span>يتم إدخال المخزون حسب المقاسات (لا توجد ألوان محددة)</span>
                      </div>
                    </CAlert>
                  )}

                  {hasColors && !hasSizes && (
                    <CAlert color="info" className="mb-4">
                      <div className="d-flex align-items-center">
                        <Warning size={20} className="me-2" />
                        <span>يتم إدخال المخزون حسب الألوان (لا توجد مقاسات محددة)</span>
                      </div>
                    </CAlert>
                  )}

                  {hasColors && hasSizes && (
                    <CAlert color="info" className="mb-4">
                      <div className="d-flex align-items-center">
                        <Info size={20} className="me-2" />
                        <span>يمكن إدخال المخزون حسب الألوان والمقاسات معاً</span>
                      </div>
                    </CAlert>
                  )}

                  <CForm
                    className="needs-validation"
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                  >
                    {/* Stocks Section */}
                    <div className="stocks-container">
                      {stocks.map((stock, index) => (
                        <div
                          key={stock.color.id}
                          className="stock-item card mb-4 p-4"
                          style={{
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            border: '1px solid #e9ecef',
                            borderRadius: '12px',
                            backgroundColor: Theme.white,
                          }}
                        >
                          <div className="row align-items-start">
                            {/* Color Preview Section */}
                            <div className="col-md-auto">
                              <div className="color-preview-section text-center">
                                {/* Color Image */}
                                <div
                                  className="color-image-container mb-3"
                                  style={{
                                    width: '8rem',
                                    height: '8rem',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                    borderRadius: '10px',
                                    overflow: 'hidden',
                                    backgroundColor: '#f8f9fa',
                                  }}
                                >
                                  <img
                                    src={stock.color.color_image || image}
                                    alt={`Color ${stock.color.name}`}
                                    onError={(e) => {
                                      e.target.onerror = null
                                      e.target.src = image
                                    }}
                                    className="h-100 w-100 object-fit-cover"
                                    style={{
                                      objectFit: 'cover',
                                      borderRadius: '10px',
                                    }}
                                  />
                                </div>

                                {/* Color Swatch */}
                                <div
                                  className="color-swatch-container"
                                  style={{
                                    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                                    borderRadius: '8px',
                                    padding: '4px',
                                    backgroundColor: Theme.white,
                                  }}
                                >
                                  <div
                                    className="color-swatch"
                                    style={{
                                      width: '100%',
                                      height: '2.5rem',
                                      backgroundColor: stock.color.color || '#cccccc',
                                      borderRadius: '6px',
                                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                      display: 'flex',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                    }}
                                    title={`Color: ${stock.color.color || 'Default'}`}
                                  >
                                    <span
                                      className="text-muted fw-medium"
                                      style={{
                                        backgroundColor: 'white',
                                        padding: '2px',
                                        borderRadius: '6px',
                                        opacity: '0.5',
                                        fontWeight: 'bold',
                                        fontSize: '12px',
                                      }}
                                    >
                                      {stock.color.color_code
                                        ? `رمز اللون: ${stock?.color?.color_code}`
                                        : stock.color.name || 'افتراضي'}
                                    </span>
                                  </div>
                                </div>

                               
                              </div>
                            </div>

                            {hasSizes && (
                              <div className="col">
                                <div
                                  className="sizes-table-container"
                                  style={{
                                    borderRadius: '10px',
                                    overflow: 'hidden',
                                  }}
                                >
                                  <CTable
                                    align="middle"
                                    hover
                                    responsive
                                    striped
                                    className="mb-0"
                                    style={{
                                      boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                                    }}
                                  >
                                    <CTableHead
                                      color="light"
                                      style={{
                                        backgroundColor: '#f8f9fa',
                                        borderBottom: `2px solid ${Theme.primary1}`,
                                      }}
                                    >
                                      <CTableRow>
                                        <CTableHeaderCell
                                          className="text-center"
                                          style={{ width: '120px' }}
                                        >
                                          <CButton
                                            className="fw-semibold"
                                            style={{
                                              backgroundColor: Theme.primary1,
                                              border: 'none',
                                              borderRadius: '6px',
                                              padding: '6px 12px',
                                              fontSize: '0.875rem',
                                            }}
                                            onClick={() => selectAllSizes(stock.color.id)}
                                          >
                                            <CheckSquare size={16} className="me-1" />
                                            الكل
                                          </CButton>
                                        </CTableHeaderCell>
                                        <CTableHeaderCell className="text-center fw-bold">
                                          الحجم
                                        </CTableHeaderCell>
                                        <CTableHeaderCell className="text-center fw-bold">
                                          الكمية في المخزون
                                        </CTableHeaderCell>
                                        <CTableHeaderCell className="text-center fw-bold">
                                          الحد الأدنى من الكمية في المخزون
                                        </CTableHeaderCell>
                                      </CTableRow>
                                    </CTableHead>

                                    <CTableBody>
                                      {productSizes.map((size, sizeIndex) => {
                                        const isSelected = isSizeSelected(stock.color.id, size.id)
                                        const quantity = getSizeQuantity(stock.color.id, size.id)
                                        const minQuantity = getSizeMinQuantity(stock.color.id, size.id)

                                        return (
                                          <CTableRow
                                            key={sizeIndex}
                                            style={{
                                              height: '60px',
                                              transition: 'background-color 0.2s ease',
                                            }}
                                            className="size-row"
                                          >
                                            <CTableDataCell className="text-center">
                                              <div className="d-flex justify-content-center align-items-center">
                                                <CFormCheck
                                                  id={`size-${stock.color.id}-${size.id}`}
                                                  className="customCheckbox"
                                                  label=" "
                                                  reverse
                                                  checked={isSelected}
                                                  onChange={() => {
                                                    handleSelectSize(size.id, stock.color.id)
                                                  }}
                                                  style={{
                                                    transform: 'scale(1.2)',
                                                  }}
                                                />
                                              </div>
                                            </CTableDataCell>

                                            <CTableDataCell className="text-center fw-medium">
                                              <span className="size-label">{size.size}</span>
                                            </CTableDataCell>

                                            <CTableDataCell className="text-center">
                                              {isSelected ? (
                                                <CFormInput
                                                  type="number"
                                                  min="0"
                                                  value={quantity}
                                                  onChange={(e) => {
                                                    handleQtyChange(
                                                      stock.color.id,
                                                      size.id,
                                                      e.target.value,
                                                    )
                                                  }}
                                                  className="text-center"
                                                  style={{
                                                    maxWidth: '120px',
                                                    margin: '0 auto',
                                                    borderRadius: '6px',
                                                    border: `1px solid #e9ecef`,
                                                  }}
                                                />
                                              ) : (
                                                <span className="text-muted">-</span>
                                              )}
                                            </CTableDataCell>
                                            <CTableDataCell className="text-center">
                                              {isSelected ? (
                                                <CFormInput
                                                  type="number"
                                                  min="0"
                                                  value={minQuantity}
                                                  onChange={(e) => {
                                                    handleMinQtyChange(
                                                      stock.color.id,
                                                      size.id,
                                                      e.target.value,
                                                    )
                                                  }}
                                                  className="text-center"
                                                  style={{
                                                    maxWidth: '120px',
                                                    margin: '0 auto',
                                                    borderRadius: '6px',
                                                    border: `1px solid #e9ecef`,
                                                  }}
                                                />
                                              ) : (
                                                <span className="text-muted">-</span>
                                              )}
                                            </CTableDataCell>
                                          </CTableRow>
                                        )
                                      })}
                                    </CTableBody>
                                  </CTable>
                                </div>
                              </div>
                            )}

                            {/* Show message when no sizes available but we have color stock */}
                            {/* {!hasSizes && hasColors && stock.sizes.length === 0 && (
                              <div className="col">
                                <div className="text-center p-5">
                                  <Info size={32} className="text-muted mb-3" />
                                  <h6 className="text-muted">إدخال مخزون حسب اللون</h6>
                                  <p className="text-muted mb-0">
                                    يتم إدخال المخزون للون مباشرة بدون مقاسات
                                  </p>
                                </div>
                              </div>
                            )} */}
                            {(!hasSizes && hasColors) && (
                              <div className="col d-flex gap-2">
                                <div className="col">
                                  <label className="form-label fw-bold mb-2">مخزون اللون</label>
                                  <CFormInput
                                    type="number"
                                    min="0"
                                    value={stock.colorStock || 0}
                                    onChange={(e) => {
                                      handleColorStockChange(stock.color.id, e.target.value)
                                    }}
                                    className="text-center"
                                    style={{
                                      borderRadius: '6px',
                                      border: `1px solid #e9ecef`,
                                    }}
                                    placeholder="0"
                                  />
                                </div>
                                <div className="col">
                                  <label className="form-label fw-bold mb-2">
                                    الحد الأدنى من مخزون اللون
                                  </label>
                                  <CFormInput
                                    type="number" 
                                    min="0"
                                    value={stock.min_stock || 0}
                                    onChange={(e) => {
                                      handleColorMinStockChange(stock.color.id, e.target.value)
                                    }}
                                    className="text-center"
                                    style={{
                                      borderRadius: '6px',
                                      border: `1px solid #e9ecef`,
                                    }}
                                    placeholder="0"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Action Section */}
                    <CCardBody className="text-center mt-4 p-4">
                      {loading ? (
                        <div className="loading-container">
                          <Spinner
                            animation="border"
                            role="status"
                            style={{
                              margin: '10px',
                              color: Theme.primary1,
                            }}
                          >
                            <span className="visually-hidden">جاري التحميل...</span>
                          </Spinner>
                          <div className="mt-2">
                            <small className="text-muted">جاري حفظ البيانات...</small>
                          </div>
                        </div>
                      ) : (
                        <CButton
                          className="submit-btn fw-bold"
                          style={{
                            width: '220px',
                            backgroundColor: Theme.primary1,
                            border: 'none',
                            borderRadius: '8px',
                            padding: '12px 24px',
                            fontSize: '1.1rem',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            transition: 'all 0.3s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-2px)'
                            e.target.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)'
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)'
                            e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'
                          }}
                          type="submit"
                        >
                          تأكيد الحفظ
                        </CButton>
                      )}

                      {/* Error Alert */}
                      <CAlert
                        color="danger"
                        dismissible
                        visible={visible}
                        onClose={() => setVisible(false)}
                        className="mt-3 mx-auto"
                        style={{
                          maxWidth: '500px',
                          borderRadius: '8px',
                          border: 'none',
                          boxShadow: '0 2px 8px rgba(220,53,69,0.2)',
                        }}
                      >
                        <div className="d-flex align-items-center">
                          <i className="bi bi-exclamation-triangle-fill me-2"></i>
                          <span>حصل خلل أثناء العملية، يرجى المحاولة فيما بعد</span>
                        </div>
                      </CAlert>
                    </CCardBody>
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
export default EditStock
