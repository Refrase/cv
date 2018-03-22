// Packages
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class CvItem extends Component {
  render() {
    const { primaryInfo, secondaryInfo, tertiaryInfo, highlight } = this.props
    return(
      <Wrap className={ highlight ? 'highlight' : null }>
        <div className={ `primaryInfo ${this.props.highlight ? 'highlight' : null}`} dangerouslySetInnerHTML={ { __html: primaryInfo } } />
        <div className="secondaryInfo" dangerouslySetInnerHTML={ { __html: secondaryInfo } } />
        { tertiaryInfo ? ( <div className="tertiaryInfo" dangerouslySetInnerHTML={ { __html: tertiaryInfo } } /> ) : null }
      </Wrap>
    )
  }
}

CvItem.propTypes = {
  primaryInfo: PropTypes.string,
  secondaryInfo: PropTypes.string,
  tertiaryInfo: PropTypes.string,
  highlight: PropTypes.bool
}

// ----- STYLING ----- //
// Packages
import styled from 'styled-components'
// Utils
import { colors, fonts } from 'utils/styles/vars'
import { scaler } from 'utils/styles/helpers'
import { fadeIn, slideDown } from 'utils/styles/animations'

const Wrap = styled.li`
  position: relative;
  padding: ${scaler(1)} ${scaler(2)};

  &.highlight {
    padding: ${scaler(2)};
    padding-top: calc( ${scaler(2)} - 3px );
    margin-bottom: ${scaler(1)};
  }

  .primaryInfo {
    font-weight: 800;
    font-family: ${fonts.families.sans};
    font-size: ${fonts.sizes.large};
    letter-spacing: 0.5px;
  }

  .secondaryInfo {
    margin-top: ${scaler(0.5)}
    font-size: ${fonts.sizes.small};
    font-family: ${fonts.families.serif};
  }

  .tertiaryInfo {
    margin-top: ${scaler(1)}
    font-size: ${fonts.sizes.small};
    color: ${colors.base.lighter[6]};
  }
`
