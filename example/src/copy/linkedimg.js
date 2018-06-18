
const copy = `
![Minion](https://octodex.github.com/images/minion.png)
[![Minion](https://octodex.github.com/images/minion.png)](https://google.com)
[![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.png)](https://google.com)

## Links

@hello

`;
const copy2 = `
**tes
t**

## Linked Images
[![Minion](https://octodex.github.com/images/minion.png)](https://google.com)
[![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.png)](https://google.com)


## Links

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title text!")

Autoconverted link https://github.com/nodeca/pica (enable linkify to see)


## Images

![Minion](https://octodex.github.com/images/minion.png)
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")

Like links, Images also have a footnote style syntax

![Alt text][id]

With a reference later in the document defining the URL location:

[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"
`;
export default copy;