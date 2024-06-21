Theme properties are converted to CSS variables recursively.

The leaf values are all just CSS values.

A theme with the following structure:

```yaml
my-theme:
  background:
    color: red
    hover: blue
```

would produce the following css variables:

```css
--background-color: red;
--background-hover: blue;
```
