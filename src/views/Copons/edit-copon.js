/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react'
import { CAlert, CButton, CCard, CCardBody, CCol, CFormInput, CRow } from '@coreui/react'
import { useLocation, useParams } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useCoponEditing } from 'src/hooks/copons/useCoponEditing'
import PageTitle from 'src/components/PageTitle'
import { NotePencil } from 'phosphor-react'
import { AppBreadcrumb } from 'src/components'
import AppCard from 'src/components/AppCard'
import { Theme } from 'src/constants/colors'
import SearchableDropdown from 'src/components/SearchableDropdown'
import LabelWithAsterisk from 'src/components/LabelWithAsterist'
const EditCopon = () => {
  const params = useParams()
  const { state } = useLocation()
  const item = state?.item
  const {
    code,
    value,
    name,
    endDate,
    setName,
    setValue,
    setCode,
    setEndDate,
    loading,
    update,
    visible,
    setVisible,
    coponType,
    setType,
  } = useCoponEditing(params.id, item)

  if (!item) {
    return <div>Product not found</div>
  }
  return (
    <CRow>
      <CCol xs>
        <PageTitle title="تعديل الكوبون" icon={<NotePencil size={25} />} />
        <AppCard>
          <CCardBody>
            <div className="column">
              <CCol md={12}>
              <LabelWithAsterisk labelText="الاسم" />

                <input
                  className="form-control"
                  id="formFileSm"
                  type="text"
                  name="product_pic"
                  placeholder="الاسم"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </CCol>
              <CRow>
                <CCol md={6}>
                  <label className="form-label"> الكود</label>
                  <input
                    className="form-control"
                    id="formFileSm"
                    type="text"
                    name="product_pic"
                    placeholder="الكود"
                    onChange={(e) => setCode(e.target.value)}
                    value={code}
                  />
                </CCol>
                <CCol md={6}>
                  <LabelWithAsterisk
                    labelText="
                 تاريخ الانتهاء
                 "
                  />
                  <input
                    className="form-control"
                    id="formFileSm"
                    type="date"
                    name="product_pic"
                    placeholder="تاريخ الانتهاء"
                    onChange={(e) => setEndDate(e.target.value)}
                    value={endDate}
                  />
                </CCol>
              </CRow>
              <CCol md={12}>
                <LabelWithAsterisk labelText="نوع الكوبون" />
                <SearchableDropdown
                  options={[
                    { id: 'percentage', name: 'نسبة مئوية' },
                    { id: 'static_value', name: 'قيمة محددة' },
                  ]}
                  label='name'
                  placeholder="نوع الكوبون"
                  id="id"
                  selectedVal={coponType}
                  handleChange={(val) => setType(val)}
                  loading={false}
                  isRequired
                />
              </CCol>
              {coponType === 'percentage' && (
                <CCol>
                  <CFormInput
                    type="text"
                    placeholder="نسبة الخصم"
                    feedbackInvalid="نسبة الخصم مطلوبة"
                    id="categoryNameAr"
                    label={<LabelWithAsterisk labelText="نسبة الخصم" />}
                    required
                    onChange={(e) => {
                      const value = e.target.value

                      if (
                        value === '' ||
                        (/^\d+$/.test(value) && parseInt(value) > 0 && parseInt(value) < 101)
                      ) {
                        setValue(e.target.value)
                      }
                    }}
                    value={value}
                  />
                </CCol>
              )}
              {coponType === 'static_value' && (
                <CCol>
                  <CFormInput
                    type="text"
                    placeholder="القيمة بالشيكل"
                    feedbackInvalid="قيمة الكوبون بالشيكل مطلوبة"
                    id="categoryNameAr"
                    label="القيمة بالشيكل"
                    required
                    onChange={(e) => {
                      const value = e.target.value
                      if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
                        setValue(e.target.value)
                      }
                    }}
                    value={value}
                  />
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

export default EditCopon
