This is the ingest path for source images. It is a transient inbox — files only live here until they
are converted. This whole folder is gitignored (except this README).

Drop original images (`.jpg`, `.jpeg`, `.png`) in here, mirroring the folder layout of
`website/assets/media/` (e.g. `projects/<name>/...`). Then run:

```
node sonic convert
```

This converts, crops and optimizes each one into responsive `<base>_<ratio>_<width>w.webp`
variants under `website/assets/media/`, ready for the `picture` srcsets, and then **deletes the
originals** — so after a successful run this folder is empty again. (Keep your own canonical copies of
the originals elsewhere.)

The target aspect ratio is taken from a `_<ratio>` suffix in the filename (e.g. `foo_2x1.jpg`),
or — when there's no suffix — snapped to the nearest configured ratio from the image's own
dimensions and center-cropped to fit. Ratios and output widths are configured under
`sourceImages` in `sonic.config.js`.

Note: this is **not** a sync. It overwrites variants of the same name, but it never deletes media
whose original is gone. When you remove or rename content, delete the stale files under
`website/assets/media/` yourself.
