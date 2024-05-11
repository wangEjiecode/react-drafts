import { useQuery } from '@tanstack/react-query'
import { memo, useEffect, useMemo, useRef, useState, useCallback } from 'react'
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
  const [allDataList, setAllDataList] = useState<IDataType[]>([])

  const { data: queryData, isFetched } = useQuery<AxiosResponse<IDataType[]>>({
    queryKey: ['countries'],
    queryFn: getCountryList,
  })

  const [currentPage, setCurrentPage] = useQueryParam(
    'currentPage',
    NumberParam
  )

  useEffect(() => {
    // to redirect when url do not have param
    if (!currentPage) setCurrentPage(1)
  }, [setCurrentPage, currentPage])

  useEffect(() => {
    if (queryData) {
      const data = queryData.data || []
      setAllDataList(data)
    }
  }, [queryData])

  const perPage = 10

  const filteredList = useMemo(() => {
    return allDataList.filter(
      (item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.capital.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.currency.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.phone.toString().includes(searchValue)
    )
  }, [allDataList, searchValue])

  const totalPages = useMemo(() => {
    return Math.ceil(filteredList.length / perPage)
  }, [filteredList.length])

  const currentList = useMemo(() => {
    const startIndex = (currentPage ? currentPage - 1 : 0) * perPage
    return filteredList.slice(startIndex, startIndex + perPage)
  }, [filteredList, currentPage])

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page)
    },
    [setCurrentPage]
  )

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    setCurrentPage(1)
  }

  const handleSort = useCallback(
    (key: SortItemName, type: SortType) => {
      const sortedData = [...allDataList].sort((a, b) => {
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
    },
    [allDataList]
  )

  return (
    <div className='p-3 rounded-none shadow-md w-[900px] m-auto'>
      <Search onSearch={handleSearch} ref={inputRef} value={searchValue} />
      <TableContent data={currentList} onSort={handleSort} />
      {isFetched && totalPages > 0 && (
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
