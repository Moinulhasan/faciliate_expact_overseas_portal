# Dynamic site content

Editable copy of this site now lives in table `site_contents` (shared `delight_backend`, written by the ERP).
The lang/config files stay as the defaults: with an empty table, the site looks exactly as before.

- **Reader:** `App\Support\SiteContent` (`get($key, $default)`, `apply()` for the shared `translations` / `site` props).
  Order: valid row in the current locale → valid `en` row → file default. Non-translatable keys only use the `en` row.
  Rows are validated against the schema (types, required fields, `min_items`); a broken row is ignored (logged once).
  Cached per site + locale for 10 minutes; the cache key includes `max(updated_at)` and the row count, so **the ERP must
  set `updated_at` on every save**. A DB error is tried once per request, logged once, and the page uses the files.
- **Table:** `site_contents(id, site, key, locale, value json, updated_by, timestamps)`, unique `(site, key, locale)`; this site = `overseas`.
- **Schema for the ERP editor:** `resources/content/site-content.schema.json` (label, section, translatable, value field tree).
  A stored value is always the **complete** value of the key. `max` = characters (for a `list`, per item); for `number`, `min`/`max` = range.
- **Seed rows from the files:** `php artisan site-content:export` (missing rows only; `--force` overwrites).
- **Adding a key:** add it to `SiteContent::SOURCES` and to the schema; `SiteContentTest` fails if they drift or a default does not validate.

## Inventory (key → where it lived → shape)

Source `lang:home.hero` = `lang/{en,bn}/home.php` → `hero`; `config:site.contact` = `config/site.php` → `contact`.
Only the listed fields are editable; other entries in the same array (button text, form labels, errors) stay in the files.

| Key | Lived in | Locales | Fields |
|---|---|---|---|
| `site.company` | `config:site` | en only | name, main_site (url) |
| `site.contact` | `config:site.contact` | en only | phone (phone), phone_href (phone), email (email), inquiry_email (email), whatsapp (phone), address (textarea), address_my (textarea), hours |
| `site.licence` | `config:site.licence` | en only | rl_number, bmet, baira |
| `site.stats` | `config:site.stats` | en only | years_licensed (number), workers_deployed (number), employer_partners (number), avg_days_to_deploy (number) |
| `site.privacy` | `config:site.privacy` | en only | retention_months (number), updated |
| `home.meta` | `lang:home.meta` | en/bn | title, description (textarea) |
| `home.nav` | `lang:home.nav` | en/bn | brand, brand_sub |
| `home.hero` | `lang:home.hero` | en/bn | eyebrow, title_a, title_b, lead (textarea), stat_countries, stat_industries, trust_title, destinations |
| `home.fork` | `lang:home.fork` | en/bn | title, accent, lead (textarea) |
| `home.fork.candidate` | `lang:home.fork.candidate` | en/bn | label, title, points (list) |
| `home.fork.employer` | `lang:home.fork.employer` | en/bn | label, title, points (list) |
| `home.jobs` | `lang:home.jobs` | en/bn | title, lead (textarea) |
| `home.journey` | `lang:home.journey` | en/bn | title, lead (textarea), from, from_code, to, to_code, pass_label, note (textarea), steps (items) |
| `home.industries` | `lang:home.industries` | en/bn | title, lead (textarea) |
| `home.destinations` | `lang:home.destinations` | en/bn | title, lead (textarea), note (textarea) |
| `home.costs` | `lang:home.costs` | en/bn | title, accent, lead (textarea), pay_title, pay (list), never_title, never (list), verify_title, verify (textarea) |
| `home.reviews` | `lang:home.reviews` | en/bn | title, lead (textarea) |
| `home.faq` | `lang:home.faq` | en/bn | title, lead (textarea), items (items) |
| `home.final` | `lang:home.final` | en/bn | title_a, title_b, lead (textarea) |
| `home.footer` | `lang:home.footer` | en/bn | tagline (textarea) |
| `pages.common` | `lang:pages` | en/bn | typical (textarea), no_jobs (textarea), faq_title, faq_lead (textarea) |
| `pages.industries` | `lang:pages.industries` | en/bn | meta_title, meta_description (textarea), eyebrow, title, accent, lead (textarea), roles_title, roles_lead (textarea), certs_title, certs_lead (textarea), screening_title, screening (items), countries_title, countries_lead (textarea), employer_cta_title, employer_cta_lead (textarea) |
| `pages.countries` | `lang:pages.countries` | en/bn | meta_title, meta_description (textarea), eyebrow, title, accent, lead (textarea), title_show, accent_show, sectors_title, sectors_lead (textarea), process_title, process_lead (textarea), docs_title, docs_lead (textarea), docs_note (textarea) |
| `pages.countries.region_lead` | `lang:pages.countries.region_lead` | en/bn | gcc (textarea), east_asia (textarea), se_asia (textarea), europe (textarea) |
| `hubs.jobs` | `lang:hubs.jobs` | en/bn | meta_title, meta_description (textarea), eyebrow, title, accent, lead (textarea), none_title, none_body (textarea), empty_title, empty_body (textarea), empty_where, how_title, how (items), safety_title, safety (textarea), dialog_lead (textarea), wa_message (textarea), sample_note (textarea) |
| `hubs.work_abroad` | `lang:hubs.work_abroad` | en/bn | meta_title, meta_description (textarea), eyebrow, title, accent, lead (textarea), eligible_title, eligible_lead (textarea), eligible (items), promise_title, promise (items), journey_title, docs_title, docs_lead (textarea), flags_title, flags_lead (textarea), flags (list), countries_title, faq (items) |
| `hubs.employers` | `lang:hubs.employers` | en/bn | meta_title, meta_description (textarea), eyebrow, title, accent, lead (textarea), pillars (items), process_title, process_lead (textarea), process (items), needs_title, needs_lead (textarea), needs (list), industries_title, industries_lead (textarea), countries_title, faq (items) |
| `hubs.about` | `lang:hubs.about` | en/bn | meta_title, meta_description (textarea), eyebrow, title, accent, lead (textarea), story_title, story (list), principles_title, principles (items), licence_title, licence_lead (textarea), office_title, office_lead (textarea), group_title, group_body (textarea) |
| `contact.page` | `lang:contact` | en/bn | meta_title, meta_description (textarea), eyebrow, title, accent, lead (textarea), section_title, section_lead (textarea), email_note, sent_title, sent_body (textarea) |
| `contact.consent` | `lang:contact.form` | en/bn | consent (textarea) |
| `privacy.page` | `lang:privacy` | en/bn | meta_title, meta_description (textarea), eyebrow, title, accent, lead (textarea), draft, sections (items) |
| `documents.base` | `const:Database\Seeders\CountrySeeder::BASE_DOCS` | en/bn | list of strings |

## Inventoried and left out

- **UI labels** (nav link names, button text, filters, form labels and errors, badges, aria labels, `home.trust.*` captions, jobs facts/benefit names,
  region/group names): they are interface, not copy.
- **`config/site.php` `fx`** (approximate taka rates): a currency → rate map used in server-side salary maths, not page copy; still edited in the file.
  **`show_samples`**: a safety switch, code.
- **`CountrySeeder::BASE_DOCS_BN`**: the Work abroad checklist showed the English `BASE_DOCS` in both languages, so `documents.base` defaults to it
  for `bn` as well (exact same page). The ERP can save a Bangla list for `bn`.
- **Hard-coded arrays in `resources/js`** (Nav `links`, Footer `explore`/`hrefs`, AudienceFork `doors`, Destinations `tabs`, Hero/WorkAbroad/About/Employers
  icon lists, Countries/Industries region & group ids): routes, icons and ids only — every visible string they show already comes from the lang files
  above (via `t()`/`tm()`), so they are covered by those keys. `Components/legacy/*` (old SPA, incl. Services) is not imported anywhere.
- Countries, industries, jobs and testimonials already come from their own DB tables.
