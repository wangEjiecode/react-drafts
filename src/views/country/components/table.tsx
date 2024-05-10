import React, { useState } from 'react'
import { Button, Table } from 'antd'
import type { TableColumnsType, TableProps } from 'antd'
import { useAppSelector } from '@/store'

interface DataType {
  id: number
  capital: string
  currency: string
  name: string
  phone: string
  population: number
  media: {
    flag: string
  }
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    width: '20%',
  },
  {
    title: 'Capital',
    dataIndex: 'capital',
    sorter: (a, b) => a.capital.localeCompare(b.capital),
    width: '20%',
  },
  {
    title: 'Currency',
    dataIndex: 'currency',
    width: '20%',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    width: '20%',
  },
  {
    title: 'Population',
    dataIndex: 'population',
    sorter: (a, b) => a.population - b.population,
    width: '20%',
  },
]

const TableContent: React.FC = () => {
  const data: DataType[] = useAppSelector((state) => state.country.country)
  return (
    <>
      <Table rowKey={(item) => item.id} columns={columns} dataSource={data} />
    </>
  )
}

export default TableContent
