/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck 
import { SUCCESS } from "../../../../redux/feature/notification/constant"
import { setNotification } from "../../../../redux/feature/notification/notificationSlice"
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck 
/* eslint-disable @typescript-eslint/no-explicit-any */

export const handleAddLot = (setLotDeleteModalOpen: any, lots: any, setLots: any) => {

  setLotDeleteModalOpen(false)
  const newLotNumber =
    lots.length > 0 ? Math.max(...lots.map((lot: any) => lot.lotNumber)) + 1 : 1
  const newLot = {
    id: Date.now(),
    open: false,
    products: [{ id: Date.now() }],
    lotNumber: newLotNumber,
  }
  setLots((prevLots: any) => [newLot, ...prevLots])
}
export const handleDeleteLot = (lotId: any, setLots: any, setLotDeleteModalOpen: any, dispatch:any) => {
  setLots((prevLots: any) => prevLots.filter((lot: any) => lot.id !== lotId))
  setLotDeleteModalOpen(false)
  dispatch(setNotification({
    open: true,
    message: 'LOT Deleted Successfully',
    type: SUCCESS,
  }))
}

export const handleAddProduct = (lotId: any, setLots: any) => {
  setLots((prevLots: any) =>
    prevLots.map((lot: any) =>
      lot.id === lotId
        ? { ...lot, products: [{ id: Date.now() }, ...lot.products] }  // Prepend the new product
        : lot,
    ),
  )
}
// export const handleDeleteProduct = (
//   lotId: any,
//   productId: any,
//   setProductDeleteModalOpen: any,
//   setLots: any,
//   dispatch: any,


// ) => {

//   setProductDeleteModalOpen(false)
//   setLots((prevLots: any) =>
//     prevLots.map((lot: any) =>
//       lot.id === lotId
//         ? {
//           ...lot,
//           products: lot.products.filter((product: any) => product.id !== productId),
//         }
//         : lot,
//     ),
//   )
// console.log("lotsfff", productId)
// console.log("lotsfff", productId)
// dispatch(
//   setNotification({
//     open: true,
//     message: 'Product Deleted',
//     // message: data?.error?.data?.message,
//     type: SUCCESS,
//   }),
// )
//}
export const handleDeleteProduct = (
  lotId: any,
  productId: any,
  setProductDeleteModalOpen: any,
  setLots: any,
  dispatch: any,
  _lots: any
) => {


  // Update the lots state
  setLots((prevLots: any) => {
    const updatedLots = prevLots.map((lot: any) =>
      lot.id === lotId
        ? {
          ...lot,
          products: lot.products.filter(
            (product: any) => product.id !== productId
          ),
        }
        : lot
    );

    dispatch(
      setNotification({
        open: true,
        message: 'Product Deleted',
        // message: data?.error?.data?.message,
        type: SUCCESS,
      }),
    )
    return updatedLots;
  });

  // Close the modal
  setProductDeleteModalOpen(false);
};

export const handleDuplicateLot = (lotId: any, count: any, lots: any, setLots: any) => {
  const lotToDuplicate = lots.find((lot: any) => lot.id === lotId)

  if (lotToDuplicate) {
    duplicateLot(lotToDuplicate, count, lots, setLots)
  }
}

// Function to duplicate lot based on count
const duplicateLot = (lotToDuplicate: any, count: any, lots: any, setLots: any) => {
  const baseTime = Date.now() // Get base time once

  // Calculate the new lot number once
  const initialLotNumber =
    lots.length > 0 ? Math.max(...lots.map((lot: any) => lot.lotNumber)) + 1 : 1

  // Function to process a chunk of lots
  const processChunk = (startIndex: any) => {
    const chunkSize = 10 // Adjust this value as needed
    const newLots: any = []

    for (let i = startIndex; i < Math.min(startIndex + chunkSize, count); i++) {
      const newLotId = baseTime + i // Unique ID for the new lot

      const newProducts = lotToDuplicate.products.map((product: any) => ({
        ...product,
        id: baseTime + Math.random() + i, // Unique IDs for products
      }))

      const newLot = {
        ...lotToDuplicate,
        id: newLotId,
        open: true,
        products: newProducts,
        lotNumber: initialLotNumber + i, // Increment lot number
      }

      newLots.push(newLot)
    }

    // Update state with new duplicated lots for this chunk
    setLots((prevLots: any) => [...newLots, ...prevLots])

    // Schedule the next chunk if needed
    if (startIndex + chunkSize < count) {
      requestIdleCallback(() => processChunk(startIndex + chunkSize))
    }
  }

  // Start processing chunks
  requestIdleCallback(() => processChunk(0))
}
export const handleProductChange = (e: any, productId: any, lotId: any, setLots: any) => {
  setLots((prevLots: any) =>
    prevLots.map((lot: any) =>
      lot.id === lotId
        ? {
          ...lot,
          products: [
            // eslint-disable-next-line no-unsafe-optional-chaining
            ...lot.products?.map((product: any) =>
              product?.id === productId
                ? { ...product, [e.target.name]: e.target.value }
                : product,
            ),
          ],
        }
        : lot,
    ),
  )
}
export const handleProductCustomChange = (
  search: any,
  productId: any,
  lotId: any,
  setLots: any,
) => {
  // console.log(search)
  setLots((prevLots: any) =>
    prevLots.map((lot: any) =>
      lot.id === lotId
        ? {
          ...lot,
          products: [
            // eslint-disable-next-line no-unsafe-optional-chaining
            ...lot.products?.map((product: any) =>
              product?.id === productId
                ? {
                  ...product,
                  Product: search?.label,
                  productId: search?.value,
                  customs: search?.custom_charge,
                }
                : product,
            ),
          ],
        }
        : lot,
    ),
  )
}
export const handleProductGrossChange = (e: any, lotId: any, setLots: any) => {
  setLots((prevLots: any) =>
    prevLots.map((lot: any) =>
      lot.id === lotId
        ? {
          ...lot,
          [e.target.name]: e.target.value,
        }
        : lot,
    ),
  )
}
export const handleChargeChange = (e: any, lotsAllData: any, setLotsAllData: any) => {
  setLotsAllData({ ...lotsAllData, [e.target.name]: e.target.value })
}

export const handleToggle = (id: any, setLots: any) => {
  setLots((prevLots: any) =>
    prevLots.map((lot: any) => (lot.id === id ? { ...lot, open: !lot.open } : lot)),
  )
}

export const handleCancel = (setShowValue: any, showValue: any) => {
  setShowValue(!showValue)
}

// export const handleDuplicateLot = (lotId, time, lots, setLots) => {
//   const lotToDuplicate = lots.find(lot => lot.id === lotId)

//   if (lotToDuplicate) {
//     duplicateLot(lotToDuplicate, time, lots, setLots)
//   }
// }

// // Function to duplicate lot based on count
// const duplicateLot = (lotToDuplicate, count, lots, setLots) => {
//   const newLots = []
//   for (let i = 0; i < count; i++) {
//     const newLotId = Date.now() + i // Unique ID for the new lot
//     const newProducts = lotToDuplicate.products.map(product => ({
//       ...product,
//       id: Date.now() + Math.random(), // Unique IDs for products
//     }))

//     const newLotNumber =
//       lots.length > 0 ? Math.max(...lots.map(lot => lot.lotNumber)) + 1 : 1

//     const newLot = {
//       ...lotToDuplicate,
//       id: newLotId,
//       open: true,
//       products: newProducts,
//       lotNumber: newLotNumber,
//     }

//     newLots.push(newLot)
//   }

//   // Update state with new duplicated lots
//   setLots(prevLots => [...newLots, ...prevLots])
// }
