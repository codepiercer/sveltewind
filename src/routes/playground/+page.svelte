<script>
  import { Button, Link, Dialog, Dropdown, Alert, Input } from "$lib/components"

  import {
    DisabledIcon,
    LoadingSpinnerIcon,
    CalendarIcon,
    ClipboardIcon,
    ChevronDownIcon,
    ChevronUpIcon
  } from "$lib/icons"

  import { copyToClipboard } from "$lib/utils"

  import DropdownExample from "./examples/DropdownExample.svelte"

  let selectInputValue = ``
  let selectInputOptions = [
    { value: `one`, label: `One` },
    { value: `two`, label: `Two` }
  ]
  let dateInputValue = `2021-01-01`
  let timeInputValue = `13:00`
  let datetimeInputValue = `2021-01-01T12:00`
</script>

<div class="flex flex-wrap gap-8 p-4">
  <Button>Basic Button</Button>
  <Button.Primary>Primary Button</Button.Primary>
  <Button.Secondary>Secondary Button</Button.Secondary>
  <Button.Primary class="py-4">Primary Large Button</Button.Primary>
  <Button.Primary isDisabled>
    <DisabledIcon class="mr-2 text-white" />
    <span>Primary Button Disabled</span>
  </Button.Primary>
  <Button.Secondary isLoading>
    <LoadingSpinnerIcon class="mr-2" />
    <span>Secondary Loading Button</span>
  </Button.Secondary>
  <Button.Secondary
    on:click={() => {
      document.getElementById(`calendar`).focus()
    }}
    class="bg-yellow-50 text-yellow-600 hover:bg-yellow-100 focus:outline-yellow-600"
  >
    <span>Secondary Yellow Button: Focus Calendar</span>
  </Button.Secondary>
  <Button.Primary class="bg-red-600 hover:bg-red-500 focus:outline-red-600">
    <span>Primary Red Button</span>
  </Button.Primary>
  <Button.Secondary
    id="calendar"
    data-tooltip="tooltip"
  >
    <CalendarIcon />
  </Button.Secondary>
  <Button.Outlined>Outlined Button</Button.Outlined>
  <Button.Ghost>Ghost Button</Button.Ghost>
  <Link href="/">Link</Link>
  <Link
    href="/"
    class="rounded-md bg-indigo-50 px-2.5 py-1.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
  >
    Link as Button
  </Link>
  <Dialog
    let:onOpen
    let:onClose
    initialFocusID="cancel"
    closeOnEscape
    closeOnOverlayClick
  >
    <Button.Primary
      slot="trigger"
      on:click={onOpen}
    >
      Dialog
    </Button.Primary>
    <div class="p-2">
      <h2 class="text-lg font-medium leading-6 text-gray-900">Dialog Title</h2>
      <div class="mt-4">
        <p class="text-sm text-gray-500">
          <strong>closeOnOverlayClick</strong>
          is set to true, so you can click on the backdrop to close the dialog. event.
          <br />
          <br />
          <strong>closeOnEscape</strong>
          is set to true, so you can press the escape key to close the dialog.
        </p>
      </div>
      <input
        type="text"
        class="mt-4 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        placeholder="focusable element"
      />
    </div>
    <div class="flex justify-end gap-4 px-4 py-3">
      <Button.Secondary
        id="cancel"
        on:click={onClose}
      >
        Close
      </Button.Secondary>
      <Button.Primary on:click={onClose}>Submit</Button.Primary>
    </div>
  </Dialog>
  <Dropdown
    let:onOpen
    let:onClose
    let:isOpen
    placement="bottom-left"
  >
    <Button.Secondary
      class="bg-red-50 text-red-600 hover:bg-red-100 focus:outline-red-600"
      slot="trigger"
      on:click={isOpen ? onClose : onOpen}
    >
      <span>Dropdown</span>
      {#if isOpen}
        <ChevronUpIcon class="ml-1" />
      {:else}
        <ChevronDownIcon class="ml-1" />
      {/if}
    </Button.Secondary>
    <div class="flex flex-col gap-1 p-2 ring-1 ring-black ring-opacity-5">
      <Link
        href="/"
        tabindex="-1"
        class="block rounded-md bg-white px-2.5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:bg-gray-100 focus:outline-0"
      >
        Account settings
      </Link>
      <Link
        href="#"
        tabindex="-1"
        class="block  rounded-md bg-white px-2.5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:bg-gray-100 focus:outline-0"
      >
        Support
      </Link>
      <Link
        href="#"
        tabindex="-1"
        class="block  rounded-md bg-white px-2.5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:bg-gray-100 focus:outline-0"
      >
        Support
      </Link>
    </div>
  </Dropdown>
  <Button.Secondary
    actions={[[copyToClipboard, `this text will be copied to clipboard`]]}
    on:copy={() => alert(`copied to clipboard`)}
  >
    <ClipboardIcon class="mr-2" />
    <span>Copy text to clipboard</span>
  </Button.Secondary>
  <Alert.Success>
    <div class="flex flex-col gap-2">
      <h3 class="font-medium">Success Alert</h3>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam.</p>
    </div>
  </Alert.Success>
  <Alert.Error>
    <h3 class="font-medium">Short Error Alert</h3>
  </Alert.Error>
  <Alert.Warning>
    <div class="flex flex-col gap-2">
      <h3 class="font-medium">Warning Alert</h3>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam.</p>
    </div>
  </Alert.Warning>
  <Alert.Info>
    <h3 class="font-medium">Short Info Alert</h3>
  </Alert.Info>
  <Input.Text
    isRequired
    label="Text Input"
    placeholder="With masked CC"
    mask="0000-0000-0000-0000"
  />
  <Input.Text
    type="password"
    isRequired
    label="Text Input"
    placeholder="password"
    class="text-indigo-600"
  />
  <Input.Text
    error="some error that is wrong with this input"
    label="Text Input"
    placeholder="with error state"
    class="text-red-600"
  />
  <Input.Text
    type="number"
    label="Text Input"
    placeholder="number 0-10"
    min="0"
    max="10"
    class="w-32 text-indigo-600"
    inputClass="w-32"
  />
  <Input.Text
    isRequired
    label="Text Input"
    placeholder="with slot"
    class="text-indigo-600"
  >
    <DropdownExample />
  </Input.Text>
  <Input.Text
    type="color"
    label="Color Picker"
    class="h-10 w-28 bg-white px-4 text-indigo-600"
  />
  <Input.Toggle
    isRequired
    label="Toggle Input"
    class="text-indigo-600"
  />
  <Input.Toggle
    error="some error that is wrong with this input"
    label="Toggle Input"
    class="text-red-600"
  />
  <Input.Toggle
    isRequired
    label="Toggle Input"
    class="text-green-600"
  >
    <DropdownExample />
  </Input.Toggle>
  <Input.Textarea
    isRequired
    label="Textarea Input"
    class="text-indigo-600"
    rows="5"
  />
  <Input.Textarea
    label="Textarea Input"
    placeholder="with slot"
    class="text-green-600"
  >
    <DropdownExample />
  </Input.Textarea>
  <Input.Select
    isRequired
    label="Select Input"
    class="text-green-600"
  />
  <Input.Select
    label="Select Input Creatable"
    class="text-blue-600"
    options={selectInputOptions}
    value={selectInputValue}
    isCreatable
    on:addNew={(e) => {
      selectInputOptions = [
        ...selectInputOptions,
        {
          value: e.detail.value,
          label: e.detail.value
        }
      ]
      selectInputValue = e.detail.value
    }}
  />
  <Input.Select
    label="Select Input No Icon"
    class="text-blue-600"
    hideIcon
  />
  <Input.Select
    label="Select Input Loading"
    class="text-blue-600"
    isLoading
  />
  <Input.Select
    label="Select Input Top"
    class="text-yellow-600"
    direction="top"
  />
  <Input.Select
    isRequired
    label="Select Input Error"
    class="text-red-600"
    error="some error that is wrong with this input"
  />
  <Input.Select
    label="Select Input Custom Option"
    class="text-green-600"
    optionClass="hover:bg-green-100"
  >
    <div
      slot="option"
      let:option
      let:isSelected
      class:animate-bounce={isSelected}
      class:bg-green-500={isSelected}
      class="rounded-md px-2"
    >
      {option.label}
    </div>
  </Input.Select>
  <Input.Date
    isRequired
    label="Date Input"
    class="text-green-600"
    value={dateInputValue}
    on:select={(e) => {
      dateInputValue = e.detail.date
    }}
  />
  <Input.Time
    isRequired
    label="Time Input"
    value={timeInputValue}
    on:select={(e) => {
      timeInputValue = e.detail.date
    }}
  />
  <Input.Datetime
    isRequired
    label="Datetime Input"
    class="text-blue-600"
    value={datetimeInputValue}
    on:select={(e) => {
      datetimeInputValue = e.detail.date
    }}
  />
</div>
