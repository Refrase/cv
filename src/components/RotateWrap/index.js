// Packages
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class RotateWrap extends Component {
  render() {
    console.log(this.props.degrees)
    return( <div className="rotateWrap" style={{ transform: `rotateZ( ${this.props.degrees}deg )` }}>{ this.props.children }</div> )
  }
}

RotateWrap.propTypes = {
  children: PropTypes.node,
  degrees: PropTypes.number
}
