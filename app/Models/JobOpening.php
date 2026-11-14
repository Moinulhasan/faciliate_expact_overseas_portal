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
    /** Samples need BOTH an explicit opt-in and a non-production env — either one alone hides them. */
    public static function samplesAllowed(): bool
    {
        return config('site.show_samples') && ! app()->isProduction();
    }

    public function scopeOpen(Builder $q): void
    {
        $q->where('status', '!=', 'filled')
            ->where(fn ($q) => $q->whereNull('deadline')->orWhereDate('deadline', '>=', today()));
        if (! self::samplesAllowed()) {
            $q->where('is_sample', false);
        }
    }

    private function t(string $f): ?string
    {
        return $this->{"{$f}_".app()->getLocale()} ?: $this->{"{$f}_en"};
    }

    /**
     * Salary range of currently open jobs, grouped by a column (country_id or industry_id).
     * Real data only — no jobs, no range. Mixed currencies in one group are skipped (can't be combined).
     *
     * @return \Illuminate\Support\Collection<int, array{currency:string,min:int,max:int,count:int,bdt_min:?int,bdt_max:?int}>
     */
    public static function payRanges(Builder $query, string $groupBy)
    {
        return $query->open()->get(['country_id', 'industry_id', 'salary_min', 'salary_max', 'currency'])
            ->groupBy($groupBy)
            ->filter(fn ($g) => $g->pluck('currency')->unique()->count() === 1)
            ->map(function ($g) {
                $range = new self(['salary_min' => $g->min('salary_min'), 'salary_max' => $g->max('salary_max'), 'currency' => $g->first()->currency]);
                $bdt = $range->bdt();

                return [
                    'currency' => $range->currency,
                    'min' => (int) $range->salary_min,
                    'max' => (int) $range->salary_max,
                    'count' => $g->count(),
                    'bdt_min' => $bdt['salary_bdt_min'],
                    'bdt_max' => $bdt['salary_bdt_max'],
                ];
            });
    }

    /** Approx. taka range from config('site.fx'); null when the currency has no rate. Rounded to ৳500. */
    public function bdt(): array
    {
        $rate = config("site.fx.bdt_per.{$this->currency}");
        $round = fn (float $v) => (int) (round($v / 500) * 500);

        return [
            'salary_bdt_min' => $rate ? $round($this->salary_min * $rate) : $this->salary_bdt_min,
            'salary_bdt_max' => $rate ? $round($this->salary_max * $rate) : null,
            'fx_as_of' => $rate ? config('site.fx.as_of') : null,
        ];
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
            ...$this->bdt(),
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
