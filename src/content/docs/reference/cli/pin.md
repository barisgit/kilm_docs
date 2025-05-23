---
title: pin
description: Add libraries to KiCad's pinned (favorite) list.
---

The `kilm pin` command adds specified symbol and/or footprint libraries to KiCad's "Pinned Libraries" list, making them easily accessible in the symbol and footprint choosers.

It operates by modifying the `pinned_symbol_libs` and `pinned_fp_libs` arrays within KiCad's `kicad_common.json` configuration file.

**Note:** Changes require restarting KiCad.

## Usage

```bash
kilm pin [OPTIONS]
```

## Options

- `--kicad-lib-dir TEXT`: 
  Specify the path to the KiCad library directory containing the libraries you want to pin.
  If not provided, KiLM will look for the `KICAD_USER_LIB` environment variable.
  This directory is scanned to find available libraries if `--all` is used or to validate specified library names.
  *Default:* Uses `KICAD_USER_LIB` environment variable.
  *Example:* `kilm pin --kicad-lib-dir /path/to/libs -s MyLib`

- `-s, --symbols TEXT`: 
  Specify the name of a symbol library (`.kicad_sym` file, without extension) to pin. Use this option multiple times to pin several libraries.
  *Example:* `kilm pin -s Device -s MyCustomSymbols`

- `-f, --footprints TEXT`: 
  Specify the name of a footprint library (`.pretty` directory, without extension) to pin. Use this option multiple times to pin several libraries.
  *Example:* `kilm pin -f Package_SO -f MyCustomFootprints`

- `--all / --selected`: 
  Determines which libraries to pin. 
  - `--all` (Default): Pins *all* symbol and footprint libraries found within the directory specified by `--kicad-lib-dir`. Cannot be used if `-s` or `-f` are specified.
  - `--selected`: Pins only the libraries explicitly listed using `-s` or `-f`. This is implicitly active when `-s` or `-f` are used.
  *Example (pin all):* `kilm pin --all`

- `--dry-run`: 
  Show which libraries would be added to the pinned list without actually modifying `kicad_common.json`.
  *Example:* `kilm pin --all --dry-run`

- `--max-backups INTEGER`: 
  Maximum number of timestamped backups KiLM should keep for `kicad_common.json`. Default: `5`.
  *Example:* `kilm pin --max-backups 3`

- `-v, --verbose`: 
  Show detailed output during the pinning process, including listing libraries found and pinned.
  *Example:* `kilm pin -s MyLib --verbose`

- `--help`: 
  Show this help message and exit.

## Behavior

1.  Locates the KiCad configuration directory and `kicad_common.json`.
2.  Determines the target library directory using `--kicad-lib-dir` or `KICAD_USER_LIB`.
3.  If `--all` is active (default and no `-s`/`-f`), lists all symbol/footprint libraries in the target directory.
4.  If specific libraries are provided via `-s`/`-f`, validates they exist in the target directory (issues a warning if not found).
5.  Creates a backup of `kicad_common.json` (unless `--dry-run`).
6.  Reads the current pinned lists from `kicad_common.json`.
7.  Adds the names of the determined libraries (all or selected) to the respective lists.
8.  Writes the updated lists back to `kicad_common.json` (unless `--dry-run`).

## Examples

**Pin specific libraries:**
```bash
kilm pin -s MySymbolLib -s AnotherLib -f MyFootprintLib
```

**Pin all libraries found in the default directory:**
(Assumes `KICAD_USER_LIB` is set)
```bash
kilm pin --all 
# Or simply:
kilm pin
```

**Pin all libraries in a specific directory:**
```bash
kilm pin --kicad-lib-dir /path/to/company/libs --all
```

**Preview pinning all libraries:**
```bash
kilm pin --all --dry-run
```

**Pin specific libraries with verbose output:**
```bash
kilm pin -s Device -f Resistor_SMD -v
``` 