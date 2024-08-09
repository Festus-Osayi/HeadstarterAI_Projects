import { atom, useSetAtom, useAtom } from 'jotai';
import { storage } from '@/lib/firebase_config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

// Atom definitions
const imageUploadAtom = atom(null);
const imageUrlsAtom = atom([]);

const useImageUpload = () => {
    const [imageUpload, setImageUpload] = useAtom(imageUploadAtom);
    const [imageUrls, setImageUrls] = useAtom(imageUrlsAtom);

    const uploadImages = async () => {
        if (!imageUpload) return null;

        console.log('Image file selected:', imageUpload);
        try {
            const imageRef = ref(storage, `images/${imageUpload.name + uuidv4()}`);
            await uploadBytes(imageRef, imageUpload);
            const url = await getDownloadURL(imageRef);
            console.log('Image uploaded successfully:', url);
            setImageUrls((prev) => [...prev, url]);
            return url
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return { setImageUpload, uploadImages, imageUrls };
};

export { useImageUpload };
