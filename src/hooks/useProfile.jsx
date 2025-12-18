import { useEffect, useState } from 'react';
import { loadProfile, saveProfile } from '../data/DataController';

export default function useProfile() {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    avatarUri: null,
  });

  useEffect(() => {
    loadProfile().then(setProfile);
  }, []);

  const updateProfile = async (updates) => {
    const updated = { ...profile, ...updates };
    setProfile(updated);
    await saveProfile(updated);
  };

  return {
    profile,
    updateProfile,
  };
}
