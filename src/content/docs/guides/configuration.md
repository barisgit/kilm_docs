---
title: Configuration
description: Understanding KiLM configuration files.
---

> **Note:** Both **Creators** and **Consumers** may need to understand the configuration, but **Creators** are more likely to directly manage the library entries within `config.yaml`.

KiLM stores its main configuration file, `config.yaml`, in a standard user configuration directory:

- **Linux/macOS**: `~/.config/kicad-lib-manager/config.yaml` (following XDG Base Directory specification)
- **Windows**: Typically `C:\Users\<YourUsername>\.config\kicad-lib-manager\config.yaml` (derived from `Path.home()`)

## Main Configuration File (`config.yaml`)

The primary configuration file, `config.yaml`, is located within the configuration directory mentioned above. This file stores information about:

- **Registered Libraries (`libraries`):** A list containing details about the libraries managed by KiLM. Each library entry includes:
    - `name`: A unique identifier for the library.
    - `path`: The absolute path to the library's directory.
    - `type`: Specifies the kind of library. Common types include:
        - `github`: Typically used for standard symbol and footprint libraries, often managed via Git.
        - `cloud`: Used for 3D model libraries.
- **Current Library (`current_library`):** The path to the library currently considered "active" by KiLM. This path is used by commands like `status` and others. It can be set using the `kilm config set-default` command.
- **Maximum Backups (`max_backups`):** An integer defining the maximum number of timestamped backups KiLM should keep when modifying KiCad's native configuration files.

This file is automatically managed by KiLM when you use commands like `init`, `add-3d`, `config set-default`, etc. Manual editing is usually not required but possible if needed.

Example structure:

```yaml
current_library: /path/to/your/main-kicad-library
libraries:
- name: my-company-kicad-library
  path: /path/to/your/main-kicad-library
  type: github
- name: shared-3d-models
  path: /path/to/shared/3d-models
  type: cloud
- name: my-company-another-library
  path: /path/to/your/other-kicad-library
  type: github
max_backups: 5
```

## KiCad Configuration Files

KiLM interacts directly with KiCad's own configuration files to add libraries, set environment variables, and manage pinned libraries. KiLM automatically detects the location of these files (usually within KiCad's user settings directory).

**Important:** KiLM creates timestamped backups of KiCad's configuration files (e.g., `fp-lib-table`, `sym-lib-table`, `kicad_common.json`) in a `kilm_backups` subdirectory within KiCad's configuration folder *before* making any changes. The number of backups retained is controlled by the `max_backups` setting in `config.yaml`. This allows you to easily revert if something goes wrong. 