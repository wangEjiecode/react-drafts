import { useAppDispatch } from '@/store'
import { useEffect, type FC } from 'react'
import { fetchCountry } from './countryStore'
import TableContent from './components/table'

const Introduction: FC = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchCountry())
  }, [])
  return (
    <div className='w-4/6'>
      <TableContent />
    </div>
  )
}

export default Introduction
