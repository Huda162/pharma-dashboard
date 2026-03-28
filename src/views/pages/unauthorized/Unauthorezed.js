import { CCol, CRow } from '@coreui/react'
import shield from '../../../assets/images/shield.png'
import PageTitle from 'src/components/PageTitle'
import AppCard from 'src/components/AppCard'
import { Gear } from 'phosphor-react'
import { Theme } from 'src/constants/colors'
import React from 'react'

const Unauthorized = () => {
  return (
    <CRow>
      <CCol xs>
        <PageTitle title="الإعدادات" icon={<Gear size={25} />} />
        <div
          className="rounded my-3 d-flex flex-column justify-content-center align-items-center h-100"
          style={{
            backgroundColor: Theme.white,
            boxShadow: '0px 2px 3px #c8c8c8',
            border: 'none',
            padding: 15,
          }}
        >
          <h2 className="my-3">تم تقييد الوصول الى هذه الصفحة!</h2>
          <img src={shield} alt="image" width="300" className="my-3" />
        </div>
      </CCol>
    </CRow>
  )
}

export default Unauthorized
