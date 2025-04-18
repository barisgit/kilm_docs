---
title: setup
description: Configure KiCad to use the registered libraries.
---

The `kilm setup` command reads your KiLM configuration and modifies KiCad's configuration files to reflect the registered libraries and environment variables.

It performs the following main actions:

1.  Finds KiCad configuration files (`sym-lib-table`, `fp-lib-table`, `kicad_common.json`).
2.  Creates timestamped backups of these files (number controlled by `--max-backups`).
3.  Determines which libraries (symbol/footprint and 3D) to configure based on options.
4.  Reads library metadata (if available) to find associated environment variable names (e.g., `KICAD_USER_LIB`).
5.  Updates KiCad's environment variables (`kicad_common.json`).
6.  Updates KiCad's symbol and footprint library tables (`sym-lib-table`, `fp-lib-table`).
7.  Optionally updates KiCad's pinned libraries list (`kicad_common.json`) via `--pin-libraries`.
8.  Attempts to fix known invalid URI formats in library tables.

**Important:** You usually need to restart KiCad after running `kilm setup` for all changes to take effect.

## Usage

```bash
kilm setup [OPTIONS]
```

## Options

- `--kicad-lib-dir TEXT`: 
  Directly specify the path for the primary symbol/footprint library directory. This path might be used to set a default environment variable like `KICAD_USER_LIB` if not otherwise specified by library metadata. Overrides environment variables (`KICAD_USER_LIB`).
  *Example:* `kilm setup --kicad-lib-dir /path/to/my/symbols`

- `--kicad-3d-dir TEXT`: 
  Directly specify the path for the primary 3D models directory. This path might be used to set a default environment variable like `KICAD_3D_LIB`. Overrides environment variables (`KICAD_3D_LIB`).
  *Example:* `kilm setup --kicad-3d-dir /path/to/my/3dmodels`

- `--symbol-lib-dirs TEXT`: 
  Specify a comma-separated list of library *names* (as defined in KiLM config) to set up. Only these specific symbol/footprint libraries will be configured. This takes precedence over the default behavior and `--all-libraries`.
  *Example:* `kilm setup --symbol-lib-dirs "main-lib,project-lib"`

- `--threed-lib-dirs TEXT`: 
  Specify a comma-separated list of 3D library *names* (as defined in KiLM config) to set up. Only the environment variables for these specific 3D libraries will be configured. This takes precedence over the default behavior and `--all-libraries`.
  *Example:* `kilm setup --threed-lib-dirs "my-3d-models,official-3d"`

- `--all-libraries`: 
  Configure *all* libraries (both symbol/footprint and 3D) registered in KiLM's `config.yaml`. Without this flag, only the *current* symbol/footprint library and the *current* 3D library (as defined in `config.yaml` or derived) are configured by default.
  *Example:* `kilm setup --all-libraries`

- `--max-backups INTEGER`: 
  Maximum number of timestamped backups KiLM should keep for each KiCad configuration file it modifies. Default: `5`.
  *Example:* `kilm setup --max-backups 10`

- `--pin-libraries / --no-pin-libraries`: 
  Default: `--pin-libraries`.
  Controls whether the configured libraries should be added to KiCad's "Pinned Libraries" list for quick access in the managers.
  *Example:* `kilm setup --no-pin-libraries`

- `--dry-run`: 
  Show the changes KiLM would make to KiCad's configuration files without actually modifying them. Output is printed to the terminal.
  *Example:* `kilm setup --dry-run`

- `-v, --verbose`: 
  Show detailed output during the setup process, useful for debugging.
  *Example:* `kilm setup --verbose`

- `--help`: 
  Show this help message and exit.

## Behavior Details

- **Library Selection:** By default (without `--all-libraries`), `setup` configures only the *current* symbol/footprint library and the *current* 3D model library registered in KiLM. Use `--all-libraries` to configure all registered libraries, or `--symbol-lib-dirs` / `--threed-lib-dirs` to configure specific named libraries.
- **Environment Variables:** KiLM attempts to read metadata (e.g., `kilm.yaml` or `.kilm_cloud_metadata`) to find the correct environment variable name (like `KICAD_COMPANY_LIB`) associated with each library path. If specific `--kicad-lib-dir` or `--kicad-3d-dir` options are given, they might influence default variables like `KICAD_USER_LIB` or `KICAD_3D_LIB`.
- **Backups:** Backups are crucial for recovery if KiCad's configuration gets corrupted. They are stored in the same directory as the KiCad configuration files and are named with a timestamp.

## Examples

**Setup Current Libraries (Default):**
Configure only the current symbol/footprint library and current 3D library.

```bash
kilm setup
```

**Setup All Registered Libraries:**
Configure all libraries defined in `config.yaml`.

```bash
kilm setup --all-libraries
```

**Setup Specific Libraries:**
Only configure the symbol/footprint libraries named `main-lib` and `project-lib`, and the 3D library named `my-3d-models`.

```bash
kilm setup --symbol-lib-dirs "main-lib,project-lib" --threed-lib-dirs "my-3d-models"
```

**Setup with Specific Paths and No Pinning:**
Use specific paths for default libs (this might not be relevant if not configuring the default libs) and disable adding them to pinned libraries.

```bash
kilm setup --kicad-lib-dir /srv/kicad/symbols --kicad-3d-dir /srv/kicad/3d --no-pin-libraries
```

**Preview Changes (Default - Current Libs):**
See what changes `kilm setup` would make for the current libraries without applying them.

```bash
kilm setup --dry-run
```

**Preview Changes (All Libs):**
See what changes `kilm setup` would make for all libraries without applying them.

```bash
kilm setup --all-libraries --dry-run
```

**Verbose Dry Run (Current Libs):**
Get detailed output about the planned changes for current libraries.

```bash
kilm setup --dry-run --verbose
```
