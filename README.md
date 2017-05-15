# outliner-loader

Extract outline structure from HTML, and generate table-of-contents.

## Example

### Input

```HTML
<div id="contents"></div>

<h1 id="1">1. Chapter</h1>
<p>aaa</p>

<h2 id="1.1">1.1 Section</h2>
<p>bbb</p>

<h2 id="1.2">1.2 Section</h2>
<p>ccc</p>

<h1 id="2">2. Chapter</h1>
<p>ddd</p>
```

### Output

```HTML
<div id="contents">
    <ol>
        <li>
            <a href="#1">1. Chapter</a>
            <ol>
                <li><a href="#1.1">1.1 Section</a></li>
                <li><a href="#1.2">1.2 Section</a></li>
            </ol>
        </li>
        <li><a href="#2">2. Chapter</a></li>
    </ol>
</div>

<h1 id="1">1. Chapter</h1>
<p>aaa</p>

<h2 id="1.1">1.1 Section</h2>
<p>bbb</p>

<h2 id="1.2">1.2 Section</h2>
<p>ccc</p>

<h1 id="2">2. Chapter</h1>
<p>ddd</p>
```

## Install

1. `npm install -D outliner-loader`

## Usage

1. Configuration for Webpack 2
```javascript
module.exports = function(env) {
    /* ... */
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    /* ... */
                    {
                        loader: 'outliner-loader',
                        options: {/* */}
                    }
                    /* ... */
                ]
            }
        ]
    },
    /* ... */
}
```
2. Write HTML Template file.
    - template.html
    ```HTML
    <div id="contents"></div>

    <h1 id="1">1. Chapter</h1>
    ```
    - entry.js
    ```javascript
    var template = require('./template.html');
    document.getElementById('app').innerHTML = template;
    ```

## API (Options)

### outline.chapter

`outline.chpater` has two properties.

- `selector`: CSS selector for Level-1 element.
    - Type: `string`
    - Default: `'h1'`
- `hashAttr`: HTML attribute for URL hash.
    - Type: `string`
    - Default: `id`

### outline.section

`outline.section` has two properties.

- `selector`: CSS selector for Level-2 element.
    - Type: `string`
    - Default: `'h2'`
- `hashAttr`: HTML attribute for URL hash.
    - Type: `string`
    - Default: `id`

### outline.subsection

`outline.subsection` has two properties.

- `selector`: CSS selector for Level-3 element.
    - Type: `string`
    - Default: `'h3'`
- `hashAttr`: HTML attribute for URL hash.
    - Type: `string`
    - Default: `id`

### contents.outlet

`contents.outlet` has one property.

- `selector`: CSS selector for the element which generated table-of-contents append to.
    - Type: `string`
    - Default: `'#contents'`

### contents.list

`contents.list` has two properties.

- `parentTagName`: HTML Tag name for parent element of generated table-of-contents.
    - Type: `string`
    - Default: `'ol'`
- `childTagName`: HTML Tag name for child element of generated table-of-contents.
    - Type: `string`
    - Default: `'li'`

### contents.anchor

`contents.anchor` has one property.

- `template`: Template for anchor element in generated table-of-contents. Special key word '[hash]' and '[content]' is replaced by URL hash and headline title, respectively.
    - Type: `string`
    - Default: `'<a href="#[hash]">[content]</a>'`

## Advanced example

### Options

- webpack.config.js
```javascript
module.exports = function() {
    return {
        module: {
            rules: [{
                test: /\.html$/,
                use: [{
                    loader: 'outliner-loader',
                    options: {
                        outine: {
                            chapter: {
                                selector: 'custom-h[h-level="1"]',
                                hashAttr: 'h-id'
                            }
                        },
                        contents: {
                            outlet: {
                                selector: '#table-of-contents'
                            },
                            list: {
                                parentTagname: 'ul'
                            },
                            anchor: {
                                template: '<router-link :to="{hash: \'[hash]\'}">[content]</router-link>'
                            }
                        }
                    }                    
                }]
            }]
        }
    };
};
```

### Input
```HTML
<div id="table-of-contents"></div>

<custom-h h-level="1" h-id="chapter-1">
    1. Chapter
</custom-h>
```

### Output
```HTML
<div id="table-of-contents">
    <ul>
        <li><router-link :to="{hash: 'chapter-1'}">1. Chapter</router-link></li>
    </ul>
</div>

<custom-h h-level="1" h-id="chapter-1">
    1. Chapter
</custom-h>
```

## Setup for developers

1. `git clone https://github.com/ytkj/outliner-loader.git`
2. `cd outliner-loader`
3. `npm install`
4. `npm test`
