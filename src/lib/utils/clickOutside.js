/** Dispatch event on click outside of node */
export default function clickOutside(node) {
  const handleClick = (event) => {
    if (node && !node.contains(event.target) && !event.defaultPrevented) {
      node.dispatchEvent(new CustomEvent(`clickOutside`, node))
    }
  }

  const handleFocusIn = () => {
    if (!node.contains(document.activeElement)) {
      node.dispatchEvent(new CustomEvent(`clickOutside`, node))
    }
  }

  document.addEventListener(`click`, handleClick, true)
  document.addEventListener(`focusin`, handleFocusIn)

  return {
    destroy() {
      document.removeEventListener(`click`, handleClick, true)
      document.removeEventListener(`focusin`, handleFocusIn)
    }
  }
}
