---
title: Troubleshooting
description: Solutions to common issues with KiLM.
---

Here are some common problems you might encounter when using KiLM and how to resolve them.

## 1. KiCad Configuration Not Found

- **Symptom:** KiLM commands fail with an error message indicating it cannot find KiCad's configuration directory or files (like `kicad_common.json`, `sym-lib-table`, `fp-lib-table`).
- **Cause:** KiCad needs to create its configuration files the first time it runs. If you installed KiCad but haven't opened it yet, these files won't exist.
- **Solution:** Launch KiCad (the main application) at least once. This will initialize its configuration directory and files in the standard location for your operating system. Afterwards, KiLM should be able to find them.

## 2. Changes Not Appearing in KiCad

- **Symptom:** You successfully ran `kilm setup` or `kilm pin`/`unpin`, but the new libraries, environment variables, or pinned status aren't reflected when you use KiCad.
- **Cause:** KiCad typically loads its configuration files only when it starts up.
- **Solution:** **Restart KiCad completely.** Close all KiCad windows (main application, Eeschema, Pcbnew, etc.) and then reopen it. The changes made by KiLM should now be loaded.

## 3. Environment Variables Not Working (Legacy Method)

- **Symptom:** You are using the older method of setting environment variables directly in your shell (e.g., `export KICAD_USER_LIB=...` in Bash/Zsh) instead of using `kilm setup`, and KiCad doesn't seem to recognize them.
- **Cause:** Shell environment variables are typically only inherited by processes launched *after* the variable has been set and exported in that *same* shell session or its children. System-wide environment variable changes might require a logout/login or restart.
- **Solution:**
    - **Shell:** Ensure you have restarted your terminal/shell session after setting the variable. If you added it to a startup file (like `.bashrc`, `.zshrc`, `.profile`), make sure you've sourced the file (`source ~/.bashrc`) or opened a new terminal window.
    - **System (Windows):** After using `SetEnvironmentVariable` in PowerShell or editing System Properties, you might need to restart KiCad, or potentially log out and back in, for the changes to take effect globally.
    - **Recommendation:** Use `kilm setup` to manage KiCad environment variables, as it modifies KiCad's internal `kicad_common.json` file, which is generally more reliable than relying on shell environment variables.

## 4. Template Creation Failing (`kilm template make`)

- **Symptom:** The `kilm template make` command fails or produces an incomplete/incorrect template.
- **Cause:** This can happen if the source project directory contains unexpected or non-standard files/directories that interfere with the template creation logic (e.g., complex build artifacts, temporary files, unusual symlinks).
- **Solution:**
    - **Clean Project:** Ensure your source project directory is clean and doesn't contain unnecessary temporary or build files.
    - **Use `--exclude`:** Identify the problematic files or directories and use the `--exclude` option (which accepts glob patterns) to prevent KiLM from including them in the template. You can use `--exclude` multiple times.
      ```bash
      kilm template make my-template --exclude "*.tmp" --exclude "build/*" --exclude ".cache/"
      ```
    - **Check Permissions:** Ensure KiLM has read permissions for all files in the source project directory and write permissions in the target library's `templates` directory.

## 5. Incorrect Library Paths in KiCad

- **Symptom:** Libraries appear in KiCad but have the wrong path, often showing the absolute path where `kilm setup` was run instead of using an environment variable.
- **Cause:** You might not have specified an `--env-var` when running `kilm init` or `kilm add-3d` for the relevant library.
- **Solution:**
    1.  **(Optional) Remove Incorrect Entry:** You might want to manually remove the incorrect library entry from KiCad's `sym-lib-table`/`fp-lib-table` or the incorrect variable from `kicad_common.json` first (remember KiLM creates backups).
    2.  **Update KiLM Config:** Manually edit `~/.config/kicad-lib-manager/config.yaml` (or equivalent) and add the desired `env_var: YOUR_VAR_NAME` key/value pair to the library entry.
    3.  **Run Setup:** Execute `kilm setup` again. It should now use the environment variable when configuring KiCad.
    4.  **Restart KiCad:** Restart KiCad to see the changes.

## Getting More Help

- Use the `--verbose` flag with commands like `kilm setup` or `kilm update` to get more detailed output.
- Use `kilm status` to check the current configuration state.
- Check the KiLM issue tracker on GitHub: [https://github.com/barisgit/kilm/issues](https://github.com/barisgit/kilm/issues) or submit a request here: [https://aristovnik.me/contact](https://aristovnik.me/contact)