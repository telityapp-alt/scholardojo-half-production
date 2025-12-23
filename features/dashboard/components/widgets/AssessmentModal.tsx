
import React, { useState } from 'react';
import { X, ChevronLeft, Check, Target, Zap, Swords, ShieldCheck, Award, GraduationCap, Globe, Sparkles, Plus, TrendingUp, School, Fingerprint } from 'lucide-react';
import { DuoButton } from '../../../../components/DuoButton';
import { ProfileAccess, UserDNA } from '../../../../core/access/profileAccess';
import confetti from 'canvas-confetti';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    domain: string;
    onComplete: () => void;
}

const QUESTIONS = [
    // TECHNICAL BLOCK
    { id: 't1', category: 'technical', text: { en: "I can learn and master new professional tools independently.", id: "Saya bisa mempelajari dan menguasai alat profesional baru secara mandiri." }, options: [{ val: 30, text: { en: "Need Help", id: "Butuh Bimbingan" } }, { val: 70, text: { en: "Comfortable", id: "Sudah Nyaman" } }, { val: 100, text: { en: "Fast Learner", id: "Belajar Sangat Cepat" } }] },
    { id: 't2', category: 'technical', text: { en: "How do you rate your ability to produce high-quality documentation?", id: "Bagaimana Anda menilai kemampuan Anda dalam membuat dokumentasi berkualitas?" }, options: [{ val: 20, text: { en: "Basic", id: "Dasar" } }, { val: 65, text: { en: "Advanced", id: "Lanjutan" } }, { val: 100, text: { en: "Expert", id: "Ahli/Master" } }] },
    
    // LEADERSHIP BLOCK
    { id: 'l1', category: 'leadership', text: { en: "I often take initiative to organize and lead team tasks.", id: "Saya sering mengambil inisiatif untuk mengatur dan memimpin tugas tim." }, options: [{ val: 20, text: { en: "Rarely", id: "Jarang" } }, { val: 70, text: { en: "Frequently", id: "Sering" } }, { val: 100, text: { en: "Natural Leader", id: "Terlahir Memimpin" } }] },
    { id: 'l2', category: 'leadership', text: { en: "How do you approach team members with different opinions?", id: "Bagaimana cara Anda mendekati anggota tim dengan pendapat berbeda?" }, options: [{ val: 30, text: { en: "Avoid Conflict", id: "Hindari Konflik" } }, { val: 75, text: { en: "Open Discussion", id: "Diskusi Terbuka" } }, { val: 100, text: { en: "Strategic Bridge", id: "Penengah Strategis" } }] },
    
    // RESILIENCE BLOCK
    { id: 'r1', category: 'resilience', text: { en: "I remain focused even when my mission hits a dead end.", id: "Saya tetap fokus meskipun misi saya menemui jalan buntu." }, options: [{ val: 20, text: { en: "Feel Discouraged", id: "Mudah Menyerah" } }, { val: 65, text: { en: "Stay Steady", id: "Tetap Bertahan" } }, { val: 100, text: { en: "Evolve & Adapt", id: "Berevolusi & Beradaptasi" } }] },
    { id: 'r2', category: 'resilience', text: { en: "How do you perform under tight and stressful deadlines?", id: "Bagaimana performa Anda di bawah tenggat waktu yang ketat?" }, options: [{ val: 40, text: { en: "Neutral", id: "Biasa Saja" } }, { val: 80, text: { en: "Productive", id: "Produktif" } }, { val: 100, text: { en: "Thrive in Pressure", id: "Sangat Ahli" } }] },
    
    // FIT BLOCK
    { id: 'f1', category: 'fit', text: { en: "I prioritize work environments that share my personal ethics.", id: "Saya memprioritaskan lingkungan kerja yang searah dengan etika pribadi." }, options: [{ val: 40, text: { en: "Neutral", id: "Netral" } }, { val: 80, text: { en: "Important", id: "Penting" } }, { val: 100, text: { en: "Mandatory", id: "Wajib/Sangat Penting" } }] },
    { id: 'f2', category: 'fit', text: { en: "I can adapt my communication style to different organizations.", id: "Saya bisa menyesuaikan gaya komunikasi dengan berbagai organisasi." }, options: [{ val: 30, text: { en: "Limited", id: "Terbatas" } }, { val: 75, text: { en: "Adaptable", id: "Mudah Beradaptasi" } }, { val: 100, text: { en: "Cultural Chameleon", id: "Sangat Fleksibel" } }] },
    
    // IMPACT BLOCK (THE MISSING PILLAR)
    { id: 'i1', category: 'impact', text: { en: "My past work has resulted in clear, measurable benefits for others.", id: "Pekerjaan saya sebelumnya memberikan manfaat nyata yang terukur bagi orang lain." }, options: [{ val: 20, text: { en: "A Bit", id: "Sedikit" } }, { val: 65, text: { en: "Significant", id: "Signifikan" } }, { val: 100, text: { en: "High Impact", id: "Dampak Sangat Tinggi" } }] },
    { id: 'i2', category: 'impact', text: { en: "I am actively looking for ways to create long-term social change.", id: "Saya aktif mencari cara untuk menciptakan perubahan sosial jangka panjang." }, options: [{ val: 40, text: { en: "Sometimes", id: "Kadang-kadang" } }, { val: 80, text: { en: "Often", id: "Sering" } }, { val: 100, text: { en: "Mission Driven", id: "Tujuan Hidup Saya" } }] }
];

export const AssessmentModal: React.FC<Props> = ({ isOpen, onClose, domain, onComplete }) => {
    const [lang, setLang] = useState<'id' | 'en'>('id');
    const [step, setStep] = useState(-3); // -3: Welcome, -2: Uni, -1: GPA, 0+: Questions
    const [answers, setAnswers] = useState<Record<string, number[]>>({});
    
    // Profile Data
    const [uni, setUni] = useState('');
    const [gpa, setGpa] = useState('0.00');
    const [maxGpa, setMaxGpa] = useState('4.0');
    const [isFinished, setIsFinished] = useState(false);

    if (!isOpen) return null;

    const totalSteps = QUESTIONS.length + 3;
    const progress = ((step + 3) / totalSteps) * 100;

    const handleSelect = (val: number) => {
        const currentQ = QUESTIONS[step];
        setAnswers(prev => ({
            ...prev,
            [currentQ.category]: [...(prev[currentQ.category] || []), val]
        }));

        if (step < QUESTIONS.length - 1) {
            setStep(prev => prev + 1);
        } else {
            handleFinish();
        }
    };

    const handleFinish = async () => {
        setIsFinished(true);
        const dna = ProfileAccess.getDNA(domain as any);
        
        // Logical scoring
        const finalScores: any = {};
        Object.entries(answers).forEach(([cat, vals]) => {
            const sum = (vals as number[]).reduce((a, b) => a + b, 0);
            finalScores[cat] = Math.round(sum / (vals as number[]).length);
        });

        // Ensure last question is included if missed by async state
        const lastQ = QUESTIONS[QUESTIONS.length - 1];
        if (!finalScores[lastQ.category]) {
            finalScores[lastQ.category] = 100; // placeholder for completion
        }

        const cur = parseFloat(gpa) || 0;
        const mx = parseFloat(maxGpa) || 4.0;
        const academicScore = Math.min(100, Math.round((cur / mx) * 100));

        const updatedDna: UserDNA = {
            ...dna,
            university: uni,
            currentGpa: cur,
            maxGpa: mx,
            scores: {
                ...dna.scores,
                ...finalScores,
                academic: academicScore
            },
            aiSummary: lang === 'id' 
                ? "Identity Matrix telah dikalibrasi ulang. Siap untuk misi tingkat tinggi." 
                : "Identity Matrix recalibrated. Ready for high-level missions.",
            lastUpdated: new Date().toISOString()
        };

        await ProfileAccess.saveDNA(updatedDna);
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#58cc02', '#1cb0f6', '#fbbf24'] });
    };

    const resetAndClose = () => {
        setStep(-3);
        setAnswers({});
        setIsFinished(false);
        onComplete();
        onClose();
    };

    const getIcon = (cat: string) => {
        switch(cat) {
            case 'technical': return <Zap className="text-orange-400" size={32} />;
            case 'leadership': return <Award className="text-yellow-500" size={32} />;
            case 'resilience': return <Swords className="text-red-500" size={32} />;
            case 'fit': return <ShieldCheck className="text-sky-500" size={32} />;
            case 'impact': return <TrendingUp className="text-emerald-500" size={32} />;
            default: return <Target className="text-indigo-500" size={32} />;
        }
    };

    return (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={onClose}></div>
            
            <div className="relative w-full max-w-sm bg-white rounded-[40px] border-4 border-slate-200 border-b-[12px] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
                
                {/* TOP BAR */}
                <div className="p-4 flex items-center gap-4 shrink-0 bg-white border-b border-slate-50">
                    <button onClick={step > -3 ? () => setStep(step - 1) : onClose} className="text-slate-300 hover:text-slate-500 transition-colors">
                        {step > -3 ? <ChevronLeft size={24} strokeWidth={4} /> : <X size={24} strokeWidth={4} />}
                    </button>
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#58cc02] transition-all duration-500" style={{ width: `${progress}%` }} />
                    </div>
                    <select 
                        value={lang} 
                        onChange={(e) => setLang(e.target.value as any)}
                        className="bg-slate-50 text-[9px] font-black uppercase text-slate-500 p-1.5 rounded-lg outline-none border border-slate-200"
                    >
                        <option value="id">ID</option>
                        <option value="en">EN</option>
                    </select>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-6 min-h-[420px] flex flex-col">
                    {!isFinished ? (
                        step === -3 ? (
                            <div className="space-y-6 animate-in slide-in-from-bottom-4 flex-1 flex flex-col justify-center text-center">
                                <div className="w-20 h-20 bg-sky-50 rounded-[28px] border-b-4 border-sky-100 flex items-center justify-center text-[#1cb0f6] mx-auto shadow-sm">
                                    <Fingerprint size={40} strokeWidth={3} />
                                </div>
                                <h2 className="text-2xl font-black text-slate-800 leading-tight">
                                    {lang === 'id' ? "Inisialisasi DNA" : "DNA Initialization"}
                                </h2>
                                <p className="text-sm font-bold text-slate-400">
                                    {lang === 'id' ? "Lengkapi protokol evaluasi untuk membangun fondasi neural Anda." : "Complete the evaluation protocol to build your neural foundation."}
                                </p>
                                <DuoButton fullWidth themeColor="blue" onClick={() => setStep(-2)}>
                                    {lang === 'id' ? "Mulai Sinkronisasi" : "Start Sync"}
                                </DuoButton>
                            </div>
                        ) : step === -2 ? (
                            <div className="space-y-6 animate-in slide-in-from-right flex-1 flex flex-col justify-center">
                                <div className="text-center space-y-3">
                                    <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-400 mx-auto border-b-4 border-indigo-100">
                                        <School size={28} />
                                    </div>
                                    <h2 className="text-xl font-black text-slate-800">
                                        {lang === 'id' ? "Universitas Anda?" : "Your University?"}
                                    </h2>
                                </div>
                                <input 
                                    value={uni} 
                                    onChange={e => setUni(e.target.value)}
                                    placeholder="e.g. Universitas Indonesia"
                                    className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl font-bold text-slate-700 outline-none focus:border-sky-400 focus:bg-white transition-all text-center"
                                />
                                <DuoButton fullWidth themeColor="blue" disabled={!uni} onClick={() => setStep(-1)}>
                                    {lang === 'id' ? "Lanjutkan" : "Continue"}
                                </DuoButton>
                            </div>
                        ) : step === -1 ? (
                            <div className="space-y-6 animate-in slide-in-from-right flex-1 flex flex-col justify-center">
                                <div className="text-center space-y-3">
                                    <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-400 mx-auto border-b-4 border-emerald-100">
                                        <GraduationCap size={28} />
                                    </div>
                                    <h2 className="text-xl font-black text-slate-800">
                                        {lang === 'id' ? "Input IPK Riil" : "Input Real GPA"}
                                    </h2>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex-1">
                                        <label className="text-[9px] font-black uppercase text-slate-400 ml-1">GPA</label>
                                        <input 
                                            type="number" step="0.01" value={gpa} 
                                            onChange={e => setGpa(e.target.value)}
                                            className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl font-black text-2xl text-emerald-600 outline-none focus:border-emerald-400 focus:bg-white transition-all text-center"
                                        />
                                    </div>
                                    <div className="pt-6 font-black text-slate-300">/</div>
                                    <div className="w-24">
                                        <label className="text-[9px] font-black uppercase text-slate-400 ml-1">SCALE</label>
                                        <input 
                                            type="number" step="0.1" value={maxGpa} 
                                            onChange={e => setMaxGpa(e.target.value)}
                                            className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl font-black text-lg text-slate-400 outline-none text-center"
                                        />
                                    </div>
                                </div>
                                <DuoButton fullWidth themeColor="blue" onClick={() => setStep(0)}>
                                    {lang === 'id' ? "Konfirmasi" : "Confirm"}
                                </DuoButton>
                            </div>
                        ) : (
                            <div className="space-y-6 animate-in slide-in-from-right flex-1 flex flex-col justify-center">
                                <div className="text-center space-y-3">
                                    <div className="w-14 h-14 bg-slate-50 rounded-2xl border-b-4 border-slate-100 flex items-center justify-center mx-auto">
                                         {getIcon(QUESTIONS[step].category)}
                                    </div>
                                    <h2 className="text-lg font-black text-slate-800 leading-tight">
                                        {QUESTIONS[step].text[lang]}
                                    </h2>
                                </div>
                                <div className="grid grid-cols-1 gap-2">
                                    {QUESTIONS[step].options.map((opt, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleSelect(opt.val)}
                                            className="w-full p-4 bg-white border-2 border-slate-200 border-b-[6px] rounded-2xl hover:bg-slate-50 hover:border-sky-400 transition-all active:border-b-2 active:translate-y-[4px] group flex items-center gap-3"
                                        >
                                            <div className="w-7 h-7 rounded-lg border-2 border-slate-100 flex items-center justify-center font-black text-[10px] text-slate-300 group-hover:text-sky-500">
                                                {i + 1}
                                            </div>
                                            <span className="text-sm font-bold text-slate-600">{opt.text[lang]}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )
                    ) : (
                        <div className="text-center space-y-6 py-4 animate-in zoom-in duration-500 flex-1 flex flex-col justify-center">
                            <div className="relative inline-block">
                                <div className="w-24 h-24 bg-[#58cc02] rounded-[32px] border-b-[12px] border-[#46a302] flex items-center justify-center text-white mx-auto shadow-xl">
                                    <Check size={48} strokeWidth={5} />
                                </div>
                                <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-lg font-black text-[8px] border-b-2 border-yellow-600 shadow-md">
                                    +100 XP
                                </div>
                            </div>
                            
                            <div>
                                <h2 className="text-3xl font-black text-slate-800 tracking-tighter uppercase italic leading-none mb-2">Matrix Synced!</h2>
                                <p className="text-slate-500 font-bold text-xs px-4">
                                    {lang === 'id' ? "DNA Anda telah diperbarui secara sistematis." : "Your DNA has been systematically updated."}
                                </p>
                            </div>

                            <DuoButton fullWidth themeColor="green" onClick={resetAndClose} className="!py-4 shadow-xl uppercase tracking-widest text-xs">
                                {lang === 'id' ? "Selesai" : "Finish"}
                            </DuoButton>
                        </div>
                    )}
                </div>

                <div className="p-3 text-center shrink-0 border-t border-slate-50 bg-slate-50/50">
                    <p className="text-[7px] font-black text-slate-300 uppercase tracking-[0.4em]">Protocol Node 0.9.7-Complete</p>
                </div>
            </div>
        </div>
    );
};
