<?php

namespace App\Models;

use App\Support\Img;
use Illuminate\Database\Eloquent\Model;

class Industry extends Model
{
    protected $guarded = [];

    protected $casts = [
        'roles' => 'array',
        'certifications' => 'array',
        'highlights' => 'array',
        'faqs' => 'array',
    ];

    public function getRouteKeyName(): string
    {
        return 'slug';
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
            'name' => $this->t('name'),
            'group' => $this->group,
            'summary' => $this->t('summary'),
            'roles' => $this->roles ?? [],
            // From the image pipeline (resources/images/industries/<slug>.jpg → npm run images).
            'image' => Img::get("industries/{$this->slug}"),
            'deployable_headcount' => $this->deployable_headcount,
        ];
    }

    public function toDetail(): array
    {
        return [
            ...$this->toCard(),
            'intro' => $this->t('intro'),
            'image_detail' => Img::get("industries/{$this->slug}-detail"),
            'certifications' => $this->certifications ?? [],
            'highlights' => $this->highlights ?? [],
            'faqs' => $this->faqs ?? [],
            'meta_description' => $this->t('meta_description'),
            'updated_at' => $this->updated_at?->toIso8601String(),
        ];
    }

    /** Countries whose sector list includes this industry. */
    public function hiringCountries()
    {
        return Country::active()->orderBy('sort')->get()
            ->filter(fn (Country $c) => collect($c->sectors ?? [])->contains('industry', $this->slug))
            ->values();
    }
}
