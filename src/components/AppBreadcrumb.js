import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import routes from '../routes'

import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'
import { Theme } from 'src/constants/colors'

const AppBreadcrumb = () => {
  const currentLocation = useLocation().pathname

  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => route.path === pathname)
    return currentRoute ? currentRoute.name : false
  }

  const getBreadcrumbs = (location) => {
    const breadcrumbs = []
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`
      const routeName = getRouteName(currentPathname, routes)
      routeName &&
        breadcrumbs.push({
          pathname: currentPathname,
          name: routeName,
          active: index + 1 === array.length ? true : false,
        })
      return currentPathname
    })
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(currentLocation)
  const navigate = useNavigate()

  return (
    <div
      className=" rounded p-2"
      style={{ backgroundColor: Theme.white, boxShadow: '0px 2px 3px #c8c8c8' }}
    >
      <CBreadcrumb className="m-0 ms-2" style={{ '--cui-breadcrumb-divider': "'>'" }}>
        <CBreadcrumbItem
          className="hovarableText"
          onClick={() => {
            navigate(`/dashboard`)
          }}
        >
          الصفحة الرئيسية
        </CBreadcrumbItem>
        {breadcrumbs.map((breadcrumb, index) => {
          return (
            <CBreadcrumbItem
              {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })}
              key={index}
            >
              {breadcrumb.name}
            </CBreadcrumbItem>
          )
        })}
      </CBreadcrumb>
    </div>
  )
}

export default React.memo(AppBreadcrumb)
