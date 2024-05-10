import { memo, type FC } from 'react'

interface IProps {
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
}

const Pagination: FC<IProps> = memo(
  ({ totalPages, currentPage, onPageChange }) => {
    return (
      <div className='mt-3'>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={
              'w-10 h-10' +
              ' ' +
              (currentPage === page ? 'bg-[#262626] text-white' : '')
            }>
            {page}
          </button>
        ))}
      </div>
    )
  }
)

export default Pagination
