<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JobOpening extends Model
{
    protected $guarded = [];

    protected $casts = [
        'deadline' => 'date',
        'requirements' => 'array',
        'benefits' => 'array',
        'is_sample' => 'boolean',
    ];

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class);
    }

    public function industry(): BelongsTo
    {
        return $this->belongsTo(Industry::class);
    }

    /** Open + not past deadline. Sample rows only outside production (same rule as testimonials). */
    public function scopeOpen(Builder $q): void
    {
        $q->where('status', '!=', 'filled')
            ->where(fn ($q) => $q->whereNull('deadline')->orWhereDate('deadline', '>=', today()));
        if (app()->isProduction()) {
            $q->where('is_sample', false);
        }
    }

    private function t(string $f): ?string
    {
        return $this->{"{$f}_".app()->getLocale()} ?: $this->{"{$f}_en"};
    }

    public function toCard(): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'title' => $this->t('title'),
            'country' => ['name' => $this->country->name, 'iso2' => $this->country->iso2, 'slug' => $this->country->slug],
            'industry' => $this->industry ? ['name' => $this->industry->toCard()['name'], 'slug' => $this->industry->slug] : null,
            'positions' => $this->positions,
            'salary_min' => $this->salary_min,
            'salary_max' => $this->salary_max,
            'currency' => $this->currency,
            'salary_bdt_min' => $this->salary_bdt_min,
            'contract_months' => $this->contract_months,
            'gender' => $this->gender,
            'deadline' => $this->deadline?->toDateString(),
            'status' => $this->status,
            'is_sample' => $this->is_sample,
            'posted_at' => $this->created_at?->toDateString(),
        ];
    }

    public function toDetail(): array
    {
        return [
            ...$this->toCard(),
            'employer_type' => $this->t('employer_type'),
            'city' => $this->t('city'),
            'working_hours' => $this->t('working_hours'),
            'description' => $this->t('description'),
            'requirements' => $this->requirements ?? [],
            'benefits' => $this->benefits ?? [],
            'visa_type' => $this->country->visa_type_en,
        ];
    }
}
