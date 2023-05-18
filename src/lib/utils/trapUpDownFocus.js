/** Dispatch event on click outside of node */
export default function trapUpDownFocus(node, selector = ``) {
  const handleKeyup = (event) => {
    // we're only interested in handling up & down arrow keys
    if (event.key !== `ArrowUp` && event.key !== `ArrowDown`) return

    // prevent the default behavior (scrolling the page)
    event.preventDefault()

    const focusableItems = [
      ...node.querySelectorAll(
        `a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[contenteditable], details, [tabindex]:not([tabindex="-1"]) ${selector}`
      )
    ]

    // if there are no focusable elements, we can't do anything
    if (!focusableItems.length) return

    // find the currently focused element
    const focusedItem = document.activeElement

    // if there's no currently focused element, focus the first one
    if (!focusedItem) {
      focusableItems[0].focus()
      return
    }

    // find the index of the currently focused element
    const focusedIndex = focusableItems.indexOf(focusedItem)

    if (event.key === `ArrowUp`) {
      // if the focused element is the first one, focus the last one
      if (focusedIndex <= 0) {
        focusableItems[focusableItems.length - 1].focus()
        return
      }

      // otherwise, focus the previous one
      focusableItems[focusedIndex - 1].focus()

      return
    } else if (event.key === `ArrowDown`) {
      // if the focused element is the last one, focus the first one
      if (focusedIndex === focusableItems.length - 1) {
        focusableItems[0].focus()
        return
      }

      // otherwise, focus the next one
      focusableItems[focusedIndex + 1].focus()
      return
    }
  }

  document.addEventListener(`keyup`, handleKeyup, true)

  return {
    destroy() {
      document.removeEventListener(`keyup`, handleKeyup, true)
    }
  }
}
