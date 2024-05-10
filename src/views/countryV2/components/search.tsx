import { FC, forwardRef, memo, RefObject } from 'react'

interface IProps {
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
  ref?: RefObject<HTMLInputElement>
  value: string
}

const Search: FC<IProps> = memo(
  forwardRef(({ onSearch, value }, ref) => {
    return (
      <div className='text-right mb-3'>
        <label htmlFor='search'>Search: </label>
        <input
          className='border-solid border-2 border-[#828181] p-1 rounded-md'
          type='text'
          id='search'
          ref={ref}
          value={value}
          onChange={(e) => onSearch(e)}
        />
      </div>
    )
  })
)

export default Search
