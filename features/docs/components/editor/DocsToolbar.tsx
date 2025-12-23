
import React from 'react';
import { Editor } from '@tiptap/react';
import { 
    Bold, Italic, Underline, Strikethrough, Heading1, Heading2, Heading3, 
    List, ListOrdered, CheckSquare, AlignLeft, AlignCenter, AlignRight, 
    Highlighter, Quote, Minus, Undo, Redo, Eraser, Type, ChevronDown, CaseUpper
} from 'lucide-react';

interface DocsToolbarProps {
    editor: Editor | null;
}

const ToolBtn = ({ onClick, active, icon: Icon, title, children }: any) => (
    <button
        onClick={onClick}
        title={title}
        className={`h-9 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all border-b-2 active:border-b-0 active:translate-y-0.5 ${active ? 'bg-sky-100 text-sky-600 border-sky-400 font-black' : 'bg-white text-slate-400 border-slate-200 hover:bg-slate-50 hover:text-slate-600 font-bold'}`}
    >
        {Icon && <Icon size={16} strokeWidth={3} />}
        {children}
    </button>
);

const Group = ({ children }: { children?: React.ReactNode }) => (
    <div className="flex items-center gap-1.5 px-3 border-r-2 border-slate-100 last:border-r-0">
        {children}
    </div>
);

export const DocsToolbar: React.FC<DocsToolbarProps> = ({ editor }) => {
    if (!editor) return null;

    const fonts = [
        { name: 'Rubik', label: 'Rubik' },
        { name: 'Geom', label: 'Geom' },
        { name: 'serif', label: 'Serif' },
        { name: 'monospace', label: 'Mono' }
    ];

    const sizes = ['12px', '14px', '16px', '18px', '20px', '24px', '32px', '48px'];
    const weights = [
        { val: '400', label: 'Normal' },
        { val: '600', label: 'Bold' },
        { val: '900', label: 'Black' }
    ];

    return (
        <div className="bg-white p-2 rounded-[24px] border-2 border-slate-200 border-b-[6px] flex items-center flex-wrap gap-y-2 shadow-xl sticky top-4 z-50 animate-in slide-in-from-top-4 duration-500">
            {/* 1. History */}
            <Group>
                <ToolBtn icon={Undo} onClick={() => editor.chain().focus().undo().run()} title="Undo" />
                <ToolBtn icon={Redo} onClick={() => editor.chain().focus().redo().run()} title="Redo" />
            </Group>

            {/* 2. Typography: FONT FAMILY */}
            <Group>
                <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-100">
                    <Type size={14} className="text-slate-400 ml-1" />
                    {fonts.map(f => (
                        <button
                            key={f.name}
                            onClick={() => editor.chain().focus().setFontFamily(f.name).run()}
                            className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase transition-all ${editor.getAttributes('textStyle').fontFamily === f.name ? 'bg-white text-sky-500 shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </Group>

            {/* 3. Typography: SIZE & WEIGHT */}
            <Group>
                <div className="flex items-center gap-2">
                    <select 
                        onChange={(e) => (editor.chain().focus() as any).setFontSize(e.target.value).run()}
                        className="bg-slate-50 border-2 border-slate-200 rounded-lg px-2 py-1 text-[10px] font-black outline-none text-slate-600 focus:border-sky-400"
                    >
                        <option value="">Size</option>
                        {sizes.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    
                    <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
                        {weights.map(w => (
                            <button
                                key={w.val}
                                onClick={() => (editor.chain().focus() as any).setFontWeight(w.val).run()}
                                className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase transition-all ${editor.getAttributes('textStyle').fontWeight === w.val ? 'bg-white text-sky-500 shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                {w.label.charAt(0)}
                            </button>
                        ))}
                    </div>
                </div>
            </Group>

            {/* 4. Basic Styles */}
            <Group>
                <ToolBtn icon={Bold} active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} title="Bold" />
                <ToolBtn icon={Italic} active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic" />
                <ToolBtn icon={Underline} active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()} title="Underline" />
                <ToolBtn icon={Highlighter} active={editor.isActive('highlight')} onClick={() => editor.chain().focus().toggleHighlight().run()} title="Highlight" />
            </Group>

            {/* 5. Paragraph Structure */}
            <Group>
                <ToolBtn icon={Heading1} active={editor.isActive('heading', { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} title="H1" />
                <ToolBtn icon={Heading2} active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} title="H2" />
                <ToolBtn icon={AlignLeft} active={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()} title="Align Left" />
                <ToolBtn icon={AlignCenter} active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()} title="Align Center" />
            </Group>

            {/* 6. Lists */}
            <Group>
                <ToolBtn icon={CheckSquare} active={editor.isActive('taskList')} onClick={() => editor.chain().focus().toggleTaskList().run()} title="Checklist">
                    <span className="text-[10px] font-black uppercase">Checklist</span>
                </ToolBtn>
                <ToolBtn icon={List} active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()} title="Bullet List" />
            </Group>

            {/* 7. Extras */}
            <Group>
                <ToolBtn icon={Eraser} onClick={() => editor.chain().focus().unsetAllMarks().run()} title="Clear Formatting" />
            </Group>
        </div>
    );
};
