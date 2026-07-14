# Phase 1 — Working Like a Developer

You already know Python syntax now (Phase 0). This phase is about the habits and tools around the code — the stuff that separates "someone who can write a script" from "someone who can maintain a real project." Estimated time: 3-5 days at your pace.

---

## 1. Virtual environments — the "why," not just the "how"

You've already run `conda create -n urban-analytics python=3.11`. Here's what's actually happening:

Every environment is a **completely separate folder** with its own Python interpreter and its own installed packages. When you `conda activate urban-analytics`, you're telling your terminal "use the Python and packages inside *this* folder, ignore all others."

**Why this matters:** imagine two projects — one needs `pandas 1.5` (an older client project), another needs `pandas 2.2` (your current work). Without environments, installing one version would break the other project. Environments let both exist on the same machine without conflict.

**Quick check — prove you understand this:**
Run this in your `urban-analytics` environment:
```bash
where python
```
Then run:
```bash
conda deactivate
where python
```
You should see two *different* paths. That difference is the entire point of environments — same command, different Python depending on which environment is active.

---

## 2. `pip` vs `conda` — when to use which

- **`conda install`** — use this first, especially for anything with C/C++ dependencies (GeoPandas, GDAL, rasterio). Conda handles binary dependencies conda-forge has already compiled correctly for your OS.
- **`pip install`** — use this for pure-Python packages not available on conda-forge, or packages that only exist on PyPI.

**Rule of thumb for your work:** try `conda install -c conda-forge <package>` first. Only fall back to `pip install <package>` if conda-forge doesn't have it. Mixing them carelessly (lots of pip installs into a conda environment) can eventually cause dependency conflicts — not immediately dangerous, but worth being deliberate about.

---

## 3. Git basics

Git tracks changes to your code over time and lets you push it to GitHub (where your `addis-transit-access` repo already lives).

**Core commands, in the order you'll actually use them:**

```bash
git init                          # turn a folder into a Git repository (once, per project)
git status                        # see what's changed since your last commit
git add .                         # stage all changed files for commit
git add specific_file.py          # or stage just one file
git commit -m "Add pop density function"   # save a snapshot with a message
git push                          # send your commits to GitHub
git log --oneline                 # see your commit history
```

**`.gitignore`** — a file listing things Git should *never* track: your `data/raw` folder (often too large/sensitive for GitHub), `__pycache__`, `.ipynb_checkpoints`, your conda environment folder. Example for your project type:

```
data/raw/
__pycache__/
.ipynb_checkpoints/
*.pyc
.vscode/
```

**Hands-on exercise:**
1. Navigate to your `urban-analytics-projects` folder in the terminal
2. Run `git init` (skip if you already did this when you first set up the repo)
3. Create a `.gitignore` file with the content above
4. Make a small change to any file (e.g., `test.py`)
5. Run `git status` — see it listed as modified
6. Run `git add .` then `git commit -m "test commit"`
7. Run `git log --oneline` — confirm your commit shows up

---

## 4. Reading tracebacks

This is a skill most beginners skip and pay for later. A traceback isn't a wall of scary text — it's a map, read from the **bottom up**:

- **Last line** — the actual error type and message. Always read this first.
- **The line right above it** — the exact line of code that failed.
- **Everything above that** — the "call stack," i.e. what called what, in order. Usually irrelevant for simple scripts; matters more once you're using libraries with many internal layers.

**Practice — 5 broken scripts:**

I've attached five standalone `.py` files, each with exactly one bug. Your job: run each one in your VS Code terminal, read the traceback, and fix the bug **without asking me** unless you're stuck for real.

```bash
python broken_1.py
python broken_2.py
python broken_3.py
python broken_4.py
python broken_5.py
```

For each one:
1. Read the last line of the traceback — what error type is it?
2. Read the line above it — which line of code triggered it?
3. Fix the actual bug (not just silence the error — e.g., don't wrap it in `try/except` to make it "go away," actually fix the root cause)
4. Re-run to confirm it works

These cover five error types you'll hit constantly in real geo/data work: `KeyError`, `TypeError`, `IndexError`, `FileNotFoundError`, `ZeroDivisionError`. Once you can diagnose these on sight, you'll debug OSMnx/GeoPandas errors much faster too, since most of their errors are these same five types wrapped in more library-specific language.

---

## 5. VS Code debugger — stepping through code instead of guessing

Instead of scattering `print()` statements everywhere, VS Code lets you pause execution and inspect variables at any line.

**Try it on `broken_5.py` (or your fixed version):**

1. Open the file in VS Code
2. Click just to the left of the line number for the line `density = subcity_population[name] / area` — a red dot (breakpoint) appears
3. Press `F5` (or the Run/Debug icon in the sidebar → "Run and Debug" → "Python File")
4. Execution pauses right before that line
5. Hover over `name` and `area` in the editor — VS Code shows you their current values
6. Press `F10` to step to the next line, or `F5` to continue running
7. Look at the "Variables" panel on the left — it lists every variable currently in scope

This is dramatically faster than print-debugging once a script gets more than ~30 lines, because you can inspect *everything* at a paused moment instead of guessing which print statement to add next.

---

## Checkpoint — Phase 1

1. Fix all 5 broken scripts using traceback-reading only (no trial-and-error guessing)
2. Successfully `git init`, commit, and (if you want) push a small change to your `addis-transit-access` or `urban-analytics-projects` repo
3. Use the VS Code debugger to step through `broken_1.py` (fixed version) and confirm you can see `target` and `subcity_population` in the Variables panel at a breakpoint

Once these three are done, you're ready for **Phase 2 — Pandas from true basics**.
