
import { UnifiedProgram } from '../../types';

export const LPDP_ENTREPRENEUR_INTEL: UnifiedProgram['intel'] = {
    description: 'Beasiswa Kewirausahaan adalah beasiswa jenjang magister luar negeri satu gelar (single degree) bagi WNI yang bergerak di bidang kewirausahaan untuk memperkuat ekosistem ekonomi nasional.',
    highlights: [
        'Pendanaan Magister LN (24 Bulan)',
        'Tanpa Syarat Minimal Usaha Berjalan',
        'Bypass Seleksi Bakat Skolastik (dengan LoA)',
        'Komitmen Pengabdian di Perguruan Tinggi'
    ],
    about: 'Beasiswa ini dirancang khusus untuk mencetak wirausahawan yang juga bersedia menjadi penggerak pendidikan kewirausahaan di Indonesia. Penerima beasiswa diharapkan tidak hanya membangun bisnis, tetapi juga memperkuat tenaga pendidik di Perguruan Tinggi.',
    scheme: [
        'Jenjang: Magister Luar Negeri (Single Degree).',
        'Durasi: Maksimal 24 bulan pendanaan.',
        'Pendaftar dengan LoA: Wajib pilih 1 Perguruan Tinggi Tujuan sesuai LoA.',
        'Pendaftar tanpa LoA: Wajib pilih 3 Perguruan Tinggi Tujuan bidang Entrepreneurship.'
    ],
    fundingComponents: [
        {
            category: 'Dana Pendidikan',
            items: ['Pendaftaran', 'SPP/Tuition Fee/UKT', 'Tunjangan Buku', 'Penelitian Tesis', 'Seminar Internasional', 'Publikasi Jurnal Internasional']
        },
        {
            category: 'Dana Pendukung',
            items: ['Transportasi PP', 'Aplikasi Visa', 'Asuransi Kesehatan', 'Dana Kedatangan', 'Hidup Bulanan', 'Lomba Internasional', 'Dana Darurat']
        }
    ],
    generalRequirements: [
        'Warga Negara Indonesia (WNI).',
        'Lulusan D4 atau S1 untuk Magister.',
        'Tidak sedang menempuh atau telah lulus S2.',
        'Lulusan LN wajib melampirkan penyetaraan ijazah & konversi IPK.',
        'Rekomendasi dari Tokoh Masyarakat/Akademisi (maks 1 tahun).',
        'Hanya untuk kelas reguler (Bukan eksekutif/karyawan/jarak jauh).'
    ],
    specificRequirements: [
        'Usia: Maksimal 35 tahun (per 31 Desember tahun pendaftaran).',
        'IPK Minimal: 2,50 dari skala 4,00.',
        'Bahasa Inggris: TOEFL iBT 61, PTE 65, atau IELTS 6,0.',
        'Status: Bukan CPNS/PNS/TNI/POLRI.',
        'Proposal Bisnis: Rencana bisnis (ide baru) atau profil bisnis berjalan.',
        'Surat Komitmen: Diketahui Rektor/Dekan untuk mengabdi sebagai tenaga pendidik.'
    ],
    officialDocumentList: [
        { id: '1', name: 'Biodata Diri (Online Form)', isOnlineForm: true, isUpload: false },
        { id: '2', name: 'KTP', isOnlineForm: false, isUpload: true },
        { id: '3', name: 'Ijazah S1/D4 atau SKL', isOnlineForm: false, isUpload: true },
        { id: '4', name: 'Surat Pemberhentian (Bagi yang tidak selesai studi)', isOnlineForm: false, isUpload: true },
        { id: '5', name: 'Transkrip Nilai S1/D4 (Asli/Legalisir)', isOnlineForm: false, isUpload: true },
        { id: '6', name: 'Penyetaraan Ijazah (Lulusan LN)', isOnlineForm: false, isUpload: true },
        { id: '7', name: 'Konversi IPK (Lulusan LN)', isOnlineForm: false, isUpload: true },
        { id: '8', name: 'Sertifikat Bahasa Asing (IELTS 6.0/iBT 61)', isOnlineForm: false, isUpload: true },
        { id: '9', name: 'LoA Unconditional (Jika ada)', isOnlineForm: false, isUpload: true },
        { id: '10', name: 'Surat Rekomendasi Tokoh/Akademisi', isOnlineForm: true, isUpload: true },
        { id: '11', name: 'Surat Pernyataan Komitmen PT (Diketahui Rektor/Dekan)', isOnlineForm: false, isUpload: true },
        { id: '12', name: 'Rencana Bisnis / Pengembangan Bisnis (Format LPDP)', isOnlineForm: false, isUpload: true },
        { id: '13', name: 'Surat Pernyataan Aplikasi (Online)', isOnlineForm: true, isUpload: false },
        { id: '14', name: 'Komitmen Kembali & Rencana Kontribusi (1500-2000 kata)', isOnlineForm: true, isUpload: false },
        { id: '15', name: 'Publikasi & Pengalaman Organisasi', isOnlineForm: true, isUpload: false }
    ],
    briefingResources: [
        { id: 'res-ent-1', title: 'Booklet Kewirausahaan 2025', type: 'GUIDEBOOK', url: 'https://lpdp.kemenkeu.go.id/storage/beasiswa/link-booklet/Booklet%20Beasiswa%20Kewirausahaan%202025.pdf' },
        { id: 'res-ent-2', title: 'Daftar Perguruan Tinggi Tujuan 2025', type: 'POLICY', url: 'https://lpdp.kemenkeu.go.id/storage/beasiswa/link-booklet/Daftar%20Perguruan%20Tinggi%20Tujuan%202025.pdf' }
    ],
    entryCriteria: ['IPK Min. 2.50', 'IELTS 6.0', 'Proposal Bisnis Wajib'],
    funding: ['Full Tuition Fee', 'Living Allowance', 'Business Incubation Support'],
    strategicWants: ['Venture Builders', 'Future Academics', 'National Economy Drivers'],
    fundingStatus: 'FULL COVERAGE',
    weights: { academic: 20, assets: 50, matrix: 30 },
    stats: {
        awardeesPerYear: "~150 target",
        acceptanceRate: "5-7% (Estimated)",
        totalApplicants: 3200,
        selectivityRatio: "1:20",
        targetKeywords: ["Entrepreneurship", "3C Strategy", "Scalability", "Educator"],
        minGpa: 2.5
    },
    timeline: {},
    financialValue: {},
    phases: [
        { name: 'Pendaftaran Seleksi', date: '30 Juni – 31 Juli 2025' },
        { name: 'Seleksi Administrasi', date: '1 – 21 Agustus 2025' },
        { name: 'Seleksi Bakat Skolastik', date: '10 – 25 September 2025' },
        { name: 'Seleksi Substansi', date: '7 Oktober – 19 November 2025' },
        { name: 'Pengumuman Final', date: '27 November 2025' }
    ]
};
