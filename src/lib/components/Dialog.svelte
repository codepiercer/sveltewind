<script>
  export let closeOnOverlayClick = false
  export let closeOnEscape = false
  export let initialFocusID = null

  import { onMount } from "svelte"
  import { createEventDispatcher } from "svelte"
  import { twMerge } from "tailwind-merge"

  import Button from "./Button"
  import { trapFocus } from "../utils"

  const { class: restPropsClass, ...restProps } = $$restProps

  let dialog
  let isOpen = false

  $: if (isOpen) {
    // wait for the dialog to be rendered
    setTimeout(() => {
      // focus the first focusable element
      const focusableElements = dialog.querySelectorAll(
        `a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[contenteditable], details, [tabindex]:not([tabindex="-1"])`
      )
      const firstElement = focusableElements[0]
      if (firstElement) {
        firstElement.focus()
      }
    })
  }

  const dispatch = createEventDispatcher()

  // expose methods to open and close the dialog
  onMount(() => {
    let scrollY
    let scrollX
    dialog.show = () => {
      dialog.showModal()
      if (!closeOnEscape) {
        // check closeOnEscape prop
        dialog.addEventListener(`cancel`, (event) => {
          event.preventDefault()
        })
      }
      // save the current scroll position
      scrollY = document.documentElement.scrollTop
      scrollX = document.documentElement.scrollLeft
      document.body.style.overflow = `hidden`
      isOpen = true
      initialFocusID &&
        setTimeout(() => {
          const el = document.getElementById(initialFocusID)
          el && el.focus()
        }, 1)
    }
    dialog.hide = () => {
      document.body.style.overflow = `auto`
      // scroll to the previous position
      if (scrollY) document.documentElement.scrollTop = scrollY
      if (scrollX) document.documentElement.scrollLeft = scrollX
      isOpen = false
      dialog.close()
      dispatch(`close`)
    }
  })

  // close the dialog on backdrop click
  const onOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      dialog.hide()
    }
  }
</script>

<slot name="trigger">
  <Button on:click={dialog.show}>Open Dialog</Button>
</slot>

<dialog
  bind:this={dialog}
  on:click={onOverlayClick}
  on:close
  use:trapFocus
  class={twMerge(`w-[96%] max-w-md rounded-md border-none outline-none`, restPropsClass)}
  {...restProps}
>
  {#if isOpen}
    <slot
      onOpen={() => dialog.show()}
      onClose={() => dialog.hide()}
    />
  {/if}
</dialog>

<style>
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(0.15rem);
  }
</style>
