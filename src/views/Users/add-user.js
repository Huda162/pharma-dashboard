/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {
  CAlert,
  CButton,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
  CRow,
} from '@coreui/react'
import { Spinner } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useUserAdding } from 'src/hooks/users/useUserAdding'
import { Theme } from 'src/constants/colors'
import AppCard from 'src/components/AppCard'
import { AppBreadcrumb } from 'src/components'
import PageTitle from 'src/components/PageTitle'
import { PlusCircle } from 'phosphor-react'
import { useWidth } from 'src/hooks/general/useWidth'
import LabelWithAsterisk from 'src/components/LabelWithAsterist'
const AddUser = () => {
  const {
    userName,
    setUserName,
    password,
    setPassword,
    phoneNumber,
    setPhoneNumber,
    loading,
    visible,
    setVisible,
    handleSubmit,
    validated,
    roleId,
    setRoleId,
  } = useUserAdding()

  const { width } = useWidth()

  return (
    <CRow>
      <CCol xs>
        <PageTitle title="مستخدم جديد" icon={<PlusCircle size={25} />} />
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
                        placeholder="اسم المستخدم"
                        feedbackInvalid="اسم المستخدم مطلوب"
                        id="userNameAr"
                        label={<LabelWithAsterisk labelText="اسم المستخدم"/>}
                        required
                        onChange={(e) => setUserName(e.target.value)}
                        value={userName}
                      />
                    </CCol>
                    <CCol md={12}>
                      <CFormInput
                        type="text"
                        placeholder="رقم الهاتف"
                        feedbackInvalid="رقم الهاتف"
                        id="userName"
                        label={<LabelWithAsterisk labelText="رقم الهاتف"/>}
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </CCol>
                    <CCol md={12}>
                      <CFormInput
                        type="text"
                        placeholder="كلمة السر"
                        feedbackInvalid="كلمة السر"
                        id="userName"
                        label={<LabelWithAsterisk labelText="كلمة السر"/>}
                        required
                        value={[password]}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CCol>
                    <CCol md={12}>
                      <CFormSelect
                        id="productCategory"
                        label={<LabelWithAsterisk labelText="اختر الوظيفة"/>}
                        feedbackInvalid=" الوظيفة مطلوبة"
                        value={roleId}
                        onChange={(e) => setRoleId(e.target.value)}
                        required
                      >
                        <option selected="" value="">
                          {' '}
                          اختر الوظيفة
                        </option>

                        <option value={1}>مسؤول</option>
                        <option value={2}>موظف</option>
                      </CFormSelect>
                    </CCol>
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
                        // onClick={addUser}
                        type="submit"
                      >
                        <span style={{ fontWeight: 'bolder' }}>اضافه المستخدم</span>
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
export default AddUser
