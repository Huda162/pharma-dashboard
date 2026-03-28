/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {
  CButton,
  CCardBody,
  CCol,
  CRow,
  CForm,
  CFormInput,
  CFormTextarea,
  CFormSelect,
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
import { CheckSquare, NotePencil, PlusCircle, Trash, X } from 'phosphor-react'
import { useProductAdding } from 'src/hooks/products/useProductAdding'
import { AppBreadcrumb } from 'src/components'
import PageTitle from 'src/components/PageTitle'
import { Theme } from 'src/constants/colors'
import AppCard from 'src/components/AppCard'
import ProgressBar from 'src/components/AppProgressBar'
import AppTooltip from 'src/components/Tooltip'
import { useLanguage } from 'src/hooks/general/useLanguage'
import '../../components/test.css'
import { Chrome } from '@uiw/react-color'
import { useCurrency } from 'src/hooks/general/useCurrency'
import { useWidth } from 'src/hooks/general/useWidth'
import { useLocation } from 'react-router-dom'
import { useStockAdding } from 'src/hooks/products/useStockAdding'
import image from '../../assets/images/image.png'

const AddStocks = () => {
  const { state } = useLocation()
  const item = state?.product
  console.log(item.sizes, item.colors)
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
    selectAllSizes,
  } = useStockAdding(item.sizes, item.colors, item.id)

  const { isArabic, isEnglish, isHebrew } = useLanguage()
  const { isJUD, isNIS, isUSD } = useCurrency()

  return (
    <CRow>
      <CCol xs>
        <PageTitle title="إدارة مخزون المنتج" icon={<PlusCircle size={25} />} />
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
                    {stocks?.map((stock, index) => (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          justifyItems: 'center',
                          alignItems: 'start',
                          width: '70vw',
                        }}
                      >
                        <div>
                          <div
                            style={{
                              width: '7rem',
                              height: '7rem',
                              boxShadow: '0px 1px 2px #c8c8c8',
                              borderRadius: '5px',
                              marginBottom: '0.5rem',
                            }}
                          >
                            <img
                              src={stock.color.color_image}
                              onError={(e) => {
                                e.target.onError = null
                                e.target.src = image
                              }}
                              style={{ width: '7rem' }}
                            />
                          </div>
                          <div
                            style={{
                              boxShadow: '0px 1px 2px #c8c8c8',
                              borderRadius: '5px',
                              padding: '0.25rem',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '7rem',
                              height: '2rem',
                            }}
                          >
                            <div
                              style={{
                                width: '100%',
                                height: '100%',
                                backgroundColor: `${stock.color.color}`,
                                boxShadow: '0px 1px 2px #c8c8c8',
                                borderRadius: '5px',
                              }}
                            />
                          </div>
                        </div>
                        <div
                          className="rounded mb-3 mx-3"
                          style={{
                            backgroundColor: Theme.white,
                            boxShadow: '0px 2px 3px #c8c8c8',
                            width: '100%',
                          }}
                        >
                          <CTable
                            align="middle"
                            hover
                            responsive
                            striped
                            className=" mb-3 categories"
                            width={1000}
                          >
                            <CTableHead color="light">
                              <CTableRow>
                                <CTableHeaderCell className="text-center" style={{ width: 100 }}>
                                  <CButton
                                    style={{
                                      backgroundColor: Theme.primary1,
                                      border: 'none',
                                    }}
                                    onClick={() => selectAllSizes(stock.color.id)}
                                  >
                                    <CheckSquare size={20} /> الكل
                                  </CButton>
                                </CTableHeaderCell>
                                <CTableHeaderCell className="text-center">الحجم</CTableHeaderCell>
                                <CTableHeaderCell className="text-center w-50">
                                  الكمية في المخزون
                                </CTableHeaderCell>
                              </CTableRow>
                            </CTableHead>
                            <CTableBody>
                              {productSizes.map((size, sizeIndex) => (
                                <CTableRow
                                  key={sizeIndex}
                                  v-for="item in tableItems"
                                  style={{ height: '4rem' }}
                                >
                                  <CTableDataCell className="text-center fw-medium">
                                    <div className="d-flex justify-content-center align-items-center">
                                      <CFormCheck
                                        id="index"
                                        className="customCheckbox"
                                        label=" "
                                        reverse
                                        checked={stock.sizes.find((item) => item.size === size.id)}
                                        onChange={() => {
                                          handleSelectSize(size.id, stock.color.id)
                                        }}
                                      />
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell className="text-center">
                                    {size.size}
                                  </CTableDataCell>
                                  <CTableDataCell className="text-center">
                                    {stock.sizes.find((item) => item.size === size.id) && (
                                      <CFormInput
                                        type="number"
                                        required
                                        value={stock.sizes.qty}
                                        onChange={(e) => {
                                          handleQtyChange(stock.color.id, size.id, e.target.value)
                                        }}
                                      />
                                    )}
                                  </CTableDataCell>
                                </CTableRow>
                              ))}
                            </CTableBody>
                          </CTable>

                        </div>
                      </div>
                    ))}
                    <CCardBody>
                      {loading ? (
                        <Spinner animation="border" role="status" style={{ margin: '10px' }}>
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                      ) : (
                        <CButton
                          style={{
                            width: '200px',
                            backgroundColor: Theme.primary1,
                            border: 'none',
                          }}
                          type="submit"
                        >
                          <span style={{ fontWeight: 'bolder' }}>تأكيد</span>
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
export default AddStocks
