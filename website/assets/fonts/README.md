# WOFF/WOFF2 fonts used in the project.

To add a font, create a folder with the name of the font in lowercase with dashes, like `helvetica-neue-lt-std`. If the font name is too large to type often, shorten it to something that is still unique within the project, like `helvetica-neue`.

Then copy over the files and rename them. Copy and rename the font definition stylesheet file, and replace all occurences of the old font name with the new one. Then define the weights and you're done.

# Desktop fonts and web fonts

You muse use web fonts. WOFF2 is the only one you need, unless the project has a non-standard device scope.

It might also be a good idea to add a folder with the desktop font files, because experience teaches that sometimes, designers don't archive the source font files correctly. And that sucks if you're a new developer, jumping into an existing project.

# Naming rules

Stylesheets expect a certain pattern in the folder/file name. You could edit the stylesheets, but renaming the files is usually quicker.

In no particular order, these rules are:

1. Keep folder and filenames lowercase with dashes (except for installable desktop font files).
2. Always write out the full name and weight. Append the style. If no weight is specified in the original name, add `regular` as the weight.
3. When the regular weight has a different weight name, for example `Book`, then use that weight name. The stylesheet makes it so you can use that name as the font weight, straight from the font dropdown in design programs.

See the following translation table as an example:

| original name                           | modified name                                     |
| --------------------------------------- | ------------------------------------------------- |
| HelveticaNeueLTStd-Black.woff2          | helvetica-neue-lt-std-black.woff2                 |
| HelveticaNeueLTStd-BlackItalic.woff2    | helvetica-neue-lt-std-black-italic.woff2          |
| InterItalic.woff2                       | inter-regular-italic.woff2                        |
| FontThatHasNoRegularWeightBook.weight   | font-that-has-no-regular-weight-book.woff2        |
| FontThatHasNoRegularWeightItalic.weight | font-that-has-no-regular-weight-book-italic.woff2 |

# Multiple related families

When multiple related families are present, for example with `Roboto` and `RobotoSlab`, treat them as separate fonts.

# Font definition file

Don't forget to duplicate a font definition stylesheet, like `/stylesheets/fonts/_helvetica.scss` and rename it. Also replace all occurences of the old name inside the file, with the new name (search and replace `helvetica-neue-lt-std` to `inter-variable`).

# Friendly name

When setting the friendly name in the stylesheet, for the `@font-face` declarations, always append something like `Webfont` to the end. This is to prevent the browser from loading a user's local font (that might, or might not, be the font you expect). So `Helvetica Neue` becomes `Helvetica Neue Webfont`.

# Weight and style translation mappings

The stylesheet for the font contains a list of weight mappings. These weights and their names differ per font family. Add the the font weights that are present. You are free to choose any numeric value for the weights that you like, except for `regular` with is always `400`, and `bold` which is always `700`. For the rest, anything goes. If the font contains both `semibold` and `demibold`, or example, you could set `semibold` to 600 and `demibold` to 650, depending in which is actually thicker in the font. Though using values lower then `100` might be buggy in some cases.

Below is a basic reference table to start with:

| reference weight value | possible weight names     |
| ---------------------- | ------------------------- |
| 100                    | thin, hairline            |
| 200                    | extra light, ultra light  |
| 300                    | light                     |
| **400**                | **normal, regular, book** |
| 500                    | medium                    |
| 600                    | semibold, demibold        |
| **700**                | **bold**                  |
| 800                    | extrabold, ultrabold      |
| 900                    | black, heavy              |

And this is an example of a mapping in the font definition stylesheet:

```
// Reminder: Font style is not supposed to be selected by name (ie: 'black-italic'),
// this is done automatically by setting font-style italic. However, it's still in the
// list in order for the @font-face to work
$helvetica-neue-font-weights: (
  light: (weight: 300, style: normal),
  light-italic: (weight: 300, style: italic),
  regular: (weight: 400, style: normal),
  regular-italic: (weight: 400, style: italic),
  bold: (weight: 700, style: normal),
  bold-italic: (weight: 700, style: italic),
  black: (weight: 900, style: normal),
);
```

# Using custom font weights

You can use weights by setting them as usual.

```
font-weight: bold;
font-weight: 400;
```

But, to make things easier, you can use the `get-xxx-weight()` function, defined in the font definition stylesheet. This allows you to use the exact name that appears in the dropdown in a design program like Sketch or Illustrator. Depending on the usage and the used version of Sass, you might need to clarify it as a string by wrapping the call with `#{...}`.

```
font-weight: #{get-helvetica-weight(book)};
font-weight: #{get-helvetica-weight(semibold)};
```

# Baseline issues across devices

It can happen that there are baseline alignment issues across devices. In such a case, the text baseline is a lot higher on, for example, an iPad as compared to Chrome on Windows, or the other way around. This is most often visible on a button.

Lots of font foundries make a mess of this, since baseline definitions in fonts are a mess in an of themselves. In that case, it might be a good idea to put the font through FontSquirrel, or a similar service, to re-align the baselines. Saves you a ton of work.

# Other tweaks

For some fonts, it might also be a good idea to subset certain opentype features or character sets, to shrink gigantic fonts down to manageable sizes. This can also be done with a service like FontSquirrel.
