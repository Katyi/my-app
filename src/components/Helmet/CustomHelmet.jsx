import React from 'react'
import { Helmet } from 'react-helmet'

const DEFAULT_TITLE = 'Растения и люди в Российской Империи XVIII века'

function CustomHelmet({title=null}) {
  return (
    <Helmet>
        <title>{ title?title+' / '+DEFAULT_TITLE:DEFAULT_TITLE }</title>
    </Helmet>
  )
}

export default CustomHelmet