import React from 'react'
import Login from './views/pages/login/Login'
import CurrentUser from './views/Current-User/current_user'

import { Users } from 'phosphor-react'
import EditAboutUS from './views/About-Us/edit-about-us'
import EditSlider from './views/Slider/edit-slider'
import Sliders from './views/Slider/sliders'
import AddSlider from './views/Slider/add-slider'
import OrderDetails from './views/Order-Details/order_details'
import NotificationFirebase from './views/Notification-Firebase/notification-firebase'
import Banners from './views/Banners/banners'
import EditBanner from './views/Banners/edit-banner'
import PrivacyPolicy from './views/Privacy-Policy/privacy_policy'
import AboutUs from './views/About-Us/about-us'
import AddUser from './views/Users/add-user'
import EditUser from './views/Users/edit-user'
import Categories from './views/Categories/categories'
import AddCategory from './views/Categories/add-category'
import EditCategory from './views/Categories/edit-category'
import Products from './views/Products/products'
import AddProduct from './views/Products/add-product'
import EditProduct from './views/Products/edit-product'
import ViewProduct from './views/Products/view-product'
import Socials from './views/Socials/socials'
import EditSocial from './views/Socials/edit-social'
import Orders from './views/Orders/orders'
import Feedbacks from './views/Feedbacks/feedbacks'
import AddFeedback from './views/Feedbacks/add-feedback'
import EditFeedback from './views/Feedbacks/edit-feedback'
import Copons from './views/Copons/copons'
import AddCopon from './views/Copons/add-copon'
import EditCopon from './views/Copons/edit-copon'
import Dashboard from './views/Dashboard/Dashboard'
import DashboardMain from './views/Dashboard/Dashboard'
import UsersPage from './views/Users/users'
import Settings from './views/Settings/settings'
import { element } from 'prop-types'
import AddBanner from './views/Banners/add-banner'
import AddBrand from './views/Brands/add-brand'
import EditBrand from './views/Brands/edit-brand'
import Brands from './views/Brands/Brands'
import CustomersPage from './views/Users/customers'
import EditArea from './views/Areas/edit-area'
import AddArea from './views/Areas/add-area'
import Areas from './views/Areas/areas'
import EditStock from './views/Products/edit-stock'
import AddStocks from './views/Products/add-stocks'
import Packages from './views/Baby-Packages/Packages'
import AddPackage from './views/Baby-Packages/add-package'
import EditPackage from './views/Baby-Packages/edit-package'

export const API_ROUTE = 'https://pharmaglows.com/adminv2/api'
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const routes = [
  { path: '/', name: 'Login', element: Login },
  { path: '/dashboard', name: 'Dashboard', element: DashboardMain },

  // Start Users Routes
  { path: '/users', name: 'المستخدمين', element: UsersPage },
  { path: '/customers', name: 'العملاء', element: CustomersPage },
  { path: '/login', name: 'تسجيل الدخول', element: Login },
  { path: '/add_user', name: 'إضافة مستخدم ', element: AddUser },
  { path: '/edit_user/:id', name: 'المستخدمين', element: EditUser },
  { path: '/profile', name: ' الملف الشخصي', element: CurrentUser },
  // End Users Routes

  // Start Categories Routes
  { path: '/categories', name: 'الأقسام الرئيسية', element: Categories },
  { path: '/add_category', name: ' إضافة قسم', element: AddCategory },
  { path: '/edit_category/:id', name: 'تعديل القسم', element: EditCategory },
  // End Categories Routes

  // Start Categories Routes
  { path: '/brands', name: 'العلامات التجارية', element: Brands },
  { path: '/add_brand', name: ' إضافة علامة تجارية', element: AddBrand },
  { path: '/edit_brand/:id', name: 'تعديل علامة تجارية', element: EditBrand },
  // End Categories Routes

  // Start Categories Routes
  { path: '/packages', name: 'مجموعة ملابس', element: Packages },
  { path: '/add_package', name: ' إضافة مجموعة ملابس', element: AddPackage },
  { path: '/edit_package/:id', name: 'تعديل مجموعة ملابس', element: EditPackage },
  // End Categories Routes

  // Start Banners Routes
  { path: '/banners', name: 'البنرات', element: Banners },
  { path: '/edit_banner/:id', name: 'تعديل البنرات', element: EditBanner },
  { path: '/add-banner', name: 'إضافة بانر', element: AddBanner },
  // End Banners Routes

  // Start Sliders Routes
  { path: '/sliders', name: 'الشرائح', element: Sliders },
  { path: '/add_slider', name: 'إضافة شريحة ', element: AddSlider },
  { path: '/edit_slider/:id', name: 'تعديل شريحة', element: EditSlider },
  // End Sliders Routes

  // Start Products Routes
  { path: '/products', name: 'المنتجات', element: Products },
  { path: '/add_product', name: 'إضافة منتج', element: AddProduct },
  { path: '/edit_product/:id', name: 'المنتجات', element: EditProduct },
  { path: '/single_product/:id', name: ' تفاصيل المنتج', element: ViewProduct },
  { path: '/add_stocks', name: 'إدارة مخزون المنتج', element: AddStocks },
  { path: '/edit_stocks/:id', name: 'تعديل مخزون المنتج', element: EditStock },
  { path: '/single_product/:id', name: ' تفاصيل المنتج', element: ViewProduct },
  // End Products Routes

  // Start Socials Routes
  { path: '/socials', name: 'مواقع التواصل الاجتماعي ', element: Socials },
  { path: '/edit_social/:id', name: 'تعديل موقع', element: EditSocial },
  // End Products Routes

  // Start Orders Routes
  { path: '/orders', name: 'Orders', element: Orders },
  { path: '/view_order/:id', name: 'تفاصيل الطلب', element: OrderDetails },
  // End Orders Routes

  // Start Notifications Routes
  { path: '/notifications', name: ' الإشعارات', element: NotificationFirebase },
  // End Notifications Routes

  // Start Feedbacks Routes
  { path: '/feedbacks', name: 'الملاحظات', element: Feedbacks },
  { path: '/add_feedback', name: 'إضافة ملاحظة ', element: AddFeedback },
  { path: '/edit_feedback/:id', name: 'تعديل ملاحظة', element: EditFeedback },
  // End Feedbacks Routes

  // Start Copons Routes
  { path: '/coupons', name: '  كوبونات الخصم ', element: Copons },
  { path: '/add_coupon', name: '  اإضافة كوبون الخصم ', element: AddCopon },
  { path: '/edit_coupon/:id', name: '  تعديل كوبون الخصم ', element: EditCopon },
  // End Copons Routes

  { path: '/areas', name: 'المناطق', element: Areas },
  {
    path: '/add_area',
    name: ' إضافة منطقة',
    element: AddArea,
  },
  {
    path: '/edit_area/:id',
    name: 'تعديل منطقة',
    element: EditArea,
  },

  // Start About Us Routes
  { path: '/about_us', name: ' من نحن ', element: AboutUs },
  { path: '/edit_about_us/:id', name: 'تعديل من نحن', element: EditAboutUS },
  // End About Us Routes

  // Start Privacy And Policy Routes
  { path: '/privacy_policy', name: ' سياسة الخصوصية', element: PrivacyPolicy },
  // End Privacy And Policy Routes

  // { path: '/settings', name: ' الإعدادات', element: Settings},

  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
]

export default routes
