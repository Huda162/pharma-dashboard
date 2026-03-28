import React from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import { Theme } from 'src/constants/colors'
import { useDashboard } from 'src/hooks/dashboard/useDashboard'
import { CaretLeft, Crown, User, ShoppingCart, TrendUp, Medal } from 'phosphor-react'
import { useNavigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { useWidth } from 'src/hooks/general/useWidth'

const BestUsers = () => {
  const { bestUsers, loading } = useDashboard()
  const navigate = useNavigate()
  const { width } = useWidth()

  return (
    <div className="best-users-container">
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
        <div className="users-list">
          {bestUsers?.slice(0, 5).map(
            (item, index) =>
              item.user && (
                <div
                  key={index}
                  className="user-item"
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
                    className="user-rank"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
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
                      position: 'relative',
                    }}
                  >
                    {index === 0 && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '-4px',
                          right: '-4px',
                        }}
                      >
                        <Crown size={16} color="#FFFFFF" weight="fill" />
                      </div>
                    )}
                    <User size={20} color="#FFFFFF" weight="bold" />
                  </div>

                  {/* User Info */}
                  <div className="user-info" style={{ flex: 1 }}>
                    <h6
                      style={{
                        margin: 0,
                        color: Theme.grayDark,
                        fontWeight: '600',
                        fontSize: '0.95rem',
                      }}
                    >
                      {item.user?.name}
                    </h6>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginTop: '0.25rem',
                      }}
                    >
                      <Medal size={14} color={Theme.primary1} />
                      <span
                        style={{
                          color: Theme.gray,
                          fontSize: '0.85rem',
                        }}
                      >
                        {item.total_orders || 0} عملية شراء
                      </span>
                    </div>
                  </div>

                  {/* User Stats */}
                  <div
                    className="user-stats"
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
                      <ShoppingCart size={14} color={Theme.primaryBlue} />
                      <span
                        style={{
                          color: Theme.grayDark,
                          fontSize: '1rem',
                          fontWeight: '600',
                        }}
                      >
                        {item.total_orders || 0}
                      </span>
                    </div>
                    <p
                      style={{
                        margin: '0.25rem 0 0 0',
                        color: Theme.gray,
                        fontSize: '0.85rem',
                      }}
                    >
                      طلبيات
                    </p>
                  </div>
                </div>
              ),
          )}
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
        onClick={() => navigate('/users')}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = `${Theme.primary1}10`
          e.currentTarget.style.borderColor = Theme.primary1
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.borderColor = `${Theme.primary1}30`
        }}
      >
        عرض جميع المستخدمين
        <CaretLeft size={18} />
      </CButton>
    </div>
  )
}

export default BestUsers
