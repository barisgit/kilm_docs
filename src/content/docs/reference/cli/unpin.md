---
title: unpin
description: Remove libraries from KiCad's pinned (favorite) list.
---

The `kilm unpin` command removes specified symbol and/or footprint libraries from KiCad's "Pinned Libraries" list.

It operates by modifying the `pinned_symbol_libs` and `pinned_fp_libs` arrays within KiCad's `kicad_common.json` configuration file.

**Note:** Changes require restarting KiCad.

## Usage

```bash
kilm unpin [OPTIONS]
```

## Options

- `-s, --symbols TEXT`: 
  Specify the name of a symbol library currently in the pinned list to remove. Use this option multiple times to unpin several libraries.
  *Example:* `kilm unpin -s Device -s MyCustomSymbols`

- `-f, --footprints TEXT`: 
  Specify the name of a footprint library currently in the pinned list to remove. Use this option multiple times to unpin several libraries.
  *Example:* `kilm unpin -f Package_SO -f MyCustomFootprints`

- `--all`: 
  Unpin *all* currently pinned symbol and footprint libraries. Cannot be used if `-s` or `-f` are specified.
  *Example:* `kilm unpin --all`

- `--dry-run`: 
  Show which libraries would be removed from the pinned list without actually modifying `kicad_common.json`.
  *Example:* `kilm unpin --all --dry-run`

- `--max-backups INTEGER`: 
  Maximum number of timestamped backups KiLM should keep for `kicad_common.json`. Default: `5`.
  *Example:* `kilm unpin --max-backups 3`

- `-v, --verbose`: 
  Show detailed output during the unpinning process.
  *Example:* `kilm unpin -s MyLib --verbose`

- `--help`: 
  Show this help message and exit.

## Behavior

1.  Locates the KiCad configuration directory and `kicad_common.json`.
2.  Creates a backup of `kicad_common.json` (unless `--dry-run`).
3.  Reads the current pinned lists (`pinned_symbol_libs`, `pinned_fp_libs`) from `kicad_common.json`.
4.  Determines the target libraries:
    - If `--all`, targets all libraries found in the lists.
    - Otherwise, targets libraries specified via `-s` and `-f`.
5.  Removes the target library names from the respective lists.
6.  Writes the updated lists back to `kicad_common.json` (unless `--dry-run`).

## Examples

**Unpin specific libraries:**
```bash
kilm unpin -s ObsoleteSymLib -f OldFootprintLib
```

**Unpin all libraries:**
```bash
kilm unpin --all
```

**Preview unpinning specific libraries:**
```bash
kilm unpin -s Device -f Package_SO --dry-run
```

**Unpin all libraries with verbose output:**
```bash
kilm unpin --all -v
``` 