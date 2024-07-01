import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { BsCardImage } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { auth, db } from '../../firebase';
import { serverTimestamp } from 'firebase/database';
import upload from '../../utils/upload';
import Loader from '../Loader';

const Form = ({ user }) => {
    const [isLoading, setIsLoading] = useState(false);

    //todo tweet gönderilince
    const handleSubmit = async (e) => {
        e.preventDefault();

        //! 1. inputlardaki veriye eriş
        const text = e.target[0].value;
        const file = e.target[1].files[0];

        //! 2. yazı ve resim içeriği yoksa fonksiyonu durdur ve uyarıyı ver
        // yazı veya image eğer ki her ikisi de yoksa durdurup uyarı verelim
        if (!text && !file) {
            return toast.warning("Lütfen içerik giriniz", {
                position: "bottom-right"
            });
        }

        // eğer bu yüklenme bloğundan geçersek yüklenme başladı
        setIsLoading(true);

        try {
            //!todo 3. dosyayı storage'a yükle
            const url = file ? await upload(file) : null;

            //! 4. yeni tweet belgesini koleksiyona kaydet
            const tweetsCol = collection(db, "tweets");
            await addDoc(tweetsCol, {
                textContent: text,
                imageContent: url,
                likes: [],
                isEdited: false,
                createdAt: serverTimestamp(), // veri kaydedildiği anda o tarihte veriyi alıyor
                user: {
                    id: auth.currentUser.uid,
                    name: auth.currentUser.displayName,
                    photo: auth.currentUser.photoURL,
                },
            });
        } catch (err) {
            toast.error("Bir hata oluştu");
        }

        // eğer ki bu kod bloğundan çıkarsak yüklenme bitti
        setIsLoading(false);

        //! 5. Formu sıfırla
        e.target.reset();
    }

    return (
        <form onSubmit={handleSubmit} className='flex gap-3 border-b border-zinc-600 p-4'>
            <img className='rounded-full h-[35px] md:h-[45px]' src={user?.photoURL} alt={user?.displayName} />

            <div className='w-full'>
                <input className='w-full mt-1 mb-2 bg-transparent outline-none md:text-lg' placeholder='Neler Oluyor' type="text" />

                <div className='flex justify-between items-center'>
                    <label className='text-lg transition p-4 cursor-pointer rounded-full hover:bg-gray-800' htmlFor="image">
                        <BsCardImage />
                    </label>

                    <input className='hidden' id='image' type="file" />

                    <button disabled={isLoading} className='bg-blue-600 flex items-center justify-center px-4 py-2 min-w-[85px] min-h-[40px] rounded-full transition hover:bg-blue-800'>
                        {/**EĞERKİ İSLOADİNG DEĞERİ TRUE İSE LOADER OLACAK DEĞİLSE TWEETLE OLACAK */}
                        {isLoading ? <Loader /> : "Tweetle"}
                    </button>
                </div>
            </div>
        </form>
    );
}

export default Form;
