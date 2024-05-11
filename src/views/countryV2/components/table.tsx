import { memo, useState, type FC } from 'react'
import { IDataType } from '../type'
import SortButton from './sortButton'

interface IProps {
  data: IDataType[]
}
type SortItemType = 'name' | 'capital' | 'currency' | 'phone' | 'population'
type SortType = 'asc' | 'desc'

const TableContent: FC<IProps> = memo(({ data: initialData }) => {
  const [data, setData] = useState(initialData)
  const sortData = [...data]
  const handleClick = (key: SortItemType, type: SortType) => {
    sortData.sort((a, b) => {
      if (typeof a[key] === 'string' && typeof b[key] === 'string') {
        return type === 'asc'
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key])
      } else if (typeof a[key] === 'number' && typeof b[key] === 'number') {
        return type === 'asc' ? a[key] - b[key] : b[key] - a[key]
      }
      return 0
    })
    setData(sortData)
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
                    onClick={() => handleClick('name', 'asc')}
                    direction='up'
                  />
                  <SortButton
                    direction='down'
                    onClick={() => handleClick('name', 'desc')}
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
                    onClick={() => handleClick('capital', 'asc')}
                  />
                  <SortButton
                    direction='down'
                    onClick={() => handleClick('capital', 'desc')}
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
                    onClick={() => handleClick('currency', 'asc')}
                  />
                  <SortButton
                    direction='down'
                    onClick={() => handleClick('currency', 'desc')}
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
                    onClick={() => handleClick('phone', 'asc')}
                  />
                  <SortButton
                    direction='down'
                    onClick={() => handleClick('phone', 'desc')}
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
                    onClick={() => handleClick('population', 'asc')}
                  />
                  <SortButton
                    direction='down'
                    onClick={() => handleClick('population', 'desc')}
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
