import { UserProfile } from '@/types/User';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface Props {
  readonly params: Promise<{ username: string }>;
}

async function fetchProfile(username: string): Promise<UserProfile | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/profiles/${username}`, {
      cache: 'no-store',
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error('Error cargando el perfil:', error);
    return null;
  }
}

export default async function Page({ params }: Props) {
  const { username } = await params;
  const profile = await fetchProfile(username);

  if (!profile) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <Image
            src={profile.avatar_url || '/images/avatar/avatar-placeholder.jpg'}
            alt={`Avatar de ${profile.username}`}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-indigo-500/30 object-cover shadow-md shadow-indigo-500/10"
            width={96}
            height={96}
          />

          <div className="flex-1 space-y-3">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                {profile.username}
              </h1>
              <p className="text-sm text-slate-400 font-mono mt-1">
                {profile.email}
              </p>
            </div>

            <div className="pt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Gamer ID: {profile.id}
              </span>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-3 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center">
            <span className="block text-2xl font-black text-indigo-400">0</span>
            <span className="text-xs text-slate-400">Jugados</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center">
            <span className="block text-2xl font-black text-emerald-400">
              0
            </span>
            <span className="text-xs text-slate-400">Completados</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center">
            <span className="block text-2xl font-black text-amber-400">0</span>
            <span className="text-xs text-slate-400">Lista de deseos</span>
          </div>
        </section>
      </div>
    </main>
  );
}
