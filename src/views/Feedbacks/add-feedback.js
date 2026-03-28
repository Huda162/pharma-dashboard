/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import { CAlert, CButton, CCardBody, CCol, CForm, CFormInput, CRow } from '@coreui/react'
import { Spinner } from 'react-bootstrap'
// import '../../scss/style.scss'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useFeedbackAdding } from 'src/hooks/feedbacks/useFeedbackAdding'
import PageTitle from 'src/components/PageTitle'
import { Theme } from 'src/constants/colors'
import AppCard from 'src/components/AppCard'
import { AppBreadcrumb } from 'src/components'
import { PlusCircle } from 'phosphor-react'
import { useWidth } from 'src/hooks/general/useWidth'
const AddFeedback = () => {
  const {
    customerName,
    setCustomerName,
    body,
    setBody,
    image,
    setImage,
    loading,
    handleSubmit,
    validated,
    visible,
    setVisible,
  } = useFeedbackAdding()
  const { width } = useWidth()

  return (
    <CRow>
      <CCol xs>
        <PageTitle title="ملاحظة جديدة" icon={<PlusCircle size={25} />} />
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
                    <CCol sm={width < 768 ? 12 : null}>
                      <CFormInput
                        type="text"
                        placeholder="اسم العميل"
                        feedbackInvalid="اسم العميل مطلوب"
                        id="categoryNameAr"
                        label="اسم العميل"
                        required
                        onChange={(e) => {
                          setCustomerName(e.target.value)
                        }}
                        value={customerName}
                      />
                    </CCol>
                    <div className="mb-3">
                      <CFormInput
                        label="صورة"
                        type="file"
                        id="categoryPic"
                        feedbackInvalid="الصورة مطلوبة"
                        required
                        onChange={(e) => {
                          setImage(e.target.files[0])
                        }}
                      />
                      {image && (
                        <img
                          src={image ? URL.createObjectURL(image) : ''}
                          style={{ margin: '10px' }}
                          width={300}
                          height={300}
                        />
                      )}
                    </div>

                    <CCol sm={width < 768 ? 12 : null}>
                      <CFormInput
                        type="text"
                        placeholder="المحتوى"
                        feedbackInvalid=" المحتوى مطلوب"
                        id="bodyAr"
                        label="المحتوى"
                        required
                        onChange={(e) => {
                          setBody(e.target.value)
                        }}
                        value={body}
                      />
                    </CCol>
                    <CRow>
                      {loading && customerName !== '' ? (
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
                        >
                          <span style={{ fontWeight: 'bolder' }}>اضافه ملاحظة</span>
                        </CButton>
                      )}
                    </CRow>

                    <CAlert
                      color="danger"
                      dismissible
                      visible={visible}
                      onClose={() => setVisible(false)}
                    >
                      حصل خلل أثناء العملية، يرجى المحاولة فيما بعد
                    </CAlert>
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
export default AddFeedback
