export type Region = "gcc" | "east_asia" | "se_asia" | "europe";

export interface Country {
  id: number;
  slug: string;
  name: string;
  iso2: string;
  region: Region;
  processing_days_min: number | null;
  processing_days_max: number | null;
  top_trades: string[];
}

/** Entry from public/img/manifest.json (scripts/build-images.mjs). */
export interface ResponsiveImg {
  src: string;
  avif: string;
  webp: string;
  width: number;
  height: number;
  blur: string;
}

export interface Industry {
  id: number;
  slug: string;
  name: string;
  summary: string;
  roles: string[];
  image: ResponsiveImg | null;
  deployable_headcount: number | null;
  group?: "construction" | "industrial" | "services" | "operations" | null;
}

export interface JobOpening {
  id: number;
  slug: string;
  title: string;
  country: Pick<Country, "name" | "iso2" | "slug">;
  salary_min: number;
  salary_max: number;
  currency: string;
  salary_bdt_min: number | null;
  contract_months: number;
  gender: "any" | "male" | "female";
  deadline: string | null;
  status: "open" | "closing" | "filled";
  industry: { name: string; slug: string } | null;
  positions: number | null;
  is_sample: boolean;
  posted_at: string | null;
}

export interface JobDetail extends JobOpening {
  employer_type: string | null;
  city: string | null;
  working_hours: string | null;
  description: string | null;
  requirements: string[];
  benefits: Partial<Record<"accommodation" | "food" | "transport" | "ticket" | "medical" | "overtime", boolean | null>>;
  visa_type: string | null;
}

export interface Testimonial {
  id: number;
  type: "worker" | "employer";
  name: string;
  role: string;
  company: string | null;
  country: Pick<Country, "name" | "iso2"> | null;
  quote: string;
  rating: number | null;
  photo: string | null;
  is_sample: boolean;
}

export interface Site {
  name: string;
  main_site: string;
  licence: { rl_number: string | null; bmet: string | null; baira: string | null };
  stats: {
    years_licensed: number | null;
    workers_deployed: number | null;
    employer_partners: number | null;
    avg_days_to_deploy: number | null;
  };
  contact: {
    phone: string;
    phone_href: string;
    email: string;
    inquiry_email: string;
    whatsapp: string;
    address: string;
    hours: string | null;
  };
}

export interface CountryCard extends Country {
  visa_type: string | null;
  currency: string | null;
  contract_months: number | null;
}

export interface CountryDetail extends CountryCard {
  intro: string | null;
  notice: string | null;
  languages: string | null;
  meta_description: string | null;
  sectors: (Industry & { note: string })[];
  steps: { title: string; body: string }[];
  requirements: string[];
  faqs: Faq[];
  updated_at: string | null;
}

export interface IndustryDetail extends Industry {
  intro: string | null;
  image_detail: ResponsiveImg | null;
  certifications: string[];
  highlights: { title: string; body: string }[];
  faqs: Faq[];
  meta_description: string | null;
  updated_at: string | null;
}

export interface Faq {
  q: string;
  a: string;
}

export interface SharedProps {
  flash: { inquiry_sent: boolean };
  canonical: string;
  appUrl: string;
  locale: "en" | "bn";
  translations: Record<string, unknown>;
  site: Site;
  [key: string]: unknown;
}
