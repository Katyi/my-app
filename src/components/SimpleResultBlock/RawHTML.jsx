import DOMPurify from 'dompurify';
import parse from "html-react-parser";
import React from 'react'

function RawHTML({dirtyHTML=""}) {
  if(dirtyHTML.trim().replaceAll(" ","").replaceAll("-","").length===0)return <></>
  dirtyHTML=`${dirtyHTML}`.replaceAll("\n",'<br/>').replaceAll("\t",'   ')
  if (dirtyHTML.length===0) return<></>
  const cleanHTML = DOMPurify.sanitize(dirtyHTML, {
    USE_PROFILES: { html: true },
  });
  return (
    <>{parse(cleanHTML)}</>
  )
}

export default RawHTML