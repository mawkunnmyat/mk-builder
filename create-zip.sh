#!/bin/bash

###############################################################################
# Professional WordPress Plugin ZIP Creator
# 
# Creates a production-ready ZIP file for WordPress plugin installation.
# This script should be run from the plugin directory.
#
# Usage: ./create-zip.sh
# Output: ../mk-builder.zip
###############################################################################

set -euo pipefail  # Exit on error, undefined vars, pipe failures

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PLUGIN_DIR="$SCRIPT_DIR"
PARENT_DIR="$(dirname "$PLUGIN_DIR")"
# WordPress plugin slug / zip root folder name (must match plugin directory on install).
PLUGIN_SLUG="mk-builder"
ZIP_FILE="$PARENT_DIR/${PLUGIN_SLUG}.zip"
PLUGIN_NAME="$(basename "$PLUGIN_DIR")"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Validate we're in the right directory
if [ ! -f "$PLUGIN_DIR/mk-builder.php" ]; then
    print_error "mk-builder.php not found. Are you in the plugin directory?"
    exit 1
fi

if [ ! -d "$PLUGIN_DIR/build" ]; then
    print_warning "Build directory not found. Run 'npm run build' first."
    exit 1
fi

print_info "Creating ZIP file for WordPress plugin..."

# Remove old ZIP if exists
if [ -f "$ZIP_FILE" ]; then
    rm "$ZIP_FILE"
    print_info "Removed existing ZIP file"
fi

# Change to parent directory for zip creation
cd "$PARENT_DIR"

# Verify plugin directory exists
if [ ! -d "$PLUGIN_NAME" ]; then
    print_error "Plugin directory '$PLUGIN_NAME' not found in parent directory"
    exit 1
fi

# Staging directory so the zip root folder is mk-builder/ (WordPress slug), not twork-builder/.
STAGING_DIR="$(mktemp -d "${TMPDIR:-/tmp}/mk-builder-zip.XXXXXX")"
trap 'rm -rf "$STAGING_DIR"' EXIT

print_info "Staging release files into ${PLUGIN_SLUG}/"

rsync -a \
  --exclude='.git' \
  --exclude='.gitignore' \
  --exclude='.gitattributes' \
  --exclude='.cursor' \
  --exclude='.cursorrules' \
  --exclude='.vscode' \
  --exclude='.venv' \
  --exclude='.wp-env.json' \
  --exclude='node_modules' \
  --exclude='src' \
  --exclude='scripts' \
  --exclude='shweghee' \
  --exclude='my-avocado' \
  --exclude='wporg-assets' \
  --exclude='active_context.md' \
  --exclude='progress.md' \
  --exclude='CONFLICT-FIX.md' \
  --exclude='README.md' \
  --exclude='package.json' \
  --exclude='package-lock.json' \
  --exclude='yarn.lock' \
  --exclude='composer.json' \
  --exclude='composer.lock' \
  --exclude='webpack.config.js' \
  --exclude='babel.config.js' \
  --exclude='tsconfig.json' \
  --exclude='tsconfig*.json' \
  --exclude='.eslintrc*' \
  --exclude='.prettierrc*' \
  --exclude='.editorconfig' \
  --exclude='.distignore' \
  --exclude='create-zip.sh' \
  --exclude='zip-plugin.sh' \
  --exclude='tests' \
  --exclude='phpunit.xml' \
  --exclude='phpcs.xml' \
  --exclude='*.html' \
  --exclude='*.log' \
  --exclude='*.map' \
  --exclude='*.scss' \
  --exclude='.DS_Store' \
  --exclude='.env' \
  --exclude='.env.*' \
  "$PLUGIN_NAME/" "$STAGING_DIR/$PLUGIN_SLUG/"

# Create ZIP from staged mk-builder/ folder only (runtime files).
if (cd "$STAGING_DIR" && zip -r -q "$ZIP_FILE" "$PLUGIN_SLUG/"); then
    
    if [ -f "$ZIP_FILE" ]; then
        ZIP_SIZE=$(du -h "$ZIP_FILE" | cut -f1)
        FILE_COUNT=$(unzip -l "$ZIP_FILE" 2>/dev/null | tail -1 | awk '{print $2}' || echo "N/A")
        
        print_success "ZIP file created successfully"
        echo -e "  ${BLUE}Location:${NC} $ZIP_FILE"
        echo -e "  ${BLUE}Size:${NC} $ZIP_SIZE"
        if [ "$FILE_COUNT" != "N/A" ]; then
            echo -e "  ${BLUE}Files:${NC} $FILE_COUNT"
        fi
        echo ""
        print_success "Ready for WordPress upload!"
        echo "  Upload via: WordPress Admin → Plugins → Add New → Upload Plugin"
        exit 0
    else
        print_error "ZIP file was not created"
        exit 1
    fi
else
    print_error "Failed to create ZIP file"
    exit 1
fi
