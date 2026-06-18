#!/usr/bin/env bash
# Prepare the Civildz dev environment: install dependencies, generate the
# Prisma client, and create + seed the SQLite database if it is missing.
# Safe to run repeatedly. Used by the SessionStart hook and for manual setup.
set -euo pipefail

cd "$(dirname "$0")/.."

if [ ! -d node_modules ]; then
  echo "Installing dependencies…"
  npm install --no-audit --no-fund
fi

# Generate the Prisma client (idempotent).
npx prisma generate >/dev/null 2>&1 || true

# Create and seed the database only when it doesn't already exist.
if [ ! -f prisma/dev.db ]; then
  echo "Creating and seeding the database…"
  npx prisma db push --skip-generate
  npx tsx prisma/seed.ts
fi

echo "Civildz environment ready."
