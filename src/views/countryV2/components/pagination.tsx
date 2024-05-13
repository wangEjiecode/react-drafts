import { memo, type FC } from 'react'
import PaginationButton from './paginationButtun'

interface IProps {
  totalPages: number
  currentPage: number
  perPage: number
  totalList: number
  onPageChange: (page: number) => void
}

const Pagination: FC<IProps> = memo(
  ({ totalPages, currentPage, onPageChange, perPage, totalList }) => {
    // page's subset
    const generatePageSubset = () => {
      const pageSubset: any[] = []
      const maxPageNumber = 10
      if (totalPages <= maxPageNumber) {
        for (let i = 1; i <= totalPages; i++) pageSubset.push(i)
      } else {
        let startPage = Math.max(1, currentPage - Math.floor(maxPageNumber / 2))
        let endPage = startPage + maxPageNumber - 1
        if (endPage > totalPages) {
          endPage = totalPages
          startPage = endPage - maxPageNumber + 1
        }
        for (let i = startPage; i <= endPage; i++) pageSubset.push(i)
        if (startPage > 1) {
          pageSubset.unshift(1)
          if (startPage > 2) {
            pageSubset.splice(1, 0, '...')
          }
        }
        if (endPage < totalPages) {
          pageSubset.push(totalPages)
          if (endPage < totalPages - 1) {
            pageSubset.splice(-1, 0, '...')
          }
        }
      }

      return pageSubset
    }
    return (
      <div className='mt-5 mx-auto flex text-center justify-between'>
        <div>
          1 - {perPage} of {totalList} results
        </div>
        <div>
          <PaginationButton
            targetPage={1}
            onClick={() => onPageChange(1)}
            aspect='<<'
            currentPage={currentPage}
          />
          <PaginationButton
            targetPage={1}
            aspect='<'
            onClick={() => onPageChange(currentPage - 1)}
            currentPage={currentPage}
          />
          {generatePageSubset().map((page, index) =>
            typeof page === 'number' ? (
              <button
                key={index}
                onClick={() => onPageChange(page)}
                className={
                  'hover:bg-slate-300 w-10 h-10' +
                  ' ' +
                  (currentPage === page ? 'bg-[#262626] text-white' : '')
                }>
                {page}
              </button>
            ) : (
              <span key={index} className='w-10 h-10 leading-10'>
                {page}
              </span>
            )
          )}
          <PaginationButton
            targetPage={totalPages}
            aspect='>'
            onClick={() => onPageChange(currentPage + 1)}
            currentPage={currentPage}
          />
          <PaginationButton
            targetPage={totalPages}
            aspect='>>'
            onClick={() => onPageChange(totalPages)}
            currentPage={currentPage}
          />
        </div>
      </div>
    )
  }
)

export default Pagination
