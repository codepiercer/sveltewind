<script>
  import { Link } from "$lib/components"
</script>

<main class="mx-auto grid h-screen max-w-xl place-items-center">
  <div class="flex flex-col items-center gap-4 text-center font-bold">
    <img
      src="/favicon.png"
      alt="logo of file cabinet representing components"
      class="h-16 w-16"
    />
    <h1 class="text-5xl tracking-tighter text-indigo-600">sveltewind</h1>
    <h2 class="text-lg text-gray-500">
      Customizable components with <Link
        href="https://tailwindcss.com/"
        target="_blank"
        rel="noreferrer"
        class="font-medium text-red-600 hover:text-red-700"
      >
        TailwindCSS
      </Link>
      styling for seamless integration into any
      <Link
        href="https://svelte.dev/"
        target="_blank"
        rel="noreferrer"
        class="font-medium text-red-600 hover:text-red-700"
      >
        SvelteKit
      </Link> project.
    </h2>

    <Link
      href="/playground"
      class="rounded-md bg-indigo-50 px-2.5 py-1.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600"
    >
      <span class="text-base font-semibold leading-7">Playground</span>
      <span
        class="ml-1 text-base"
        aria-hidden="true"
      >
        &rarr;
      </span>
    </Link>

    <div class="m-2 flex max-w-2xl flex-col gap-4 rounded-lg bg-gray-100 p-4 text-left text-xs text-gray-900">
      <code>
        npm create svelte@latest newProject <br />
        npm i -D @codepiercer/sveltewind
      </code>
      <code>
        <span class="text-gray-400">#tailwind.config.cjs</span>
        <pre>
{`module.exports = {
  presets: require('@codepiercer/sveltewind/config.cjs')
}`}
        </pre>

        <span class="text-gray-400">#postcss.config.cjs</span>
        <pre>
{`module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
}`}</pre>
      </code>
    </div>
    <div>
      <p class="text-sm text-blue-900">or simply use the pre configured template</p>
      <div class="m-2 flex max-w-2xl flex-col gap-4 rounded-lg bg-gray-100 p-4 text-left text-xs text-gray-900">
        <code>npx degit git@github.com:codepiercer/sveltewind-template.git newProject</code>
      </div>
    </div>

    <Link
      href="https://github.com/codepiercer/sveltewind"
      target="_blank"
      rel="noreferrer"
      class="p-1"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        class="h-6 w-6"
      >
        <path
          fill="currentColor"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2Z"
        />
      </svg>
    </Link>
  </div>

  <div class="mt-12 border-t border-gray-200 py-4">
    <p class="text-center text-sm text-gray-500">
      &copy; <Link
        class="font-medium text-red-600 hover:text-red-700"
        href="https://codepiercer.org/"
        target="_blank"
        rel="noreferrer"
      >
        CODEPIERCER
      </Link>. All rights reserved.
    </p>
  </div>
</main>
