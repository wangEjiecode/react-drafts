import { memo, type FC } from 'react'
import { IDataType } from '../type'
import SortButton from './sortButton'
import type { SortItemName, SortType } from '../type'

interface IProps {
  data: IDataType[]
  onSort: (key: SortItemName, type: SortType) => void
}

const TableContent: FC<IProps> = memo(({ data, onSort }) => {
  return (
    <>
      <table className='w-full'>
        <thead>
          <tr className='text-left'>
            <th>National Flag</th>
            <th>
              <div className='flex justify-around items-center'>
                <span>Name</span>
                <div>
                  <SortButton
                    onClick={() => onSort('name', 'asc')}
                    direction='up'
                  />
                  <SortButton
                    direction='down'
                    onClick={() => onSort('name', 'desc')}
                  />
                </div>
              </div>
            </th>
            <th>
              <div className='flex justify-around items-center'>
                <span>Capital</span>
                <div>
                  <SortButton
                    direction='up'
                    onClick={() => onSort('capital', 'asc')}
                  />
                  <SortButton
                    direction='down'
                    onClick={() => onSort('capital', 'desc')}
                  />
                </div>
              </div>
            </th>
            <th>
              <div className='flex justify-around items-center'>
                <span>Currency</span>
                <div>
                  <SortButton
                    direction='up'
                    onClick={() => onSort('currency', 'asc')}
                  />
                  <SortButton
                    direction='down'
                    onClick={() => onSort('currency', 'desc')}
                  />
                </div>
              </div>
            </th>
            <th>
              <div className='flex justify-around items-center'>
                <span>Phone</span>
                <div>
                  <SortButton
                    direction='up'
                    onClick={() => onSort('phone', 'asc')}
                  />
                  <SortButton
                    direction='down'
                    onClick={() => onSort('phone', 'desc')}
                  />
                </div>
              </div>
            </th>
            <th>
              <div className='flex justify-around items-center'>
                <span>Population</span>
                <div>
                  <SortButton
                    direction='up'
                    onClick={() => onSort('population', 'asc')}
                  />
                  <SortButton
                    direction='down'
                    onClick={() => onSort('population', 'desc')}
                  />
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? 'bg-[#f9f9f9]' : 'bg-[#fff]'}>
              <td width={'120px'}>
                <img
                  src={item.media.flag}
                  alt=''
                  width='100px'
                  height='100px'
                />
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
    </>
  )
})

export default TableContent
