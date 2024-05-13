import { FC, memo } from 'react'

interface IProps {
  values: Set<number>
  onOptionChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const Entries: FC<IProps> = memo(({ values, onOptionChange }) => {
  return (
    <div className='h-12 leading-[48px]'>
      <select id='entries' onChange={onOptionChange}>
        {[...values].map((optionValue) => (
          <option key={optionValue} value={optionValue}>
            {optionValue}
          </option>
        ))}
      </select>
      <label htmlFor='entries'> entries per page</label>
    </div>
  )
})

export default Entries
