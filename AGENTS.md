# Agent Instructions

## GitHub Actions

- Every third-party `uses:` in `.github/workflows/` pins a full commit SHA with its version in a comment: `actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7.0.1`. Never a tag or branch.
- GitHub enforces this for the repo ("Require actions to be pinned to a full-length commit SHA"), so an unpinned reference fails the run.
- To add or upgrade an action, run `pinact run` to write the SHA and comment. Don't copy a SHA from memory.
- Dependabot (`.github/dependabot.yml`) opens grouped `ci:` PRs to keep the pins current.
