# NEXT GEN BRANDING REFERENCE

**STRICT IMPLEMENTATION RULES:**
- Iconography: Lucide React only.
- Colors: Use specific hex codes provided in snippets (Red #ce000c, Green #58cc02, etc.).
- Interactions: Deep border-bottom interactions (`border-b-[8px]` to `border-b-[12px]`).
- Visuals: Globe backgrounds, pattern overlays (`transparenttextures`).

---

## 1. Program Card (Competition/Internship)

```tsx
// PRESTIGE THEME: Soft Blue Duo
const cardStyle = isPrestige
    ? 'border-sky-200 border-b-sky-400 bg-sky-50/40 hover:border-sky-400 hover:border-b-sky-500 hover:bg-sky-50'
    : `border-slate-200 border-b-slate-300 bg-white ${standardHover}`;

// Decorative Background
<div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
    <Globe className="w-64 h-64" />
</div>
```

## 2. Program Detail (Hero & Grid)

```tsx
// Hero Header
<div className={`relative ${theme.bg} rounded-[40px] border-b-[8px] ${theme.border} p-8 md:p-12 text-white overflow-hidden mb-8 shadow-xl`}>
    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
    {/* Content ... */}
</div>

// Benefit Grid
<div className={`flex items-center gap-4 p-4 rounded-2xl border-2 border-b-4 transition-all group hover:scale-[1.02] ${theme.lightBg} ${theme.lightBorder}`}>
    {/* Icon Block & Text ... */}
</div>
```

## 3. Scheme Detail Modal

```tsx
// Sticky Footer
<div className="p-6 bg-white border-t-2 border-slate-100 flex items-center justify-between gap-4 shrink-0">
    <button className="w-full md:w-auto px-8 py-4 bg-[#58cc02] hover:bg-[#46a302] text-white rounded-2xl font-black text-sm uppercase tracking-widest border-b-[6px] border-[#46a302] active:border-b-0 active:translate-y-[6px] transition-all flex items-center justify-center gap-2 shadow-xl shadow-green-100">
        Start Application <ArrowRight className="w-5 h-5 stroke-[3px]" />
    </button>
</div>
```
