/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { CAlert, CButton, CCardBody, CCol, CFormSelect, CRow } from '@coreui/react'
import { useLocation, useParams } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useUserEditing } from 'src/hooks/users/useUserEditing'
import PageTitle from 'src/components/PageTitle'
import AppCard from 'src/components/AppCard'
import { AppBreadcrumb } from 'src/components'
import { NotePencil } from 'phosphor-react'
import { useLanguage } from 'src/hooks/general/useLanguage'
import { Theme } from 'src/constants/colors'
import { useWidth } from 'src/hooks/general/useWidth'
import LabelWithAsterisk from 'src/components/LabelWithAsterist'
const EditUser = () => {
  const params = useParams()
  const { state } = useLocation()
  const item = state?.item

  const {
    loading,
    userNameAr,
    setUserNameAr,
    phoneNumber,
    setPhoneNumber,
    update,
    visible,
    setVisible,
    roleId,
    setRoleId,
  } = useUserEditing(params.id, item)

  const { width } = useWidth()
  if (!item) {
    return <div>Product not found</div>
  }
  return (
    <CRow>
      <CCol xs>
        <PageTitle title="تعديل بيانات المستخدم" icon={<NotePencil size={25} />} />
        <AppCard>
          <CCardBody>
            <div className="column">
              <div className="row">
                <CCol sm={width < 768 ? 12 : null}>
                  <LabelWithAsterisk labelText="اسم المستخدم باللغة العربية " />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="اسم المستخدم باللغة العربية "
                    aria-label="First name"
                    name="user_name"
                    value={userNameAr}
                    onChange={(e) => setUserNameAr(e.target.value)}
                  />
                </CCol>
              </div>
              <div className="row">
                <div className="col">
                  <LabelWithAsterisk labelText="رقم الهاتف" />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="رقم الهاتف "
                    aria-label="First name"
                    name="phone_number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
              <CCol md={12}>
                <CFormSelect
                  id="productCategory"
                  label={<LabelWithAsterisk labelText="اختر الوظيفة" />}
                  feedbackInvalid=" الوظيفة مطلوبة"
                  value={roleId}
                  onChange={(e) => setRoleId(e.target.value)}
                >
                  <option selected="" value="">
                    {' '}
                    اختر الوظيفة
                  </option>
                  <option value={1}>مسؤول</option>
                  <option value={2}>موظف</option>
                </CFormSelect>
              </CCol>
            </div>

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

export default EditUser
