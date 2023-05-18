<script>
  import { WarningIcon } from "../../icons"

  import { twMerge } from "tailwind-merge"

  const { class: restPropsClass, ...restProps } = $$restProps
</script>

<div
  class={twMerge(`h-fit border-l-4 border-yellow-400 bg-yellow-50 p-4 pl-2 text-sm text-yellow-700`, restPropsClass)}
  {...restProps}
>
  <div class="flex gap-2">
    <div class="flex-shrink-0">
      <WarningIcon class="text-yellow-400" />
    </div>
    <slot />
  </div>
</div>
