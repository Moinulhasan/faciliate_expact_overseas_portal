<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Country extends Model
{
    protected $guarded = [];

    protected $casts = [
        'requirements' => 'array',
        'steps' => 'array',
        'top_trades' => 'array',
        'sectors' => 'array',
        'faqs' => 'array',
        'is_active' => 'boolean',
        'lat' => 'float',
        'lng' => 'float',
    ];

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function scopeActive(Builder $q): void
    {
        $q->where('is_active', true);
    }

    public function jobOpenings(): HasMany
    {
        return $this->hasMany(JobOpening::class);
    }

    public function getNameAttribute(): string
    {
        return $this->{'name_'.app()->getLocale()} ?: $this->name_en;
    }

    private function t(string $field): ?string
    {
        return $this->{"{$field}_".app()->getLocale()} ?: $this->{"{$field}_en"};
    }

    public function toCard(): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'name' => $this->name,
            'iso2' => $this->iso2,
            'region' => $this->region,
            'visa_type' => $this->t('visa_type'),
            'currency' => $this->currency,
            'contract_months' => $this->contract_months_typical,
            'processing_days_min' => $this->processing_days_min,
            'processing_days_max' => $this->processing_days_max,
            'top_trades' => $this->top_trades ?? [],
        ];
    }

    /** @param \Illuminate\Support\Collection<string, Industry> $industries keyed by slug */
    public function toDetail($industries): array
    {
        return [
            ...$this->toCard(),
            'intro' => $this->t('intro'),
            'notice' => $this->t('notice'),
            'languages' => $this->t('languages'),
            'meta_description' => $this->t('meta_description'),
            'sectors' => collect($this->sectors ?? [])
                ->filter(fn ($s) => isset($industries[$s['industry']]))
                ->map(fn ($s) => [...$industries[$s['industry']]->toCard(), 'note' => $s['note']])
                ->values(),
            'steps' => $this->steps ?? [],
            'requirements' => $this->requirements ?? [],
            'faqs' => $this->faqs ?? [],
            'updated_at' => $this->updated_at?->toIso8601String(),
        ];
    }
}
