import { CiShare2 } from "react-icons/ci";
import { FaHeart, FaRegHeart, FaRetweet } from "react-icons/fa";
import { LuMessageCircle } from "react-icons/lu";
import {arrayRemove, arrayUnion, doc, updateDoc} from "firebase/firestore";
import {db, auth} from "../../firebase";

const Buttons = ({tweet}) => {
//oturumu açık olan kullanıcı bu tweeti likeladımı
const isLiked = tweet.likes.includes(auth.currentUser.uid);


  //like durumunu tersine çevirir
  const toogleLike = async () => {
    //güncellenecek dökümanın referansını al
  const tweetRef =  doc(db, "tweets", tweet.id)

    //referansı alına tweet dökümanını güncelle
await updateDoc(tweetRef,{
  //eğer likelandıysa diziden kaldır likelanmadıysa diziye ekle
  likes: isLiked 
  ? arrayRemove(auth.currentUser.uid) 
  : arrayUnion(auth.currentUser.uid),
});
  };
  return (
    <div className="flex justify-between items-center">
      <div className="p-3 rounded-full cursor-pointer transition hover:bg-[#0000ff44]">
      <LuMessageCircle/>
      </div>
      <div className="p-3 rounded-full cursor-pointer transition hover:bg-[#0000ff44]">
      <FaRetweet/>
      </div>
      <div onClick={toogleLike} className="flex gap-2 items-center p-3 rounded-full cursor-pointer transition hover:bg-[#d1614d44]">
        {/**doluysa faheart değilse boş kalp */}
        {isLiked ? <FaHeart className="text-red-500"/> : <FaRegHeart/>}
      
      <span>{tweet.likes.length}</span>
      </div>
      <div className="p-3 rounded-full cursor-pointer transition hover:bg-[#5a5a6444]">
      <CiShare2/>
      </div>
    </div>
  );
}

export default Buttons;
