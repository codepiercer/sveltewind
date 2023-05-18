<script>
  export let name = `fieldName`
  export let label = name // use name if label is not provided
  export let isRequired = false
  export let error = ``
  export let value = ``
  export let id = `${name}-${Math.random()}`

  import { WarningIcon } from "../../icons/index.js"

  import { twMerge } from "tailwind-merge"
  import { stopTyping } from "../../utils/index.js"

  const { class: restPropsClass, ...restProps } = $$restProps

  let inputRef
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
    <textarea
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
