import { memo, type FC, useState } from 'react'
import { IDataType } from '../type'
import SortButton from './sortButton'
import type { SortItemName, SortType } from '../type'

interface IContentProps {
  data: IDataType[]
  onSort: (key: SortItemName, type: SortType) => void
}
interface IHeaderProps {
  label: string
  sortKey: SortItemName
  activeSort: { key: SortItemName; type: SortType } | null
  onSort: (key: SortItemName, type: SortType) => void
}
const TableHeader: FC<IHeaderProps> = memo(
  ({ label, sortKey, activeSort, onSort }) => {
    return (
      <th>
        <div className='flex justify-around items-center'>
          <span>{label}</span>
          <div>
            <SortButton
              onClick={() => onSort(sortKey, 'asc')}
              direction='up'
              isActive={
                activeSort?.key === sortKey && activeSort.type === 'asc'
              }
            />
            <SortButton
              direction='down'
              onClick={() => onSort(sortKey, 'desc')}
              isActive={
                activeSort?.key === sortKey && activeSort.type === 'desc'
              }
            />
          </div>
        </div>
      </th>
    )
  }
)
const TableContent: FC<IContentProps> = memo(({ data, onSort }) => {
  const [activeSort, setActiveSort] = useState<{
    key: SortItemName
    type: SortType
  } | null>(null)

  const handleSort = (key: SortItemName, type: SortType) => {
    setActiveSort({ key, type })
    onSort(key, type)
  }

  const headers: { label: string; key: SortItemName }[] = [
    { label: 'Name', key: 'name' },
    { label: 'Capital', key: 'capital' },
    { label: 'Currency', key: 'currency' },
    { label: 'Phone', key: 'phone' },
    { label: 'Population', key: 'population' },
  ]
  return (
    <table className='w-full'>
      <thead>
        <tr className='text-left'>
          <th>National Flag</th>
          {headers.map((header) => (
            <TableHeader
              key={header.key}
              label={header.label}
              sortKey={header.key}
              activeSort={activeSort}
              onSort={handleSort}
            />
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map((item, index) => (
          <tr
            key={index}
            className={index % 2 === 0 ? 'bg-[#f9f9f9]' : 'bg-[#fff]'}>
            <td width={'120px'}>
              <img src={item.media.flag} alt='' width='100px' height='100px' />
            </td>
            <td>{item.name}</td>
            <td>{item.capital}</td>
            <td>{item.currency}</td>
            <td width={'100px'}>{item.phone}</td>
            <td>{item.population}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
})

export default TableContent
