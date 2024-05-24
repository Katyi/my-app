import { useQuery } from '@apollo/client'
import { CircularProgress } from '@mui/material'
import React from 'react'
import { SIMLE_QUERY_REQUEST } from '../../apollo/simpleSearch'

 function SendRequest(payload) {
    // debugger
 const {loading, error, data} = useQuery(SIMLE_QUERY_REQUEST, {variables:{...payload}})
if (loading) {
  return <CircularProgress />
}
if (error) {
  return error
}
if (data) {
  return data
}

}

export default SendRequest