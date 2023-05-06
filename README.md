# [M4TT72 | Terminal](https://term.m4tt72.com)

A terminal style website

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

4. (Optional) setup a proxy to enable Google search atucomplete:

```bash
npm i -g local-cors-proxy
lcp --proxyUrl https://suggestqueries.google.com/
```

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

Adapted from [Yassine Fathi's React project](https://github.com/m4tt72/terminal).