<?php

namespace App\Support;

// Reads public/img/manifest.json written by scripts/build-images.mjs.
// Returns null for images that haven't been generated yet, so the UI falls back gracefully.
class Img
{
    private static ?array $manifest = null;

    public static function get(string $key): ?array
    {
        self::$manifest ??= json_decode(@file_get_contents(public_path('img/manifest.json')) ?: '{}', true) ?: [];

        return self::$manifest[$key] ?? null;
    }
}
