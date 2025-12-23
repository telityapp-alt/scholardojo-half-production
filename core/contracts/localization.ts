
export type SupportedLanguage = 'en' | 'id' | 'ms' | 'hi' | 'pt-br';

export interface TranslationSchema {
  common: {
    back: string; save: string; saved: string; loading: string; search: string; view: string; apply: string; 
    deadline: string; host: string; category: string; transforming: string;
    share: string; visit: string; officialSources: string; overview: string;
    match: string;
  };
  navigation: {
    discovery: string; workspace: string; skillspace: string; community: string;
    home: string; melytics: string; admission: string; quest: string; plan: string;
    curriculum: string; skills: string; academy: string; tools: string; vault: string; programs: string;
    events: string; hosts: string; 'community-board': string; 'war-room': string; arena: string;
    target: string;
  };
  landing: {
    heroTitle: string;
    heroSub: string;
    startBtn: string;
    loginBtn: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
    statsTitle: string;
    statsDesc: string;
    footerText: string;
  };
  vault: {
    title: string; subtitle: string; searchPlaceholder: string;
    filters: {
      citizenship: string; destination: string; collection: string;
      global: string; anywhere: string; all: string;
    };
    card: { match: string; view: string; };
  };
  vaultDetail: {
    backToVault: string;
    objectiveTitle: string;
    actionCenter: string;
    startApp: string;
    saveLater: string;
    aiInsight: string;
    aiMatchText: string;
    matchFound: string;
    topTier: string;
    applicablePartners: string;
    tabs: { brief: string; checklist: string; rewards: string; };
    visitHost: string;
  };
  programDetail: {
    backToPrograms: string; missionSpecs: string; connect: string; connected: string;
    readyToApply: string; closes: string; selectPath: string; recommended: string;
  };
  community: {
    shortcut: { network: string; question: string; target: string; desc: string; btn: string; };
  };
  scout: { title: string; subtitle: string; scanBtn: string; noResults: string; };
  curriculum: { title: string; subtitle: string; mastery: string; units: string; };
  dashboard: { welcome: string; ready: string; activeQuests: string; totalApps: string; submitted: string; history: string; };
  ai: { coachTitle: string; thinking: string; placeholder: string; extractionConfidence: string; };
  melytics: {
    title: string; subtitle: string; scanCv: string; scanBtn: string; addField: string;
    stats: { strength: string; weakness: string; preparedness: string; };
  }
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationSchema> = {
  en: {
    common: { back: "Back", save: "Save", saved: "Saved", loading: "Loading...", search: "Search...", view: "View", apply: "Apply", deadline: "Deadline", host: "Host", category: "Category", transforming: "Sensei is translating...", share: "Share Opportunity", visit: "Visit", officialSources: "Official Sources", overview: "Overview", match: "Match" },
    navigation: { discovery: "Discovery", workspace: "Workspace", skillspace: "Skillspace", community: "Community", home: "Home", melytics: "Melytics", admission: "Admission", quest: "Quest", plan: "Plan", curriculum: "Curriculum", skills: "Skills", academy: "Academy", tools: "Tools", vault: "Board", programs: "Programs", events: "Events", hosts: "Universities", 'community-board': "Community Board", 'war-room': "War Room", arena: "Interview Arena", target: "My Programs" },
    landing: {
        heroTitle: "Master Your Global Future.",
        heroSub: "The free, fun, and effective way to conquer world-class scholarships and careers.",
        startBtn: "GET STARTED",
        loginBtn: "I ALREADY HAVE AN ACCOUNT",
        feature1Title: "Neural Intel",
        feature1Desc: "Access deep, community-scouted data on 10,000+ elite programs.",
        feature2Title: "Battle Arena",
        feature2Desc: "Defeat AI Bosses in realistic high-pressure interview simulations.",
        feature3Title: "The Forge",
        feature3Desc: "Craft elite document artifacts that bypass any admission filter.",
        statsTitle: "Built for Winners",
        statsDesc: "Join the collective of 100,000+ Ninjas targeting the Top 1%.",
        footerText: "Dojo Ninja Academy • 2026 Protocol"
    },
    vault: {
      title: "Opportunity Board", subtitle: "Curated tracks for ambitious dojo members.", searchPlaceholder: "Search board...",
      filters: { citizenship: "Citizenship", destination: "Destination", collection: "Collection", global: "Global", anywhere: "Anywhere", all: "All Collections" },
      card: { match: "Match", view: "View" }
    },
    vaultDetail: {
      backToVault: "Back to Board", objectiveTitle: "The Objective", actionCenter: "Action Center", startApp: "Start Application", saveLater: "Save for Later",
      aiInsight: "AI Insight", aiMatchText: "Your profile matches", matchFound: "Match", topTier: "Top Tier", applicablePartners: "Applicable Partners",
      tabs: { brief: "Briefing", checklist: "Checklist", rewards: "Rewards" }, visitHost: "Visit"
    },
    programDetail: {
      backToPrograms: "Back to Programs", missionSpecs: "Mission Specs", connect: "Connect", connected: "Connected",
      readyToApply: "Ready to apply?", closes: "Closes", selectPath: "Select a path", recommended: "Recommended"
    },
    community: { shortcut: { network: "Scout Network", question: "Not finding", target: "\"The One\"", desc: "These are official tracks. Visit the Community Board to discover 1,000+ more member-driven opportunities updated hourly.", btn: "Visit Community Board" } },
    scout: { title: "Community Board", subtitle: "Discover community-verified opportunities.", scanBtn: "Scan Brief", noResults: "No results" },
    curriculum: { title: "Master Curriculum", subtitle: "Structured blueprints for success.", mastery: "Mastery", units: "Units" },
    dashboard: { welcome: "Hi", ready: "Ready to conquer?", activeQuests: "Active Quests", totalApps: "Applications", submitted: "Submitted", history: "XP History" },
    ai: { coachTitle: "Dojo Coach", thinking: "Thinking...", placeholder: "Ask Sensei...", extractionConfidence: "High Accuracy" },
    melytics: {
        title: "Melytics", subtitle: "Deep Intelligence Foundation", scanCv: "CV Analysis", scanBtn: "Scan Resume", addField: "Add Intel Field",
        stats: { strength: "Core Strengths", weakness: "Growth Areas", preparedness: "Preparedness" }
    }
  },
  id: {
    common: { back: "Kembali", save: "Simpan", saved: "Tersimpan", loading: "Memuat...", search: "Cari...", view: "Lihat", apply: "Daftar", deadline: "Tenggat", host: "Penyelenggara", category: "Kategori", transforming: "Sensei sedang menerjemahkan...", share: "Bagikan Peluang", visit: "Kunjungi", officialSources: "Sumber Resmi", overview: "Ikhtisar", match: "Kecocokan" },
    navigation: { discovery: "Eksplorasi", workspace: "Ruang Kerja", skillspace: "Skillspace", community: "Komunitas", home: "Beranda", melytics: "Melytics", admission: "Penerimaan", quest: "Misi", plan: "Rencana", curriculum: "Kurikulum", skills: "Keahlian", academy: "Akademi", tools: "Alat", vault: "Board", programs: "Program", events: "Acara", hosts: "Universitas", 'community-board': "Papan Komunitas", 'war-room': "War Room", arena: "Arena Interview", target: "Program Saya" },
    landing: {
        heroTitle: "Kuasai Masa Depan Globalmu.",
        heroSub: "Cara gratis, seru, dan efektif untuk menaklukkan beasiswa dan karir kelas dunia.",
        startBtn: "MULAI SEKARANG",
        loginBtn: "SAYA SUDAH PUNYA AKUN",
        feature1Title: "Neural Intel",
        feature1Desc: "Akses data mendalam hasil scouting komunitas untuk 10.000+ program elit.",
        feature2Title: "Arena Battle",
        feature2Desc: "Kalahkan Boss AI dalam simulasi interview bertekanan tinggi yang realistis.",
        feature3Title: "The Forge",
        feature3Desc: "Tempa dokumen elit yang sanggup menembus filter pendaftaran mana pun.",
        statsTitle: "Dibuat Untuk Pemenang",
        statsDesc: "Bergabunglah dengan kolektif 100.000+ Ninja yang menargetkan Top 1%.",
        footerText: "Dojo Ninja Academy • Protokol 2026"
    },
    vault: {
      title: "Papan Peluang", subtitle: "Jalur pilihan untuk anggota dojo ambisius.", searchPlaceholder: "Cari di papan...",
      filters: { citizenship: "Kewarganegaraan", destination: "Tujuan", collection: "Koleksi", global: "Global", anywhere: "Mana saja", all: "Semua Koleksi" },
      card: { match: "Kecocokan", view: "Lihat" }
    },
    vaultDetail: {
      backToVault: "Kembali ke Papan", objectiveTitle: "Objektif Utama", actionCenter: "Pusat Kendali", startApp: "Mulai Pendaftaran", saveLater: "Simpan Nanti",
      aiInsight: "Wawasan AI", aiMatchText: "Profil Anda cocok", matchFound: "Kemiripan", topTier: "Tier Teratas", applicablePartners: "Partner Terkait",
      tabs: { brief: "Ringkasan", checklist: "Daftar Tugas", rewards: "Hadiah" }, visitHost: "Kunjungi"
    },
    programDetail: {
        backToPrograms: "Kembali ke Program", missionSpecs: "Spek Misi", connect: "Hubungkan", connected: "Terhubung",
        readyToApply: "Siap mendaftar?", closes: "Tutup pada", selectPath: "Pilih jalur", recommended: "Direkomendasikan"
    },
    community: { shortcut: { network: "Jaringan Scout", question: "Belum menemukan", target: "\"Yang Sesuai\"", desc: "Ini adalah jalur resmi. Kunjungi Papan Komunitas untuk menemukan 1.000+ peluang dari anggota yang diperbarui setiap jam.", btn: "Kunjungi Papan Komunitas" } },
    scout: { title: "Papan Komunitas", subtitle: "Temukan peluang yang diverifikasi komunitas.", scanBtn: "Scan Info", noResults: "Hasil tidak ditemukan" },
    curriculum: { title: "Kurikulum Master", subtitle: "Blueprint terstruktur untuk sukses.", mastery: "Penguasaan", units: "Unit" },
    dashboard: { welcome: "Halo", ready: "Siap beraksi hari ini?", activeQuests: "Misi Aktif", totalApps: "Pendaftaran", submitted: "Terkirim", history: "Riwayat XP" },
    ai: { coachTitle: "Pelatih Dojo", thinking: "Berpikir...", placeholder: "Tanya Sensei...", extractionConfidence: "Akurasi Tinggi" },
    melytics: {
        title: "Melytics", subtitle: "Landasan Intelijen Mendalam", scanCv: "Analisis CV", scanBtn: "Imbas Resume", addField: "Tambah Data Intel",
        stats: { strength: "Kekuatan Utama", weakness: "Area Pengembangan", preparedness: "Kesiapan" }
    }
  },
  ms: {
    common: { back: "Kembali", save: "Simpan", saved: "Disimpan", loading: "Memuat...", search: "Cari...", view: "Lihat", apply: "Mohon", deadline: "Tarikh Tutup", host: "Penganjur", category: "Kategori", transforming: "Sensei sedang menterjemah...", share: "Kongsi Peluang", visit: "Lawat", officialSources: "Sumber Rasmi", overview: "Gambaran Keseluruhan", match: "Padanan" },
    navigation: { discovery: "Penemuan", workspace: "Ruang Kerja", skillspace: "Ruang Kemahiran", community: "Komuniti", home: "Utama", melytics: "Melytics", admission: "Kemasukan", quest: "Misi", plan: "Rancangan", curriculum: "Kurikulum", skills: "Kemahiran", academy: "Akademi", tools: "Alatan", vault: "Papan", programs: "Program", events: "Acara", hosts: "Universiti", 'community-board': "Papan Komuniti", 'war-room': "Bilik Gerakan", arena: "Arena Interview", target: "Program Saya" },
    landing: {
        heroTitle: "Kuasai Masa Depan Globalmu.",
        heroSub: "Cara percuma, seronok, dan berkesan untuk menakluki biasiswa dan kerjaya kelas dunia.",
        startBtn: "MULA SEKARANG",
        loginBtn: "SAYA SUDAH ADA AKAUN",
        feature1Title: "Neural Intel",
        feature1Desc: "Akses data mendalam hasil tinjauan komuniti untuk 10,000+ program elit.",
        feature2Title: "Arena Battle",
        feature2Desc: "Kalahkan Boss AI dalam simulasi temu duga bertekanan tinggi yang realistik.",
        feature3Title: "The Forge",
        feature3Desc: "Cipta dokumen elit yang mampu menembusi mana-mana tapisan kemasukan.",
        statsTitle: "Dibina Untuk Pemenang",
        statsDesc: "Sertai kolektif 100,000+ Ninja yang mensasarkan Top 1%.",
        footerText: "Dojo Ninja Academy • Protokol 2026"
    },
    vault: {
      title: "Papan Peluang", subtitle: "Laluan pilihan untuk sarjana ambisius.", searchPlaceholder: "Cari di papan...",
      filters: { citizenship: "Kewarganegaraan", destination: "Destinasi", collection: "Koleksi", global: "Global", anywhere: "Mana-mana", all: "Semua Koleksi" },
      card: { match: "Padanan", view: "Lihat" }
    },
    vaultDetail: {
      backToVault: "Kembali ke Papan", objectiveTitle: "Objektif", actionCenter: "Pusat Tindakan", startApp: "Mula Permohonan", saveLater: "Simpan Kemudian",
      aiInsight: "Wawasan AI", aiMatchText: "Profil anda sepadan", matchFound: "Padanan", topTier: "Tier Teratas", applicablePartners: "Rakan Kongsi Sesuai",
      tabs: { brief: "Ringkasan", checklist: "Senarai Semak", rewards: "Ganjaran" }, visitHost: "Lawat"
    },
    programDetail: {
        backToPrograms: "Kembali ke Program", missionSpecs: "Spek Misi", connect: "Hubung", connected: "Dihubungkan",
        readyToApply: "Sedia memohon?", closes: "Tutup", selectPath: "Pilih laluan", recommended: "Disyorkan"
    },
    community: { shortcut: { network: "Rangkaian Scout", question: "Belum jumpa", target: "\"Yang Sesuai\"", desc: "Ini adalah laluan rasmi. Lawati Papan Komuniti untuk menemui 1,000+ peluang komuniti yang dikemas kini setiap jam.", btn: "Lawati Papan Komuniti" } },
    scout: { title: "Papan Komuniti", subtitle: "Cari peluang yang disahkan komuniti.", scanBtn: "Imbas Ringkasan", noResults: "Tiada hasil" },
    curriculum: { title: "Kurikulum Utama", subtitle: "Rangka kerja terstruktur untuk kejayaan.", mastery: "Penguasaan", units: "Unit" },
    dashboard: { welcome: "Hai", ready: "Sedia untuk berjaya?", activeQuests: "Misi Aktif", totalApps: "Permohonan", submitted: "Dihantar", history: "Sejarah XP" },
    ai: { coachTitle: "Jurulatih Dojo", thinking: "Berfikir...", placeholder: "Tanya Sensei...", extractionConfidence: "Ketepatan Tinggi" },
    melytics: {
        title: "Melytics", subtitle: "Asas Kebijaksanaan Dalaman", scanCv: "Analisis CV", scanBtn: "Imbas Resume", addField: "Tambah Data Intel",
        stats: { strength: "Kekuatan Teras", weakness: "Kawasan Pertumbuhan", preparedness: "Ketersediaan" }
    }
  },
  hi: {
    common: { back: "पीछे", save: "सहेजें", saved: "सहेजा गया", loading: "लोड हो रहा है...", search: "खोजें...", view: "देखें", apply: "आवेदन करें", deadline: "अंतिम तिथि", host: "मेजबान", category: "श्रेणी", transforming: "सेंसि अनुवाद कर रहे हैं...", share: "अवसर साझा करें", visit: "देखें", officialSources: "आधिकारिक स्रोत", overview: "अवलोकन", match: "मैच" },
    navigation: { discovery: "खोज", workspace: "कार्यक्षेत्र", skillspace: "कौशल क्षेत्र", community: "समुदाय", home: "होम", melytics: "Melytics", admission: "प्रवेश", quest: "क्वेस्ट", plan: "योजना", curriculum: "पाठ्यक्रम", skills: "कौशल", academy: "अकादमी", tools: "उपकरण", vault: "बोर्ड", programs: "कार्यक्रम", events: "आयोजन", hosts: "विश्वविद्यालय", 'community-board': "कम्युनिटी बोर्ड", 'war-room': "वॉर रूम", arena: "इंटरव्यू अखाड़ा", target: "मेरे कार्यक्रम" },
    landing: {
        heroTitle: "अपने वैश्विक भविष्य में महारत हासिल करें।",
        heroSub: "विश्व स्तरीय छात्रवृत्ति और करियर जीतने का मुफ़्त, मज़ेदार और प्रभावी तरीका।",
        startBtn: "शुरू करें",
        loginBtn: "मेरे पास पहले से एक खाता है",
        feature1Title: "Neural Intel",
        feature1Desc: "10,000+ विशिष्ट कार्यक्रमों पर गहन, समुदाय-स्कैन किए गए डेटा तक पहुंचें।",
        feature2Title: "Arena Battle",
        feature2Desc: "यथार्थवादी उच्च-दबाव साक्षात्कार सिमुलेशन में AI बॉस को हराएं।",
        feature3Title: "The Forge",
        feature3Desc: "ऐसे विशिष्ट दस्तावेज़ तैयार करें जो किसी भी प्रवेश फ़िल्टर को बायपास कर सकें।",
        statsTitle: "विजेताओं के लिए निर्मित",
        statsDesc: "शीर्ष 1% को लक्षित करने वाले 100,000+ निन्जाओं के सामूहिक समूह में शामिल हों।",
        footerText: "डोजो निन्जा अकादमी • 2026 प्रोटोकॉल"
    },
    vault: {
      title: "अवसर बोर्ड", subtitle: "महत्वाकांक्षी विद्वानों के लिए चुनिंदा अवसर।", searchPlaceholder: "बोर्ड में खोजें...",
      filters: { citizenship: "नागरिकता", destination: "गंतव्य", collection: "संग्रह", global: "वैश्विक", anywhere: "कहीं भी", all: "सभी संग्रह" },
      card: { match: "मैच", view: "देखें" }
    },
    vaultDetail: {
      backToVault: "बोर्ड पर वापस जाएं", objectiveTitle: "उद्देश्य", actionCenter: "एक्शन सेंटर", startApp: "आवेदन शुरू करें", saveLater: "बाद के लिए सहेजें",
      aiInsight: "AI अंतर्दृष्टि", aiMatchText: "आपकी प्रोफ़ाइल मेल खाती है", matchFound: "मैच", topTier: "शीर्ष स्तर", applicablePartners: "लागू भागीदार",
      tabs: { brief: "ब्रीफिंग", checklist: "चेकलिस्ट", rewards: "पुरस्कार" }, visitHost: "देखें"
    },
    programDetail: {
        backToPrograms: "कार्यक्रमों पर वापस जाएं", missionSpecs: "मिशन विनिर्देश", connect: "जुड़ें", connected: "जुड़े हुए",
        readyToApply: "आवेदन के लिए तैयार?", closes: "बंद होने की तिथि", selectPath: "रास्ता चुनें", recommended: "अनुशंसित"
    },
    community: { shortcut: { network: "स्काउट नेटवर्क", question: "नहीं मिल रहा", target: "\"सही विकल्प\"", desc: "ये आधिकारिक और सत्यापित ट्रैक हैं। हर घंटे अपडेट होने वाले 1,000+ सामुदायिक अवसरों को खोजने के लिए कम्युनिटी बोर्ड पर जाएं।", btn: "कम्युनिटी बोर्ड देखें" } },
    scout: { title: "कम्युनिटी बोर्ड", subtitle: "समुदाय द्वारा सत्यापित अवसरों की खोज करें।", scanBtn: "स्कैन ब्रीफ", noResults: "कोई परिणाम नहीं" },
    curriculum: { title: "मास्टर पाठ्यक्रम", subtitle: "सफलता के लिए संरचित ब्लूप्रिंट।", mastery: "महारत", units: "इकाइयाँ" },
    dashboard: { welcome: "नमस्ते", ready: "आज जीतने के लिए तैयार हैं?", activeQuests: "सक्रिय मिशन", totalApps: "आवेदन", submitted: "जमा किया गया", history: "XP इतिहास" },
    ai: { coachTitle: "डोजो कोच", thinking: "सोच रहा हूँ...", placeholder: "सेंसi से पूछें...", extractionConfidence: "उच्च सटीकता" },
    melytics: {
        title: "Melytics", subtitle: "गहरी बुद्धिमत्ता आधार", scanCv: "सीवी विश्लेषण", scanBtn: "रेज़्यूमे स्कैन करें", addField: "डेटा जोड़ें",
        stats: { strength: "मुख्य ताकतें", weakness: "विकास क्षेत्र", preparedness: "तैयारी" }
    }
  },
  'pt-br': {
    common: { back: "Voltar", save: "Salvar", saved: "Salvo", loading: "Carregando...", search: "Buscar...", view: "Ver", apply: "Candidatar", deadline: "Prazo", host: "Anfitrião", category: "Categoria", transforming: "Sensei está traduzindo...", share: "Compartilhar Oportunidade", visit: "Visitar", officialSources: "Fontes Oficiais", overview: "Visão Geral", match: "Match" },
    navigation: { discovery: "Descoberta", workspace: "Espaço", skillspace: "Habilidades", community: "Comunidade", home: "Início", melytics: "Melytics", admission: "Admissão", quest: "Missão", plan: "Plano", curriculum: "Currículo", skills: "Habilidades", academy: "Academia", tools: "Ferramentas", vault: "Board", programs: "Programas", events: "Eventos", hosts: "Universidades", 'community-board': "Board da Comunidade", 'war-room': "War Room", arena: "Arena de Entrevista", target: "Meus Programas" },
    landing: {
        heroTitle: "Domine Seu Futuro Global.",
        heroSub: "A maneira gratuita, divertida e eficaz de conquistar bolsas de estudo e carreiras de classe mundial.",
        startBtn: "COMEÇAR AGORA",
        loginBtn: "EU JÁ TENHO UMA CONTA",
        feature1Title: "Neural Intel",
        feature1Desc: "Acesse dados profundos, escaneados pela comunidade, em mais de 10.000 programas de elite.",
        feature2Title: "Arena de Batalha",
        feature2Desc: "Derrote Chefes de IA em simulações realistas de entrevistas sob alta pressão.",
        feature3Title: "The Forge",
        feature3Desc: "Crie artefatos de documentos de elite que ignoram qualquer filtro de admissão.",
        statsTitle: "Feito Para Vencedores",
        statsDesc: "Junte-se ao coletivo de mais de 100.000 Ninjas visando o Top 1%.",
        footerText: "Dojo Ninja Academy • Protocolo 2026"
    },
    vault: {
      title: "Papan Peluang", subtitle: "Oportunidades selecionadas para membros ambiciosos.", searchPlaceholder: "Buscar no papan...",
      filters: { citizenship: "Cidadania", destination: "Destino", collection: "Coleção", global: "Global", anywhere: "Qualquer lugar", all: "Todas as coleções" },
      card: { match: "Match", view: "Ver" }
    },
    vaultDetail: {
      backToVault: "Voltar para o Papan", objectiveTitle: "O Objetivo", actionCenter: "Centro de Ações", startApp: "Iniciar Inscrição", saveLater: "Salvar para Depois",
      aiInsight: "Insights de IA", aiMatchText: "Seu perfil combina", matchFound: "Match", topTier: "Nível Top", applicablePartners: "Parceiros Aplicáveis",
      tabs: { brief: "Briefing", checklist: "Checklist", rewards: "Recompensas" }, visitHost: "Visitar"
    },
    programDetail: {
        backToPrograms: "Voltar para Programas", missionSpecs: "Specs da Missão", connect: "Conectar", connected: "Conectado",
        readyToApply: "Pronto para candidatar?", closes: "Fecha em", selectPath: "Selecione um caminho", recommended: "Recomendado"
    },
    community: { shortcut: { network: "Rede Scout", question: "Não encontrou", target: "\"O Ideal\"", desc: "Estes são os caminhos oficiais. Visite o Board da Comunidade para descobrir mais de 1.000 oportunidades.", btn: "Visitar Board da Comunidade" } },
    scout: { title: "Board da Comunidade", subtitle: "Descubra oportunidades da comunidade.", scanBtn: "Escanear", noResults: "Sem resultados" },
    curriculum: { title: "Currículo Mestre", subtitle: "Blueprints estruturados para o sucesso.", mastery: "Domínio", units: "Unidades" },
    dashboard: { welcome: "Oi", ready: "Pronto para vencer?", activeQuests: "Missões Ativas", totalApps: "Inscrições", submitted: "Enviado", history: "Histórico de XP" },
    ai: { coachTitle: "Coach Dojo", thinking: "Pensando...", placeholder: "Pergunte ao Sensei...", extractionConfidence: "Alta Precisão" },
    melytics: {
        title: "Melytics", subtitle: "Fundação de Inteligência Profunda", scanCv: "Análise de CV", scanBtn: "Escanear Resume", addField: "Adicionar Intel",
        stats: { strength: "Principais Forças", weakness: "Areas de Crescimento", preparedness: "Preparação" }
    }
  }
};
