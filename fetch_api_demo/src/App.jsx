import { useState } from 'react'
import { FetchData } from './components/FetchData'
import { FeatchDataInputBtn } from './components/FeatchDataInputBtn'
import { FetchDataPagination } from './components/FetchDataPagination/FetchDataPagination'


function App() {


  return (
    <>
      {/* <FetchData></FetchData> */}
      {/* <FeatchDataInputBtn></FeatchDataInputBtn> */}
      <FetchDataPagination></FetchDataPagination>
    </>
  )
}

export default App
