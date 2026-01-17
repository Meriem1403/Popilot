
// ... (imports)
// TeamMemberModal.tsx fix: ensure data mapping from member is correct.
import { useState, useEffect } from 'react';
import { X, UserPlus, Save, GraduationCap, Calendar, Pencil } from 'lucide-react';

interface TeamMemberModalProps {
    member?: any;
    onClose: () => void;
    onSubmit: (data: any) => void;
}

export function TeamMemberModal({ member, onClose, onSubmit }: TeamMemberModalProps) {
    const isEditing = !!member;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        role: '',
        experienceLevel: 'intermediate' as 'junior' | 'intermediate' | 'senior' | 'expert',
        joinDate: new Date().toISOString().split('T')[0],
        availability: 100,
        skills: [] as string[],
    });

    useEffect(() => {
        if (member) {
            setFormData({
                name: member.name || '',
                email: member.email || '',
                phone: member.phone || '',
                role: member.role || '',
                experienceLevel: 'intermediate',
                joinDate: new Date().toISOString().split('T')[0],
                availability: member.workload !== undefined ? member.workload : 100, // Important fix: ensure 0 is not treated as falsy
                skills: member.skills || [],
            });
        }
    }, [member]);

    // ... (rest of the file)
}
