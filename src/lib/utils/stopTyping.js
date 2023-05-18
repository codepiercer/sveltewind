function debounce(inputFunction, timeToWaitBeforeFiringInMs) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      inputFunction.apply(this, args)
    }, timeToWaitBeforeFiringInMs)
  }
}

export default function stopTyping(node, timeout = 500) {
  const handleKeyup = debounce((event) => {
    if (node.contains(event.target)) {
      node.dispatchEvent(new CustomEvent(`stopTyping`))
    }
  }, timeout)

  document.addEventListener(`keyup`, handleKeyup, true)
  document.addEventListener(`paste`, handleKeyup, true)

  return {
    destroy() {
      document.removeEventListener(`keyup`, handleKeyup, true)
      document.removeEventListener(`paste`, handleKeyup, true)
    }
  }
}
