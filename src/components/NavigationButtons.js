import {
  Cards,
  ChatsCircle,
  CirclesThreePlus,
  FacebookLogo,
  Gift,
  Question,
  ShoppingCartSimple,
  SidebarSimple,
  Tag,
  UserCircle,
} from 'phosphor-react'
import NavigationCard from './NavigationCard'
import React from 'react'
import { Theme } from 'src/constants/colors'

const NavigationButtons = () => {
  const navigationItems = [
    {
      icon: <CirclesThreePlus size={22} weight="duotone" />,
      title: 'الأقسام الرئيسية',
      path: '/categories',
      color: Theme.primary1,
      description: 'إدارة الأقسام والفئات',
    },
    {
      icon: <Tag size={22} weight="duotone" />,
      title: 'المنتجات',
      path: '/products',
      color: '#3399ff',
      description: 'إدارة المنتجات والمخزون',
    },
    {
      icon: <ShoppingCartSimple size={22} weight="duotone" />,
      title: 'الطلبيات',
      path: '/orders',
      color: Theme.primaryLight,
      description: 'عرض وإدارة الطلبيات',
    },
    {
      icon: <SidebarSimple size={22} weight="duotone" />,
      title: 'الشرائح',
      path: '/sliders',
      color: '#99cccc',
      description: 'إدارة شرائح العرض',
    },
    {
      icon: <Cards size={22} weight="duotone" />,
      title: 'البنرات',
      path: '/banners',
      color: '#e1aab0',
      description: 'إدارة البنرات الإعلانية',
    },
    {
      icon: <UserCircle size={22} weight="duotone" />,
      title: 'المستخدمين',
      path: '/users',
      color: Theme.primaryRed,
      description: 'إدارة حسابات المستخدمين',
    },
    {
      icon: <Gift size={22} weight="duotone" />,
      title: 'الكوبونات',
      path: '/coupons',
      color: '#a29bfe',
      description: 'إدارة العروض والكوبونات',
    },
    {
      icon: <FacebookLogo size={22} weight="duotone" />,
      title: 'وسائل التواصل',
      path: '/socials',
      color: '#4267B2',
      description: 'إدارة روابط التواصل',
    },
    {
      icon: <Question size={22} weight="duotone" />,
      title: 'من نحن',
      path: '/about_us',
      color: '#00cec9',
      description: 'تعديل صفحة من نحن',
    },
    {
      icon: <ChatsCircle size={22} weight="duotone" />,
      title: 'ملاحظات العملاء',
      path: '/feedBacks',
      color: '#fd79a8',
      description: 'عرض تعليقات العملاء',
    },
  ]

  return (
    <div className="navigation-section" style={{ margin: '2rem 0' }}>
      <div className="section-header" style={{ marginBottom: '1.5rem' }}>
        <h3
          className="almarai-bold"
          style={{
            color: Theme.grayDark,
            fontSize: '1.5rem',
            marginBottom: '0.5rem',
          }}
        >
          التنقل السريع
        </h3>
        <p
          style={{
            color: Theme.gray,
            fontSize: '0.95rem',
          }}
        >
          الوصول السريع إلى أقسام لوحة التحكم
        </p>
      </div>

      <div className="navigation-grid">
        {navigationItems.map((item, index) => (
          <NavigationCard
            key={index}
            icon={item.icon}
            title={item.title}
            path={item.path}
            color={item.color}
            description={item.description}
          />
        ))}
      </div>
    </div>
  )
}

export default NavigationButtons
