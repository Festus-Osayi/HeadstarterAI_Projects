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

        try {
            if (!imageUpload) return null;
            const imageRef = ref(storage, `images/${imageUpload.name + uuidv4()}`);
            await uploadBytes(imageRef, imageUpload);
            const url = await getDownloadURL(imageRef);
            setImageUrls((prev) => [...prev, url]);
            return url
        } catch (error) {
            return error
        }
    };

    return { setImageUpload, uploadImages, imageUrls };
};

export { useImageUpload };
