import React from 'react'
import Unstarted from './Unstarted'
import Pending from './Pending'
import Completed from './Completed'

function Task() {
  return (
    <div className="flex flex-row justify-around p-3">
        <Unstarted/>
        <Pending/>
        <Completed/>
    </div>
  )
}

export default Task