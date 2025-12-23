
import React, { useState, useRef, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, AlignLeft, Image as ImageIcon, Link as LinkIcon, DollarSign, Type, Tag, ChevronDown, ChevronLeft } from 'lucide-react';
import { EventCategory, EventLocationType, GenericEvent, DomainType } from '../../../core/contracts/entityMap';
import { createEventMock } from '../../../core/access/eventAccess';
import { DuoButton } from '../../../components/DuoButton';
import { DOMAIN_CONFIGS } from '../../../core/contracts/domainConfig';

interface CreateEventModalProps {
    domain: DomainType;
    onClose: () => void;
    onSuccess: () => void;
}

const CATEGORIES: EventCategory[] = ['Workshop', 'Webinar', 'Expo', 'Coaching', 'Seminar', 'Competition'];
const LOCATIONS: EventLocationType[] = ['Virtual', 'Physical', 'Hybrid'];

export const CreateEventModal: React.FC<CreateEventModalProps> = ({ domain, onClose, onSuccess }) => {
    const [step, setStep] = useState(1);
    const [submitting, setSubmitting] = useState(false);
    const submitTimerRef = useRef<any>(null);
    
    // Domain Theme Config
    const config = DOMAIN_CONFIGS[domain] || DOMAIN_CONFIGS[DomainType.STUDENT];

    // Form State
    const [formData, setFormData] = useState<Partial<GenericEvent>>({
        domain: domain,
        title: '',
        description: '',
        fullDescription: '',
        date: '',
        time: '',
        durationMinutes: 60,
        category: 'Workshop',
        locationType: 'Virtual',
        locationAddress: '',
        link: '',
        organizer: 'Me',
        image: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2940&auto=format&fit=crop',
        price: 0,
        tags: [],
        attendees: 0
    });

    useEffect(() => {
        return () => {
            if (submitTimerRef.current) clearTimeout(submitTimerRef.current);
        };
    }, []);

    const [tagInput, setTagInput] = useState('');

    const handleChange = (field: keyof GenericEvent, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleAddTag = () => {
        if (tagInput && formData.tags && !formData.tags.includes(tagInput)) {
            setFormData(prev => ({ ...prev, tags: [...(prev.tags || []), tagInput] }));
            setTagInput('');
        }
    };

    const handleSubmit = async () => {
        if (!formData.title || !formData.date || !formData.link) return;
        setSubmitting(true);
        
        try {
            await new Promise(resolve => {
                submitTimerRef.current = setTimeout(resolve, 800);
            });
            createEventMock({
                ...formData,
                id: Date.now().toString(),
            } as GenericEvent);
            onSuccess();
        } catch (error) {
            console.error("Failed to create event", error);
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6 animate-in fade-in duration-200">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
            
            <div className="relative w-full max-w-xl bg-white rounded-t-[32px] md:rounded-[32px] border-2 border-slate-200 border-b-0 md:border-b-[8px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-10 md:zoom-in-95 duration-300">
                
                {/* Header */}
                <div className="bg-white p-6 border-b-2 border-slate-100 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">Create Event</h2>
                        <p className="text-slate-500 font-medium text-sm">Step {step} of 2</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                        <X className="w-6 h-6 text-slate-400" />
                    </button>
                </div>

                {/* Form Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
                    
                    {step === 1 && (
                        <div className="space-y-6 animate-in slide-in-from-right">
                            {/* Title */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-500 mb-2">
                                    <Type className="w-4 h-4" /> Event Title <span className="text-red-500">*</span>
                                </label>
                                <input 
                                    value={formData.title}
                                    onChange={(e) => handleChange('title', e.target.value)}
                                    placeholder="e.g. Masterclass: Winning Essays"
                                    className="w-full p-4 bg-white rounded-2xl border-2 border-slate-200 focus:border-sky-500 outline-none font-medium text-slate-700 transition-all"
                                />
                            </div>

                            {/* Registration Link */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-500 mb-2">
                                    <LinkIcon className="w-4 h-4" /> Registration URL <span className="text-red-500">*</span>
                                </label>
                                <input 
                                    value={formData.link}
                                    onChange={(e) => handleChange('link', e.target.value)}
                                    placeholder="https://eventbrite.com/..."
                                    className="w-full p-4 bg-white rounded-2xl border-2 border-slate-200 focus:border-sky-500 outline-none font-medium text-blue-600 transition-all"
                                />
                            </div>

                            {/* Category & Type */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-500 mb-2">
                                        Category
                                    </label>
                                    <div className="relative">
                                        <select 
                                            value={formData.category}
                                            onChange={(e) => handleChange('category', e.target.value)}
                                            className="w-full p-4 bg-white rounded-2xl border-2 border-slate-200 focus:border-sky-500 outline-none font-medium text-slate-700 appearance-none"
                                        >
                                            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-500 mb-2">
                                        Location Type
                                    </label>
                                    <div className="relative">
                                        <select 
                                            value={formData.locationType}
                                            onChange={(e) => handleChange('locationType', e.target.value)}
                                            className="w-full p-4 bg-white rounded-2xl border-2 border-slate-200 focus:border-sky-500 outline-none font-medium text-slate-700 appearance-none"
                                        >
                                            {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            {/* Date & Time */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-500 mb-2">
                                        <Calendar className="w-4 h-4" /> Date <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) => handleChange('date', e.target.value)}
                                        className="w-full p-4 bg-white rounded-2xl border-2 border-slate-200 focus:border-sky-500 outline-none font-medium text-slate-700"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-500 mb-2">
                                        <Clock className="w-4 h-4" /> Time
                                    </label>
                                    <input 
                                        type="text"
                                        placeholder="19:00 EST"
                                        value={formData.time}
                                        onChange={(e) => handleChange('time', e.target.value)}
                                        className="w-full p-4 bg-white rounded-2xl border-2 border-slate-200 focus:border-sky-500 outline-none font-medium text-slate-700"
                                    />
                                </div>
                            </div>

                            {/* Location Detail */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-500 mb-2">
                                    <MapPin className="w-4 h-4" /> {formData.locationType === 'Virtual' ? 'Platform Name' : 'Address'}
                                </label>
                                <input 
                                    value={formData.locationAddress}
                                    onChange={(e) => handleChange('locationAddress', e.target.value)}
                                    placeholder={formData.locationType === 'Virtual' ? "Zoom / Google Meet" : "123 Main St, City"}
                                    className="w-full p-4 bg-white rounded-2xl border-2 border-slate-200 focus:border-sky-500 outline-none font-medium text-slate-700"
                                />
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6 animate-in slide-in-from-right">
                            {/* Short Description */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-500 mb-2">
                                    <AlignLeft className="w-4 h-4" /> Short Summary
                                </label>
                                <textarea 
                                    value={formData.description}
                                    onChange={(e) => handleChange('description', e.target.value)}
                                    placeholder="Brief hook for the card view..."
                                    className="w-full p-4 bg-white rounded-2xl border-2 border-slate-200 focus:border-sky-500 outline-none font-medium text-slate-700 h-24 resize-none"
                                />
                            </div>

                            {/* Full Description */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-500 mb-2">
                                    <AlignLeft className="w-4 h-4" /> Full Details
                                </label>
                                <textarea 
                                    value={formData.fullDescription}
                                    onChange={(e) => handleChange('fullDescription', e.target.value)}
                                    placeholder="Detailed agenda, speakers, prerequisites..."
                                    className="w-full p-4 bg-white rounded-2xl border-2 border-slate-200 focus:border-sky-500 outline-none font-normal text-slate-600 h-32 resize-none"
                                />
                            </div>

                            {/* Image URL */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-500 mb-2">
                                    <ImageIcon className="w-4 h-4" /> Cover Image URL
                                </label>
                                <div className="flex gap-2">
                                    <input 
                                        value={formData.image}
                                        onChange={(e) => handleChange('image', e.target.value)}
                                        placeholder="https://..."
                                        className="flex-1 p-4 bg-white rounded-2xl border-2 border-slate-200 focus:border-sky-500 outline-none font-medium text-slate-700"
                                    />
                                    <div className="w-14 h-14 rounded-2xl bg-slate-200 overflow-hidden border-2 border-slate-300">
                                        <img src={formData.image} className="w-full h-full object-cover" alt="Preview" onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/150')} />
                                    </div>
                                </div>
                            </div>

                            {/* Price */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-500 mb-2">
                                    <DollarSign className="w-4 h-4" /> Price ($)
                                </label>
                                <input 
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => handleChange('price', parseInt(e.target.value))}
                                    className="w-full p-4 bg-white rounded-2xl border-2 border-slate-200 focus:border-sky-500 outline-none font-bold text-slate-700"
                                />
                            </div>

                            {/* Tags */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-500 mb-2">
                                    <Tag className="w-4 h-4" /> Tags
                                </label>
                                <div className="flex gap-2 mb-2 flex-wrap">
                                    {formData.tags?.map(tag => (
                                        <span key={tag} className="bg-sky-100 text-sky-600 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                                            {tag} <button onClick={() => setFormData(prev => ({...prev, tags: prev.tags?.filter(t => t !== tag)}))}><X className="w-3 h-3" /></button>
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <input 
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                                        placeholder="Add tag..."
                                        className="flex-1 p-3 bg-white rounded-xl border-2 border-slate-200 focus:border-sky-500 outline-none font-medium text-slate-700 text-sm"
                                    />
                                    <DuoButton onClick={handleAddTag} variant="secondary" className="px-4 py-3">Add</DuoButton>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="p-6 bg-white border-t-2 border-slate-100 flex justify-between items-center">
                    {step === 2 ? (
                        <DuoButton 
                            variant="navigation"
                            onClick={() => setStep(1)}
                            startIcon={ChevronLeft}
                        >
                            Back
                        </DuoButton>
                    ) : (
                        <div></div>
                    )}

                    <DuoButton 
                        onClick={step === 1 ? () => setStep(2) : handleSubmit}
                        disabled={!formData.title || !formData.date || !formData.link || submitting}
                        themeColor={config.theme}
                        isLoading={submitting}
                    >
                        {step === 1 ? 'Next Step' : 'Publish Event'}
                    </DuoButton>
                </div>

            </div>
        </div>
    );
};
