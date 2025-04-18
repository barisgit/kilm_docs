---
title: update
description: Update configured Git-based libraries using `git pull`.
---

The `kilm update` command attempts to update all configured symbol, footprint, and template libraries (type `github`) that are identified as Git repositories by running `git pull` within their directories.

This command helps keep your local copies of shared libraries synchronized with their remote Git repositories.

## Usage

```bash
kilm update [OPTIONS]
```

## Options

- `--dry-run`: 
  Show which libraries are detected as Git repositories and would be updated, but do not actually run `git pull`.
  *Example:* `kilm update --dry-run`

- `--verbose`: 
  Show detailed output during the update process, including the full output from the `git pull` commands.
  *Example:* `kilm update --verbose`

- `--auto-setup`: 
  If the `git pull` operation results in changes that likely require updating KiCad's configuration (e.g., new symbol or footprint libraries detected), automatically run `kilm setup` after the updates are complete. Default: `False`.
  *Example:* `kilm update --auto-setup`

- `--help`: 
  Show the help message and exit.

## Behavior

1.  **Reads KiLM Config:** Loads library information from `config.yaml`.
2.  **Identifies `github` Libraries:** Filters for libraries with type `github`.
3.  **Checks for `.git`:** For each library path, checks if it exists and contains a `.git` directory.
4.  **Runs `git pull`:** If it's a valid Git repository, navigates into the directory and executes `git pull` (unless `--dry-run`).
5.  **Checks for Changes:** After a successful pull, analyzes the output and file system to detect if new symbol libraries (`.kicad_sym`), footprint libraries (`.pretty`), or templates (`templates/*/metadata.yaml`) were added.
6.  **Reports & Optional Setup:** Summarizes the update results. If changes requiring configuration updates were detected, it recommends running `kilm setup` or runs it automatically if `--auto-setup` was specified.

## Examples

**Update all Git-based libraries:**
```bash
kilm update
```

**Preview which libraries would be updated:**
```bash
kilm update --dry-run
```

**Update libraries with detailed output:**
```bash
kilm update --verbose
```

**Update libraries and automatically run setup if needed:**
```bash
kilm update --auto-setup
```

**Note:** If `git pull` fails (e.g., due to local changes or merge conflicts), you will need to resolve the issues manually within the affected repository directory using standard Git commands before `kilm update` can succeed for that library. 