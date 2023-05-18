<script>
  import { ErrorIcon } from "../../icons"

  import { twMerge } from "tailwind-merge"

  const { class: restPropsClass, ...restProps } = $$restProps
</script>

<div
  class={twMerge(`h-fit border-l-4 border-red-400 bg-red-50 p-4 pl-2 text-sm text-red-700`, restPropsClass)}
  {...restProps}
>
  <div class="flex gap-2">
    <div class="flex-shrink-0">
      <ErrorIcon class="text-red-400" />
    </div>
    <slot />
  </div>
</div>
