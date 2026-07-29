#!/usr/bin/env bash
# Pre-push hook -- static QA scan (S-QA-STATIC-PREPUSH-HOOK-001, 2026-07-29).
# Non-blocking: always exits 0. Runs the three static checks from
# hal-stack/governance/ux-qa-lessons-2026-07-28.md Lessons 1-3 against the
# diff being pushed and prints WARN lines to the console (does not block
# the push, does not file anything anywhere -- console-only, read it or
# don't). Same "warn, log, never block" convention as the sibling
# two-birds-portfolio pre-push hook.
#
# TRACKED COPY -- git does not clone .git/hooks/, so this file is the
# reusable, version-controlled source. Install it with:
#   cp quality/pre-push-hook.sh .git/hooks/pre-push && chmod +x .git/hooks/pre-push
# The actual checker script lives in the two-birds-portfolio repo
# (hal-stack/sprint-system/static-qa-prepush-check.py) since it is
# reused across product repos, not duplicated per-repo.

set +e
set -u

CHECKER="/c/twobirds/two-birds-portfolio/hal-stack/sprint-system/static-qa-prepush-check.py"

if [ ! -f "$CHECKER" ]; then
    exit 0
fi

remote_commits=""
while read local_ref local_sha remote_ref remote_sha; do
    if [ "$local_sha" = "0000000000000000000000000000000000000000" ]; then
        continue  # deleted branch
    fi
    if [ "$remote_sha" = "0000000000000000000000000000000000000000" ]; then
        range="$local_sha"
    else
        range="${remote_sha}..${local_sha}"
    fi
    remote_commits="${remote_commits} ${range}"
done

if [ -z "${remote_commits// }" ]; then
    exit 0
fi

git diff $remote_commits -- '*.html' '*.js' '*.css' 2>/dev/null | python "$CHECKER" || true

exit 0
