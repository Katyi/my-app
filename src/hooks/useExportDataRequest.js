import { useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { ADVANCED_QUERY_FOR_EXPORT } from '../apollo/advancedExport';
import { generatePayloadToRequest } from '../utils/QueryRequestUtils';

function useExportDataRequest(advancedForm, yearPeriod) {
  const values = generatePayloadToRequest(advancedForm, yearPeriod)
  const [dataset, setDataset] = useState([])
  const [page, setPage] = useState(0)
  const [returnStatus, setReturnStatus] = useState(false)

  const [getRequest, { loading, error, data, refetch }] = useLazyQuery(
    ADVANCED_QUERY_FOR_EXPORT(values, page, null)
  );
  
  if (!!values && page===0) getRequest(values, page, null);

    useEffect(() => {
      if (page>0) getRequest(values, page, data?.usagesConnection?.pageInfo?.endCursor)
    }, [page])
    

  useEffect(() => {
    if (data) {
      if (data?.usagesConnection?.pageInfo?.hasNextPage) {
        setDataset(prev=>[...prev, ...data.usagesConnection.edges])
        setPage(prev=>prev+1)
      } else {
        setDataset(prev=>[...prev, ...data.usagesConnection.edges])
      }
    }
  }, [data]);
  useEffect(() => {
    if (data?.usagesConnection?.pageInfo?.totalCount)  {
      if (dataset.length === data?.usagesConnection?.pageInfo?.totalCount) {
        setReturnStatus(true)
      }
    }
  }, [dataset])
if (returnStatus) return {dataset, totalCount:data?.usagesConnection?.pageInfo?.totalCount}
}

export default useExportDataRequest