<script>
  export let name = `fieldName`
  export let label = name // use name if label is not provided
  export let placeholder = `select date`
  export let isRequired = false
  export let isDisabled = false
  export let error = ``
  export let value = ``
  export let options = {}
  export let id = `${name}-${Math.random()}`

  import { createEventDispatcher, tick } from "svelte"

  import flatpickr from "flatpickr"
  import { twMerge } from "tailwind-merge"

  import Button from "../Button"
  import Dialog from "../Dialog.svelte"
  import { WarningIcon, XMarkIcon } from "../../icons"
  import { formatter } from "../../utils"

  const { class: restPropsClass, ...restProps } = $$restProps

  let inputRef

  const dispatch = createEventDispatcher()
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css"
  />
</svelte:head>

<Dialog
  let:onOpen
  let:onClose
  class="max-w-sm"
  closeOnOverlayClick
>
  <div
    class={twMerge(
      `relative h-fit rounded-md ring-1 ring-current focus-within:ring-2 focus-within:ring-current`,
      restPropsClass
    )}
    class:pr-4={$$slots.default}
    slot="trigger"
  >
    <label
      for={id}
      class="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium"
      class:isRequired
    >
      <slot name="label">{label}</slot>
    </label>
    <div class="flex items-center justify-between gap-2">
      <Button.Ghost
        {isDisabled}
        class="my-1 w-full min-w-[12rem] py-1 font-normal leading-6 text-gray-900 shadow-none focus:bg-white"
        on:click={async () => {
          onOpen()
          await tick()
          flatpickr(inputRef, {
            defaultDate: value,
            ...options,
            static: false,
            inline: true,
            enableTime: true,
            noCalendar: false,
            dateFormat: `Y-m-dTH:i`
          })
        }}
        {...restProps}
      >
        {#if value}
          {formatter.formatDateTime(value)}
        {:else}
          &nbsp;
          <span class="sr-only">No date selected</span>
        {/if}
      </Button.Ghost>

      <input
        {id}
        {value}
        required={isRequired}
        type="text"
        tabindex="-1"
        class="sr-only"
      />
      <slot />

      {#if error}
        <WarningIcon class="text-red-500" />
      {/if}
    </div>

    {#if error}
      <p class="mt-2 text-xs text-red-600">
        {error}
      </p>
    {/if}
  </div>

  <div class="flex flex-col gap-4 pb-2">
    <div class="flex items-center justify-between pb-1">
      <h2 class="text-md text-center font-semibold text-gray-900">
        {#if value}
          {formatter.formatDateTime(value)}
        {:else}
          No date selected
        {/if}
      </h2>
      <Button.Secondary
        on:click={onClose}
        class="p-1"
      >
        <span class="sr-only">Close</span>
        <XMarkIcon />
      </Button.Secondary>
    </div>

    <div class="-mb-2 -mt-4 flex flex-col items-center justify-center gap-4">
      <input
        {name}
        bind:this={inputRef}
        type="text"
        class="hidden"
        {placeholder}
        on:change={() => {
          dispatch(`select`, { name, date: inputRef.value })
          // onClose()
        }}
      />
      <div class="flex w-full items-center justify-around">
        <Button.Secondary
          id="clear"
          class="bg-red-50 text-red-500 hover:bg-red-100"
          on:click={() => {
            inputRef._flatpickr.setDate(``)
            dispatch(`select`, { name, date: `` })
            onClose()
          }}
        >
          Clear
        </Button.Secondary>
      </div>
    </div>
  </div>
</Dialog>

<style>
  :global(.flatpickr-wrapper) {
    width: 100%;
  }

  :global(.flatpickr-calendar) {
    box-shadow: none !important;
  }
</style>
