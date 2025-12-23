
import { UnifiedProgram } from '../../types';

export const LPDP_KEYS: UnifiedProgram['shadowProtocol'] = {
    expertVerdict: "Konsistensi adalah raja. Panelis membaca esaimu, lalu mengujimu di wawancara. Satu kontradiksi = Gagal.",
    lethalMistakes: [
        { 
            title: "Vibe 'Ingin Menetap di Luar Negeri'", 
            reason: "Mengindikasikan keinginan bekerja/tinggal di luar negeri jangka panjang adalah penolakan instan.",
            example: "Setelah lulus, saya ingin bekerja di Google USA selama 5 tahun untuk mencari pengalaman..."
        },
        { 
            title: "Rencana Kontribusi Klise", 
            reason: "Jawaban umum tanpa detail seperti 'Saya ingin membantu Indonesia maju'.",
            fix: "Saya akan bergabung dengan Bappenas sebagai Data Scientist untuk optimasi subsidi pangan menggunakan AI."
        },
        {
            title: "Ketidaktahuan Daftar Kampus LoA",
            reason: "Mendaftar dengan LoA dari kampus yang TIDAK ada di daftar prioritas LPDP.",
            action: "Cek daftar resmi di lpdp.kemenkeu.go.id sebelum mendaftar."
        },
        {
            title: "Jebakan Kontradiksi",
            reason: "Esai menyebut passion di Energi Terbarukan, tapi tidak bisa menjelaskan konsep dasar saat wawancara.",
            prevention: "Simulasi wawancara 10x sebelum hari-H. Rekam dan evaluasi."
        }
    ],
    successVault: [
        { 
            id: 'sv-lpdp-1', title: 'Esai Kontribusi Pemenang (Energi)', category: 'ESSAY', 
            previewUrl: 'https://www.africau.edu/images/default/sample.pdf', 
            senseiComment: 'Jembatan sempurna antara teknologi dan kebijakan nasional.',
            sector: 'SEKTOR ENERGI', focus: 'Integrasi panel surya', key: 'Data spesifik celah energi'
        }
    ],
    alumniInsights: [
        { name: "Prasetyo", year: "2024", insight: "Mereka tidak mencari pelajar; mereka mencari pembangun Indonesia dengan rencana aksi terukur." }
    ],
    ghostTasks: [
        { label: "Verifikasi Kampus di Daftar Prioritas", importance: "CRITICAL", desc: "Download Excel daftar kampus resmi. Jangan asal daftar." },
        { label: "Draf Roadmap 5 Tahun Pasca-Studi", importance: "CRITICAL", desc: "Buat timeline konkret (Posisi, Proyek, Dampak)." },
        { label: "Simulasi dengan Alumni LPDP", importance: "STRATEGIC", desc: "Cari 2-3 alumni via LinkedIn. Simulasi 30 menit." }
    ],
    docBriefs: [
        {
            id: 'essay_contribution',
            label: 'Esai Komitmen Kembali ke Indonesia',
            instructions: '1500-2000 kata. Jelaskan kontribusi masa lalu, sekarang, dan masa depan. Hubungkan ke sektor strategis nasional.',
            aiAuditCriteria: ['Hook Nasionalis', 'Hubungan ke pertumbuhan sektor', 'Timeline kembali yang spesifik'],
            suggestedDojoTheme: 'Patriot-Builder-Measurer'
        }
    ],
    eliteTips: [
        { id: 'lpt1', title: 'Strategi Indonesia-First', content: 'Setiap jawaban harus berakhir di Indonesia. Jangan pernah mengisyaratkan stay di luar negeri > 3 tahun.', priority: 'CRITICAL', source: 'Alumni 24-25' },
        { id: 'lpt2', title: 'Realitas Dominasi STEM', content: 'Kuota 80% untuk STEM. Non-STEM harus selaras dengan sektor strategis (Pangan, Energi, dll).', priority: 'HIGH', source: 'Kebijakan LPDP 2026' }
    ],
    cheatSheet: {
        preInterview: [
            "Baca esaimu 3x. Hafalkan poin kunci.",
            "Review detail kampus/prodi (Ranking, Profesor).",
            "Siapkan roadmap 5 tahun dalam 1 halaman.",
            "Latihan pitch diri 90 detik.",
            "Tidur 7+ jam."
        ],
        duringInterview: [
            { type: 'DO', text: "SELALU hubungkan jawaban kembali ke Indonesia." },
            { type: 'DO', text: "Gunakan metode STAR untuk pertanyaan pengalaman." },
            { type: 'DONT', text: "Saya ingin cari pengalaman di luar negeri dulu." }
        ],
        powerPhrases: [
            "Berdasarkan pengalaman saya di [X], saya mengidentifikasi [masalah Y]...",
            "Rencana 5 tahun saya adalah bergabung dengan [institusi] sebagai [posisi]..."
        ],
        forbiddenPhrases: [
            "Saya ingin mencari pengalaman di luar negeri dulu...",
            "Indonesia masih tertinggal, jadi saya belajar di negara maju..."
        ]
    },
    bossTips: [
        { id: 'b1', title: 'Aturan 80/20', content: '80% persiapan pada Rencana Kontribusi, 20% pada akademik. Mereka peduli apa yang kamu LAKUKAN daripada yang kamu PELAJARI.' },
        { id: 'b2', title: 'Tes Konsistensi', content: 'Esai, CV, dan Wawancara harus sinkron 100%. Tanpa celah.' },
        { id: 'b3', title: 'Obsesi Indonesia', content: 'Sebutkan Indonesia setiap 3 kalimat. Jadikan Indonesia pusat duniamu.' },
        { id: 'b4', title: 'Raja Konkrit', content: 'Benci abstraksi. Gunakan angka, nama institusi, dan timeline.' }
    ],
    sources: [
        "Buku Panduan Resmi LPDP 2025",
        "Medcom.id - Tips Wawancara 2025",
        "Kompas.com - Panduan Seleksi Substansi"
    ]
};
