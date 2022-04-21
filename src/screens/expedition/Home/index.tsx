import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/rootReducer'
import { getArrivals } from '../../../redux/slices/expeditionsSlice'

const Home = () => {
  const arrivals = useSelector((state: RootState) => state.expeditionsSlice.data)
  
  useEffect(() => {
    getArrivals()
  },[])

  return (
    <div>Home</div>
  )
}

export default Home