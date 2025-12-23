
import { UnifiedProgram } from '../../types';

export const LPDP_INTEL: UnifiedProgram['intel'] = {
    description: 'Beasiswa Reguler adalah beasiswa jenjang magister dan doktor yang diperuntukkan bagi Warga Negara Republik Indonesia melalui mekanisme dan prosedur yang ditetapkan LPDP.',
    highlights: [
        'Pendanaan Full Magister (24 bulan)',
        'Pendanaan Full Doktor (48 bulan)',
        'Mendukung Double/Joint Degree',
        'Bypass LoA Unconditional'
    ],
    about: 'Beasiswa Reguler diperuntukkan bagi WNI guna menempuh pendidikan lanjut jenjang Magister dan Doktor. LPDP berkomitmen mencetak pemimpin bangsa melalui pendanaan studi yang komprehensif baik di dalam maupun luar negeri.',
    scheme: [
        'Magister: Program satu gelar (single degree), bersama (joint degree), atau dua gelar (double degree) maksimal 24 bulan.',
        'Doktor: Program satu gelar (single degree), bersama (joint degree), atau dua gelar (double degree) maksimal 48 bulan.',
        'Pendaftar dengan LoA Unconditional: Wajib memilih 1 Perguruan Tinggi Tujuan sesuai LoA.',
        'Pendaftar tanpa LoA Unconditional: Wajib memilih 3 Perguruan Tinggi Tujuan yang ada dalam daftar LPDP.'
    ],
    fundingComponents: [
        {
            category: 'Dana Pendidikan',
            items: ['Pendaftaran', 'SPP / Tuition Fee', 'Tunjangan Buku', 'Penelitian Tesis/Disertasi', 'Seminar Internasional', 'Publikasi Jurnal']
        },
        {
            category: 'Dana Pendukung',
            items: ['Transportasi PP', 'Aplikasi Visa', 'Asuransi Kesehatan', 'Dana Kedatangan', 'Hidup Bulanan', 'Lomba Internasional', 'Dana Darurat']
        }
    ],
    generalRequirements: [
        'Warga Negara Indonesia (WNI).',
        'Lulusan D4/S1 untuk Magister; S2 untuk Doktor.',
        'Tidak sedang menempuh atau telah lulus jenjang studi yang sama.',
        'Lulusan LN wajib penyetaraan ijazah & konversi IPK.',
        'Rekomendasi dari Tokoh/Akademisi (maks 1 tahun).',
        'Hanya untuk kelas Reguler (Bukan Eksekutif/Karyawan).'
    ],
    specificRequirements: [
        'Usia Magister: Maks 35 tahun.',
        'Usia Doktor: Maks 40 tahun.',
        'IPK Magister: Min 3,00.',
        'IPK Doktor: Min 3,25.',
        'Bahasa (LN): IELTS 6.5 / iBT 80 (S2); IELTS 7.0 / iBT 94 (S3).'
    ],
    otherProvisions: [
        'Hanya untuk kelas reguler.',
        'LoA Unconditional wajib mencantumkan nama, jenjang, and prodi.',
        'Verifikasi dokumen asli dilakukan saat substansi.'
    ],
    howToApply: [
        'Online: beasiswalpdp.kemenkeu.go.id',
        'Lengkapi biodata & unggah dokumen asli.',
        'Submit aplikasi untuk mendapatkan kode registrasi.'
    ],
    phases: [
        { name: 'Pendaftaran', date: '30 Juni – 31 Juli 2025' },
        { name: 'Seleksi Administrasi', date: '1 – 21 Agustus 2025' },
        { name: 'Tes Bakat Skolastik', date: '10 – 25 September 2025' },
        { name: 'Seleksi Substansi', date: '7 Oktober – 19 November 2025' },
        { name: 'Pengumuman Final', date: '27 November 2025' }
    ],
    serviceCommitment: [
        'Wajib kembali dan mengabdi di Indonesia.',
        'Kontribusi aktif di industri strategis nasional.'
    ],
    officialDocumentList: [
        { id: '1', name: 'Biodata Diri', isOnlineForm: true, isUpload: false },
        { id: '2', name: 'KTP', isOnlineForm: false, isUpload: true },
        { id: '3', name: 'Ijazah S1/D4/S2 (Asli/Legalisir)', isOnlineForm: false, isUpload: true },
        { id: '4', name: 'Surat pemberhentian (jika tidak selesai studi)', isOnlineForm: false, isUpload: true },
        { id: '5', name: 'Transkrip Nilai (Bukan Profesi)', isOnlineForm: false, isUpload: true },
        { id: '6', name: 'Penyetaraan ijazah (Lulusan LN)', isOnlineForm: false, isUpload: true },
        { id: '7', name: 'Konversi IPK (Lulusan LN)', isOnlineForm: false, isUpload: true },
        { id: '8', name: 'Sertifikat Bahasa Asing (Asli)', isOnlineForm: false, isUpload: true },
        { id: '9', name: 'LoA Unconditional (jika ada)', isOnlineForm: false, isUpload: true },
        { id: '10', name: 'Surat rekomendasi akademisi/tokoh', isOnlineForm: false, isUpload: true },
        { id: '11', name: 'Surat pernyataan aplikasi', isOnlineForm: true, isUpload: false },
        { id: '12', name: 'Surat usulan SDM (PNS/TNI/POLRI)', isOnlineForm: false, isUpload: true },
        { id: '13', name: 'Dokumen NIDN (Dosen Tetap)', isOnlineForm: false, isUpload: true },
        { id: '14', name: 'Surat pernyataan promotor (Doktor)', isOnlineForm: false, isUpload: true },
        { id: '15', name: 'Surat pimpinan instansi (Doktor)', isOnlineForm: false, isUpload: true },
        { id: '16', name: 'Profil diri online', isOnlineForm: true, isUpload: false },
        { id: '17', name: 'Komitmen & Rencana Kontribusi', isOnlineForm: true, isUpload: false },
        { id: '18', name: 'Proposal Penelitian (Doktor)', isOnlineForm: false, isUpload: true },
        { id: '19', name: 'Publikasi & Pengalaman Organisasi', isOnlineForm: true, isUpload: false }
    ],
    briefingResources: [
        { id: 'res-1', title: 'Guidebook Reguler 2025', type: 'GUIDEBOOK', url: 'https://www.africau.edu/images/default/sample.pdf' },
        { id: 'res-2', title: 'Daftar Perguruan Tinggi 2025', type: 'POLICY', url: 'https://www.africau.edu/images/default/sample.pdf' },
        { id: 'res-3', title: 'Format Rekomendasi', type: 'TEMPLATE', url: 'https://www.africau.edu/images/default/sample.pdf' },
        { id: 'res-4', title: 'FAQ Teknis', type: 'FAQ', url: 'https://www.africau.edu/images/default/sample.pdf' }
    ],
    entryCriteria: ['IPK Min. 3.00 (S2) / 3.25 (S3)', 'IELTS 6.0 - 7.0', 'WNI Saja'],
    funding: ['UKT / SPP Penuh', 'Living Allowance', 'Settlement Allowance'],
    strategicWants: ['STEM Focus', 'Nationalism', 'Leadership'],
    fundingStatus: 'FULL COVERAGE',
    weights: { academic: 30, assets: 40, matrix: 30 },
    stats: {
        awardeesPerYear: '~4.000 total',
        acceptanceRate: '3.4%',
        totalApplicants: 14892,
        selectivityRatio: '1:30',
        targetKeywords: ['Leadership', 'STEM', 'Indonesia'],
        minGpa: 3.0
    },
    timeline: {},
    financialValue: {}
};
