export const lotInputData = [
  {
    key: 'quantity',
    name: 'quantity',
    label: 'Quantity(pcs)',
    disabled: false,
  },
  { key: 'weight', name: 'weight', label: 'Weight(per/pcs)', disabled: false },
  {
    key: 'tWeight',
    name: 'tWeight',
    label: 'Total Weight(KG)',
    disabled: true,
  },
  { key: 'customs', name: 'customs', label: 'Customs Charge', disabled: true },
  { key: 'discount', name: 'discount', label: 'Discount(RM)', disabled: false },
  { key: 'subtotal', name: 'subtotal', label: 'Subtotal', disabled: true },
]
export const lotGrossInputData = [
  {
    key: 'grossWeight',
    name: 'grossWeight',
    label: 'Gross Weight',
    disabled: false,
  },
  {
    key: 'grossWeightPrice',
    name: 'grossWeightPrice',
    label: 'Gross Weight Price',
  },
  {
    key: 'volumeWeight',
    name: 'volumeWeight',
    label: 'Volume Weight',
    disabled: false,
  },
  {
    key: 'volumeWeightPrice',
    name: 'volumeWeightPrice',
    label: 'Volume Weight Price',
  },
  {
    key: 'lotTotalPrice',
    name: 'lotTotalPrice',
    label: 'Lot Total Price(RM)',
    disabled: true,
  },
]
export const chargeInputData = [
  {
    key: 'handlingCharge',
    name: 'handlingCharge',
    label: 'Handling Charge',
    disabled: false,
  },
  {
    key: 'districtCharge',
    name: 'districtCharge',
    label: 'District Charge',
    disabled: false,
  },

  {
    key: 'packingCharge',
    name: 'packingCharge',
    label: 'Packing Charge',
    disabled: false,
  },
  {
    key: 'additionalCharge',
    name: 'additionalCharge',
    label: 'Additional Charge',
    disabled: false,
  },
  {
    key: 'numberOfCarton',
    name: 'numberOfCarton',
    label: 'Number of Carton',
    disabled: true,
  },
  {
    key: 'discount',
    name: 'discount',
    label: 'Discount(RM)',
    disabled: false,
  },
  {
    key: 'totalLocalAmount',
    name: 'totalLocalAmount',
    label: 'Total Local Amount(RM)',
    disabled: true,
  },
]


// {
//   "booking_id": "",
//   "sender_information": {
//     "id": 7222,
//     "name": "safi",
//     "phone": "60165825466",
//     "freight_category": "AIR_FREIGHT",
//     "email": "safia@gmail.com",
//     "country": 4,
//     "country_code": "60",
//     "city": 2856,
//     "state": "Selangor"
//   },
//   "receiver_information": {
//     "id": 3199,
//     "name": "RAZID AHMED JONY",
//     "phone": "8801713082355",
//     "freight_category": "AIR_FREIGHT",
//     "email": "sa@mailinator.com",
//     "country": 1,
//     "country_code": "880",
//     "city": 3442,
//     "state": "Moulvibazar",
//     "location": "{\"road\":\"\",\"house\":\"\",\"others\":\"\"}"
//   },
//   "booking_type": "EXPRESS",
//   "delivery_type": "OFFICE_DELIVERY",
//   "comment": "",
//   "lot_list": [
//     {
//       "number": 1,
//       "product_list": [
//         {
//           "id": 6870,
//           "name": "CREALITY SPACE PI FILAMENT",
//           "quantity": 3,
//           "weight": 3,
//           "custom_charge": 0,
//           "discount": 44,
//           "sub_total": -44
//         }
//       ],
//       "gross_weight": 44,
//       "gross_weight_price": 44,
//       "volume_weight": 44,
//       "volume_weight_price": 4,
//       "total_lot_amount": 2068
//     },
//     {
//       "number": 2,
//       "product_list": [
//         {
//           "id": 6597,
//           "name": "SMART PHONE(RM 3500 OR AVOBE UP)",
//           "quantity": 2,
//           "weight": 2,
//           "custom_charge": 350,
//           "discount": 2,
//           "sub_total": 698
//         },
//         {
//           "id": 6870,
//           "name": "CREALITY SPACE PI FILAMENT",
//           "quantity": 10,
//           "weight": 2,
//           "custom_charge": 0,
//           "discount": 55,
//           "sub_total": -55
//         }
//       ],
//       "gross_weight": 2,
//       "gross_weight_price": 2,
//       "volume_weight": 2,
//       "volume_weight_price": 4,
//       "total_lot_amount": 655
//     }
//   ],
//   "home_delivery_charge": 2,
//   "district_delivery_charge": 3,
//   "packing_charge": 4,
//   "additional_charge": 4,
//   "total_local_amount": 2732,
//   "total_carton": 2,
//   "discount": 4,
//   "promo_code": [],
//   "device_id": "19f098e8-1434-423d-bad1-13eeb5f82424 "
// }