// Packages
import React, { Component } from 'react'
import PropTypes from 'prop-types'
// Utils
import { dragElement } from 'utils/scripts/draggable'

export default class DragWrap extends Component {
  constructor(props) {
    super(props)
    this.dragWrap = null
  }

  componentDidMount() { dragElement(this.dragWrap) }

  render() {
    return(
      <div style={{ position: 'absolute', cursor: 'move' }} ref={ (dragWrap) => this.dragWrap = dragWrap }>{ this.props.children }</div>
    )
  }
}

DragWrap.propTypes = { children: PropTypes.node }
