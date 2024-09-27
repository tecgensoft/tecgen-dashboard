import { IMenuItemType } from '../_components/types'

const dashboardIcon =
  'https://res.cloudinary.com/minhajur-rohoman/image/upload/v1726814254/dashboard_uoxq36.png'
const productIcon =
  'https://res.cloudinary.com/minhajur-rohoman/image/upload/v1726814605/product_s2vf4r.png'
// const bookingIcon = 'https://i.ibb.co/x1xZW4d/booking.png'
// const paymentIcon = 'https://i.ibb.co/CQ3vqNf/payment.png'
// const challanIcon = 'https://i.ibb.co/QChFfh5/challan.png'
// const customersIcon = 'https://i.ibb.co/zh9L4H2/customers.png'
// const trackingIcon = 'https://i.ibb.co/6bfFz7S/tracking.png'
// const shipmentsIcon = 'https://i.ibb.co/804kdL6/shipments.png'
// const expansesIcon = 'https://i.ibb.co/XLmNpJr/expanses.png'
const settingsIcon =
  'https://res.cloudinary.com/minhajur-rohoman/image/upload/v1726814918/setting_fopbxb.png'

const Menu = () => {
  const menu: IMenuItemType[] = [
    {
      icon: (
        <img
          src={dashboardIcon}
          alt="Dashboard"
          style={{ width: '24px', height: '24px' }}
        />
      ),
      title: 'Dashboard',
      items: [],
      to: '/',
    },
    {
      icon: (
        <img
          src={dashboardIcon}
          alt="Dashboard"
          style={{ width: '24px', height: '24px' }}
        />
      ),
      title: 'Store',
      items: [
        { title: 'Add Store', items: [], to: '/category/manage-category' },
        { title: 'Store List', items: [], to: '/category/manage-subcategory' },
      ],
    },
    {
      icon: (
        <img
          src={productIcon}
          alt="category"
          style={{ width: '24px', height: '24px' }}
        />
      ),
      title: 'Product Management',
      items: [
        { title: 'Category', items: [], to: '/category/manage-category' },
        { title: 'Subcategory', items: [], to: '/category/manage-subcategory' },
        { title: 'Brand', items: [], to: '/brand/manage-brands' },
        { title: 'Attribute', items: [], to: '/brand/manage-brands' },
        { title: 'Attribute Value', items: [], to: '/brand/manage-brands' },
      ],
    },
    // {
    //   icon: (
    //     <img
    //       src={productIcon}
    //       alt="brand"
    //       style={{ width: '24px', height: '24px' }}
    //     />
    //   ),
    //   title: 'Brand',
    //   items: [
    //     { title: 'Mange Brand', items: [], to: '/brand/manage-brands' },
    //   ],
    // },
    {
      icon: (
        <img
          src={productIcon}
          alt="Products"
          style={{ width: '24px', height: '24px' }}
        />
      ),
      title: 'Products',
      items: [
        {
          title: 'Add Product',
          items: [],
          to: '/products/add-product',
        },
        { title: 'Product List', items: [], to: '/products/manage-products' },
      ],
    },
    {
      icon: (
        <img
          src={productIcon}
          alt="Products"
          style={{ width: '24px', height: '24px' }}
        />
      ),
      title: 'Orders & Reviews',
      items: [
        { title: 'Manage Order', items: [], to: '/orders/manage-orders' },
        { title: 'Review List', items: [], to: '/orders/manage-reviews' },
      ],
    },
    {
      icon: (
        <img
          src={dashboardIcon}
          alt="Dashboard"
          style={{ width: '24px', height: '24px' }}
        />
      ),
      title: 'Reports',
      items: [],
      to: '/reports',
    },
    {
      icon: (
        <img
          src={settingsIcon}
          alt="Settings"
          style={{ width: '24px', height: '24px' }}
        />
      ),
      title: 'Settings',
      items: [
        {
          title: 'Profile',
          items: [],
          to: '/settings/profile',
        },
        {
          title: 'Account Setting',
          items: [],
          to: '/settings/account-setting',
        },
      ],
    },
  ]
  return menu
}

export default Menu
