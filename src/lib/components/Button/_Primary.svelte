<script>
  import Button from "./Button.svelte"

  import { twMerge } from "tailwind-merge"

  const { class: restPropsClass, ...restProps } = $$restProps
</script>

<Button
  class={twMerge(
    `inline-flex items-center rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600`,
    restPropsClass
  )}
  on:click
  on:copy
  {...restProps}
>
  <slot />
</Button>
