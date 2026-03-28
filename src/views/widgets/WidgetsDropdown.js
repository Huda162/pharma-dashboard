import React from 'react'
import { CRow } from '@coreui/react'
import { Theme } from 'src/constants/colors'
import { useDashboard } from 'src/hooks/dashboard/useDashboard'
import { useWidth } from 'src/hooks/general/useWidth'
import { ShoppingCart, Package, Tag, Image } from 'phosphor-react'

const WidgetsDropdown = () => {
  const { orders, products, categories, sliders } = useDashboard()
  const { width } = useWidth()

  const widgets = [
    {
      title: 'الطلبيات',
      value: orders || '0',
      icon: <ShoppingCart size={24} weight="duotone" />,
      color: Theme.primary1,
      bgColor: `${Theme.primary1}15`,
    },
    {
      title: 'المنتجات',
      value: products || '0',
      icon: <Package size={24} weight="duotone" />,
      color: Theme.primaryBlue,
      bgColor: `${Theme.primaryBlue}15`,
    },
    {
      title: 'الأقسام',
      value: categories || '0',
      icon: <Tag size={24} weight="duotone" />,
      color: Theme.primaryLight,
      bgColor: `${Theme.primaryLight}15`,
    },
    {
      title: 'الشرائح',
      value: sliders || '0',
      icon: <Image size={24} weight="duotone" />,
      color: Theme.primaryRed,
      bgColor: `${Theme.primaryRed}15`,
    },
  ]

  return (
    <div className="widgets-container">
      <CRow className="gap-3">
        {widgets.map((widget, index) => (
          <div
            key={index}
            className="widget-card"
            style={{
              backgroundColor: Theme.white,
              borderRadius: '16px',
              padding: '1rem',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
              border: `1px solid ${widget.color}20`,
              width: width < 768 ? '47%' : '23%',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = `0 8px 25px ${widget.color}30`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.05)'
            }}
          >
            <div className="d-flex align-items-center justify-content-start mb-3 gap-2">
              <div
                className="widget-icon"
                style={{
                  backgroundColor: widget.bgColor,
                  borderRadius: '12px',
                  padding: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {React.cloneElement(widget.icon, { color: widget.color })}
              </div>

              <p
                className="widget-title"
                style={{
                  color: Theme.gray,
                  margin: '0.5rem 0 0 0',
                  fontSize: '0.9rem',
                }}
              >
                {widget.title}
              </p>
            </div>
            <div>
              <h3
                className="widget-value almarai-bold"
                style={{
                  color: Theme.grayDark,
                  fontSize: '2rem',
                  margin: 0,
                  lineHeight: 1,
                }}
              >
                {widget.value}
              </h3>
            </div>
          </div>
        ))}
      </CRow>
    </div>
  )
}

export default WidgetsDropdown
