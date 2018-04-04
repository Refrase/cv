// Packages
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class PostIt extends Component {
  render() {
    const { text, onMouseEnter, onMouseLeave } = this.props
    return(
      <PostItWithStyle dangerouslySetInnerHTML={ { __html: text } } onMouseEnter={ onMouseEnter } onMouseLeave={ onMouseLeave } />
    )
  }
}

PostIt.propTypes = {
  text: PropTypes.string,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
}

// ----- STYLING ----- //
// Packages
import styled from 'styled-components'
// Utils
import { colors, fonts, shadows } from 'utils/styles/vars'
import { scaler } from 'utils/styles/helpers'

const PostItWithStyle = styled.div`
  position: relative;
  background-color: #ffffa5;
  width: 200px;
  height: 200px;
  padding: ${scaler(1.5)} ${scaler(2)};
  box-shadow: ${shadows.paper};
  font-family: ${fonts.families.hand};
  font-size: ${fonts.sizes.xxLarge};
  line-height: 1.2;

  &:before, &:after {
    content: '';
  	position: absolute;
  	width: 100px;
  	height: 100px;
  	bottom: 14px;
    left: 16px;
  	background: transparent;
  	transform: skew(-20deg) rotate(-10deg);
  	box-shadow: 4px 4px 30px 8px rgba(0, 0, 0, 0.8);
  	z-index: -1;
  }

  &:after {
    left: auto;
    right: 16px;
    transform: skew(20deg) rotate(10deg);
    box-shadow: -4px 4px 45px 12px rgba(0, 0, 0, 0.8);
  }
`
