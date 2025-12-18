import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import useTheme from '../shared/themeSelect';
import useProfile from '../../hooks/useProfile';
import { pickImage } from '../../utils/imagePicker';

export default function ProfileScreen() {
  const { theme } = useTheme();
  const { profile, updateProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);

  const [editData, setEditData] = useState({ ...profile });

  const handlePickImage = async () => {
    const uri = await pickImage();
    if (uri) {
      updateProfile({ avatarUri: uri });
      setEditData(prev => ({ ...prev, avatarUri: uri }));
    }
  };

  const handleSave = () => {
    updateProfile(editData);
    setIsEditing(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={{ 
          backgroundColor: theme.card, 
          paddingTop: 60, 
          paddingBottom: 30, 
          alignItems: 'center',
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          elevation: 4,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 10
        }}>
          <TouchableOpacity onPress={isEditing ? handlePickImage : null} activeOpacity={0.8}>
            <View>
              <Image
                source={profile.avatarUri ? { uri: profile.avatarUri } : require('../assets/profile_placeholder.png')}
                style={{ width: 130, height: 130, borderRadius: 65, borderWidth: 4, borderColor: theme.accent }}
              />
              {isEditing && (
                <View style={{ 
                  position: 'absolute', bottom: 0, right: 0, 
                  backgroundColor: theme.accent, padding: 8, borderRadius: 20,
                  borderWidth: 3, borderColor: theme.card
                }}>
                  <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>EDIT</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>

          {!isEditing ? (
            <>
              <Text style={{ color: theme.text, fontSize: 24, fontWeight: '800', marginTop: 15 }}>
                {profile.firstName} {profile.lastName}
              </Text>
              <Text style={{ color: theme.subtitle, fontSize: 14 }}>CashLens Member</Text>
              
              <TouchableOpacity 
                onPress={() => setIsEditing(true)}
                style={{ 
                  marginTop: 20, backgroundColor: theme.accent + '20', 
                  paddingHorizontal: 25, paddingVertical: 10, borderRadius: 20 
                }}
              >
                <Text style={{ color: theme.accent, fontWeight: '700' }}>Edit Profile</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={{ color: theme.text, fontSize: 18, fontWeight: '700', marginTop: 15 }}>
              Update your info
            </Text>
          )}
        </View>

        <View style={{ padding: 25 }}>
          {!isEditing ? (
            <View>
               <Text style={{ color: theme.text, fontSize: 18, fontWeight: '700', marginBottom: 15 }}>Account Stats</Text>
               <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ backgroundColor: theme.card, padding: 20, borderRadius: 20, width: '48%', alignItems: 'center' }}>
                    <Text style={{ color: theme.subtitle, fontSize: 12 }}>Member Since</Text>
                    <Text style={{ color: theme.text, fontSize: 16, fontWeight: '700', marginTop: 5 }}>2025</Text>
                  </View>
                  <View style={{ backgroundColor: theme.card, padding: 20, borderRadius: 20, width: '48%', alignItems: 'center' }}>
                    <Text style={{ color: theme.subtitle, fontSize: 12 }}>Status</Text>
                    <Text style={{ color: '#2ecc71', fontSize: 16, fontWeight: '700', marginTop: 5 }}>Active</Text>
                  </View>
               </View>
            </View>
          ) : (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <View style={{ marginBottom: 20 }}>
                <Text style={labelStyle(theme)}>First Name</Text>
                <TextInput
                  value={editData.firstName}
                  onChangeText={(v) => setEditData({ ...editData, firstName: v })}
                  style={inputStyle(theme)}
                />

                <Text style={labelStyle(theme)}>Last Name</Text>
                <TextInput
                  value={editData.lastName}
                  onChangeText={(v) => setEditData({ ...editData, lastName: v })}
                  style={inputStyle(theme)}
                />

                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                  <TouchableOpacity 
                    onPress={() => setIsEditing(false)}
                    style={{ flex: 1, padding: 16, alignItems: 'center' }}
                  >
                    <Text style={{ color: theme.subtitle, fontWeight: '600' }}>Cancel</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    onPress={handleSave}
                    style={{ flex: 2, backgroundColor: theme.accent, padding: 16, borderRadius: 15, alignItems: 'center', elevation: 3 }}
                  >
                    <Text style={{ color: '#fff', fontWeight: '700' }}>Save Changes</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const labelStyle = (theme) => ({
  color: theme.subtitle,
  fontSize: 13,
  fontWeight: '600',
  marginBottom: 8,
  marginLeft: 5,
  textTransform: 'uppercase'
});

const inputStyle = (theme) => ({
  backgroundColor: theme.card,
  color: theme.text,
  padding: 16,
  borderRadius: 15,
  marginBottom: 20,
  fontSize: 16,
  borderWidth: 1,
  borderColor: 'rgba(0,0,0,0.05)'
});