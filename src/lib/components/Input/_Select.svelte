<script>
  export let direction = `bottom` // top, bottom
  export let name = `fieldName`
  export let placeholder = ``
  export let isRequired = false
  export let label = `Select menu`
  export let isLoading = false
  export let isDisabled = false
  export let error = ``
  export let value = `apple`
  export let options = [
    { label: `Apple`, value: `apple` },
    { label: `Banana`, value: `banana` },
    { label: `Orange`, value: `orange` }
  ]
  export let optionClass = ``
  export let hideIcon = false
  export let isCreatable = false
  export let id = `${name}-${Math.random()}`

  import Button from "../Button"

  import { createEventDispatcher } from "svelte"
  import { twMerge } from "tailwind-merge"
  import { clickOutside, trapUpDownFocus, stopTyping } from "../../utils"

  import { ChevronUpDownIcon, WarningIcon, LoadingSpinnerIcon, CheckIcon, PlusIcon } from "../../icons"

  const { class: restPropsClass, ...restProps } = $$restProps

  let inputRef = null
  let isOptionsOpen = false
  let searchValue = options.find((option) => option.value === value)?.label || ``

  $: if (options.length && !isOptionsOpen) {
    searchValue = options.find((option) => option.value === value || option.label === value)?.label || ``
  }

  // add a clear option to the list
  $: if (!isRequired) {
    if (value) {
      if (options.find((option) => option.value === ``) === undefined) {
        options = [{ label: `Clear`, value: `` }, ...options]
      }
    } else {
      // remove clear option if value is null
      options = options.filter((option) => option.value !== ``)
    }
  }

  const dispatch = createEventDispatcher()

  const onSelect = async (option) => {
    value = option.value
    searchValue = option.value ? option.label : ``
    inputRef.focus()
    dispatch(`select`, { name, option })
    onClose()
  }

  const onAddNew = () => {
    dispatch(`addNew`, { name, value: searchValue })
    inputRef.focus()
    onClose()
  }

  const onClose = () => {
    isOptionsOpen = false
    // reset search value if no value is selected
    if (value !== null) {
      searchValue = options.find((option) => option.value === value || option.label === value)?.label || ``
    }
  }
</script>

<div
  use:clickOutside
  on:clickOutside={onClose}
  class={twMerge(
    `relative h-fit rounded-md ring-1 ring-current focus-within:ring-2 focus-within:ring-current`,
    restPropsClass
  )}
>
  <label
    for={id}
    class="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
    class:isRequired
  >
    {label}
  </label>
  <div class="flex items-center justify-between">
    <input
      disabled={isDisabled}
      {id}
      {name}
      use:stopTyping
      on:stopTyping
      placeholder={options.find((option) => option.value === value)?.label || placeholder}
      bind:this={inputRef}
      required={isRequired}
      bind:value={searchValue}
      on:click={() => {
        if (!isOptionsOpen) {
          isOptionsOpen = true
          searchValue = ``
        }
      }}
      on:keyup={(event) => {
        if (!isOptionsOpen && event.key !== `Enter`) {
          isOptionsOpen = true
          searchValue = ``
        } else {
          if (event.key === `Enter`) {
            event.preventDefault()
            event.stopPropagation()
            const matchingOptions = options.filter((option) =>
              option.label.toLowerCase().includes(searchValue.toLowerCase())
            )
            if (matchingOptions.length === 1) {
              onSelect(matchingOptions[0])
              return
            }
            isOptionsOpen = false
          }
        }
      }}
      type="text"
      class="block w-full rounded-md border-none p-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-0"
      role="combobox"
      aria-controls="options"
      aria-expanded={isOptionsOpen}
      {...restProps}
    />

    <slot {onClose} />

    {#if error}
      <div
        class="absolute right-2 py-2"
        class:right-9={!hideIcon}
      >
        <WarningIcon class="text-red-500" />
      </div>
    {/if}
    {#if !hideIcon}
      <Button.Ghost
        disabled={isDisabled}
        on:click={() => {
          isOptionsOpen = true
          searchValue = ``
        }}
        class="mr-2 p-1"
        tabindex="-1"
      >
        <ChevronUpDownIcon class="text-current" />
      </Button.Ghost>
    {/if}
  </div>
  {#if error}
    <p class="px-3 pb-2 text-xs text-red-600">
      {error}
    </p>
  {/if}

  {#if isOptionsOpen}
    <div
      class="absolute z-10 max-h-48 w-full overflow-auto rounded-md bg-white p-2 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      class:bottom-12={!error && direction === `top`}
      class:top-11={!error && direction === `bottom`}
      class:top-[4.2rem]={error && direction === `bottom`}
      id="options"
      use:trapUpDownFocus
      on:keyup={(event) => {
        if (event.key === `ArrowUp` || event.key === `ArrowDown`) return
        event.preventDefault()
        event.stopPropagation()

        if (isOptionsOpen) {
          inputRef.focus()
        }
      }}
    >
      {#if isLoading}
        <div
          class="relative flex cursor-default select-none items-center justify-between gap-1 rounded-md p-2 text-current focus:outline-none"
        >
          <span>Loading ...</span>
          <LoadingSpinnerIcon />
        </div>
      {:else}
        {#each options.filter(({ label }) => label
            .toLowerCase()
            .trim()
            .includes(searchValue.toLowerCase().trim())) as option (option.value)}
          {@const isSelected = option.value === value}
          <Button
            class={twMerge(
              `relative flex w-full cursor-default select-none rounded-md p-2 text-gray-900 hover:bg-gray-50 focus:bg-gray-100 focus:outline-none focus:outline-0`,
              optionClass
            )}
            tabindex="-1"
            on:click={() => {
              onSelect(option)
            }}
            id={option.label}
          >
            <slot
              name="option"
              {isSelected}
              {option}
            >
              <span
                class="block truncate"
                class:font-semibold={isSelected}
              >
                {option.label}
              </span>

              {#if isSelected && option?.value}
                <span class="absolute right-0 flex items-center pr-2">
                  <CheckIcon />
                </span>
              {/if}
            </slot>
          </Button>
        {:else}
          <div
            class="relative flex items-center justify-between gap-1 cursor-default select-none rounded-md p-2 focus:outline-none text-red-500"
          >
            <span>No options found</span>
            <WarningIcon />
          </div>
          {#if isCreatable}
            <Button
              on:click={onAddNew}
              class="relative justify-between flex w-full cursor-default select-none rounded-md p-2 text-gray-900 hover:bg-gray-50 focus:bg-gray-100 focus:outline-none focus:outline-0"
            >
              <span>Add as a new option</span>
              <PlusIcon />
            </Button>
          {/if}
        {/each}
      {/if}
    </div>
  {/if}
</div>

<style>
  .isRequired:after {
    color: #e32;
    content: " *";
    display: isInline;
  }
</style>
