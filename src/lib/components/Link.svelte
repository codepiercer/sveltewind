<script>
  export let href

  import { twMerge } from "tailwind-merge"

  const { class: restPropsClass, ...restProps } = $$restProps
</script>

<a
  {href}
  class={twMerge(
    `inline-flex h-fit rounded-sm transition-transform focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-indigo-600 active:scale-95`,
    restPropsClass
  )}
  {...restProps}
>
  <slot />
</a>
