#!/usr/bin/env bash
# Builds the three upload files in dist/: bidri-crafts.zip (theme),
# bidri-setup.zip (setup script, content and the Studio plugin) and
# bidri-studio.zip (spare copy of the Studio plugin).
set -euo pipefail
cd "$(dirname "$0")/.."
rm -rf dist && mkdir -p dist/tmp
(cd theme && zip -qr -X ../dist/bidri-crafts.zip bidri-crafts -x '*.DS_Store')
cp -a setup dist/tmp/bidri-setup
(cd dist/tmp && zip -qr -X ../bidri-setup.zip bidri-setup -x '*.DS_Store')
(cd setup/plugins && zip -qr -X ../../dist/bidri-studio.zip bidri-studio -x '*.DS_Store')
rm -rf dist/tmp
ls -lh dist
