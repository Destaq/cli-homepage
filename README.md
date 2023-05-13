# [Destaq | CLI Homepage](https://simonilincev.com/cli-homepage)

A terminal-style startpage for all your browsing-related needs!

![screenshot](/docs/screenshot.png)

## Why?

TL;DR: why not?

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Build the project:

```bash
npm build
```

3. Run the server:

```bash
npm start
```

4. (Optional) setup a proxy to enable Google search autocomplete:

```bash
npm i -g local-cors-proxy
lcp --proxyUrl https://suggestqueries.google.com/
```

<p align="center">
  <img width="372" alt="image" src="https://github.com/Destaq/cli-homepage/assets/61620873/96bd0247-4ccd-4492-8df0-6d3796946363">
</p>

You can then use tab to cycle through / select suggestions.

## Configuration

Here's a sample of the `config.json` file:

```json5
{
  "bioUrl": "https://github.com/Destaq/Destaq/blob/master/README.md",
  "social": {
    "github": "Destaq",
    "linkedin": "simon-ilincev"
  },
  "theme": "gruvboxdark"
  // full list in themes.json
}
```

## Themes

![themes](/docs/screenshot.gif)

[Here's](/docs/themes) a list of available themes.


## Contributing

Feel free to open pull requests or log issues!

## Credits

Adapted from [Yassine Fathi's project](https://github.com/m4tt72/terminal).
