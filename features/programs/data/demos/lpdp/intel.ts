
import { UnifiedProgram } from '../../types';

export const LPDP_INTEL: UnifiedProgram['intel'] = {
    description: 'Pendanaan penuh prestisius oleh pemerintah Indonesia untuk program Magister dan Doktor di seluruh dunia, berfokus pada STEM dan industri strategis nasional.',
    highlights: ['100% Tuition Coverage', 'Monthly Living Stipend', 'International Airfare', 'No-Bond in Host Country'],
    entryCriteria: ['GPA Min. 3.0 (S2) / 3.25 (S3)', 'Max Age 35 (S2) / 40 (S3)', 'IELTS 6.5+ / TOEFL iBT 80+'],
    funding: ['Total Tuition & Registration', 'Monthly Allowance (Location Based)', 'Research & Book Budget', 'Family Allowance (PhD Only)'],
    strategicWants: ["Komitmen kuat untuk kembali ke RI", "Kontribusi pada Pangan, Energi, atau Pertahanan", "Rekam jejak kepemimpinan"],
    fundingStatus: 'FULL COVERAGE',
    weights: { academic: 30, assets: 30, matrix: 40 },
    stats: {
        awardeesPerYear: "~4.000 scholars total",
        acceptanceRate: "3.4% (Sangat Kompetitif)",
        totalApplicants: 14892,
        selectivityRatio: "1:30",
        targetKeywords: ["Nasionalisme", "Industri Strategis", "STEM", "Kepemimpinan"],
        minGpa: 3.0,
        nationalityQuota: "Warga Negara Indonesia Saja"
    },
    partnerInstitutions: [
        { name: 'Top 100 Global Universities', location: 'Worldwide', rank: 'QS < 100', deptStats: "STEM Priority: 80%" }
    ],
    timeline: { 
        openDate: 'Januari 2026', 
        docDeadline: 'Februari 2026', 
        selectionPeriod: 'Feb - Juni 2026', 
        resultEstimate: 'Juni 2026',
        interviewWindow: "Mei - Juni (Fase Substansi)"
    },
    destinations: { 
        eligibleMajors: ['STEM', 'Strategic Management', 'Public Policy'], 
        targetCountries: ['Global'], 
        loaStatus: 'OPTIONAL' 
    },
    documents: [
        { label: 'KTP / Identitas Resmi', spec: 'Identitas Valid', type: 'DOC' },
        { label: 'Transkrip Akademik', spec: 'Salinan Legalisir', type: 'DOC' },
        { label: 'Sertifikat Bahasa', spec: 'IELTS/TOEFL iBT', type: 'CERT' },
        { label: 'Esai Kontribusi', spec: '1500-2000 kata', type: 'ESSAY' }
    ],
    selectionPhases: [
        { name: 'Administrasi', weight: 20, format: 'Audit Dokumen', focus: "Compliance" },
        { name: 'Tes Bakat Skolastik', weight: 30, format: 'Ujian Akademik', focus: "Logika & IQ" },
        { name: 'Seleksi Substansi', weight: 50, format: 'Interview Panel', focus: "Nasionalisme & Visi" }
    ],
    obligations: { 
        bondYears: 2, 
        returnPolicy: '2n+1 (Wajib kembali ke RI)', 
        expectedContribution: 'Pembangunan Nasional', 
        sanctionWarning: 'Full refund + future blacklisting jika melanggar' 
    },
    resources: { officialSite: 'https://lpdp.kemenkeu.go.id', helpdeskEmail: 'cs.lpdp@kemenkeu.go.id', guidebookUrl: '#', testimonyCount: 15400 },
    secretTips: { 
        redFlags: ['Rencana kembali tidak jelas', 'Kurang bukti dampak sosial'],
        interviewFocus: ['Kontribusi', 'Penyelarasan Jurusan', 'Nasionalisme'],
        commonMistakes: ['Copy-paste esai', 'Skor Inggris kurang']
    },
    financialValue: {
        tuition: "Penuh (Variabel)",
        living: "Rp 15jt - 25jt / Bulan",
        flights: "Ekonomi (Pulang Pergi)",
        totalValue: "Setara Miliaran Rupiah"
    },
    news: [
        {
            id: 'news-lpdp-2026-1',
            date: 'Oktober 2025',
            title: 'Prediksi Jadwal Pendaftaran 2026',
            content: 'Pendaftaran LPDP 2026 diperkirakan dibuka pada Januari 2026 mengikuti pola tahun sebelumnya. Dibagi menjadi 2 tahap: Tahap 1 (Jan-Feb) untuk perkuliahan Juli 2026, dan Tahap 2 (Juni-Juli) untuk perkuliahan Januari 2027.',
            source: 'Kumparan/Berita Jatim',
            tags: ['TIMELINE', 'PREDIKSI']
        },
        {
            id: 'news-lpdp-2026-2',
            date: 'Oktober 2025',
            title: 'Perubahan Kuota & Fokus STEM 80%',
            isBreaking: true,
            content: 'Ada perubahan besar bro! Kuota total 4.000 penerima di 2026. LPDP akan fokus 80% kuota untuk bidang STEM (60% STEM murni + 20% STEM adjective). Ada kategori baru "General STEM" untuk bidang studi spesifik yang tidak ada di menu sebelumnya.',
            source: 'Detik/Berita Jatim',
            tags: ['KUOTA', 'STRATEGIS']
        },
        {
            id: 'news-lpdp-2026-3',
            date: 'Oktober 2025',
            title: 'Sektor Prioritas: Kesehatan & Pendidikan',
            content: 'Fokus utama tetap pada STEM, Kesehatan, dan Pendidikan. Termasuk Data Science, AI, Energi Terbarukan, Kedokteran Spesialis, Farmasi Klinis, dan Teknologi Pembelajaran.',
            source: 'Kumparan',
            tags: ['PRIORITAS']
        },
        {
            id: 'news-lpdp-2026-4',
            date: 'Oktober 2025',
            title: 'Disclaimer Data 2026',
            content: 'Ingat bro, data 2026 belum ada rilis resmi. Yang resmi baru LPDP 2025 Batch 2. Info ini masih berupa prediksi berdasarkan tren kebijakan terbaru. Angka acceptance rate batch 1 2025 kemarin ada di kisaran 3,4% (507 dari 14.892 pendaftar).',
            source: 'Dojo Intelligence',
            tags: ['CAVEAT']
        }
    ]
};
