<?php

namespace App\Models;

use App\Models\Concerns\HasI18n;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Country extends Model
{
    use HasI18n;

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
        return $this->tr('name');
    }

    /** Country-specific note for one of its sectors, translated when available. */
    public function sectorNote(string $industry): ?string
    {
        return data_get($this->i18n, app()->getLocale().".sector_notes.{$industry}")
            ?? collect($this->sectors ?? [])->firstWhere('industry', $industry)['note'] ?? null;
    }

    public function toCard(): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'name' => $this->name,
            'iso2' => $this->iso2,
            'region' => $this->region,
            'visa_type' => $this->tr('visa_type'),
            'currency' => $this->currency,
            'contract_months' => $this->contract_months_typical,
            'processing_days_min' => $this->processing_days_min,
            'processing_days_max' => $this->processing_days_max,
            'top_trades' => $this->tr('top_trades') ?? [],
        ];
    }

    /** @param \Illuminate\Support\Collection<string, Industry> $industries keyed by slug */
    public function toDetail($industries): array
    {
        return [
            ...$this->toCard(),
            'intro' => $this->tr('intro'),
            'notice' => $this->tr('notice'),
            'languages' => $this->tr('languages'),
            'meta_description' => $this->tr('meta_description'),
            'sectors' => collect($this->sectors ?? [])
                ->filter(fn ($s) => isset($industries[$s['industry']]))
                ->map(fn ($s) => [...$industries[$s['industry']]->toCard(), 'note' => $this->sectorNote($s['industry'])])
                ->values(),
            'steps' => $this->tr('steps') ?? [],
            'requirements' => $this->tr('requirements') ?? [],
            'faqs' => $this->tr('faqs') ?? [],
            'updated_at' => $this->updated_at?->toIso8601String(),
        ];
    }
}
