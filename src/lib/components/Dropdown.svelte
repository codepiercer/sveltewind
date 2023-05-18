<script>
  export let placement = `bottom-left` // top-left, top-center, top-right, bottom-left, bottom-center, bottom-right

  import { cubicOut } from "svelte/easing"
  import { twMerge } from "tailwind-merge"

  import { clickOutside, trapUpDownFocus } from "../utils"

  let isOpen = false

  const onOpen = () => {
    isOpen = true
  }

  const onClose = () => {
    isOpen = false
  }

  let classes = `absolute w-full rounded-md shadow-lg focus:outline-none bg-white min-w-[12rem] z-10`

  if (placement === `bottom-left`) {
    classes = `${classes} top-10 right-0`
  } else if (placement === `bottom-center`) {
    classes = `${classes} top-10 left-1/2 transform -translate-x-1/2`
  } else if (placement === `bottom-right`) {
    classes = `${classes} top-10 left-0`
  } else if (placement === `top-left`) {
    classes = `${classes} bottom-10 right-0`
  } else if (placement === `top-center`) {
    classes = `${classes} bottom-10 left-1/2 transform -translate-x-1/2`
  } else if (placement === `top-right`) {
    classes = `${classes} bottom-10 left-0`
  }

  classes = twMerge(classes, $$props.class)

  function slideFade(node, params) {
    let transformOrigin = `top left`
    if (placement === `bottom-left`) {
      transformOrigin = `top left`
    } else if (placement === `bottom-center`) {
      transformOrigin = `top center`
    } else if (placement === `bottom-right`) {
      transformOrigin = `top right`
    } else if (placement === `top-left`) {
      transformOrigin = `bottom left`
    } else if (placement === `top-center`) {
      transformOrigin = `bottom center`
    } else if (placement === `top-right`) {
      transformOrigin = `bottom right`
    }
    const existingTransform = getComputedStyle(node).transform.replace(`none`, ``)
    return {
      delay: params.delay || 0,
      duration: params.duration || 400,
      easing: params.easing || cubicOut,
      css: (t) => `transform-origin: ${transformOrigin}; transform: ${existingTransform} scaleY(${t}); opacity: ${t};`
    }
  }
</script>

<div
  class="relative inline-flex"
  use:clickOutside
  on:clickOutside={onClose}
>
  <slot
    name="trigger"
    {onOpen}
    {onClose}
    {isOpen}
  />
  {#if isOpen}
    <div
      use:trapUpDownFocus
      transition:slideFade|local
      class={classes}
    >
      <slot />
    </div>
  {/if}
</div>
