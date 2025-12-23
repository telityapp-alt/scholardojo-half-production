
/**
 * Supabase Bridge Config
 * Untuk mengaktifkan:
 * 1. Buat project di supabase.com
 * 2. Tambahkan URL dan ANON_KEY ke environment variables
 */

export const SUPABASE_CONFIG = {
    url: (process.env as any).SUPABASE_URL || '',
    key: (process.env as any).SUPABASE_ANON_KEY || '',
    enabled: !!(process.env as any).SUPABASE_URL && !!(process.env as any).SUPABASE_ANON_KEY
};

/**
 * Pola Sinkronisasi Cloud:
 * Semua service (Dossier, Admission, DNA) memanggil SafeAccess.
 * Jika SUPABASE_CONFIG.enabled === true, SafeAccess akan melakukan push/pull ke cloud.
 */
