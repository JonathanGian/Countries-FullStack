import * as dotenv from 'dotenv';

dotenv.config();

import { createClient } from '@supabase/supabase-js';

// Ensure you set these environment variables before running the script
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY; // Use your service role key for seeding

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error(
    'Missing Supabase URL or Service Role Key in environment variables.',
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function fetchCountries() {
  const response = await fetch('https://restcountries.com/v3.1/all');
  if (!response.ok) {
    throw new Error(`Failed to fetch countries: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}

async function seedCountries() {
  try {
    const countries = await fetchCountries();
    // Format each country into the shape your table expects:
    // { country_code, country_name, country_flag }
    const formattedCountries = countries
      .map((country: any) => ({
        country_code: country.cca2, // Using the 2-letter country code
        country_name: country.name?.common,
        country_flag: country.flags?.png || country.flags?.svg || '',
      }))
      // Filter out any entries missing the required data
      .filter(
        (country: any) =>
          country.country_code && country.country_name && country.country_flag,
      );

    const { data, error } = await supabase
      .from('countries')
      .insert(formattedCountries);

    if (error) {
      console.error('Error inserting countries:', error);
    } else {
      console.log('Countries seeded successfully:', data);
    }
  } catch (error) {
    console.error('Error seeding countries:', error);
  }
}

seedCountries();
