import { memo, type FC } from 'react'
import { IDataType } from '../type'

interface IProps {
  data: IDataType[]
}

const TableContent: FC<IProps> = memo(({ data }) => {
  return (
    <>
      <table className='w-full'>
        <thead>
          <tr className='text-left'>
            <th>National Flag</th>
            <th>Name</th>
            <th>Capital</th>
            <th>Currency</th>
            <th>Phone</th>
            <th>Population</th>
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
