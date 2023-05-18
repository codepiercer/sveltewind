<script>
  export let type = `text` // text, email, password, number, tel, url
  export let name = `fieldName`
  export let label = name // use name if label is not provided
  export let isRequired = false
  export let error = ``
  export let value = ``
  export let mask = null // https://imask.js.org/guide.html#masked-input
  export let id = `${name}-${Math.random()}`

  import Button from "../Button"
  import { WarningIcon, EyeOpenIcon, EyeCloseIcon } from "../../icons"
  import { imask } from "@imask/svelte"

  import { twMerge } from "tailwind-merge"
  import { stopTyping } from "../../utils"

  const { class: restPropsClass, ...restProps } = $$restProps

  let inputRef

  function typeAction(node) {
    node.type = type
  }
</script>

<div
  class={twMerge(
    `relative h-fit rounded-md ring-1 ring-current focus-within:ring-2 focus-within:ring-current`,
    restPropsClass
  )}
>
  <label
    for={id}
    class="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
    class:isRequired
  >
    {label}
  </label>
  <div class="flex items-center justify-between">
    <input
      use:imask={mask ? { mask } : null}
      use:typeAction
      use:stopTyping
      on:stopTyping
      bind:this={inputRef}
      {id}
      required={isRequired}
      {name}
      on:change
      on:keyup|trusted
      bind:value
      class={twMerge(
        `block w-full rounded-md border-none py-2 text-sm leading-6 text-gray-900 placeholder:text-gray-400 focus:ring-0`,
        restPropsClass,
        `text-gray-900`
      )}
      {...restProps}
    />

    {#if type === `password`}
      <Button.Ghost
        tabindex="-1"
        class="absolute right-2 p-1 text-sm font-medium text-current focus:bg-gray-50"
        on:click={() => {
          inputRef.type = inputRef.type === `password` ? `text` : `password`
          inputRef.focus()
        }}
      >
        {#if inputRef && inputRef.type === `text`}
          <EyeCloseIcon />
          <span class="sr-only">Hide password</span>
        {:else}
          <EyeOpenIcon />
          <span class="sr-only">Show password</span>
        {/if}
      </Button.Ghost>
    {/if}

    <div class="absolute right-2">
      <slot />
    </div>

    {#if error}
      <div
        class="absolute right-2 py-2"
        class:right-9={$$slots.default}
      >
        <WarningIcon class="text-red-500" />
      </div>
    {/if}
  </div>
  {#if error}
    <p class="px-3 pb-2 text-xs text-red-600">
      {error}
    </p>
  {/if}
</div>

<style>
  label.isRequired:after {
    color: #e32;
    content: " *";
    display: isInline;
  }
</style>
