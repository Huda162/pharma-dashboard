/* eslint-disable react/jsx-key */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {
  CAlert,
  CButton,
  CCardBody,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormSelect,
  CRow,
} from '@coreui/react'
import { PlusCircle } from 'phosphor-react'
import { Spinner } from 'react-bootstrap/esm'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AppBreadcrumb } from 'src/components'
import AppCard from 'src/components/AppCard'
import FilePreview from 'src/components/FilePreview'
import PageTitle from 'src/components/PageTitle'
import { Theme } from 'src/constants/colors'
import { useAllProducts } from 'src/hooks/general/useAllProducts'
import { useSliderAdding } from 'src/hooks/sliders/useSliderAdding'
import { useState } from 'react' // Add this import
import LabelWithAsterisk from 'src/components/LabelWithAsterist'

const AddSlider = () => {
  const {
    sliderImage,
    setSliderImage,
    sliderImageMobile,
    setSliderImageMobile,
    productID,
    setProductID,
    loading,
    handleSubmit,
    validated,
    visible,
    setVisible,
    categories,
    type,
    setType,
    fileType,
    setFileType,
    handleDesktopFileChange,
    handleMobileFileChange,
  } = useSliderAdding()
  const { products } = useAllProducts()

  return (
    <CRow>
      <CCol xs>
        <PageTitle title="شريحة جديدة" icon={<PlusCircle size={25} />} />
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
                    <div className="mb-3">
                      <label className="form-label">نوع المحتوى للشريحة</label>
                      <div className="d-flex gap-2">
                        <CButton
                          color={fileType === 'image' ? 'primary' : 'secondary'}
                          onClick={() => setFileType('image')}
                          style={{
                            backgroundColor: fileType === 'image' ? Theme.primary1 : Theme.base,
                            border: fileType === 'image' ? 'none' : `1px solid ${Theme.primary1}`,
                          }}
                        >
                          صورة
                        </CButton>
                        <CButton
                          color={fileType === 'video' ? 'primary' : 'secondary'}
                          onClick={() => setFileType('video')}
                          style={{
                            backgroundColor: fileType === 'video' ? Theme.primary1 : Theme.base,
                            border: fileType === 'video' ? 'none' : `1px solid ${Theme.primary1}`,
                          }}
                        >
                          فيديو
                        </CButton>
                      </div>
                      <p className="mt-2" style={{ color: Theme.gray }}>
                        {fileType === 'image'
                          ? 'سيتم قبول ملفات الصور فقط (JPEG, PNG, GIF, WebP)'
                          : 'سيتم قبول ملفات الفيديو فقط (MP4, WebM, OGG)'}
                      </p>
                    </div>

                    <div className="mb-3">
                      <CFormInput
                        label={
                          <LabelWithAsterisk
                            labelText={
                              fileType === 'image'
                                ? 'الصورة للشاشات الكبيرة'
                                : 'الفيديو للشاشات الكبيرة'
                            }
                          />
                        }
                        type="file"
                        id="Pic"
                        feedbackInvalid={fileType === 'image' ? 'الصورة مطلوبة' : 'الفيديو مطلوب'}
                        required
                        accept={fileType === 'image' ? 'image/*' : 'video/*'}
                        onChange={handleDesktopFileChange}
                      />
                      <p style={{ color: Theme.gray }}>الحجم الموصى به: 2500*1215</p>
                      {sliderImage && <FilePreview file={sliderImage} />}
                    </div>

                    <div className="mb-3">
                      <CFormInput
                        label={<LabelWithAsterisk labelText="صورة الهاتف" />}
                        type="file"
                        id="phonePic"
                        feedbackInvalid="صورة الهاتف مطلوبة"
                        required
                        accept="image/*"
                        onChange={handleMobileFileChange}
                      />
                      <p style={{ color: Theme.gray }}>الحجم الموصى به: 350*270</p>
                      {sliderImageMobile && <FilePreview file={sliderImageMobile} />}
                    </div>

                    <CCol md={12}>
                      <LabelWithAsterisk labelText=" هذه الشريحة تابعة لـ" />
                    </CCol>
                    <CCol md={3} className="d-flex justify-content-between">
                      <CFormCheck
                        button={{ color: 'secondary', variant: 'outline' }}
                        type="radio"
                        name="options-outlined"
                        id="secondarys-outlined"
                        autoComplete="off"
                        label="غير تابعة لشيء"
                        value="nothing"
                        checked={type === 'nothing'}
                        onChange={(e) => {
                          setType(e.target.value)
                        }}
                      />
                      <CFormCheck
                        button={{ color: 'secondary', variant: 'outline' }}
                        type="radio"
                        name="options-outlined"
                        id="secondary-outlined"
                        autoComplete="off"
                        label="منتج"
                        value="product"
                        checked={type === 'product'}
                        onChange={(e) => {
                          setType(e.target.value)
                        }}
                      />
                      <CFormCheck
                        button={{ color: 'secondary', variant: 'outline' }}
                        type="radio"
                        name="options-outlined"
                        id="danger-outlined"
                        autoComplete="off"
                        label="قسم رئيسي"
                        value="category"
                        checked={type === 'category'}
                        onChange={(e) => {
                          setType(e.target.value)
                        }}
                      />
                    </CCol>
                    <CRow>
                      {type === 'product' && (
                        <CCol md={12}>
                          <CFormSelect
                            id="productCategory"
                            label={<LabelWithAsterisk labelText="اختر المنتج" />}
                            value={productID}
                            onChange={(e) => setProductID(e.target.value)}
                          >
                            <option selected="" value="">
                              {' '}
                              اختر المنتج
                            </option>
                            {products?.map((item, index) => (
                              <option value={item.id} key={item.id}>
                                {item.name_ar}
                              </option>
                            ))}
                          </CFormSelect>
                        </CCol>
                      )}
                      {type === 'category' && (
                        <CCol md={12}>
                          <CFormSelect
                            id="productCategory"
                            label={<LabelWithAsterisk labelText="اختر القسم" />}
                            feedbackInvalid=" القسم مطلوب"
                            value={productID}
                            onChange={(e) => setProductID(e.target.value)}
                            required
                          >
                            <option selected="" value="">
                              {' '}
                              اختر القسم
                            </option>
                            {categories.map((item, index) => (
                              <option value={item.id} key={item.id}>
                                {item.name_ar}
                              </option>
                            ))}
                          </CFormSelect>
                        </CCol>
                      )}
                    </CRow>
                    {loading ? (
                      <Spinner animation="border" role="status" style={{ margin: '20px' }}>
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
                        <span style={{ fontWeight: 'bolder' }}>اضافه شريحة</span>
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
export default AddSlider
