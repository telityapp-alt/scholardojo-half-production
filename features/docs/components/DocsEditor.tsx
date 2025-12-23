
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEditor, EditorContent, Extension } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Highlight from '@tiptap/extension-highlight';
import CharacterCount from '@tiptap/extension-character-count';
import TextStyle from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';

import { DocsService, DojoDoc } from '../services/docsService';
import { UnifiedProgramService } from '../../programs/services/unifiedProgramService';
import { DomainType } from '../../../core/contracts/entityMap';
import { DuoButton } from '../../../components/DuoButton';
import confetti from 'canvas-confetti';

// Modular Elements
import { DocsToolbar } from './editor/DocsToolbar';
import { AiAuditor } from './editor/AiAuditor';
import { AiRefiner } from './editor/AiRefiner';
import { AiSuggest } from './editor/AiSuggest';
import { MissionSelectorModal } from './editor/MissionSelectorModal';
import { UnifiedProgram, DocBrief } from '../../programs/types';

import { 
    X, Save, ArrowLeft, Bot, RefreshCw, Printer, Lock, 
    Zap, Command, ShieldCheck, Wand2, Lightbulb, CheckCircle2,
    PlusCircle, Target, ChevronDown
} from 'lucide-react';

const CustomTypography = Extension.create({
  name: 'customTypography',
  addOptions() { return { types: ['textStyle'] }; },
  addAttributes() {
    return {
      fontSize: { default: null, parseHTML: element => element.style.fontSize.replace(/['"]+/g, ''), renderHTML: attributes => attributes.fontSize ? { style: `font-size: ${attributes.fontSize}` } : {} },
      fontWeight: { default: null, parseHTML: element => element.style.fontWeight, renderHTML: attributes => attributes.fontWeight ? { style: `font-weight: ${attributes.fontWeight}` } : {} },
    };
  },
  addCommands() {
    return {
      setFontSize: (fontSize: string) => ({ chain }: any) => chain().setMark('textStyle', { fontSize }).run(),
      setFontWeight: (fontWeight: string) => ({ chain }: any) => chain().setMark('textStyle', { fontWeight }).run(),
    } as any;
  },
});

export const DocsEditor: React.FC = () => {
    const { domain, detailId: docId } = useParams();
    const navigate = useNavigate();
    const domainEnum = (domain as DomainType) || DomainType.STUDENT;

    const [doc, setDoc] = useState<DojoDoc | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [activeAiTab, setActiveAiTab] = useState<'AUDIT' | 'REFINE' | 'SUGGEST' | 'BLOCKS'>('AUDIT');
    const [selectedProgram, setSelectedProgram] = useState<UnifiedProgram | null>(null);
    const [selectedBlueprint, setSelectedBlueprint] = useState<DocBrief | null>(null);
    const [isSelectorOpen, setIsSelectorOpen] = useState(false);
    
    const editor = useEditor({
        extensions: [
            StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
            Underline.configure(),
            Highlight.configure(),
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            TaskList.configure(),
            TaskItem.configure({ nested: true }),
            CharacterCount.configure(),
            TextStyle,
            FontFamily,
            CustomTypography,
            Placeholder.configure({ placeholder: 'Use "/" for structural blocks...' }),
        ],
        editorProps: { attributes: { class: 'prose prose-slate max-w-none focus:outline-none min-h-[1000px] pb-96 font-bold text-slate-800' } },
    });

    useEffect(() => {
        if (!docId) return;
        const data = DocsService.getById(docId);
        if (data) {
            setDoc(data);
            if (data.linkedProgramId) {
                const p = UnifiedProgramService.getById(data.linkedProgramId);
                if (p) {
                    setSelectedProgram(p);
                    // Automatic back-matching if possible
                    const b = p.shadowProtocol.docBriefs.find(brief => brief.id === data.type.toLowerCase()) || null;
                    setSelectedBlueprint(b);
                }
            }
            if (editor) editor.commands.setContent(data.content || '');
        }
    }, [docId, editor]);

    const handleSave = () => {
        if (!doc || !editor) return;
        setIsSaving(true);
        DocsService.save({ 
            ...doc, 
            content: editor.getHTML(), 
            linkedProgramId: selectedProgram?.id 
        });
        setTimeout(() => setIsSaving(false), 600);
        confetti({ particleCount: 30, spread: 40, origin: { x: 0.1, y: 0.1 } });
    };

    const handleMissionSelect = (p: UnifiedProgram, b: DocBrief | null) => {
        setSelectedProgram(p);
        setSelectedBlueprint(b);
        setIsSelectorOpen(false);
        if (doc) {
            const updatedDoc = { ...doc, linkedProgramId: p.id };
            setDoc(updatedDoc);
            DocsService.save(updatedDoc);
        }
        confetti({ particleCount: 50, spread: 60, colors: ['#1cb0f6'] });
    };

    const injectBlock = (content: string) => {
        editor?.chain().focus().insertContent(content).run();
        confetti({ particleCount: 40, spread: 20, colors: ['#58cc02'] });
    };

    const availableBlocks = useMemo(() => doc ? DocsService.getBlocksByType(doc.type) : [], [doc]);

    if (!doc || !editor) return null;

    return (
        <div className="fixed inset-0 z-[500] bg-[#f8fafc] flex flex-col animate-in fade-in duration-300 overflow-hidden">
            
            <header className="bg-white border-b-2 border-slate-100 px-6 py-3 flex items-center justify-between shrink-0 z-[60] shadow-sm">
                <div className="flex items-center gap-6">
                    <button onClick={() => navigate(-1)} className="w-10 h-10 bg-slate-50 text-slate-400 hover:text-slate-600 rounded-xl flex items-center justify-center border-b-4 border-slate-200 active:translate-y-[2px] transition-all"><ArrowLeft size={20} strokeWidth={3} /></button>
                    <div>
                        <input value={doc.title} onChange={e => setDoc({ ...doc, title: e.target.value })} className="text-lg font-black text-slate-800 bg-transparent border-none outline-none focus:ring-0 w-64 md:w-96 p-0 h-7" />
                        <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[8px] font-black uppercase text-purple-500 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-100 tracking-widest flex items-center gap-1"><Lock size={8} /> Studio Safe</span>
                            <div className="w-1 h-1 rounded-full bg-slate-200"></div>
                            <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">{doc.type} Artifact</span>
                        </div>
                    </div>
                </div>
                
                <div className="flex items-center gap-4">
                    <button className="p-3 text-slate-300 hover:text-slate-600 transition-colors"><Printer size={18}/></button>
                    <DuoButton themeColor="green" onClick={handleSave} isLoading={isSaving} startIcon={Save} className="!py-3 !px-8 shadow-lg shadow-green-100 rounded-xl text-xs">
                        {isSaving ? 'Syncing...' : 'Commit Work'}
                    </DuoButton>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                <div className="flex-1 overflow-y-auto bg-[#f1f5f9] flex justify-center py-10 px-4 scrollbar-thin">
                    <div className="w-full max-w-4xl flex flex-col gap-6">
                        <DocsToolbar editor={editor} />
                        <div className="bg-white border-2 border-slate-200 shadow-2xl min-h-[1400px] mb-64 rounded-sm relative overflow-hidden group">
                             <div className="absolute top-0 left-0 w-full h-1.5 bg-sky-400 opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                             <EditorContent editor={editor} />
                        </div>
                    </div>
                </div>

                <aside className="w-[400px] border-l-2 border-slate-200 bg-white flex flex-col shrink-0 overflow-hidden shadow-2xl z-10">
                    <div className="p-6 border-b-2 border-slate-100 bg-white shrink-0">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white border-b-4 border-black shadow-lg"><Bot size={22} /></div>
                            <h4 className="text-sm font-black uppercase text-slate-800 tracking-widest italic">Sensei AI Hub</h4>
                        </div>
                        
                        <div className="bg-slate-100 p-1.5 rounded-2xl flex flex-wrap gap-1 border-2 border-slate-200">
                            {[
                                { id: 'AUDIT', label: 'Audit', icon: ShieldCheck },
                                { id: 'REFINE', label: 'Refine', icon: Wand2 },
                                { id: 'SUGGEST', label: 'Suggest', icon: Lightbulb },
                                { id: 'BLOCKS', label: 'Insert', icon: Command }
                            ].map(tab => (
                                <button key={tab.id} onClick={() => setActiveAiTab(tab.id as any)} className={`flex-1 min-w-[80px] py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${activeAiTab === tab.id ? 'bg-white text-sky-600 shadow-sm border-b-4 border-slate-300' : 'text-slate-400 hover:bg-white/50'}`}><tab.icon size={14} strokeWidth={3} />{tab.label}</button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 scrollbar-hide space-y-8">
                        {activeAiTab === 'AUDIT' && (
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Active Mission Control</p>
                                    <button 
                                        onClick={() => setIsSelectorOpen(true)}
                                        className={`w-full p-4 rounded-2xl border-2 border-b-[6px] transition-all flex items-center justify-between group active:translate-y-[2px] active:border-b-4 ${selectedProgram ? 'bg-white border-sky-400 shadow-sm' : 'bg-slate-50 border-slate-200 border-dashed'}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border-b-2 ${selectedProgram ? 'bg-sky-500 text-white border-sky-700 shadow-sm' : 'bg-white text-slate-300 border-slate-100'}`}>
                                                <Target size={16} strokeWidth={3}/>
                                            </div>
                                            <div className="text-left min-w-0">
                                                <span className={`font-black text-[10px] uppercase block truncate max-w-[180px] ${selectedProgram ? 'text-slate-700' : 'text-slate-400'}`}>
                                                    {selectedProgram ? selectedProgram.title : 'Link Mission Target'}
                                                </span>
                                                {selectedBlueprint && (
                                                    <span className="text-[8px] font-black text-purple-500 uppercase tracking-widest leading-none">{selectedBlueprint.label} Target</span>
                                                )}
                                            </div>
                                        </div>
                                        <RefreshCw size={16} className="text-slate-300 group-hover:text-sky-500 transition-all group-hover:rotate-180" />
                                    </button>
                                </div>
                                <AiAuditor editor={editor} program={selectedProgram} docType={selectedBlueprint?.id || doc.type} onOpenSelector={() => setIsSelectorOpen(true)} />
                            </div>
                        )}
                        {activeAiTab === 'REFINE' && <AiRefiner editor={editor} />}
                        {activeAiTab === 'SUGGEST' && <AiSuggest editor={editor} />}
                        {activeAiTab === 'BLOCKS' && (
                            <div className="space-y-6">
                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Library Injections</p>
                                <div className="grid grid-cols-1 gap-4">
                                    {availableBlocks.map((b, i) => (
                                        <button key={i} onClick={() => injectBlock(b.content)} className="w-full p-5 bg-white border-2 border-slate-200 border-b-[8px] rounded-[32px] hover:border-sky-400 hover:bg-sky-50 transition-all active:translate-y-2 active:border-b-2 text-left group shadow-sm"><span className="font-black text-slate-700 text-sm group-hover:text-sky-700">{b.label}</span><span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mt-1 opacity-60">Insert Unit</span></button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </aside>
            </div>

            {isSelectorOpen && (
                <MissionSelectorModal 
                    domain={domainEnum} 
                    onClose={() => setIsSelectorOpen(false)} 
                    onSelect={handleMissionSelect} 
                />
            )}
        </div>
    );
};
