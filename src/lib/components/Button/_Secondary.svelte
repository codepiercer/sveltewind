<script>
  import Button from "./Button.svelte"

  import { twMerge } from "tailwind-merge"

  const { class: restPropsClass, ...restProps } = $$restProps
</script>

<Button
  class={twMerge(
    `rounded-md bg-indigo-50 px-2.5 py-1.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600`,
    restPropsClass
  )}
  on:click
  on:copy
  {...restProps}
>
  <slot />
</Button>
