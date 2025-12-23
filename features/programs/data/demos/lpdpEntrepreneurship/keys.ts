
import { UnifiedProgram } from '../../types';

export const LPDP_ENTREPRENEUR_KEYS: UnifiedProgram['shadowProtocol'] = {
    expertVerdict: "Business proposal adalah 50% dari keputusan. Jika proposal payah, wawancara juga percuma.",
    
    eliteTips: [
        { 
            id: 'ept1', title: 'The Academia-Entrepreneur Paradox', 
            content: 'Lu harus janji jadi dosen entrepreneur di kampus Indonesia setelah lulus. Surat komitmen WAJIB ditandatangani Rektor/Dekan.', 
            priority: 'CRITICAL', source: 'LPDP Official 2025' 
        },
        { 
            id: 'ept2', title: 'The Business Proof Requirement', 
            content: 'Business Proposal HARUS detail 5-10 halaman dengan 7 komponen wajib. Tanpa data finansial = Gagal Admin.', 
            priority: 'CRITICAL', source: 'LPDP Official 2025' 
        },
        { 
            id: 'ept3', title: 'The 3C Formula', 
            content: 'Harus jelasin 3C: Capability (Kemampuan), Commitment (Komitmen), Consistency (Track Record).', 
            priority: 'HIGH' 
        }
    ],

    lethalMistakes: [
        { 
            title: "Business Proposal Tanpa Data Finansial", 
            reason: "Proposal tanpa rencana keuangan konkrit (revenue, margin, BEP) adalah penolakan instan.",
            example: "Bisnis saya akan untung banyak (Tanpa angka).",
            fix: "Proyeksi revenue Year 1: Rp 500jt, margin 30%, BEP Month 8."
        },
        { 
            title: "Generic Business Problem", 
            reason: "Hanya menyebutkan masalah umum tanpa statistik yang tajam.",
            fix: "Gunakan data riil lapangan (misal: 87% petani kopi X mengalami masalah Y)."
        },
        { 
            title: "Surat Komitmen Abal-abal", 
            reason: "Mengambil surat dari kampus yang tidak memiliki program kewirausahaan.",
            fix: "Pastikan kampus target memiliki inkubator atau prodi bisnis aktif."
        }
    ],

    ghostTasks: [
        { label: "Verify University Entrepreneur Ranking", importance: "CRITICAL", desc: "Cek QS Business Masters Rankings - Entrepreneurship. Top 50 global preferred." },
        { label: "Mock Pitch Your Business (5 Mins)", importance: "CRITICAL", desc: "Latihan pitch di depan orang awam. Jika mereka bingung, proposal lu gagal." },
        { label: "Financial Model Excel Ready", importance: "STRATEGIC", desc: "Bawa hardcopy P&L, Cashflow, dan Revenue model saat wawancara." },
        { label: "Join Entrepreneur Community", importance: "STRATEGIC", desc: "Network di Startup Grind atau East Ventures Network sebagai social proof." }
    ],

    alumniInsights: [
        { name: "Detik News", year: "2024", insight: "Panelis tanya detail finansial sampai ke unit economics. Kalau ga paham CAC/LTV, ya gugur." },
        { name: "Alumni Expert", year: "2025", insight: "Surat komitmen dosen itu SERIUS. Mereka gamau lu balik cuma jadi businessman biasa." }
    ],

    docBriefs: [
        {
            id: 'business_plan',
            label: 'Elite Business Blueprint',
            instructions: '5-10 halaman. Wajib mencakup 7 komponen: Ide, Market Analysis, Founder (3C), Marketing, Ops, Milestones, dan Keuangan.',
            aiAuditCriteria: ['Problem-solution fit', 'Market size (TAM/SAM/SOM)', '3-Year Financial Projection', 'Scalability'],
            suggestedDojoTheme: 'Venture-Pitch-Style'
        },
        {
            id: 'essay_contribution',
            label: 'Entrepreneur-Scholar Essay',
            instructions: '1500-2000 kata. Struktur: Entrepreneur Journey -> Academic Rationale -> Ecosystem Builder Plan.',
            aiAuditCriteria: ['Teaching commitment', 'Economic impact metrics', 'Scalability vision'],
            suggestedDojoTheme: 'Patriot-Founder'
        }
    ],

    successVault: [
        { id: 'sv-ent-1', title: 'Winning Fintech Proposal', category: 'PORTFOLIO', previewUrl: 'https://www.africau.edu/images/default/sample.pdf', senseiComment: 'Fokus pada inklusi finansial pedesaan dengan kemitraan bank besar.' },
        { id: 'sv-ent-2', title: 'Agritech IoT Strategy', category: 'PORTFOLIO', previewUrl: 'https://www.africau.edu/images/default/sample.pdf', senseiComment: 'Yield optimization data yang sangat tajam (25% increase proven).' }
    ],

    comparisonMatrix: {
        title: "Kewirausahaan vs Reguler",
        headers: ["Aspect", "Kewirausahaan", "Reguler"],
        rows: [
            { label: "IPK Minimal", values: ["2.50", "3.00 (S2) / 3.25 (S3)"] },
            { label: "IELTS", values: ["6.0", "6.5+"] },
            { label: "ASN Allowed", values: ["NO", "YES"] },
            { label: "Fokus", values: ["Business + Teaching", "Academic + Contribution"] }
        ]
    },

    cheatSheet: {
        preInterview: [
            "Hafalkan 3-minute elevator pitch.",
            "Review CAGR, Margin, dan Unit Economics.",
            "List 5 kompetitor utama dan kelemahan mereka.",
            "Print hardcopy proposal dan model finansial."
        ],
        duringInterview: [
            { type: 'DO', text: "Gunakan data untuk setiap klaim (Market size, Traction)." },
            { type: 'DO', text: "Tunjukkan antusiasme mengajar di Universitas." },
            { type: 'DONT', text: "Menganggap beasiswa sebagai modal usaha gratis (VC logic)." }
        ],
        powerPhrases: [
            "Berdasarkan pilot project 6 bulan kami, kami mencapai retention rate X%...",
            "Visi jangka panjang saya adalah membangun inkubator yang memproduksi 50 startup per tahun..."
        ],
        forbiddenPhrases: [
            "Bisnis saya pasti sukses tanpa risiko...",
            "Saya hanya ingin kuliah, belum kepikiran mengajar..."
        ]
    },

    sources: ["LPDP Official Guide 2025", "IELTSpresso Analysis", "Success Stories Alumni"]
};
