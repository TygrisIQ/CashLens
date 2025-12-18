import { launchImageLibrary } from 'react-native-image-picker';

export const pickImage = async () => {
  const result = await launchImageLibrary({
    mediaType: 'photo',
    quality: 0.7,
    selectionLimit: 1,
  });

  if (result.didCancel) return null;
  if (result.errorCode) {
    console.warn(result.errorMessage);
    return null;
  }

  return result.assets?.[0]?.uri ?? null;
};
