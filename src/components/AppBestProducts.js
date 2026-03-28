import React from 'react'
import { CCard, CCardBody, CCol } from '@coreui/react'
import { Theme } from 'src/constants/colors'
import { useDashboard } from 'src/hooks/dashboard/useDashboard'
import image from '../assets/images/image.png'
import { CrownSimple } from 'phosphor-react'

const BestProducts = () => {
  const { bestSellingProducts } = useDashboard()
  console.log(bestSellingProducts)

  return (
    <CCol sm={6} lg={6}>
      <CCard
        style={{
          height: '350px',
          backgroundColor: Theme.white,
          boxShadow: '0px 2px 3px #c8c8c8',
          border: 'none',
        }}
      >
        <CCardBody
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h4>المنتجات الأعلى مبيعا في الشهر</h4>
          <div className="d-flex" style={{ height: '100%' }}>
            <CCol>
              <div
                style={{
                  height: '70%',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'end',
                  alignItems: 'center',
                  flexDirection: 'column',
                  paddingBottom: '1rem',
                }}
              >
                <p style={{ padding: 0, margin: 0 }}>{bestSellingProducts[1]?.name_ar}</p>
                <img
                  src={
                    bestSellingProducts[1]?.images[0]
                      ? bestSellingProducts[1]?.images[0].url
                      : image
                  }
                  onError={(e) => {
                    e.target.onError = null
                    e.target.src = image
                  }}
                  alt={`image-${bestSellingProducts[1]?.images[0].id}`}
                  style={{
                    boxShadow: '0px 2px 3px #c8c8c8',
                    borderRadius: 5,
                    backgroundColor: Theme.base,
                    width: '50%',
                    height: '80px',
                  }}
                />
                <p style={{ padding: 0, margin: 0 }}>
                  {bestSellingProducts[1]?.ordered_number} مباع
                </p>
              </div>
              <div
                style={{
                  height: '30%',
                  backgroundColor: '#bec2cb',
                  paddingRight: '4.5rem',
                  paddingLeft: '4.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 3,
                  boxShadow: '-2px 2px 2px #c8c8c8',
                }}
              >
                <h1>2</h1>
              </div>
            </CCol>
            <CCol>
              <div
                style={{
                  height: '55%',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'end',
                  alignItems: 'center',
                  flexDirection: 'column',
                  paddingBottom: '1rem',
                }}
              >
                <p style={{ padding: 0, margin: 0 }}>{bestSellingProducts[0]?.name_ar}</p>
                <img
                  src={
                    bestSellingProducts[0]?.images[0]
                      ? bestSellingProducts[0]?.images[0].url
                      : image
                  }
                  onError={(e) => {
                    e.target.onError = null
                    e.target.src = image
                  }}
                  alt={`image-${bestSellingProducts[0]?.images[0].id}`}
                  style={{
                    boxShadow: '0px 2px 3px #c8c8c8',
                    borderRadius: 5,
                    backgroundColor: Theme.base,
                    width: '50%',
                    height: '80px',
                  }}
                />
                <p style={{ padding: 0, margin: 0 }}>
                  {bestSellingProducts[0]?.ordered_number} مباع
                </p>
              </div>
              <div
                style={{
                  height: '45%',
                  backgroundColor: '#ffdf00',
                  paddingRight: '4.5rem',
                  paddingLeft: '4.5rem',
                  borderRadius: 3,
                  boxShadow: '-2px 2px 2px #c8c8c8',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <CrownSimple size={32} weight="light" />
                <h1>1</h1>
              </div>
            </CCol>
            <CCol>
              <div
                style={{
                  height: '80%',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'end',
                  alignItems: 'center',
                  flexDirection: 'column',
                  paddingBottom: '1rem',
                }}
              >
                <p style={{ padding: 0, margin: 0 }}>{bestSellingProducts[2]?.name_ar}</p>
                <img
                  src={
                    bestSellingProducts[2]?.images[0]
                      ? bestSellingProducts[2]?.images[0].url
                      : image
                  }
                  onError={(e) => {
                    e.target.onError = null
                    e.target.src = image
                  }}
                  alt={`image-${bestSellingProducts[2]?.images[0].id}`}
                  style={{
                    boxShadow: '0px 2px 3px #c8c8c8',
                    borderRadius: 5,
                    backgroundColor: Theme.base,
                    width: '50%',
                    height: '80px',
                  }}
                />
                <p style={{ padding: 0, margin: 0 }}>
                  {bestSellingProducts[2]?.ordered_number} مباع
                </p>
              </div>

              <div
                style={{
                  height: '20%',
                  backgroundColor: '#ce8946',
                  paddingRight: '4.5rem',
                  paddingLeft: '4.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 3,
                  boxShadow: '-2px 2px 2px #c8c8c8',
                }}
              >
                <h1>3</h1>
              </div>
            </CCol>
          </div>
          {/* {bestSellingProducts.map((item, index) => (
            <Card
              key={index}
              style={{
                borderRadius: '20px',
                width: '280px',
                height: '50px',
                margin: '.75rem',
                backgroundColor: Theme.white,
                color: 'white',
              }}
            >
              <CardContent>
                <div style={{height: '100%'}}>
                  <img
                    src={item.images[0] ? item.images[0].url : image}
                    onError={(e) => {
                      e.target.onError = null
                      e.target.src = image
                    }}
                    alt={`image-${item.images[0].id}`}
                    width="25%"
                    height="100%"
                    style={{
                      boxShadow: '0px 2px 3px #c8c8c8',
                      borderRadius: 5,
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      backgroundColor: Theme.base,
                    }}
                  />
                </div>
                <h5>item.name_ar</h5>
              </CardContent>
            </Card>
          ))} */}
        </CCardBody>
      </CCard>
    </CCol>
  )
}

export default BestProducts
