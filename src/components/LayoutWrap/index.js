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
    const { children, degrees, top, topResponsive, left, leftResponsive, right, rightResponsive, zIndex, draggable } = this.props

    return (
      <LayoutWrapWithStyle
        top={ top }
        topResponsive={ topResponsive }
        left={ left }
        leftResponsive={ leftResponsive }
        right={ right }
        rightResponsive={ rightResponsive }
        zIndex={ zIndex }
        degrees={ degrees }
        draggable={ draggable }
        innerRef={ div => this.div = div }>
          { children }
      </LayoutWrapWithStyle>
    )
  }
}

LayoutWrap.propTypes = {
  children: PropTypes.node,
  degrees: PropTypes.number,
  top: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  topResponsive: PropTypes.object,
  left: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  leftResponsive: PropTypes.object,
  right: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  rightResponsive: PropTypes.object,
  zIndex: PropTypes.number,
  draggable: PropTypes.bool
}

// ----- STYLING ----- //
// Packages
import styled from 'styled-components'
import media from 'styled-media-query'
import { generateMedia } from 'styled-media-query'

const customMediaQueries = generateMedia({
  desktop: '1260px',
  tablet: '768px',
  mobile: '400px'
})

const LayoutWrapWithStyle = styled.div`
  position: absolute;
  backface-visibility: hidden; /* Smoothing edges on transform-rotated elements in WebKit */
  top: ${ props => props.top ? props.top : 'auto' };
  left: ${ props => props.left ? props.left : 'auto' };
  right: ${ props => props.right ? props.right : 'auto' };
  z-index: ${ props => props.zIndex ? props.zIndex : 0 };
  transform: rotateZ( ${ props => props.degrees ? props.degrees : 0 }deg );
  cursor: ${ props => props.draggable ? 'move' : 'default' };

  ${ customMediaQueries.lessThan( 'desktop' )`
    top: ${ props => props.topResponsive ? props.topResponsive[Object.keys(props.topResponsive)[0]] : null };
    left: ${ props => props.leftResponsive ? props.leftResponsive[Object.keys(props.leftResponsive)[0]] : null };
    right: ${ props => props.rightResponsive ? props.rightResponsive[Object.keys(props.rightResponsive)[0]] : null };
  `}

  ${ customMediaQueries.lessThan( 'tablet' )`
    top: ${ props => props.topResponsive ? props.topResponsive[Object.keys(props.topResponsive)[1]] : null };
    left: ${ props => props.leftResponsive ? props.leftResponsive[Object.keys(props.leftResponsive)[1]] : null };
    right: ${ props => props.rightResponsive ? props.rightResponsive[Object.keys(props.rightResponsive)[1]] : null };
  `}

  ${ customMediaQueries.lessThan( 'mobile' )`
    top: ${ props => props.topResponsive ? props.topResponsive[Object.keys(props.topResponsive)[2]] : null };
    left: ${ props => props.leftResponsive ? props.leftResponsive[Object.keys(props.leftResponsive)[2]] : null };
    right: ${ props => props.rightResponsive ? props.rightResponsive[Object.keys(props.rightResponsive)[2]] : null };
  `}
`
