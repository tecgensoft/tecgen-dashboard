import { IMenuItemType } from '../_components/types'

const dashboardIcon = 'https://i.ibb.co/J3ZS52S/dashboard.png'
const productIcon = 'https://i.ibb.co/86Yj3H2/product.png'
const bookingIcon = 'https://i.ibb.co/x1xZW4d/booking.png'
const paymentIcon = 'https://i.ibb.co/CQ3vqNf/payment.png'
const challanIcon = 'https://i.ibb.co/QChFfh5/challan.png'
const customersIcon = 'https://i.ibb.co/zh9L4H2/customers.png'
const trackingIcon = 'https://i.ibb.co/6bfFz7S/tracking.png'
const shipmentsIcon = 'https://i.ibb.co/804kdL6/shipments.png'
const expansesIcon = 'https://i.ibb.co/XLmNpJr/expanses.png'
const settingsIcon = 'https://i.ibb.co/zhMJRrk/settigs.png'

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
          src={productIcon}
          alt="Product Management"
          style={{ width: '24px', height: '24px' }}
        />
      ),
      title: 'Product Management',
      items: [
        { title: 'Product List', items: [], to: '/product_management/product' },
        {
          title: 'Custom Charges',
          items: [],
          to: '/product_management/custom_charge',
        },
      ],
    },
    {
      icon: (
        <img
          src={bookingIcon}
          alt="Bookings"
          style={{ width: '24px', height: '24px' }}
        />
      ),
      title: 'Bookings',
      items: [
        { title: 'Booking List', to: '/booking' },
        {
          title: 'Create New Booking',
          items: [],
          to: '/booking/create_new_booking',
        },
        // { title: 'Promo Codes', items: [], to: '/booking/promo_code' },
        {
          title: 'Update Lot Status',
          items: [],
          to: '/booking/update_lot_status',
        },
        { title: 'Lot List', items: [], to: '/booking/lot_list' },
      ],
    },
    {
      icon: (
        <img
          src={paymentIcon}
          alt="Payment Histories"
          style={{ width: '24px', height: '24px' }}
        />
      ),
      title: 'Payment ',
      items: [
        {
          title: 'Payment Histories',
          items: [],
          to: '/payment/payment_history',
        },

        {
          title: 'Create New Payment',
          items: [],
          to: `/booking/payment/${undefined}`,
        },
        {
          title: 'Conversion Rate',
          items: [],
          to: '/payment/conversion_rate',
        },
      ],
    },
    {
      icon: (
        <img
          src={challanIcon}
          alt="Challan"
          style={{ width: '24px', height: '24px' }}
        />
      ),
      title: 'Challan',
      items: [
        {
          title: 'Create New Challan',
          items: [],
          to: '/challan/create_challan',
        },
        { title: 'Challan List', items: [], to: '/challan/challan_history' },
      ],
    },
    {
      icon: (
        <img
          src={customersIcon}
          alt="Customers"
          style={{ width: '24px', height: '24px' }}
        />
      ),
      title: 'Customers',
      items: [],
      to: '/customers',
    },
    {
      icon: (
        <img
          src={trackingIcon}
          alt="Tracking"
          style={{ width: '24px', height: '24px' }}
        />
      ),
      title: 'Tracking',
      to: '/tracking',
    },
    {
      icon: (
        <img
          src={shipmentsIcon}
          alt="Shipment"
          style={{ width: '24px', height: '24px' }}
        />
      ),
      title: 'Shipments',
      items: [],
      to: '/shipments',
    },
    {
      icon: (
        <img
          src={expansesIcon}
          alt="Office Expenses"
          style={{ width: '24px', height: '24px' }}
        />
      ),
      title: 'Office Expenses',
      items: [
        {
          title: 'Office Expenses ',
          items: [],
          to: '/officeExpense/officeExpenses',
        },
        {
          title: 'Expense Categories',
          items: [],
          to: '/officeExpense/officeExpense_category',
        },
      ],
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
          title: 'Office Meta Info',
          items: [],
          to: '/settings/company-meta-info-list',
        },
      ],
    },
  ]
  return menu
}

export default Menu
