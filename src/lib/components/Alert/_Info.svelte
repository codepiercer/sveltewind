<script>
  import { InfoIcon } from "../../icons"

  import { twMerge } from "tailwind-merge"

  const { class: restPropsClass, ...restProps } = $$restProps
</script>

<div
  class={twMerge(`h-fit border-l-4 border-blue-400 bg-blue-50 p-4 pl-2 text-sm text-blue-700`, restPropsClass)}
  {...restProps}
>
  <div class="flex gap-2">
    <div class="flex-shrink-0">
      <InfoIcon class="text-blue-400" />
    </div>
    <slot />
  </div>
</div>
