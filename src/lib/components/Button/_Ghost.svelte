<script>
  import Button from "./Button.svelte"

  import { twMerge } from "tailwind-merge"

  const { class: restPropsClass, ...restProps } = $$restProps
</script>

<Button
  class={twMerge(
    `rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-gray-50 focus:bg-gray-100 focus:outline-0`,
    restPropsClass
  )}
  on:click
  on:copy
  {...restProps}
>
  <slot />
</Button>
