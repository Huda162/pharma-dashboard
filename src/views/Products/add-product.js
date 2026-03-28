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
} from '@coreui/react'
import { Spinner } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { NotePencil, PlusCircle, Trash, X } from 'phosphor-react'
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
import CategorySelect from 'src/components/CategorySelect'
import LabelWithAsterisk from 'src/components/LabelWithAsterist'
import SearchableDropdown from 'src/components/SearchableDropdown'
import SeasonsButtons from 'src/components/SeasonsButtons'
import GenderInput from 'src/components/GenderInput'
import AgeInput from 'src/components/AgeInput'

const AddProduct = () => {
  const {
    productNameAr,
    setProductNameAr,
    loading,
    images,
    setImages,
    descriptionAr,
    setDescriptionAr,
    categories,
    sizes,
    isMultipleSize,
    setIsMultipleSize,
    handleSizeChange,
    addSize,
    handleSubmit,
    validated,
    visible,
    setVisible,
    deleteSize,
    productNameEng,
    setProductNameEng,
    productNameHeb,
    setProductNameHeb,
    descriptionEng,
    setDescriptionEng,
    descriptionHeb,
    setDescriptionHeb,
    categoryID,
    setCategoryID,
    isMultipleColor,
    setIsMultipleColor,
    colors,
    hex,
    setHex,
    colorImage,
    setColorImage,
    addColor,
    deleteColor,
    handleColorChange,
    editedColor,
    setEditedColor,
    productPriceJOD,
    productPriceNIS,
    productPriceNISWholesale,
    productPriceUSD,
    setProductPriceJOD,
    setProductPriceNIS,
    setProductPriceNISWholesale,
    setProductPriceUSD,
    handleFileChange,
    uploadProgress,
    productVideo,
    setSizes,
    checkValidated,
    setCheckValidated,
    brands,
    brandId,
    setBrandId,
    isOffer,
    setIsOffer,
    discountPercentage,
    setDiscountPercentage,
    colorCode,
    setColorCode,
    setColors,
    stock,
    setStock,
    minStock,
    setMinStock,
    age,
    setAge,
    gender,
    setGender,
    season,
    setSeason,
    handleSeasonChange,
    handleGenderChange,
    handleAgeChange,
  } = useProductAdding()
  const { width } = useWidth()

  const { isArabic, isEnglish, isHebrew } = useLanguage()
  const { isJUD, isNIS, isUSD } = useCurrency()
  const MAX_PRODUCT_NAME_LENGTH = 60

  return (
    <CRow>
      <CCol xs>
        <PageTitle title="منتج جديد" icon={<PlusCircle size={25} />} />
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
                    {isArabic === 'true' && (
                      <CCol sm={width < 768 ? 12 : null}>
                        <CFormInput
                          className="multilanguage-input"
                          type="text"
                          id="productNameAr"
                          label={
                            <LabelWithAsterisk
                              labelText="اسم المنتج باللغة العربية"
                              sublabel={`${productNameAr.length}/${MAX_PRODUCT_NAME_LENGTH} حرف`}
                            />
                          }
                          feedbackInvalid="اسم المنتج باللغة العربية مطلوب"
                          placeholder="اسم المنتج باللغة العربية"
                          value={productNameAr}
                          required
                          onChange={(e) => {
                            if (e.target.value.length <= MAX_PRODUCT_NAME_LENGTH) {
                              setProductNameAr(e.target.value)
                            }
                          }}
                        />
                      </CCol>
                    )}
                    {isEnglish === 'true' && (
                      <CCol sm={width < 768 ? 12 : null}>
                        <CFormInput
                          type="text"
                          id="productNameEng"
                          label={
                            <LabelWithAsterisk
                              labelText="اسم المنتج باللغة الانجليزية"
                              sublabel={`${productNameEng.length}/${MAX_PRODUCT_NAME_LENGTH} حرف`}
                            />
                          }
                          feedbackInvalid="اسم المنتج باللغة الإنجليزية مطلوب"
                          placeholder="اسم المنتج باللغة الإنجليزية"
                          value={productNameEng}
                          required
                          onChange={(e) => {
                            if (e.target.value.length <= MAX_PRODUCT_NAME_LENGTH) {
                              setProductNameEng(e.target.value)
                            }
                          }}
                        />
                      </CCol>
                    )}
                    {isHebrew === 'true' && (
                      <CCol sm={width < 768 ? 12 : null}>
                        <CFormInput
                          type="text"
                          id="productNameHeb"
                          label={
                            <LabelWithAsterisk
                              labelText="اسم المنتج باللغة العبرية"
                              sublabel={`${productNameHeb.length}/${MAX_PRODUCT_NAME_LENGTH} حرف`}
                            />
                          }
                          feedbackInvalid="اسم المنتج باللغة العبرية مطلوب"
                          placeholder="اسم المنتج باللغة العبرية"
                          value={productNameHeb}
                          required
                          onChange={(e) => {
                            if (e.target.value.length <= MAX_PRODUCT_NAME_LENGTH) {
                              setProductNameHeb(e.target.value)
                            }
                          }}
                        />
                      </CCol>
                    )}
                    <div className="mt-3 d-flex ">
                      {isNIS === 'true' && (
                        <>
                          <CCol sm={width < 768 ? 12 : null} style={{ marginLeft: '1rem' }}>
                            <CFormInput
                              type="text"
                              id="productPrice"
                              label={<LabelWithAsterisk labelText="سعر الجملة للمنتج بالشيكل " />}
                              feedbackInvalid="سعر الجملة للمنتج بالشيكل مطلوب"
                              placeholder="سعر الجملة للمنتج بالشيكل"
                              value={productPriceNISWholesale}
                              required
                              onChange={(e) => {
                                const value = e.target.value
                                if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
                                  setProductPriceNISWholesale(value)
                                }
                              }}
                            />
                          </CCol>
                          <CCol sm={width < 768 ? 12 : null} style={{ marginLeft: '1rem' }}>
                            <CFormInput
                              type="text"
                              id="productPrice"
                              label={<LabelWithAsterisk labelText="سعر المفرق للمنتج بالشيكل " />}
                              feedbackInvalid="سعر المفرق للمنتج بالشيكل مطلوب"
                              placeholder="سعر المفرق للمنتج بالشيكل"
                              value={productPriceNIS}
                              required
                              onChange={(e) => {
                                const value = e.target.value
                                if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
                                  setProductPriceNIS(value)
                                }
                              }}
                            />
                          </CCol>
                        </>
                      )}
                      {isUSD === 'true' && (
                        <CCol sm={width < 768 ? 12 : null} style={{ marginLeft: '1rem' }}>
                          <CFormInput
                            type="text"
                            id="productPrice"
                            label={<LabelWithAsterisk labelText="سعر المنتج بالدولار" />}
                            feedbackInvalid="سعر المنتج بالدولار مطلوب"
                            placeholder="سعر المنتج بالدولار"
                            value={productPriceUSD}
                            required
                            onChange={(e) => {
                              const value = e.target.value
                              if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
                                setProductPriceUSD(value)
                              }
                            }}
                          />
                        </CCol>
                      )}
                      {isJUD === 'true' && (
                        <CCol sm={width < 768 ? 12 : null}>
                          <CFormInput
                            type="text"
                            id="productPrice"
                            label={<LabelWithAsterisk labelText="سعر المنتج بالدينار" />}
                            feedbackInvalid="سعر المنتج بالدينار مطلوب"
                            placeholder="سعر المنتج بالدينار"
                            value={productPriceJOD}
                            required
                            onChange={(e) => {
                              const value = e.target.value
                              if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
                                setProductPriceJOD(value)
                              }
                            }}
                          />
                        </CCol>
                      )}
                    </div>

                    {isArabic === 'true' && (
                      <CCol sm={width < 768 ? 12 : null}>
                        <div className="mb-3">
                          <CFormTextarea
                            id="productDescriptionAr"
                            label={<LabelWithAsterisk labelText="الوصف باللغة العربية" />}
                            placeholder=" الوصف باللغة العربية"
                            required
                            value={descriptionAr}
                            onChange={(e) => setDescriptionAr(e.target.value)}
                          ></CFormTextarea>
                        </div>
                      </CCol>
                    )}
                    {isEnglish === 'true' && (
                      <CCol sm={width < 768 ? 12 : null}>
                        <div className="mb-3">
                          <CFormTextarea
                            id="productDescriptionEng"
                            label={<LabelWithAsterisk labelText="الوصف باللغة الانجليزية" />}
                            placeholder=" الوصف باللغة الانجليزية"
                            required
                            value={descriptionEng}
                            onChange={(e) => setDescriptionEng(e.target.value)}
                          ></CFormTextarea>
                        </div>
                      </CCol>
                    )}
                    {isHebrew === 'true' && (
                      <CCol sm={width < 768 ? 12 : null}>
                        <div className="mb-3">
                          <CFormTextarea
                            id="productDescriptionHeb"
                            label={<LabelWithAsterisk labelText="الوصف باللغة العبرية" />}
                            required
                            placeholder=" الوصف باللغة العبرية"
                            value={descriptionHeb}
                            onChange={(e) => setDescriptionHeb(e.target.value)}
                          ></CFormTextarea>
                        </div>
                      </CCol>
                    )}

                    <CCol md={12}>
                      <CategorySelect
                        categories={categories}
                        value={categoryID}
                        onChange={(e) => {
                          setCategoryID(e.value)
                        }}
                      />
                    </CCol>
                    <CCol md={12}>
                      <label className="mb-2">العلامة التجارية</label>
                      <SearchableDropdown
                        options={brands ? brands : []}
                        label="name"
                        placeholder="العلامة التجارية للمنتج"
                        id="id"
                        selectedVal={brandId}
                        handleChange={(val) => setBrandId(val)}
                        loading={false}
                        isRequired
                      />
                    </CCol>
                    <CCol md={12}>
                      <div className="mb-3">
                        <CFormInput
                          label={<LabelWithAsterisk labelText="صورة المنتج" />}
                          type="file"
                          id="productPic"
                          feedbackInvalid="صورة المنتج مطلوبة"
                          required
                          multiple
                          onChange={(e) => {
                            setImages((prevImages) => [
                              ...prevImages,
                              ...Array.from(e.target.files),
                            ])
                          }}
                        />
                      </div>
                    </CCol>

                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                      {images.map((img, index) => (
                        // eslint-disable-next-line react/jsx-key
                        <div className="m-1" style={{ position: 'relative' }}>
                          <X
                            size={15}
                            style={{
                              position: 'absolute',
                              top: 15,
                              right: 5,
                              color: 'white',
                              backgroundColor: '#ff3a31',
                              borderRadius: '80%',
                              cursor: 'pointer',
                            }}
                            onClick={() => setImages(images.filter((_, i) => i !== index))}
                          />
                          <img
                            key={index}
                            src={URL.createObjectURL(img)}
                            height="200"
                            alt={`images ${index}`}
                            style={{ margin: '10px' }}
                          />
                        </div>
                      ))}
                    </div>
                    <CCol md={12}>
                      <div className="mb-3">
                        <CFormInput
                          label="فيديو المنتج(اختياري)"
                          type="file"
                          aria-label="الفيديو الخاص بالمنتج"
                          id="productVid"
                          multiple
                          onChange={handleFileChange}
                        />
                      </div>
                      <div className="m-1" style={{ position: 'relative', width: '255px' }}>
                        {productVideo && (
                          <video width="250" height="200" controls>
                            <source src={URL.createObjectURL(productVideo)} type="video/mp4" />
                          </video>
                        )}

                        {uploadProgress?.visible && (
                          <ProgressBar progress={uploadProgress?.progress || 0} />
                        )}
                        {uploadProgress?.status === 'success' && (
                          <div style={{ color: 'green', marginTop: '10px' }}>
                            Upload successful!
                          </div>
                        )}
                        {uploadProgress?.status === 'failure' && (
                          <div style={{ color: 'red', marginTop: '10px' }}>Upload failed!</div>
                        )}
                      </div>
                    </CCol>
                    {!isMultipleColor && !isMultipleSize && (
                      <>
                        <CCol sm={12}>
                          <CFormInput
                            type="text"
                            id="productPrice"
                            label={<LabelWithAsterisk labelText="الكمية بالمخزون" />}
                            feedbackInvalid="الكمية بالمخزون مطلوبة"
                            placeholder="الكمية بالمخزون"
                            value={stock}
                            required
                            onChange={(e) => {
                              const value = e.target.value
                              if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
                                setStock(value)
                              }
                            }}
                          />
                        </CCol>
                        <CCol sm={12}>
                          <CFormInput
                            type="text"
                            id="productPrice"
                            label={<LabelWithAsterisk labelText="الحد الأدنى من الكمية بالمخزون" />}
                            feedbackInvalid=" الحد الأدنى منالكمية بالمخزون مطلوبة"
                            placeholder=" الحد الأدنى منالكمية بالمخزون"
                            value={minStock}
                            required
                            onChange={(e) => {
                              const value = e.target.value
                              if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
                                setMinStock(value)
                              }
                            }}
                          />
                        </CCol>
                      </>
                    )}
                    <CCol md={12}>
                      <CFormCheck
                        className="customCheckbox"
                        type="checkbox"
                        id="isOffer"
                        reverse
                        label="إضافة المنتج الى العروض"
                        checked={isOffer}
                        onChange={() => {
                          setIsOffer(!isOffer)
                          if (isOffer === true) {
                            setIsOffer(false)
                          } else {
                            setIsOffer(true)
                          }
                        }}
                      />
                    </CCol>
                    {isOffer && (
                      <CCol sm={width < 768 ? 12 : null}>
                        <CFormInput
                          type="text"
                          id="productPrice"
                          label="نسبة الخصم"
                          placeholder="نسبة الخصم"
                          value={discountPercentage}
                          onChange={(e) => {
                            const value = e.target.value

                            if (
                              value === '' ||
                              (/^\d+$/.test(value) && parseInt(value) > 0 && parseInt(value) < 100)
                            ) {
                              setDiscountPercentage(value)
                            }
                          }}
                          inputMode="numeric"
                        />
                      </CCol>
                    )}
                    <CCol md={12}>
                      <CFormCheck
                        className="customCheckbox"
                        type="checkbox"
                        id="multiColor"
                        reverse
                        feedbackInvalid="يجب اضافة لون واحد على الاقل"
                        label="هل المنتج متعدد الألوان؟"
                        checked={isMultipleColor}
                        onChange={() => {
                          setIsMultipleColor(!isMultipleColor)
                          if (!isMultipleColor) addColor()
                          else setColors([])
                        }}
                        invalid={!checkValidated}
                      />
                    </CCol>
                    {isMultipleColor && (
                      <AppCard>
                        <CCardBody>
                          <div style={{ marginTop: '15px' }}>
                            {colors.map((color, index) => (
                              <CRow
                                key={index}
                                style={{
                                  borderRadius: '5px',
                                  padding: '10px',
                                  marginBottom: '10px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  boxShadow: '0px 2px 3px #c8c8c8',
                                  position: 'relative',
                                }}
                              >
                                <CCol style={{ marginLeft: '0.5rem' }} sm={width < 768 ? 12 : 2}>
                                  <CFormInput
                                    type="color"
                                    style={{ width: '100%' }}
                                    feedbackInvalid="اللون مطلوب"
                                    label={index === 0 ? 'اللون' : null}
                                    placeholder="اللون"
                                    value={color.color}
                                    required
                                    onChange={(event) =>
                                      handleColorChange(index, 'color', event.target.value)
                                    }
                                  />
                                </CCol>
                                <CCol className="mb-3" sm={width < 768 ? 12 : 2}>
                                  <CFormInput
                                    label={index === 0 ? 'صورة اللون' : null}
                                    type="file"
                                    id="categoryPic"
                                    feedbackInvalid="صورة اللون مطلوبة"
                                    required
                                    onChange={(e) => {
                                      handleColorChange(index, 'image', e.target.files[0])
                                    }}
                                  />
                                </CCol>
                                <CCol
                                  md={2}
                                  style={{
                                    display: 'felx',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}
                                >
                                  {color.image && (
                                    <img
                                      src={color.image ? URL.createObjectURL(color.image) : ''}
                                      style={{ marginTop: '20px', marginLeft: '10px' }}
                                      height={50}
                                    />
                                  )}
                                </CCol>
                                <CCol className="mb-3" sm={width < 768 ? 12 : 2}>
                                  <CFormInput
                                    label={index === 0 ? 'رمز اللون' : null}
                                    type="text"
                                    id="categoryPic"
                                    feedbackInvalid="رمز اللون مطلوب"
                                    required
                                    onChange={(e) => {
                                      handleColorChange(index, 'code', e.target.value)
                                    }}
                                  />
                                </CCol>
                                <CCol sm={width < 768 ? 12 : 1}>
                                  <div className="d-grid gap-2 col-4 mx-auto m-1">
                                    {index === 0 ? <br /> : null}
                                    <AppTooltip type="delete" onClick={() => deleteColor(index)} />
                                  </div>
                                </CCol>
                              </CRow>
                            ))}
                            <CButton
                              onClick={addColor}
                              style={{
                                width: '200px',
                                backgroundColor: Theme.primaryLight,
                                border: 'none',
                                marginTop: 10,
                              }}
                            >
                              أضف لون جديد
                            </CButton>
                          </div>
                        </CCardBody>
                      </AppCard>
                    )}
                    <CCol md={12}>
                      <CFormCheck
                        className="customCheckbox"
                        type="checkbox"
                        id="multiSize"
                        reverse
                        label="هل المنتج متعدد الأحجام؟"
                        checked={isMultipleSize}
                        onChange={() => {
                          setIsMultipleSize(!isMultipleSize)
                          if (!isMultipleSize) addSize()
                          else setSizes([])
                        }}
                      />
                    </CCol>
                    {isMultipleSize && (
                      <AppCard>
                        <CCardBody>
                          <div style={{ marginTop: '15px' }}>
                            {sizes.map((size, index) => (
                              <CRow
                                key={index}
                                style={{
                                  borderRadius: '5px',
                                  padding: '10px',
                                  marginBottom: '10px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  boxShadow: '0px 2px 3px #c8c8c8',
                                }}
                              >
                                <CCol style={{ marginLeft: '0.5rem' }} sm={width < 768 ? 12 : 5}>
                                  <CFormInput
                                    type="text"
                                    feedbackInvalid="الحجم مطلوب"
                                    label={index === 0 ? 'الحجم' : null}
                                    placeholder="الحجم"
                                    value={size.size}
                                    required
                                    onChange={(event) => handleSizeChange(index, 'size', event)}
                                  />
                                </CCol>
                                {isNIS === 'true' && (
                                  <CCol
                                    style={{ marginLeft: '0.5rem' }}
                                    sm={width < 768 ? 12 : null}
                                  >
                                    <CFormInput
                                      type="text"
                                      label={index === 0 ? 'السعر بالشيكل' : null}
                                      feedbackInvalid="السعر بالشيكل مطلوب"
                                      placeholder="السعر بالشيكل"
                                      value={size.priceNIS}
                                      required
                                      onChange={(event) =>
                                        handleSizeChange(index, 'priceNIS', event)
                                      }
                                    />
                                  </CCol>
                                )}
                                {isUSD === 'true' && (
                                  <CCol
                                    style={{ marginLeft: '0.5rem' }}
                                    sm={width < 768 ? 12 : null}
                                  >
                                    <CFormInput
                                      type="text"
                                      label={index === 0 ? 'السعر بالدولار' : null}
                                      feedbackInvalid="السعر بالدولار مطلوب"
                                      placeholder="السعر بالدولار"
                                      value={size.priceUSD}
                                      required
                                      onChange={(event) =>
                                        handleSizeChange(index, 'priceUSD', event)
                                      }
                                    />
                                  </CCol>
                                )}
                                {isJUD === 'true' && (
                                  <CCol sm={width < 768 ? 12 : null}>
                                    <CFormInput
                                      type="text"
                                      label={index === 0 ? 'السعر بالدينار' : null}
                                      feedbackInvalid="السعر بالدينار مطلوب"
                                      placeholder="السعر بالدينار"
                                      value={size.priceJUD}
                                      required
                                      onChange={(event) =>
                                        handleSizeChange(index, 'priceJOD', event)
                                      }
                                    />
                                  </CCol>
                                )}
                                <CCol>
                                  <div className="d-grid gap-2 col-4 mx-auto m-1">
                                    {index === 0 ? <br /> : null}
                                    <AppTooltip type="delete" onClick={() => deleteSize(index)} />
                                  </div>
                                </CCol>
                              </CRow>
                            ))}
                            <CButton
                              onClick={addSize}
                              style={{
                                width: '200px',
                                backgroundColor: Theme.primaryLight,
                                border: 'none',
                                marginTop: 10,
                              }}
                            >
                              أضف حجم جديد
                            </CButton>
                          </div>
                        </CCardBody>
                      </AppCard>
                    )}
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
                          <span style={{ fontWeight: 'bolder' }}>اضافه منتج</span>
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
export default AddProduct
