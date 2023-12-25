import React from 'react'
import GetBalance from '../Components/GetBalance'
import GetNodeInfo from '../Components/GetNodeInfo'
import GetChannelInfo from '../Components/GetChannelInfo'
import './../style/Dashboard.css'

export default function Dashboard() {
  return (
    <div className="dashboard">
            <GetNodeInfo />
            <GetBalance />
            <GetChannelInfo />
        </div>
  )
}
