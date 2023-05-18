<script>
  import { SuccessIcon } from "../../icons"

  import { twMerge } from "tailwind-merge"

  const { class: restPropsClass, ...restProps } = $$restProps
</script>

<div
  class={twMerge(`h-fit border-l-4 border-green-400 bg-green-50 p-4 pl-2 text-sm text-green-700`, restPropsClass)}
  {...restProps}
>
  <div class="flex gap-2">
    <div class="flex-shrink-0">
      <SuccessIcon class="text-green-400" />
    </div>
    <slot />
  </div>
</div>
