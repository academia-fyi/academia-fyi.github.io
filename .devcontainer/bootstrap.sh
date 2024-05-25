#!/usr/bin/env bash

cd /academia.fyi

pnpm config set store-dir ~/.local/share/pnpm/store
pnpm install
