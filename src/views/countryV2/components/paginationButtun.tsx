import { memo, type FC } from 'react'

interface IProps {
  currentPage: number
  targetPage: number
  onClick: () => void
  aspect: string
}

const PaginationButton: FC<IProps> = memo(
  ({ currentPage, targetPage, onClick, aspect }) => {
    return (
      <button
        disabled={currentPage === targetPage}
        className={
          'w-10 h-10 ' +
          (currentPage !== targetPage ? 'hover:bg-slate-300' : 'text-gray-300')
        }
        onClick={onClick}>
        {aspect}
      </button>
    )
  }
)

export default PaginationButton
