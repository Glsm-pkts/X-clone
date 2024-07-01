import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import { useRef, useState } from "react";
import Modal from "../Modal/İndex";


const Dropdown = ({tweet}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  //input referansı
  const inputRef = useRef ();
  //dropdown kapat
const close = () =>{
inputRef.current.checked = false;
}
  //silme
  const handleDelete = () => {
   const tweetRef = doc(db,"tweets", tweet.id);

   //dökümanı kaldır
   deleteDoc(tweetRef)
   .then(()=> toast.info("tweet akıştan kaldırıldı"))
   .catch(()=>toast.error("Bir sorun oluştu"));
   close();
  }

  //güncelleme
  const handleEdit = () =>{
setIsModalOpen(true);
close();
  }
  return (
    <div>
      <label className="popup">
  <input ref={inputRef} type="checkbox"/>
  <div className="burger" tabIndex="0">
    <span></span>
    <span></span>
    <span></span>
  </div>
  <nav className="popup-window">
    
    <legend>Eylemler</legend>
    <ul>
      <hr/>
      <li>
        <button onClick={handleEdit}>
         
          <span>Düzenle</span>
          <MdEdit/>
        </button>
      </li>
      <hr/>
      <li>
        <button onClick={handleDelete}>
          
          <span>Sil</span>
          <FaTrashAlt className="text-red-500"/>
        </button>
      </li>
    </ul>
  </nav>
</label>
{isModalOpen && <Modal tweet={tweet} close={() => setIsModalOpen(false)}/>}
    </div>
  );
}

export default Dropdown;
