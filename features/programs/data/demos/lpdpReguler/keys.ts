import { UnifiedProgram } from '../../types';

export const LPDP_KEYS: UnifiedProgram['shadowProtocol'] = {
    expertVerdict: "Konsistensi adalah raja. Panelis membaca esaimu, lalu mengujimu di wawancara. Satu kontradiksi = gugur.",
    
    eliteTips: [
        { 
            id: 'lpt1', title: 'The Indonesia-First Strategy', 
            content: 'Setiap jawaban harus berakhir di Indonesia. Jangan pernah memberi kesan ingin stay abroad lebih dari 2-3 tahun post-study.', 
            priority: 'CRITICAL', source: 'Alumni LPDP 2024-2025, Kompas.com' 
        },
        { 
            id: 'lpt2', title: 'STEM Dominance Reality', 
            content: '80% kuota untuk STEM (2026). Non-STEM harus align dengan sektor strategis: Pangan, Energi, Pertahanan, Digital Economy, atau Kesehatan.', 
            priority: 'HIGH', source: 'LPDP Official 2026 Policy' 
        },
        { 
            id: 'lpt3', title: 'The Konkrit Kontribusi Formula', 
            content: "Jangan bilang 'ingin memajukan bangsa'. Sebutkan: posisi spesifik (misal: Policy Analyst di Kementan), timeline (5-10 tahun), dan target impact terukur (misal: tingkatkan produktivitas pangan 15%).", 
            priority: 'HIGH', source: 'Medcom.id, Kompas.com 2025' 
        },
        { 
            id: 'lpt4', title: 'The LoA Bypass Card', 
            content: 'Punya LoA Unconditional dari kampus daftar LPDP = skip Seleksi Bakat Skolastik. Langsung ke Substansi.', 
            priority: 'MEDIUM', source: 'LPDP Official Guide 2025' 
        }
    ],

    lethalMistakes: [
        { 
            title: "The 'Stay-Abroad' Vibe", 
            reason: "Mengindikasikan keinginan kerja/tinggal di luar negeri jangka panjang = INSTANT REJECT. LPDP cari builder Indonesia, bukan expat.",
            example: "Setelah lulus, saya ingin bekerja di Google USA dulu 5 tahun untuk gain experience...",
            fix: "Fokus pada pengabdian segera setelah lulus."
        },
        { 
            title: "Generic Contribution Plans", 
            reason: 'Jawaban klise tanpa detail: "Saya ingin berkontribusi untuk kemajuan Indonesia" tanpa sebutkan HOW, WHERE, WHO benefits.',
            fix: "Saya akan join Bappenas sebagai Data Scientist untuk optimasi distribusi subsidi pangan menggunakan AI predictive modeling."
        },
        { 
            title: "LoA University Ignorance", 
            reason: "Mendaftar dengan LoA dari kampus yang TIDAK ada di daftar LPDP tanpa bukti ranking internasional = gugur admin.",
            fix: "Cek daftar kampus resmi LPDP sebelum apply LoA: lpdp.kemenkeu.go.id"
        },
        { 
            title: "Contradiction Trap", 
            reason: 'Essay bilang "passion di renewable energy", tapi saat wawancara ga bisa jelasin basic concept atau trend terkini di sektor itu.',
            fix: "Mock interview 10x sebelum D-Day. Record dan evaluate sendiri."
        }
    ],

    ghostTasks: [
        { 
            label: "Verify University on LPDP Priority List", 
            importance: "CRITICAL", 
            desc: "Download Excel daftar kampus LPDP 2025/2026. Cross-check dengan pilihan kampus. Jangan asal apply LoA."
        },
        { 
            label: "Draft 5-Year Post-Study Roadmap", 
            importance: "CRITICAL", 
            desc: "Buat timeline konkret (bukan asal-asalan): 0-6 bulan (Posisi X), 1-2 tahun (Project Z), 3-5 tahun (Leadership), 5-10 tahun (Legacy)."
        },
        { 
            label: "Mock Interview dengan Alumni LPDP", 
            importance: "STRATEGIC", 
            desc: "Cari minimal 2-3 alumni LPDP (lewat LinkedIn/IG). Minta 30 menit untuk simulasi wawancara. Record dan review jawaban sendiri."
        },
        { 
            label: "Stalk Panelis Background", 
            importance: "MEDIUM", 
            desc: "Riset bidang panelis (akademisi/praktisi/LPDP staff) untuk menyelaraskan jawaban."
        }
    ],

    alumniInsights: [
        { name: "Prasetyo", year: "2024", insight: "They don't want a scholar; they want a builder for Indonesia with measurable action plan." },
        { name: "Alumni LPDP", year: "2025", insight: "Konsistensi antara essay, CV, dan jawaban wawancara adalah kunci. Satu kontradiksi kecil bisa fatal.", source: "IDN Times" },
        { name: "Panel Experts", year: "2025", insight: "Panelis tanya pertanyaan sulit bukan untuk menjatuhkan, tapi untuk lihat cara kamu berpikir under pressure. Stay calm dan jujur.", source: "Medcom.id" }
    ],

    docBriefs: [
        {
            id: 'essay_contribution',
            label: 'Commitment to Indonesia Essay',
            instructions: '1500-2000 words. Detail your past, present, and future contribution to Indonesia. Connect it to national strategic sectors.',
            aiAuditCriteria: ['Nationalist hook', 'Link to sectoral growth', 'Specific return timeline', 'Impact metrics'],
            suggestedDojoTheme: 'Patriot-Builder-Measurer'
        },
        {
            id: 'cv',
            label: 'Dossier CV',
            instructions: 'Highlight organizational leadership and community impact. Quantify achievements wherever possible.',
            aiAuditCriteria: ['Leadership markers', 'Impact metrics', 'Community projects', 'Publications/awards'],
            suggestedDojoTheme: 'STAR + Impact'
        }
    ],

    successVault: [
        { id: 'sv-1', title: 'Energy Sector: Renewable Policy', category: 'ESSAY', previewUrl: 'https://www.africau.edu/images/default/sample.pdf', senseiComment: 'Jembatan sempurna antara teknologi dan kebijakan nasional.' },
        { id: 'sv-2', title: 'Data Science: AI for Agriculture', category: 'ESSAY', previewUrl: 'https://www.africau.edu/images/default/sample.pdf', senseiComment: 'Focus: Predictive analytics for crop yield. Partnership with Kementan.' },
        { id: 'sv-3', title: 'Healthcare: Telemedicine Infrastructure', category: 'ESSAY', previewUrl: 'https://www.africau.edu/images/default/sample.pdf', senseiComment: 'Focus: Digital health equity in 3T regions.' },
        { id: 'sv-4', title: 'Education: STEM Platform', category: 'ESSAY', previewUrl: 'https://www.africau.edu/images/default/sample.pdf', senseiComment: 'Key: Tech-based learning access for underserved communities.' }
    ],

    cheatSheet: {
        preInterview: [
            "Read your essay 3x. Memorize key points.",
            "Review kampus & prodi details (rankings, professors, unique programs).",
            "Prepare 5-year roadmap dalam 1 halaman.",
            "Practice 90-second self-pitch.",
            "Sleep 7+ hours."
        ],
        duringInterview: [
            { type: 'DO', text: "ALWAYS link answers back to Indonesia." },
            { type: 'DO', text: "Use STAR method for experience questions." },
            { type: 'DONT', text: "Saya ingin mencari pengalaman di luar negeri dulu..." },
            { type: 'DONT', text: "Mungkin setelah lulus saya stay abroad beberapa tahun..." }
        ],
        powerPhrases: [
            "Based on my experience at [X], I identified [problem Y] that affects [Z people/sector]...",
            "My 5-year plan is to join [institution] as [position] to implement [solution]...",
            "I've already started contributing through [project/volunteer], and this degree will amplify that impact..."
        ],
        forbiddenPhrases: [
            "Saya ingin mencari pengalaman di luar negeri dulu...",
            "Saya belum tahu pasti kontribusi spesifiknya...",
            "Indonesia masih tertinggal, jadi saya ingin belajar di negara maju..."
        ]
    },

    bossTips: [
        { id: 'b1', title: 'The 80/20 Rule', content: '80% preparation on Contribution Plan + 20% on academic knowledge. Panelis lebih peduli "what will you DO" daripada "what will you LEARN".' },
        { id: 'b2', title: 'The Consistency Test', content: 'Essay, CV, dan jawaban wawancara harus sinkron 100%. Panelis pasti cari celah kontradiksi.' },
        { id: 'b3', title: 'The Indonesia Obsession', content: 'Setiap 3 kalimat, sebutkan Indonesia. Jadikan Indonesia pusat dari semua argumen.' },
        { id: 'b4', title: 'The Konkrit King', content: 'Benci jawaban abstrak. Selalu: angka, nama institusi, timeline, impact metrics.' },
        { id: 'b5', title: 'The Humble Confidence', content: 'Confident tapi ga arrogant. Akui tantangan yang ada.' }
    ],

    sources: [
        "LPDP Official Guide 2025",
        "Medcom.id - Wawancara Tips 2025",
        "Kompas.com - Seleksi Substansi Guide",
        "IDN Times - Alumni Success Stories",
        "Studyfirst Indonesia - Passing Grade Analysis",
        "Monash University Indonesia - LPDP Strategy",
        "Tempo.co - Interview Protocols"
    ]
};