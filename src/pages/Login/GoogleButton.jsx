import { signInWithPopup } from "firebase/auth";
import {auth, provider} from "../../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GoogleButton = () => {

  //!SAYFA YÖNLENDİRME
  const navigate = useNavigate();
  //! GOOGLE HESABI İLE OTURUM AÇMA
  const handleLogin = () => {
    signInWithPopup(auth, provider).then(()=>{
    //!SAYFA YÖNLENDİRME
      navigate("/Feed")
   //!TOASTİFY KÜTÜPHANESİNDEN ALDIĞIMIZ BİLDİRİM
      toast.success("Hesaba giriş yapıldı");
    });
  };

  return (
   <button onClick={handleLogin} className='bg-white flex items-center py-2 px-10 rounded-full gap-3 transition hover:bg-gray-300 text-black whitespace-nowrap'>
    <img className="h-[20px]" src="google-logo.svg" alt="" />
    Google ile Giriş Yap
   </button>
  );
}

export default GoogleButton;
