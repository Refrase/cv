import DOMPurify from 'dompurify'
import { camelCase } from './string'

export function getURLParams() {
  if ( !location.search.length ) return

  const paramKeyValuePairs = location.search.substr( 1 ).split( '&' )
  let paramsObj = {}

  for ( let i = 0; i < paramKeyValuePairs.length; i++ ) {
    const paramKeyAndValue = decodeURIComponent( DOMPurify.sanitize( paramKeyValuePairs[i] ) ).split( '=' )
    const paramName = camelCase( paramKeyAndValue[0] )
    const paramValue = paramKeyAndValue[1]
    paramsObj[paramName] = paramValue
  }

  return paramsObj
}
