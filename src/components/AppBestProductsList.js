import React from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import { Theme } from 'src/constants/colors'
import { useDashboard } from 'src/hooks/dashboard/useDashboard'
import image from '../assets/images/image.png'
import { CaretLeft, Crown, Star, ShoppingBag, TrendUp } from 'phosphor-react'
import { useNavigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { useWidth } from 'src/hooks/general/useWidth'

export const BestProductsList = () => {
  const navigate = useNavigate()
  const { bestSellingProducts, loading } = useDashboard()
  const { width } = useWidth()

  return (
    <div className="best-products-container">
      {loading ? (
        <div className="loading-state">
          <Spinner
            animation="border"
            role="status"
            style={{
              width: '2rem',
              height: '2rem',
              color: Theme.primary1,
            }}
          />
        </div>
      ) : (
        <div className="products-list">
          {bestSellingProducts?.slice(0, 5).map((item, index) => (
            <div
              key={index}
              className="product-item"
              style={{
                backgroundColor: Theme.white,
                border: `1px solid ${Theme.primary1}10`,
                borderRadius: '12px',
                padding: '1rem',
                marginBottom: '0.75rem',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = `0 4px 20px ${Theme.primary1}15`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Rank Badge */}
              <div
                className="rank-badge"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background:
                    index === 0
                      ? 'linear-gradient(135deg, #FFD700, #FFA500)'
                      : index === 1
                      ? 'linear-gradient(135deg, #C0C0C0, #A0A0A0)'
                      : 'linear-gradient(135deg, #CD7F32, #A0522D)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {index === 0 && <Crown size={18} color="#FFFFFF" weight="fill" />}
                <span
                  style={{
                    color: Theme.white,
                    fontWeight: 'bold',
                    fontSize: index < 3 ? '1rem' : '0.9rem',
                  }}
                >
                  {index + 1}
                </span>
              </div>

              {/* Product Image */}
              <div
                className="product-image"
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  flexShrink: 0,
                  border: `1px solid ${Theme.primary1}20`,
                }}
              >
                <img
                  src={item.images[0] ? item.images[0].url : image}
                  onError={(e) => {
                    e.target.onError = null
                    e.target.src = image
                  }}
                  alt={item.name_ar}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>

              {/* Product Info */}
              <div className="product-info" style={{ flex: 1 }}>
                <h6
                  style={{
                    margin: 0,
                    color: Theme.grayDark,
                    fontWeight: '600',
                    fontSize: '0.95rem',
                  }}
                >
                  {item.name_ar}
                </h6>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginTop: '0.25rem',
                  }}
                >
                  <ShoppingBag size={14} color={Theme.gray} />
                  <span
                    style={{
                      color: Theme.gray,
                      fontSize: '0.85rem',
                    }}
                  >
                    تم بيع {item.ordered_number} وحدة
                  </span>
                </div>
              </div>

              {/* Sales Stats */}
              <div
                className="sales-stats"
                style={{
                  textAlign: 'left',
                  minWidth: '80px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    justifyContent: 'flex-end',
                  }}
                >
                  <TrendUp size={14} color="#10b981" />
                  <span
                    style={{
                      color: '#10b981',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                    }}
                  >
                    {Math.round(Math.random() * 30) + 10}%
                  </span>
                </div>
                <p
                  style={{
                    margin: '0.25rem 0 0 0',
                    color: Theme.gray,
                    fontSize: '0.85rem',
                  }}
                >
                  نمو المبيعات
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View All Button */}
      <CButton
        className="view-all-button"
        style={{
          background: 'transparent',
          border: `1px solid ${Theme.primary1}30`,
          color: Theme.primary1,
          borderRadius: '10px',
          padding: '0.75rem',
          width: '100%',
          marginTop: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          transition: 'all 0.3s ease',
        }}
        onClick={() => navigate('/products')}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = `${Theme.primary1}10`
          e.currentTarget.style.borderColor = Theme.primary1
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.borderColor = `${Theme.primary1}30`
        }}
      >
        عرض جميع المنتجات
        <CaretLeft size={18} />
      </CButton>
    </div>
  )
}
