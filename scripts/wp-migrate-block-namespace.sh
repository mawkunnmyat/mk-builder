#!/bin/bash
# Migrate saved block markup: wp:twork/* → wp:mk/*
# Usage (staging first):
#   wp search-replace 'wp:twork/' 'wp:mk/' --all-tables --precise --dry-run
#   wp search-replace 'wp:twork/' 'wp:mk/' --all-tables --precise
set -euo pipefail
echo "Dry-run:"
wp search-replace 'wp:twork/' 'wp:mk/' --all-tables --precise --dry-run
echo ""
read -r -p "Apply migration? [y/N] " confirm
if [[ "${confirm}" == "y" || "${confirm}" == "Y" ]]; then
	wp search-replace 'wp:twork/' 'wp:mk/' --all-tables --precise
	echo "Done."
else
	echo "Aborted."
fi
