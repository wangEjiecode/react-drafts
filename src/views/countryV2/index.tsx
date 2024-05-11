import { useQuery } from '@tanstack/react-query'
import { memo, useEffect, useRef, useState } from 'react'
import type { FC } from 'react'
import { getCountryList } from '../country/countryService'
import TableContent from './components/table'
import Pagination from './components/pagination'
import Search from './components/search'
import type { IDataType } from './type'
import { NumberParam, useQueryParam } from 'use-query-params'
import type { SortItemName, SortType } from './type'
import { AxiosResponse } from 'axios'

const CountryV2: FC = memo(() => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [searchValue, setSearchValue] = useState('')
  const [allDataList, setAllDataList] = useState<IDataType[]>()

  const { data: queryData, isFetched } = useQuery<AxiosResponse<IDataType[]>>({
    queryKey: ['countries'],
    queryFn: getCountryList,
  })
  const [currentPage, setCurrentPage] = useQueryParam(
    'currentPage',
    NumberParam
  )
  useEffect(() => {
    // to redirect url like '/xxx' ( no params )
    if (currentPage === undefined || currentPage === null) {
      setCurrentPage(1)
    }
  }, [setCurrentPage, currentPage])
  useEffect(() => {
    if (queryData) {
      setAllDataList(queryData.data)
      // Calculate initial currentList
      const initialCurrentList = computeInitialCurrentList(
        queryData.data,
        currentPage,
        perPage,
        searchValue
      )
      setCurrentList(initialCurrentList)
    }
  }, [queryData, currentPage, searchValue])

  const perPage = 10
  const filteredList = allDataList?.filter((item: IDataType) => {
    return (
      item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.capital.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.currency.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.phone.toString().includes(searchValue.toString())
    )
  })
  const totalPages = filteredList && Math.ceil(filteredList.length / perPage)
  const [currentList, setCurrentList] = useState<IDataType[]>([])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    // avoid currentPage has no data
    setCurrentPage(1)
    // update search value
    setSearchValue(e.target.value)
  }
  // sort all list
  const hanldeSort = (key: SortItemName, type: SortType) => {
    const sortedData = queryData?.data.sort((a, b) => {
      if (typeof a[key] === 'string' && typeof b[key] === 'string') {
        return type === 'asc'
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key])
      } else if (typeof a[key] === 'number' && typeof b[key] === 'number') {
        return type === 'asc' ? a[key] - b[key] : b[key] - a[key]
      }
      return 0
    })
    setAllDataList(sortedData)
    // Update currentList after sorting
    const updatedCurrentList = computeInitialCurrentList(
      sortedData,
      currentPage,
      perPage,
      searchValue
    )
    setCurrentList(updatedCurrentList)
  }

  return (
    <div className='p-3 rounded-none shadow-md w-[900px] m-auto'>
      <Search onSearch={handleSearch} ref={inputRef} value={searchValue} />
      {currentList && <TableContent data={currentList} onSort={hanldeSort} />}
      {isFetched && totalPages && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage as number}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
})

export default CountryV2

const computeInitialCurrentList = (
  data: IDataType[],
  currentPage: number | undefined | null,
  perPage: number,
  searchValue: string
) => {
  const startIndex = currentPage ? ((currentPage as number) - 1) * perPage : 0
  const endIndex = startIndex + perPage
  const filteredList = data?.filter((item: IDataType) => {
    return (
      item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.capital.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.currency.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.phone.toString().includes(searchValue.toString())
    )
  })
  const currentList = filteredList?.slice(startIndex, endIndex)
  return currentList
}
