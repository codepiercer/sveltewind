<script>
  import Button from "./Button.svelte"

  import { twMerge } from "tailwind-merge"

  const { class: restPropsClass, ...restProps } = $$restProps
</script>

<Button
  class={twMerge(
    `rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-indigo-900 shadow-sm ring-1 ring-inset ring-indigo-300 hover:bg-indigo-50 focus:outline-offset-0`,
    restPropsClass
  )}
  on:click
  on:copy
  {...restProps}
>
  <slot />
</Button>
