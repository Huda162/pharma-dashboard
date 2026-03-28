import React from 'react'
import { CAlert, CButton, CCardBody, CCol, CRow } from '@coreui/react'
import { useLocation, useParams } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/css/froala_editor.pkgd.min.css'
import { useAboutUsEditing } from 'src/hooks/aboutUs/useAboutUsEditing'
import PageTitle from 'src/components/PageTitle'
import AppCard from 'src/components/AppCard'
import { AppBreadcrumb } from 'src/components'
import { NotePencil } from 'phosphor-react'
import TextEditor from 'src/components/TextEditor'
import { Theme } from 'src/constants/colors'
import { useLanguage } from 'src/hooks/general/useLanguage'
import image from '../../assets/images/image.png'
import LabelWithAsterisk from 'src/components/LabelWithAsterist'

const EditAboutUS = () => {
  const params = useParams()
  const { state } = useLocation()
  const item = state?.aboutData
  const {
    bodyAr,
    setBodyAr,
    loading,
    update,
    visible,
    setVisible,
    bodyEng,
    bodyHeb,
    setBodyEng,
    setBodyHeb,
    updatedImage,
    setUpdatedImage,
    image: aboutImage,
  } = useAboutUsEditing(params.id, item)

  const { isArabic, isEnglish, isHebrew } = useLanguage()
  if (!item) {
    return <div>Product not found</div>
  }

  return (
    <CRow>
      <CCol xs>
        <PageTitle title="تعديل المحتوى" icon={<NotePencil size={25} />} />
        <AppCard>
          <CCardBody>
            <div>
              {isArabic === 'true' && (
                <div className="mb-3">
                  <LabelWithAsterisk labelText="المحتوى بالعربية" />

                  <TextEditor value={bodyAr} onChange={setBodyAr} />
                </div>
              )}
              {isEnglish === 'true' && (
                <div className="mb-3">
                  <LabelWithAsterisk labelText="المحتوى بالانجليزية" />
                  <TextEditor value={bodyEng} onChange={setBodyEng} />
                </div>
              )}
              {isHebrew === 'true' && (
                <div className="mb-3">
                  <LabelWithAsterisk labelText="المحتوى بالعبرية" />
                  <TextEditor value={bodyHeb} onChange={setBodyHeb} />
                </div>
              )}
              <div className="col">
                <LabelWithAsterisk labelText="الصورة" />
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
                    src={aboutImage ? aboutImage : image}
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

export default EditAboutUS
