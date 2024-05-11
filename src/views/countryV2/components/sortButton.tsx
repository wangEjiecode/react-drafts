interface IProps {
  direction: 'up' | 'down'
  onClick?: () => void
  active?: boolean
}
const SortButton: React.FC<IProps> = ({ direction, onClick, active }) => {
  return (
    <div onClick={onClick} className='text-xs font-thin text-gray-400'>
      {direction === 'up' ? <button>A</button> : <button>V</button>}
    </div>
  )
}

export default SortButton
