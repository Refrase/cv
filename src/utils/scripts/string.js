export function camelCase( str ) {
  str = str.toLowerCase().split( ' ' )
  for ( let i = 0; i < str.length; i++ ) {
    if ( i > 0 ) str[i] = str[i].charAt(0).toUpperCase() + str[i].substr(1)
  }
  str = str.join( '' )
  return str
}

export function titleCase( str ) {
  str = str.toLowerCase().split( ' ' )
  for ( let i = 0; i < str.length; i++ ) str[i] = str[i].charAt(0).toUpperCase() + str[i].substr(1)
  str = str.join( ' ' )
  return str
}
