export interface CountryName {
    common: string;
    official: string;
    nativeName?: Record<string, { official: string; common: string }>;
}

export interface CountryFlags {
    png: string;
    svg: string;
    alt?: string;
}

export interface Currency {
    name: string;
    symbol: string;
}

export interface Country {
    name: CountryName;
    capital?: string[];
    region: string;
    subregion?: string;
    population: number;
    flags: CountryFlags;
    cca3: string;
    currencies?: Record<string, Currency>;
}

export interface CountryState {
    countries: Country[];
    loading: boolean;
    error: string | null;
    selectedCountry: Country | null;
}