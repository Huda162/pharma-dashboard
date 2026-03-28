/* eslint-disable react/prop-types */

import React from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import { ArrowLeft } from 'phosphor-react'
import { useNavigate } from 'react-router-dom'
import '../components/test.css'

const NavigationCard = ({ icon, title, path, color, description }) => {
  const navigate = useNavigate()

  return (
    <CButton
      className="navigation-card"
      style={{
        backgroundColor: 'white',
        border: 'none',
        borderRadius: '16px',
        padding: '1.25rem',
        paddingBottom: '0.25rem',
        textAlign: 'right',
        width: '100%',
        height: '100%',
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
        border: `1px solid ${color}20`,
        position: 'relative',
        overflow: 'hidden',
      }}
      onClick={() => navigate(path)}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = `0 8px 30px ${color}30`
        e.currentTarget.style.borderColor = color
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.05)'
        e.currentTarget.style.borderColor = `${color}20`
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '45px',
          height: '45px',
          background: `linear-gradient(135deg, ${color}20, ${color}10)`,
          borderBottomLeftRadius: '50%',
          zIndex: 0,
        }}
      ></div>
      <div
        className="card-icon"
        style={{
          position: 'absolute',
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          // backgroundColor: `${color}15`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem',
          zIndex: 1,
          top: 0,
          right: 0,
        }}
      >
        {React.cloneElement(icon, { color: color, size: 24 })}
      </div>

      <div className="card-content" style={{ zIndex: 1, width: '100%', marginTop: '25px' }}>
        <h5
          style={{
            margin: 0,
            color: '#333333',
            fontWeight: '600',
            fontSize: '1rem',
            marginBottom: '0.5rem',
          }}
        >
          {title}
        </h5>
        <p
          style={{
            margin: 0,
            color: '#767676',
            fontSize: '0.85rem',
            lineHeight: 1.4,
            marginBottom: '1rem',
          }}
        >
          {description}
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginTop: 'auto',
          zIndex: 1,
          width: '10%',
          paddingBottom: '10px',
        }}
      >
        <ArrowLeft size={18} color={color} />
      </div>
    </CButton>
  )
}

export default NavigationCard
