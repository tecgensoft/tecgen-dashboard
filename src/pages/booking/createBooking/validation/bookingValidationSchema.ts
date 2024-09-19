import * as Yup from 'yup';

const validationSchema = [
  Yup.object({
    name: Yup.string().required('Name is required'),
    phone: Yup.string().required('Phone is required'),
    email: Yup.string().required('Email is required'),
    freight_category: Yup.string().required('Freight Category is required'),
    choose_city: Yup.string().required('Choose City is required'),

    choose_area: Yup.string().required('Choose City is required'),
    receiver_name: Yup.string().required('Name is required'),
    receiver_phone: Yup.string().required('Phone is required'),
    receiver_email: Yup.string().required('Email is required'),
    receiver_booking_type: Yup.string().required('Booking type is required'),
    receiver_delivery_type: Yup.string().required(
      'Delivery type is required',
    ),
    receiver_choose_city: Yup.string().required('Choose City is required'), //Yup.object({ name: Yup.string().required('Choose City is required'), id: Yup.string().required('Choose City is required') }),
    receiver_choose_area: Yup.string().required('Choose City is required')
  }),
]

export default validationSchema