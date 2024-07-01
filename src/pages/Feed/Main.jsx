import React, { useEffect, useState } from 'react';
import Form from '../../components/Form';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';
import Loader from '../../components/Loader';
import Post from '../../components/Post';

const Main = ({ user }) => {
const [tweets, setTweets] = useState(null);

  //! Bileşenin ekrana basılmasını sağlıyor useEffect
  //! Mesajların anlık olarak ekrana gelmesi onSnapshot firebaseden geliyor
  useEffect(() => {
    // Abone olacak koleksiyonu al, collection referansı istiyor bizden ve değişkene aktarıp bu collectionu dinlemesini söylüyoruz
    const ref = collection(db, "tweets");

    // Abonelik ayarlarını tanımla 
    // orderBy sıralama yapar
    const q = query(ref, orderBy("createdAt", "desc"));

    // Koleksiyona abone oluyoruz, performans sorunlarını ortadan kaldırabilmek için onSnapshot metodunu kullanıyoruz 
    const onsub = onSnapshot(q, (snapshot) => {
      // Tweetlerin geçici olarak tutulacağı dizi
      const temp = [];

      // Doc'ların içerisinden veriye erişip geçici diziye aktar
      snapshot.docs.forEach((doc) => temp.push({ id: doc.id, ...doc.data() }));

      // State güncelle
      setTweets(temp);
    });

    // Kullanıcı bu bileşenden ayrıldığında aboneliği durdur, burada return yapıp onsub çalıştırıyoruz
    return () => onsub();
  }, []);

  return (
    <main className='border border-zinc-600 overflow-y-auto'>
      <header className='border-b border-zinc-600 p-4 font-bold'>Anasayfa</header>
      <Form user={user} />
      {/** Eğer tweet yok ise bu noktada loader bassın, yoksa bir div açıp map'leyeceğiz */}
      {!tweets ? (
        <div className='flex justify-center my-20 scale-[1.5]'><Loader /></div>
      ) : (
        tweets.map((tweet) => <Post tweet={tweet} key={tweet.id} />)
      )}
    </main>
  );
}

export default Main;
