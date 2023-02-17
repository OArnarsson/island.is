const getDataForFilters = (arr, val) => {
  const arrOnlyWithVal = arr.map((value) => value[val])
  return arrOnlyWithVal
    .filter((item, index) => arrOnlyWithVal.indexOf(item) === index)
    .sort((a, b) => a.localeCompare(b))
    .map((item) => {
      return { label: item, checked: false }
    })
}

export default getDataForFilters
