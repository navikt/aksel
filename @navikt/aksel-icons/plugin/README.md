<!-- Logo -->
<p align="center">
  <img src="https://raw.githubusercontent.com/CoconutGoodie/figma-plugin-react-vite/master/.github/assets/logo.png" height="100px" alt="Logo"/>
</p>
<h1 align="center">Figma Plugin Boilerplate: React + Vite</h1>

<!-- Slogan -->
<p align="center">
   Create scalable Figma plugins with ease, using the power of React + Vite!
</p>

<!-- Badges -->
<p align="center">

  <!-- Github Badges -->
  <img src="https://raw.githubusercontent.com/TheSpawnProject/TheSpawnLanguage/master/.github/assets/github-badge.png" height="20px"/>
  <a href="https://github.com/CoconutGoodie/figma-plugin-react-vite/commits/master">
    <img src="https://img.shields.io/github/last-commit/CoconutGoodie/figma-plugin-react-vite"/>
  </a>
  <a href="https://github.com/CoconutGoodie/figma-plugin-react-vite/issues">
    <img src="https://img.shields.io/github/issues/CoconutGoodie/figma-plugin-react-vite"/>
  </a>

  <br/>

  <!-- Support Badges -->
  <img src="https://raw.githubusercontent.com/TheSpawnProject/TheSpawnLanguage/master/.github/assets/support-badge.png" height="20px"/>
  <a href="https://www.patreon.com/iGoodie">
    <img src="https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fshieldsio-patreon.vercel.app%2Fapi%3Fusername%3DiGoodie%26type%3Dpatrons"/>
  </a>
</p>

## Key Features

1. **_Logical Sides in Mind:_** Figma plugins that render a UI work on two different processes (split into code.js and index.html in Figma docs). This boilerplate keeps the sides separated by allowing them to share code (under ./src/common/).

2. **_Intercommunitive:_** Logical sides should be able to communicate with each other without creating huge and unscalable nested if statements. This boilerplate solves it by declaring isolated messages and handlers (under `./src/common/network/messages/`)! (Using the [Monorepo Networker](https://github.com/CoconutGoodie/monorepo-networker) library)

3. **_Easy to Build:_** Configure the `figma.manifest.ts` config with your plugin credentials once, then just build with your everyday `npm run build` command! The `/dist` folder will be ready to publish already!

4. **_Bundled into One File:_** Figma plugins only accept a single file for `main` (js) and `ui` (html), which makes deployment of multiple files linked to each other impossible. This boilerplate is configured to bundle/inline most of the things you need like rasterize/vector image asset imports, CSS URL statements, and of course, source code imports.

5. **_SVG as Component:_** Yes, you can import SVGs as inlined sources with `*.svg?inline`, but what about actually importing them as React components? Easy! You can import an SVG file as a React component with `*.svg?component!` (See `/src/ui/app.tsx` for examples)

6. **_Sassy:_** A classic, this boilerplate supports Sass/Scss/Less and modules! Check out `/src/ui/styles/` for 7-1 Sass Template and `/src/ui/components/Button.module.scss` for module examples.

## How to start coding?

1. First thing after you clone should be to install the dependencies by executing:

```
npm i
```

2. Create a figma plugin. In Figma, right click while you're in a design file. Follow `Plugins > Development > New Plugin...`. You can also type `"New Plugin...` to the global search (Windows: <kbd>CTRL</kbd> + <kbd>P</kbd>, Mac: <kbd>⌘ Command</kbd> + <kbd>P</kbd>)
3. Follow the steps on opened window. I recommend using `Default` or `Run once` layout, because you'll only need to save the manifest (for the plugin id it generates). Click "Save as", and save it to a temporary place. Then click "Open folder" to navigate to the folder it generated
4. Note down the `id` field from the `manifest.json` it generated.
5. Go to `figma.manifest.ts`, and replace the `id` with the id you noted down. Then configure the manifest there as you like. (See [Official Figma Plugin Manifest doc](https://www.figma.com/plugin-docs/manifest/))

### Developing UI

Since UI is powered by Vite + React, you can use your browser to code the UI with HMR but **without** the figma context. Just run the following command line:

```
npm run dev
```

### Building

Building with the following command line will yield with a `dist` folder, which is ready to be used by Figma:

```
npm run build
```

`dist/manifest.json` then can be used to load the plugin. In Figma, right click while you're in a design file. Follow `Plugins > Development > Import plugin from manifest...`. You can also type `"Import plugin from manifest...` to the global search (Windows: <kbd>CTRL</kbd> + <kbd>P</kbd>, Mac: <kbd>⌘ Command</kbd> + <kbd>P</kbd>). Then select `dist/manifest.json`

### Publishing

After building, built `dist` folder is going to contain every artifact you need in order to publish your plugin. Just build, and follow [Figma's Official Post on Publishing Plugins](https://help.figma.com/hc/en-us/articles/360042293394-Publish-plugins-to-the-Figma-Community#Publish_your_plugin).

## File Structure

- `src`
  - `src/common/` : Sources that are intended to be used both by plugin and ui logical sides.
    - `src/common/network/` : Networking logic & message declarations used by Plugin - UI logical sides' intercommunication. Whenever a new message type is needed, declare and register here.
  - `src/plugin/` : Sources of the plugin logical side. Place everything that interracts with figma here.
  - `src/ui/` : Sources of the ui logical side, a classical Vite + React source base.
- `scripts`
  - `scripts/vite/` : Some custom vite plugins to assist inlining assets
- `figma.manifest.ts` - A module that exports [Figma Plugin Manifest](https://www.figma.com/plugin-docs/manifest/) for the build scripts

## Caveats

### 1. Make sure to either inline or component SVG imports!

Importing image assets other than `.svg` is easy. However, when you are importing `.svg` you MUST make sure it is imported using either one of the suffixes `?inline` or `?component`.

```tsx
// ❌ WRONG! Won't be visible in Figma
import myImage from "@ui/assets/my_image.svg";

// ✔️ Correct!
import MyImage from "@ui/assets/my_image.svg?component";
import myImage from "@ui/assets/my_image.svg?inline";

...

<MyImage className="something" />
<img src={myImage} />
```

---

<p align="center">
  <img src="https://raw.githubusercontent.com/CoconutGoodie/figma-plugin-react-vite/master/.github/assets/preview.png" alt="Preview" />
</p>
