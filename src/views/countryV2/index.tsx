import { useQuery } from '@tanstack/react-query'
import { memo, useEffect, useState } from 'react'
import type { FC } from 'react'
import { getCountryList } from '../country/countryService'
import TableContent from './components/table'
import Pagination from './components/pagination'
import Search from './components/search'
import type { IDataType } from './type'
import { NumberParam, useQueryParam } from 'use-query-params'

const CountryV2: FC = memo(() => {
  const {
    data: queryData,
    isError,
    isFetched,
  } = useQuery({ queryKey: ['countries'], queryFn: getCountryList })
  const [allList, setAllList] = useState<IDataType[]>()
  const [currentPage, setCurrentPage] = useQueryParam(
    'currentPage',
    NumberParam
  )
  useEffect(() => {
    if (isFetched && !isError && queryData) {
      setAllList(queryData.data)
    }
    // to redirect url like '/xxx' ( no params )
    if (currentPage === undefined || currentPage === null) {
      setCurrentPage(1)
    }
  }, [queryData, isFetched, isError, setCurrentPage, currentPage])

  const perPage = 10
  const startIndex = ((currentPage as number) - 1) * perPage
  const endIndex = startIndex + perPage
  const currentList = allList?.slice(startIndex, endIndex)
  const totalPages = allList && Math.ceil(allList.length / perPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    // filter list from target value
    const searchValue = e.target.value
    const filterList = queryData?.data.filter((item: IDataType) => {
      return (
        item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.capital.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.currency.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.phone.toString().includes(searchValue.toString())
      )
    })
    setAllList(filterList)
  }

  return (
    <div className='p-3 rounded-none shadow-md w-[700px] m-auto'>
      <Search onSearch={handleSearch} />
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
