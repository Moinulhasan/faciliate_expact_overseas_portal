<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Testimonial extends Model
{
    protected $guarded = [];

    protected $casts = [
        'consent_at' => 'datetime',
        'is_published' => 'boolean',
        'is_sample' => 'boolean',
    ];

    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class);
    }

    // Real reviews need recorded consent; sample rows are allowed only outside production.
    public function scopeVisible(Builder $q): void
    {
        $q->where('is_published', true)->where(function ($q) {
            $q->whereNotNull('consent_at');
            if (! app()->isProduction()) {
                $q->orWhere('is_sample', true);
            }
        });
    }

    public function toCard(): array
    {
        $l = app()->getLocale();

        return [
            'id' => $this->id,
            'type' => $this->type,
            'name' => $this->name,
            'role' => $this->{"role_{$l}"} ?: $this->role_en,
            'company' => $this->company,
            'country' => $this->country ? ['name' => $this->country->name, 'iso2' => $this->country->iso2] : null,
            'quote' => $this->{"quote_{$l}"} ?: $this->quote_en,
            'rating' => $this->rating,
            'photo' => $this->photo,
            'is_sample' => $this->is_sample,
        ];
    }
}
