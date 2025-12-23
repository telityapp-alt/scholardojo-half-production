import { useState, useEffect } from 'react';
import { getUserProfile, UserProfile } from '../../../core/access/userAccess';
import { DomainType } from '../../../core/contracts/entityMap';

export const useVisionAuth = (domain: DomainType) => {
    const [user, setUser] = useState<UserProfile | null>(null);

    useEffect(() => {
        // Load user profile based on domain
        const profile = getUserProfile(domain);
        setUser(profile);
    }, [domain]);

    return { user };
};