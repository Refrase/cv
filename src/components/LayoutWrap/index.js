// Packages
import React, { Component } from 'react'
import PropTypes from 'prop-types'
// Utils
import { dragElement } from 'utils/scripts/draggable'

export default class LayoutWrap extends Component {
  constructor(props) {
    super(props)
    this.div = null
  }

  componentDidMount() {
    if ( this.props.draggable ) dragElement(this.div)
  }

  render() {
    const { children, className, degrees, left, right, top, zIndex, draggable } = this.props
    return (
      <div
        className={ className }
        style={{
          position: 'absolute',
          top: `${ top ? top : 'auto' }px`,
          left: `${ left ? left : 'auto' }px`,
          right: `${ right ? right : 'auto' }px`,
          zIndex: `${ zIndex ? zIndex : 0 }`,
          transform: `rotateZ( ${ degrees ? degrees : 0 }deg )`,
          cursor: `${ draggable ? 'move' : 'default' }`,
          backfaceVisibility: 'hidden' /* Smoothing edges on transform-rotated elements in WebKit */
        }}
        ref={ (div) => this.div = div }>
          { children }
      </div>
    )
  }
}

LayoutWrap.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  degrees: PropTypes.number,
  left: PropTypes.number,
  right: PropTypes.number,
  top: PropTypes.number,
  zIndex: PropTypes.number,
  draggable: PropTypes.bool
}
