import { FC, memo } from 'react'

interface IProps {
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Search: FC<IProps> = memo(({ onSearch }) => {
  return (
    <div className='text-right mb-3'>
      <label htmlFor='search'>Search: </label>
      <input
        className='border-solid border-2 border-[#828181] p-1 rounded-md'
        type='text'
        id='search'
        onChange={(e) => onSearch(e)}
      />
    </div>
  )
})

export default Search
