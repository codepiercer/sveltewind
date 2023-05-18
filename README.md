# sveltewind

Customizable components with TailwindCSS styling for seamless integration into any SvelteKit project.

## Installation (Option 1)

```bash
npm i -D @codepiercer/sveltewind
```

- Create a `tailwind.config.cjs` file in the root of your project and add the following:

  ```js
  // tailwind.config.cjs
  module.exports {
    presets: require('@codepiercer/sveltewind/config.cjs')
  }
  ```

- Create a `postcss.config.cjs` file in the root of your project and add the following:

  ```js
  // postcss.config.cjs
  module.exports = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  }
  ```

## Installation (Option 2) - use the pre configured template

```bash
npx degit git@github.com:codepiercer/sveltewind-template.git newProject
```

## Usage

```js
// Example.svelte
<script>
  import { Button } from '@codepiercer/sveltewind/components'
</script>

<Button.Primary class="text-green-500">Click Me</Button.Primary>
```

## Development

```bash
docker compose --service-ports run --rm app
npm i
npm run dev
```

<p>
  &copy;
  <a href="https://codepiercer.org/" target="\_blank">CODEPIERCER</a>. All rights reserved.
</p>
