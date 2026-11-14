<?php

namespace App\Models\Concerns;

// Translated fields live in the `i18n` JSON column: {"bn": {"name": "...", "roles": [...], ...}}.
// English is the source of truth: `{field}_en` columns for text, plain columns for JSON lists.
trait HasI18n
{
    public function initializeHasI18n(): void
    {
        $this->mergeCasts(['i18n' => 'array']);
    }

    /** Field in the current locale, falling back to a legacy `{field}_{locale}` column, then English. */
    public function tr(string $field): mixed
    {
        $locale = app()->getLocale();
        if ($locale !== 'en') {
            $v = data_get($this->i18n, "{$locale}.{$field}");
            if ($v !== null && $v !== '' && $v !== []) {
                return $v;
            }
            $legacy = $this->getAttributes()["{$field}_{$locale}"] ?? null;
            if ($legacy) {
                return $legacy;
            }
        }

        return array_key_exists("{$field}_en", $this->getAttributes()) ? $this->getAttribute("{$field}_en") : $this->getAttribute($field);
    }
}
