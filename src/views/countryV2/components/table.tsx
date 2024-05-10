import { memo, type FC } from 'react'
import { IDataType } from '../type'
import SortButton from './sortButton'

interface IProps {
  data: IDataType[]
}
type SortItemType = 'name' | 'capital' | 'currency' | 'phone' | 'population'

const TableContent: FC<IProps> = memo(({ data }) => {
  const handleAscClick = (key: SortItemType) => {
    data.sort((a, b) => {
      if (typeof a[key] === 'string' && typeof b[key] === 'string') {
        return a[key].localeCompare(b[key])
      } else if (typeof a[key] === 'number' && typeof b[key] === 'number') {
        return a[key] - b[key]
      }
      return 0
    })
  }

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
                    onClick={() => handleAscClick('name')}
                    direction='up'
                  />
                  <SortButton direction='down' />
                </div>
              </div>
            </th>
            <th>
              <div className='flex justify-around items-center'>
                <span>Capital</span>
                <div>
                  <SortButton direction='up' />
                  <SortButton direction='down' />
                </div>
              </div>
            </th>
            <th>
              <div className='flex justify-around items-center'>
                <span>Currency</span>
                <div>
                  <SortButton direction='up' />
                  <SortButton direction='down' />
                </div>
              </div>
            </th>
            <th>
              <div className='flex justify-around items-center'>
                <span>Phone</span>
                <div>
                  <SortButton direction='up' />
                  <SortButton direction='down' />
                </div>
              </div>
            </th>
            <th>
              <div className='flex justify-around items-center'>
                <span>Population</span>
                <div>
                  <SortButton direction='up' />
                  <SortButton direction='down' />
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
