<script>
  export let isDisabled = false
  export let isLoading = false
  export let actions = []

  import { twMerge } from "tailwind-merge"
  import { useActions } from "../../utils"

  const { class: restPropsClass, ...restProps } = $$restProps
</script>

<button
  type="button"
  disabled={isDisabled || isLoading}
  class={twMerge(
    `inline-flex h-fit rounded-sm transition-transform focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 active:scale-95`,
    restPropsClass
  )}
  class:opacity-75={isDisabled}
  class:pointer-events-none={isDisabled || isLoading}
  use:useActions={actions}
  on:click
  on:copy
  {...restProps}
>
  <slot />
</button>
