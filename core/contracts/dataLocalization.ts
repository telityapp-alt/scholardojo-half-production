
export const ID_CONTENT = {
    programs: [
        {
            id: 'lpdp-reguler-2026',
            title: 'LPDP Beasiswa Reguler 2025-2026',
            hostName: 'LPDP - Kementerian Keuangan RI',
            description: 'Beasiswa penuh pemerintah Indonesia untuk jenjang Magister dan Doktor di dalam/luar negeri dengan fokus STEM dan industri strategis nasional.',
            intel: {
                description: 'Pendanaan penuh prestisius oleh pemerintah Indonesia untuk program Magister dan Doktoral secara global, berfokus pada STEM dan industri strategis nasional.',
                highlights: ['Cakupan Biaya Kuliah 100%', 'Tunjangan Hidup Bulanan', 'Tiket Pesawat Internasional', 'Tanpa Ikatan Dinas di Negara Tujuan'],
                entryCriteria: ['IPK Min. 3.0 (S2) / 3.25 (S3)', 'Usia Maks 35 (S2) / 40 (S3)', 'IELTS 6.5+ / TOEFL iBT 80+'],
                funding: ['Total Biaya Kuliah & Pendaftaran', 'Tunjangan Bulanan (Sesuai Lokasi)', 'Anggaran Riset & Buku', 'Tunjangan Keluarga (Khusus Doktoral)'],
                strategicWants: ["Komitmen kuat untuk kembali ke RI", "Kontribusi pada pangan, energi, atau pertahanan", "Rekam jejak kepemimpinan"],
                fundingStatus: 'FULL COVERAGE',
                stats: {
                    awardeesPerYear: "~4.000 penerima total",
                    acceptanceRate: "3.4% (Sangat Kompetitif)",
                    totalApplicants: 14892,
                    selectivityRatio: "1:30",
                    targetKeywords: ["Nasionalisme", "Industri Strategis", "STEM", "Kepemimpinan"],
                    minGpa: 3.0,
                    nationalityQuota: "Warga Negara Indonesia Saja"
                },
                financialValue: {
                    tuition: "Penuh (Variabel)",
                    living: "Rp 15jt - 25jt / Bulan",
                    flights: "Ekonomi (PP)",
                    totalValue: "Setara Miliaran Rupiah"
                },
                timeline: { 
                    openDate: 'Januari 2026', 
                    docDeadline: 'Februari 2026', 
                    selectionPeriod: 'Feb - Juni 2026', 
                    resultEstimate: 'Juni 2026',
                    interviewWindow: "Mei - Juni (Fase Substansi)"
                },
                obligations: { 
                    bondYears: 2, 
                    returnPolicy: '2n+1 (Wajib kembali ke RI)', 
                    expectedContribution: 'Pembangunan Nasional', 
                    sanctionWarning: 'Pengembalian dana penuh + blacklist masa depan jika melanggar' 
                },
                secretTips: { 
                    redFlags: ['Rencana kembali yang tidak jelas', 'Kurang bukti dampak sosial'],
                    interviewFocus: ['Kontribusi', 'Kecocokan Jurusan', 'Nasionalisme'],
                    commonMistakes: ['Copy-paste esai', 'Skor Inggris kurang']
                }
            },
            shadowProtocol: {
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
            },
            checklist: [
                { 
                    id: 'essay_contribution', label: 'Esai Kontribusi (1.5rb-2rb kata)', estimate: '7-14hr', completed: false, 
                    structure: ['Hook (Data/Masalah)', 'Latar Belakang', 'Rencana Studi', 'Rencana Kontribusi', 'Penutup'],
                    proTip: "Gunakan struktur Patriot-Builder-Measurer."
                }
            ],
            requirements: { 
                "IPK Minimal": "3.00 (S2) / 3.25 (S3)", 
                "Usia Max": "35 tahun (S2) / 40 tahun (S3)", 
                "Bahasa Inggris": "TOEFL iBT 80 / IELTS 6.5 (S2 LN)" 
            },
            benefits: { 
                "Biaya Pendidikan": "100% SPP, Pendaftaran, Buku, Riset", 
                "Biaya Hidup": "Tunjangan bulanan sesuai lokasi studi", 
                "Logistik": "Tiket pesawat PP, Asuransi, Visa" 
            }
        },
        {
            id: 'gates-cambridge-2025',
            title: 'Beasiswa Gates Cambridge',
            description: 'Beasiswa penuh paling prestisius di dunia untuk kuliah di University of Cambridge. Mencakup seluruh biaya dan tunjangan riset.',
            hostName: 'Yayasan Bill & Melinda Gates',
            requirements: { 
                "Akademik": "IPK minimal 3.7/4.0", 
                "Kepemimpinan": "Bukti kepemimpinan yang berdampak luas", 
                "Komitmen": "Dedikasi untuk membantu masyarakat" 
            },
            benefits: { 
                "Biaya Kuliah": "100% Biaya kuliah di Cambridge", 
                "Uang Saku": "£20,000 per tahun", 
                "Jaringan": "Akses ke jaringan sarjana global" 
            }
        }
    ],
    hosts: [
        { id: 'h_code', name: 'Akademi Kode', location: 'Daring', overview: 'Bootcamp coding daring utama di dunia.' }
    ],
    vault: [
        { 
            id: 'v_st_1', 
            title: 'Jalur Backend: Python', 
            description: 'Jalur khusus untuk pengembangan backend profesional menggunakan Django dan REST Framework.', 
            hostName: 'Akademi Kode',
            valueLabel: 'Hadiah Kompetisi',
            category: 'Jalur Belajar Intensif'
        }
    ],
    curriculum: [
        {
            id: 'lpdp-academy',
            title: 'Akademi LPDP 2026',
            subtitle: 'Blueprint lengkap dan strategi rahasia untuk memenangkan beasiswa reguler.',
            author: 'Sensei Dojo',
            units: [
                {
                    id: 'u1', title: 'Unit 1: Identitas & Nasionalisme', description: 'Menyelaraskan DNA Anda dengan kepentingan nasional Indonesia.',
                    chapters: [
                        {
                            id: 'c1', title: 'Narasi Patriot', description: 'Menyusun alur kontribusi dalam esai beasiswa.',
                            points: [
                                { id: 'p1', title: 'LOGIC', content: 'LPDP mencari pembangun bangsa, bukan sekadar mahasiswa pintar.' }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    community: []
};
