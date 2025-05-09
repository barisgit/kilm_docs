---
title: status
description: Check the current KiLM and KiCad configuration status.
---

The `kilm status` command provides a summary of the current KiLM setup and relevant KiCad configurations.

## Usage

```bash
kilm status [OPTIONS]
```

## Options

- `--help`: 
  Show the help message and exit.

## Behavior

The command gathers and displays information about:

- **KiLM Configuration:** Details from `config.yaml`, such as registered library names and potentially paths.
- **KiCad Configuration Directory:** The location KiLM detected for KiCad's configuration files.
- **KiCad Environment Variables:** Lists the environment variables currently set within KiCad's `kicad_common.json` file.
- **KiCad Pinned Libraries:** Shows the symbol and footprint libraries currently marked as favorites (pinned) in `kicad_common.json`.
- **KiCad Configured Libraries:** Lists the symbol and footprint libraries currently present in KiCad's `sym-lib-table` and `fp-lib-table`.

## Example

```bash
kilm status
```

*Expected Output (example structure):*
```text
KILM Configuration:
  Configured Libraries:
    GitHub Libraries (symbols/footprints):
      - main-lib: /path/to/main-lib (current)
        Metadata: Yes
      - project-lib: /path/to/project-lib
        Metadata: Yes
    Cloud Libraries (3D models):
      - shared-3d: /path/to/shared-3d (current)
        Metadata: Yes
      - kicad-official-3d: /path/to/kicad-official-3d
  Current Library: /path/to/main-lib
  Max Backups: 5

--- KiCad Configuration ---
KiCad configuration directory: /home/user/.config/kicad/7.0/

Environment Variables in KiCad:
  KICAD_USER_LIB = /path/to/main-lib
  PROJECT_LIB = /path/to/project-lib
  SHARED_3D = /path/to/shared-3d
  KICAD7_3DMODEL_DIR = /path/to/kicad-official-3d

Pinned Libraries in KiCad:
  Symbol Libraries:
    - Device
    - main-lib
  Footprint Libraries:
    - Package_SO
    - main-lib

Configured Symbol Libraries:
  - Device: ${KICAD7_SYMBOL_DIR}/Device.kicad_sym
  - main-lib: ${KICAD_USER_LIB}/main-lib.kicad_sym
  - project-lib: ${PROJECT_LIB}/project-lib.kicad_sym

Configured Footprint Libraries:
  - Capacitor_SMD: ${KICAD7_FOOTPRINT_DIR}/Capacitor_SMD.pretty
  - main-lib: ${KICAD_USER_LIB}/main-lib.pretty
  - project-lib: ${PROJECT_LIB}/project-lib.pretty
```

This command is useful for verifying that your `kilm setup` commands have applied correctly and for understanding the current state recognised by both KiLM and KiCad. 