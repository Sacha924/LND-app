import React from 'react'
import GetBalance from '../Components/GetBalance'
import GetInfo from '../Components/GetInfo'

export default function Dashboard() {
  return (
    <div>
      <GetBalance />
      <GetInfo/>
    </div>
  )
}
