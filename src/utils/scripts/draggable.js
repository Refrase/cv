export function dragElement( handle ) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0

  handle.onmousedown = dragMouseDown

  function dragMouseDown(e) {
    e = e || window.event
    // Get the mouse cursor position at startup
    pos3 = e.clientX
    pos4 = e.clientY
    document.onmouseup = closeDragElement
    document.onmousemove = elementDrag // Call a function whenever the cursor moves
  }

  function elementDrag(e) {
    e.preventDefault()
    e = e || window.event
    // Calculate the new cursor position
    pos1 = pos3 - e.clientX
    pos2 = pos4 - e.clientY
    pos3 = e.clientX
    pos4 = e.clientY
    // Set the element's new position
    handle.style.top = (handle.offsetTop - pos2) + "px"
    handle.style.left = (handle.offsetLeft - pos1) + "px"
  }

  function closeDragElement() { // Stop moving when mouse button is released
    document.onmouseup = null
    document.onmousemove = null
  }
}
