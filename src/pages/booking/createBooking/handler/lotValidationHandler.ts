/* eslint-disable @typescript-eslint/no-explicit-any */
export const initialError = (lot: any) => {
  return {
    lotId: '',
    products: lot.products.map(() => ({
      pid: '',
      Product: '',
      quantity: '',
      weight: '',
    })),
  }
}

export const validateLots = (lots: any, initialErrorsState: any) => {
  const errors = initialErrorsState.map((lot: any) => ({ ...lot }))

  lots.forEach((lot: any, index: any) => {
    // Validate lotId
    if (!lot.id) {
      errors[index].lotId = 'Lot ID is required'
    } else {
      errors[index].lotId = lot?.id
    }

    // Validate products for the current lot
    errors[index].products = lot?.products?.map((product: any) => {
      const productErrors = {
        pid: '',
        Product: '',
        quantity: '',
        weight: '',
      }

      // Validate product id (pid)
      if (!product.id) {
        productErrors.pid = 'Product ID is required'
      } else {
        productErrors.pid = product.id
      }

      // Validate product name
      if (!product.Product) {
        productErrors.Product = 'Product Name is required'
      }

      // Validate quantity
      if (!product.quantity || product?.quantity < 1) {
        productErrors.quantity = 'Quantity is required'
      }

      // Validate weight
      if (!product.weight || product.weight < 0.001) {
        productErrors.weight = 'Weight is required'
      }

      return productErrors
    })

    // Validate grossWeight
    if (!lot.grossWeight || lot.grossWeight < 0.001) {
      errors[index].grossWeight = 'Gross Weight is required'
    } else {
      errors[index].grossWeight = ''
    }

    // Validate grossWeightPrice
    if (!lot.grossWeightPrice || lot.grossWeightPrice < 0.001) {
      errors[index].grossWeightPrice = 'Gross Weight Price is required'
    } else {
      errors[index].grossWeightPrice = ''
    }
  })

  return errors
}
export const validateAndSetErrors = (
  lots: any,
  initialErrorsState: any,
  setErrorsState: any,
) => {

  const errors = validateLots(lots, initialErrorsState)

  setErrorsState(errors)
  let validate = false
  errors.map((error: any) => {
    if (error?.lotId) {

      if (error?.grossWeight === '' && error?.grossWeightPrice === '') {

        error.products?.map((product: any) => {

          if (
            product?.Product === '' &&
            product?.quantity === '' &&
            product?.weight === ''
          ) {

            validate = true
          }
        })
      }
    }
  })
  return validate
}
export const getError = (lotId: any, productId: any, field: any, errorsState: any) => {
  const findError = errorsState
    .find((error: any) => error?.lotId === lotId)
    ?.products?.find((product: any) => product?.pid === productId)?.[field]
  return findError ? findError : null
}
export const getGrossError = (lotId: any, field: any, errorsState: any) => {
  const findError = errorsState.find((error: any) => error?.lotId === lotId)?.[field]

  return findError ? findError : null
}
