<?php

namespace App\Models;

use App\Models\Concerns\HasI18n;
use App\Support\Img;
use Illuminate\Database\Eloquent\Model;

class Industry extends Model
{
    use HasI18n;

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

    public function toCard(): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'name' => $this->tr('name'),
            'group' => $this->group,
            'summary' => $this->tr('summary'),
            'roles' => $this->tr('roles') ?? [],
            // From the image pipeline (resources/images/industries/<slug>.jpg → npm run images).
            'image' => Img::get("industries/{$this->slug}"),
            'deployable_headcount' => $this->deployable_headcount,
        ];
    }

    public function toDetail(): array
    {
        return [
            ...$this->toCard(),
            'intro' => $this->tr('intro'),
            'image_detail' => Img::get("industries/{$this->slug}-detail"),
            'certifications' => $this->tr('certifications') ?? [],
            'highlights' => $this->tr('highlights') ?? [],
            'faqs' => $this->tr('faqs') ?? [],
            'meta_description' => $this->tr('meta_description'),
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
