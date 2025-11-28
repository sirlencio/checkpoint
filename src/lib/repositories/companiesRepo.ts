import { SupabaseClient } from "@supabase/supabase-js";

export async function upsertCompanies(supabase: SupabaseClient, companies: { id: number, name: string }[]) {
  if (!companies.length) return;
  await supabase.from("companies").upsert(companies.map(c => ({
        id: c.id,
        name: c.name
      })));
}

export async function linkCompanies(supabase: SupabaseClient, gameId: number, companies: { id: number, role: string }[]) {
  if (!companies.length) return;
  await supabase
    .from("involved_companies")
    .upsert(
      companies.map(c => ({
        game_id: gameId,
        company_id: c.id,
        role: c.role
      }))
    );
}