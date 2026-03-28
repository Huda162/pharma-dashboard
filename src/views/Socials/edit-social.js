/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react'
import { CAlert, CButton, CCardBody, CCol, CRow } from '@coreui/react'
import { useLocation, useParams } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSocialEditing } from 'src/hooks/Socials/useSocialEditing'
import PageTitle from 'src/components/PageTitle'
import AppCard from 'src/components/AppCard'
import { AppBreadcrumb } from 'src/components'
import { NotePencil } from 'phosphor-react'
import { Theme } from 'src/constants/colors'
import LabelWithAsterisk from 'src/components/LabelWithAsterist'
const EditSocial = () => {
  const params = useParams()
  const { state } = useLocation()
  const item = state?.item
  const { name, setName, url, setUrl, loading, update, visible, setVisible } = useSocialEditing(
    params.id,
    item,
  )
  if (!item) {
    return <div>Product not found</div>
  }
  return (
    <CRow>
      <CCol xs>
        <PageTitle title="تعديل مواقع التواصل الاجتماعي" icon={<NotePencil size={25} />} />
        <AppCard>
          <CCardBody>
            <div className="column">
              <div className="row">
                <div className="col">
                  <LabelWithAsterisk labelText="اسم الموقع" />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="اسم الموقع "
                    aria-label="First name"
                    name="user_name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                <LabelWithAsterisk labelText="رابط  الموقع" />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="الرابط"
                    aria-label="First name"
                    name="address"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
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

export default EditSocial
