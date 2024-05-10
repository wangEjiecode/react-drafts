import { useQuery } from '@tanstack/react-query'
import { memo, useEffect, useRef, useState } from 'react'
import type { FC } from 'react'
import { getCountryList } from '../country/countryService'
import TableContent from './components/table'
import Pagination from './components/pagination'
import Search from './components/search'
import type { IDataType } from './type'
import { NumberParam, useQueryParam } from 'use-query-params'

const CountryV2: FC = memo(() => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [searchValue, setSearchValue] = useState('')
  const {
    data: queryData,
    isError,
    isFetched,
  } = useQuery({ queryKey: ['countries'], queryFn: getCountryList })
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

  const perPage = 10
  const startIndex = ((currentPage as number) - 1) * perPage
  const endIndex = startIndex + perPage
  const filteredList = queryData?.data.filter((item: IDataType) => {
    return (
      item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.capital.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.currency.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.phone.toString().includes(searchValue.toString())
    )
  })

  const currentList = filteredList?.slice(startIndex, endIndex)
  const totalPages = filteredList && Math.ceil(filteredList.length / perPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    // update search value
    setSearchValue(e.target.value)
  }

  return (
    <div className='p-3 rounded-none shadow-md w-[700px] m-auto'>
      <Search onSearch={handleSearch} ref={inputRef} value={searchValue} />
      {currentList && <TableContent data={currentList} />}
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
