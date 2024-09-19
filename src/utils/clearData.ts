export const clearMetaInfo = (data: any) => {
  const clearedMetaInfo = Object.entries(data).reduce(
    (acc: any, [key, value]) => {
      acc[key] = typeof value === 'string' ? '' : null
      return acc
    },
    {},
  )
  return clearedMetaInfo
}
