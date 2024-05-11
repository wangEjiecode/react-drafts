interface IProps {
  direction: 'up' | 'down'
  onClick?: () => void
  isActive?: boolean
}
const SortButton: React.FC<IProps> = ({ direction, onClick, isActive }) => {
  return (
    <div onClick={onClick} className='text-xs font-thin text-gray-400'>
      <button className={isActive ? 'text-black' : ''}>
        {direction === 'up' ? '▲' : '▼'}
      </button>
    </div>
  )
}

export default SortButton
