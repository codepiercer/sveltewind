<script>
  export let name = `fieldName`
  export let label = name // use name if label is not provided
  export let isRequired = false
  export let error = ``
  export let value = ``

  import { WarningIcon } from "../../icons/index.js"

  import { twMerge } from "tailwind-merge"
  import { createEventDispatcher } from "svelte"

  const { class: restPropsClass, ...restProps } = $$restProps

  const dispatch = createEventDispatcher()

  const onToggle = () => {
    value = !value
    dispatch(`toggle`)
  }
</script>

<div
  class={twMerge(
    `relative h-fit rounded-md px-4 py-2 ring-1 ring-current focus-within:ring-2 focus-within:ring-current`,
    restPropsClass
  )}
  style={`min-width: ${label.length + (isRequired ? 1 : 0) + `ch`};`}
>
  <span
    class="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
    class:isRequired
  >
    {label}
  </span>
  <div class="flex items-center justify-between">
    <button
      type="button"
      class="relative top-0.5 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-none p-0.5 transition-colors duration-200 ease-in-out"
      class:bg-current={!!value}
      class:bg-gray-200={!value}
      role="switch"
      aria-checked={!!value}
      on:click={onToggle}
      {...restProps}
    >
      <span
        class="pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out"
        class:translate-x-0={!value}
        class:translate-x-5={!!value}
      >
        <span
          class="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
          class:opacity-100={!value}
          class:ease-in={!value}
          class:duration-200={!value}
          class:opacity-0={!!value}
          class:ease-out={!!value}
          class:duration-100={!!value}
          aria-hidden="true"
        >
          <svg
            class="h-3 w-3 text-gray-400"
            fill="none"
            viewBox="0 0 12 12"
          >
            <path
              d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <span
          class="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
          class:opacity-0={!value}
          class:ease-out={!value}
          class:duration-100={!value}
          class:opacity-100={!!value}
          class:ease-in={!!value}
          class:duration-200={!!value}
          aria-hidden="true"
        >
          <svg
            class="h-3 w-3 text-current"
            fill="currentColor"
            viewBox="0 0 12 12"
          >
            <path
              d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z"
            />
          </svg>
        </span>
      </span>
    </button>

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
    <p class="pt-2 text-xs text-red-600">
      {error}
    </p>
  {/if}
</div>

<style>
  .isRequired:after {
    color: #e32;
    content: " *";
    display: isInline;
  }
</style>
