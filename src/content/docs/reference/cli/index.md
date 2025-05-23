---
title: Overview
description: An overview of the KiLM Command-Line Interface (CLI) commands.
---

KiLM (KiCad Library Manager) provides a set of commands to help you manage your KiCad libraries, configurations, templates, and environment variables.

Each command focuses on a specific task. Below is a list of available commands. Click on a command name to view its detailed documentation, including usage, options, and examples.

## Available Commands

- [`init`](/reference/cli/init/): Initialize a directory as a KiLM-managed library collection.
- [`add-3d`](/reference/cli/add-3d/): Register a directory containing 3D models.
- [`config`](/reference/cli/config/): View and manage KiLM configuration settings and registered libraries.
- [`setup`](/reference/cli/setup/): Configure KiCad (library tables, environment variables) based on KiLM settings.
- [`pin`](/reference/cli/pin/): Add libraries to KiCad's pinned (favorite) list.
- [`unpin`](/reference/cli/unpin/): Remove libraries from KiCad's pinned list.
- [`template`](/reference/cli/template/): Create and manage KiCad project templates.
- [`list`](/reference/cli/list/): List symbol and footprint libraries found within a specified directory.
- [`status`](/reference/cli/status/): Check the current KiLM and KiCad configuration status.
- [`update`](/reference/cli/update/): Update Git-based libraries using `git pull`.
- [`add-hook`](/reference/cli/add-hook/): Add a Git post-merge hook to automatically run `kilm update`.

Use the sidebar navigation or the links above to explore each command in detail. 