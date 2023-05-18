/** Dispatch event on click outside of node */
export default function copyToClipboard(node, text) {
  const handleClick = async () => {
    await navigator.clipboard.writeText(text)
    node.dispatchEvent(new CustomEvent(`copy`))
  }

  node.addEventListener(`click`, handleClick, true)

  return {
    destroy() {
      node.removeEventListener(`click`, handleClick, true)
    }
  }
}
