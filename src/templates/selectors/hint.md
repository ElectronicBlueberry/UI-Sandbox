Pseudo selectors select elements in certain states, or elements which aren't there.

Pseudo selectors are preceded by "`:`".
For example:

```css
.class:not(.other-class) {
	/* rules */
}
```

Pseudo elements select elements which only exist visually.
They are preceded by "`::`".

For example:

```css
dialog::backdrop {
	/* rules */
}
```
