interface IProps {
  direction: 'up' | 'down'
  onClick?: () => void
  active?: boolean
}
const SortButton: React.FC<IProps> = ({ direction, onClick, active }) => {
  return (
    <div onClick={onClick}>
      {direction === 'up' ? <button>⬆️</button> : <button>⬇️</button>}
    </div>
  )
}

export default SortButton
