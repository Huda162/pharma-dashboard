/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react'
import {
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

import { useNavigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap/esm'
import { Question } from 'phosphor-react'
import { useAboutUs } from 'src/hooks/aboutUs/useAboutUs'
import AppDialog from 'src/components/AppDialog'
import PageTitle from 'src/components/PageTitle'
import { Theme } from 'src/constants/colors'
import AppTooltip from 'src/components/Tooltip'
import { AppBreadcrumb } from 'src/components'
import { useLanguage } from 'src/hooks/general/useLanguage'
import image from '../../assets/images/image.png'

const AboutUs = () => {
  const navigate = useNavigate()
  const { loading, showDialog, about, cancelDelete, executeDelete, aboutData, id } = useAboutUs()
  const { isArabic, isEnglish, isHebrew } = useLanguage()

  return (
    <CRow>
      <CCol xs>
        <PageTitle title="من نحن" icon={<Question size={25} />} />
        <div>
          {loading ? (
            <div className="h-100 w-100 d-flex justify-content-center align-items-center py-5 my-5">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <div
              className="rounded my-3"
              style={{ backgroundColor: Theme.white, boxShadow: '0px 2px 3px #c8c8c8' }}
            >
              <CTable align="middle" className="mb-3" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    {isArabic === 'true' && (
                      <CTableHeaderCell className="text-center">
                        من نحن باللغة العربية
                      </CTableHeaderCell>
                    )}
                    {isEnglish === 'true' && (
                      <CTableHeaderCell className="text-center">
                        من نحن باللغة الانجليزية
                      </CTableHeaderCell>
                    )}
                    {isHebrew === 'true' && (
                      <CTableHeaderCell className="text-center">
                        من نحن باللغة العبرية
                      </CTableHeaderCell>
                    )}
                    <CTableHeaderCell className="text-center"> الصورة </CTableHeaderCell>
                    <CTableHeaderCell className="text-center"> الإجراءات </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow v-for="item in tableItems" key={about.id}>
                    {isArabic === 'true' && (
                      <CTableDataCell className="text-center">
                        {aboutData && aboutData.body_ar && (
                          <div dangerouslySetInnerHTML={{ __html: aboutData.body_ar }} />
                        )}
                      </CTableDataCell>
                    )}
                    {isEnglish === 'true' && (
                      <CTableDataCell className="text-center">
                        {aboutData && aboutData.body_en && (
                          <div dangerouslySetInnerHTML={{ __html: aboutData.body_en }} />
                        )}
                      </CTableDataCell>
                    )}
                    {isHebrew === 'true' && (
                      <CTableDataCell className="text-center">
                        {aboutData && aboutData.body_he && (
                          <div dangerouslySetInnerHTML={{ __html: aboutData.body_he }} />
                        )}
                      </CTableDataCell>
                    )}
                    <CTableDataCell>
                      <img
                        src={aboutData?.image ? aboutData?.image : image}
                        onError={(e) => {
                          e.target.onError = null
                          e.target.src = image
                        }}
                        alt="category"
                        width="100"
                        height="100"
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <AppTooltip
                          type="edit"
                          onClick={() => navigate(`/edit_about_us/${id}`, { state: { aboutData } })}
                        />
                      </div>
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </div>
          )}
        </div>
      </CCol>
      <AppDialog
        title="هل أنت متأكد من رغبتك بحذف هذا القسم ؟"
        open={showDialog}
        onClose={cancelDelete}
        actionCancel={cancelDelete}
        actionExecute={executeDelete}
        deleteDialog={true}
      />
    </CRow>
  )
}

export default AboutUs
