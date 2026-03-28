import React from 'react'
import { CButton, CCol, CRow } from '@coreui/react'
import { Card, CardContent } from '@mui/material'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadialLinearScale,
} from 'chart.js'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import { Theme } from 'src/constants/colors'
import NavigationButtons from 'src/components/NavigationButtons'
import { useWidth } from 'src/hooks/general/useWidth'
import { useSettings } from 'src/hooks/settings/useSettings'
import { useDashboard } from 'src/hooks/dashboard/useDashboard'
import { Spinner } from 'react-bootstrap'
import { BestProductsList } from 'src/components/AppBestProductsList'
import BestUsers from 'src/components/BestUsers'
import { Eye, TrendUp, Users, Package, ShoppingCart, Star } from 'phosphor-react'
import '../../components/test.css'

ChartJS.register(
  ArcElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadialLinearScale,
)

const DashboardMain = () => {
  const { width } = useWidth()
  const { settings } = useSettings()
  const { loading } = useDashboard()

  // Chart data with your theme colors
  const monthlySalesData = {
    labels: [
      'يناير',
      'فبراير',
      'مارس',
      'أبريل',
      'مايو',
      'يونيو',
      'يوليو',
      'أغسطس',
      'سبتمبر',
      'أكتوبر',
      'نوفمبر',
      'ديسمبر',
    ],
    datasets: [
      {
        label: 'المبيعات',
        data: [65, 59, 80, 81, 56, 55, 40, 65, 40, 100, 65, 70],
        backgroundColor: Theme.primary1,
        borderColor: Theme.primaryLight,
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: Theme.white,
        titleColor: Theme.grayDark,
        bodyColor: Theme.grayDark,
        borderColor: Theme.primary1,
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: Theme.gray,
          font: {
            family: 'Almarai, sans-serif',
          },
        },
      },
      y: {
        grid: {
          color: Theme.base,
          drawBorder: false,
        },
        ticks: {
          color: Theme.gray,
          font: {
            family: 'Almarai, sans-serif',
          },
          callback: function (value) {
            return value
          },
        },
      },
    },
  }

  return (
    <div className="dashboard-container" style={{ padding: width > 768 ? '2rem' : '1rem' }}>
      {/* Header Section */}
      <div className="dashboard-header">
        <div>
          <h1
            className="almarai-bold"
            style={{
              color: Theme.grayDark,
              fontSize: width > 768 ? '2.5rem' : '1.8rem',
              marginBottom: '0.5rem',
            }}
          >
            لوحة التحكم
          </h1>
          <p
            style={{
              color: Theme.gray,
              fontSize: '1.1rem',
            }}
          >
            مرحباً بك في نظام إدارة Pharma Glow
          </p>
        </div>
        <CButton
          className="preview-button"
          style={{
            background: `linear-gradient(135deg, ${Theme.primary1} 0%, ${Theme.primaryLight} 100%)`,
            border: 'none',
            borderRadius: '12px',
            padding: '0.75rem 1.5rem',
            boxShadow: `0 4px 15px ${Theme.primary1}40`,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)'
            e.target.style.boxShadow = `0 6px 20px ${Theme.primary1}60`
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)'
            e.target.style.boxShadow = `0 4px 15px ${Theme.primary1}40`
          }}
        >
          <Eye size={20} weight="bold" />
          <a
            href="https://pharmaglows.com"
            style={{
              textDecoration: 'none',
              color: Theme.white,
              fontWeight: '600',
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            معاينة الموقع
          </a>
        </CButton>
      </div>

      {loading ? (
        <div className="loading-container">
          <Spinner
            animation="border"
            role="status"
            style={{
              width: '3rem',
              height: '3rem',
              color: Theme.primary1,
            }}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          {width > 768 && <NavigationButtons />}
          <div className="quick-stats-section">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon" style={{ backgroundColor: `${Theme.primary1}15` }}>
                  <ShoppingCart size={24} color={Theme.primary1} weight="duotone" />
                </div>
                <div className="stat-content">
                  <h3 className="stat-value almarai-bold">1,248</h3>
                  <p className="stat-label" style={{ color: Theme.gray }}>
                    الطلبات الجديدة
                  </p>
                  <div className="stat-trend">
                    <TrendUp size={16} color="#10b981" />
                    <span style={{ color: '#10b981', marginRight: '0.25rem' }}>+12.5%</span>
                    <span style={{ color: Theme.gray }}>من الشهر الماضي</span>
                  </div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" style={{ backgroundColor: `${Theme.primaryBlue}15` }}>
                  <Users size={24} color={Theme.primaryBlue} weight="duotone" />
                </div>
                <div className="stat-content">
                  <h3 className="stat-value almarai-bold">5,847</h3>
                  <p className="stat-label" style={{ color: Theme.gray }}>
                    المستخدمين النشطين
                  </p>
                  <div className="stat-trend">
                    <TrendUp size={16} color="#10b981" />
                    <span style={{ color: '#10b981', marginRight: '0.25rem' }}>+8.2%</span>
                    <span style={{ color: Theme.gray }}>من الشهر الماضي</span>
                  </div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" style={{ backgroundColor: `${Theme.primaryLight}15` }}>
                  <Package size={24} color={Theme.primary1} weight="duotone" />
                </div>
                <div className="stat-content">
                  <h3 className="stat-value almarai-bold">324</h3>
                  <p className="stat-label" style={{ color: Theme.gray }}>
                    منتجات تم بيعها
                  </p>
                  <div className="stat-trend">
                    <TrendUp size={16} color="#10b981" />
                    <span style={{ color: '#10b981', marginRight: '0.25rem' }}>+15.3%</span>
                    <span style={{ color: Theme.gray }}>من الشهر الماضي</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="main-content-grid">
            <div className="left-column">
              <Card className="chart-card">
                <CardContent>
                  <div className="chart-header">
                    <div>
                      <h3 className="almarai-bold" style={{ color: Theme.grayDark }}>
                        المبيعات الشهرية
                      </h3>
                      <p style={{ color: Theme.gray, fontSize: '0.9rem' }}>
                        نظرة عامة على أداء المبيعات خلال السنة
                      </p>
                    </div>
                    <div className="chart-legend">
                      <div className="legend-item">
                        <div
                          className="legend-color"
                          style={{ backgroundColor: Theme.primary1 }}
                        ></div>
                        <span style={{ color: Theme.gray }}>المبيعات</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ height: '300px', marginTop: '1.5rem' }}>
                    <Bar data={monthlySalesData} options={chartOptions} />
                  </div>
                </CardContent>
              </Card>

              <div className="widgets-section">
                <WidgetsDropdown />
              </div>
            </div>

            <div className="right-column">
              <Card className="best-products-card">
                <CardContent>
                  <div className="section-header">
                    <h3 className="almarai-bold" style={{ color: Theme.grayDark }}>
                      المنتجات الأعلى مبيعاً
                    </h3>
                    <CButton
                      color="link"
                      style={{
                        color: Theme.primary1,
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                      }}
                      onClick={() => (window.location.href = '/products')}
                    >
                      عرض الكل
                    </CButton>
                  </div>
                  <BestProductsList />
                </CardContent>
              </Card>

              <Card className="best-users-card">
                <CardContent>
                  <div className="section-header">
                    <h3 className="almarai-bold" style={{ color: Theme.grayDark }}>
                      أفضل المستخدمين
                    </h3>
                    <CButton
                      color="link"
                      style={{
                        color: Theme.primary1,
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                      }}
                      onClick={() => (window.location.href = '/users')}
                    >
                      عرض الكل
                    </CButton>
                  </div>
                  <BestUsers />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* <div className="recent-activity">
            <Card>
              <CardContent>
                <h3 className="almarai-bold mb-4" style={{ color: Theme.grayDark }}>
                  النشاطات الحديثة
                </h3>
                <div className="activity-list">
                  {[1, 2, 3].map((_, index) => (
                    <div key={index} className="activity-item">
                      <div className="activity-icon">
                        <div
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: `linear-gradient(135deg, ${Theme.primary1} 0%, ${Theme.primaryLight} 100%)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Users size={20} color={Theme.white} />
                        </div>
                      </div>
                      <div className="activity-content">
                        <p style={{ margin: 0, color: Theme.grayDark }}>مستخدم جديد قام بالتسجيل</p>
                        <small style={{ color: Theme.gray }}>منذ 5 دقائق</small>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div> */}
        </>
      )}
    </div>
  )
}

export default DashboardMain
