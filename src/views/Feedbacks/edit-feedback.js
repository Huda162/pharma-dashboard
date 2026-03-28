/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { CAlert, CButton, CCardBody, CCol, CRow } from '@coreui/react'
import { useParams } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useFeedbackEditing } from 'src/hooks/feedbacks/useFeedbackEditing'
import PageTitle from 'src/components/PageTitle'
import AppCard from 'src/components/AppCard'
import { AppBreadcrumb } from 'src/components'
import { NotePencil } from 'phosphor-react'
import { useLanguage } from 'src/hooks/general/useLanguage'
import { Theme } from 'src/constants/colors'
import { useWidth } from 'src/hooks/general/useWidth'
const EditFeedback = () => {
  const params = useParams()
  const {
    loading,
    customerNameAr,
    customerNameEng,
    customerNameHeb,
    image,
    body_ar,
    body_en,
    body_heb,
    updatedImage,
    setCustomerNameAr,
    setCustomerNameEng,
    setCustomerNameHeb,
    setBody_ar,
    setBody_en,
    setBody_heb,
    setUpdatedImage,
    update,
    visible,
    setVisible
} = useFeedbackEditing(params.id)
const {width} = useWidth()


const {isArabic, isEnglish, isHebrew} = useLanguage()

  return (
    <CRow>
      <CCol xs>
      <PageTitle title='تعديل الملاحظة' icon={<NotePencil size={25} />}/>
        <AppCard>
          <CCardBody>
            <div className="column">
              <div className="row" style={{ marginTop: '15px' }}>
              {isArabic === 'true' && <CCol sm={width < 768 ? 12 : null}>
                  <label className="form-label"> الاسم باللغة العربية </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=" الاسم باللغة العربية"
                    aria-label="First name"
                    name="address"
                    value={customerNameAr}
                    onChange={(e) => setCustomerNameAr(e.target.value)}
                  />
                </CCol>}
              {isEnglish === 'true' && <CCol sm={width < 768 ? 12 : null}>
                  <label className="form-label"> الاسم باللغة الانجليزية </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=" الاسم باللغة الانجليزية"
                    aria-label="First name"
                    name="address"
                    value={customerNameEng}
                    onChange={(e) => setCustomerNameEng(e.target.value)}
                  />
                </CCol>}
              {isHebrew === 'true' && <CCol sm={width < 768 ? 12 : null}>
                  <label className="form-label"> الاسم باللغة العبرية </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=" الاسم باللغة العبرية"
                    aria-label="First name"
                    name="address"
                    value={customerNameHeb}
                    onChange={(e) => setCustomerNameHeb(e.target.value)}
                  />
                </CCol>}
              <div className="col-md-12">
                  <label className="form-label">الصورة </label>
                  <input
                    className="form-control form-control-sm"
                    id="formFileSm"
                    type="file"
                    name="product_pic"
                    onChange={(e) => setUpdatedImage(e.target.files[0])}
                  />
                  {updatedImage ? (
                    <img
                      src={updatedImage ? URL.createObjectURL(updatedImage) : ''}
                      alt="picture"
                      width={300}
                      height={300}
                      style={{ margin: '10px' }}
                    />
                  ) : (
                    <img src={image} width={300} height={300} style={{ margin: '10px' }} />
                  )}
                </div>
                
                {isArabic === 'true' && <CCol sm={width < 768 ? 12 : null}>
                  <label className="form-label"> المحتوى بالعربية</label>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="المحتوى بالعربية"
                    aria-label="First name"
                    name="address"
                    value={body_ar}
                    onChange={(e) => setBody_ar(e.target.value)}
                  />
                </CCol>}
                {isEnglish === 'true' && <CCol sm={width < 768 ? 12 : null}>
                  <label className="form-label"> المحتوى بالانجليزية </label>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="المحتوى بالانجليزية"
                    aria-label="First name"
                    name="address"
                    value={body_en}
                    onChange={(e) => setBody_en(e.target.value)}
                  />
                </CCol>}
                {isHebrew === 'true' && <CCol sm={width < 768 ? 12 : null}>
                  <label className="form-label"> المحتوى بالعبرية </label>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="المحتوى بالعبرية"
                    aria-label="First name"
                    name="address"
                    value={body_heb}
                    onChange={(e) => setBody_heb(e.target.value)}
                  />
                </CCol>}
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
        </AppCard>
      </CCol>
      <ToastContainer />
    </CRow>
  )
}

export default EditFeedback
