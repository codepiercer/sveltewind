<script>
  import { Button, Link, Dropdown } from "$lib/components"

  import { ChevronDownIcon, ChevronUpIcon } from "$lib/icons"
</script>

<Dropdown
  let:onOpen
  let:onClose
  let:isOpen
  placement="bottom-left"
>
  <Button.Ghost
    class="p-0.5"
    slot="trigger"
    on:click={isOpen ? onClose : onOpen}
    data-tooltip="tooltip"
  >
    {#if isOpen}
      <ChevronUpIcon />
    {:else}
      <ChevronDownIcon />
    {/if}
  </Button.Ghost>
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
      class="block rounded-md bg-white px-2.5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:bg-gray-100 focus:outline-0"
    >
      Support
    </Link>
    <Link
      href="#"
      tabindex="-1"
      class="block rounded-md bg-white px-2.5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:bg-gray-100 focus:outline-0"
    >
      Support
    </Link>
  </div>
</Dropdown>
