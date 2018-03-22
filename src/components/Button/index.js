// Packages
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Button extends Component {
  render() {
    const { onClick, label, withIcon } = this.props
    return( <ButtonWithStyle className={ `button ${ withIcon ? 'withIcon' : '' }` } onClick={ onClick } dangerouslySetInnerHTML={ { __html: label } } /> )
  }
}

Button.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string,
  withIcon: PropTypes.bool
}

// ----- STYLING ----- //
// Packages
import styled from 'styled-components'
// Utils
import { colors, fonts, transitions } from 'utils/styles/vars'
import { scaler } from 'utils/styles/helpers'

const ButtonWithStyle = styled.button`
  position: relative;
  display: block;
  cursor: pointer;
  z-index: 1;
  background-color: ${colors.signal.default};
  border: 1px solid ${colors.signal.darker[1]};
  color: white;
  padding: ${scaler(1)} ${scaler(2)};
  border-radius: ${scaler(0.5)};
  box-shadow: 0px 2px 0px 0px ${colors.signal.darker[8]};
  transition: ${transitions.buttonHover.up};
  font-weight: 600;
  letter-spacing: 0.5px;
  font-size: ${fonts.sizes.large};
  font-family: ${fonts.families.sans};

  &.withIcon { padding-right: calc( ${scaler(2)} + 41px ); /* 41px is for taking icon into account */ }

  &:hover {
    background-color: ${colors.signal.lighter[0]};
    border-color: ${colors.signal.lighter[0]};
    transform: translateY(-1px);
    box-shadow: 0px 3px 0px 0px ${colors.signal.darker[8]};
  }

  &:active {
    transition: ${transitions.buttonHover.down};
    transform: translateY(2px);
    box-shadow: none;
  }

  &:focus { outline: 0; }

  .icon {
    height: calc( 100% + 2px );
    background-color: ${colors.signal.lighter[2]};
    top: -1px;
    line-height: 2.4;
    right: ${scaler(0.5)};
    transform: translateX(5px); {/* Adjusting to button */}
    position: absolute;
    border: inherit;
    border-radius: inherit;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    padding: 0 ${scaler(1)} 0 ${scaler(1.5)};
    box-shadow: inherit;
  }
`
