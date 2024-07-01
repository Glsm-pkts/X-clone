import {  sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../firebase";


const ResetButton = ({email}) => {
    const handleReset = () => {
        sendPasswordResetEmail(auth, email)
        .then(()=> 
            toast.info("Şifre sıfırlama epostası gönderildi. Mailinizi konrol edin")
        )
        .catch((err)=> toast.error("Bir hata oluştu:" + err.code))
    }
  return (
    <div>
      <button onClick={handleReset} className='text-red-500'>Şifrenizi mi unuttunuz</button>
    </div>
  );
}

export default ResetButton;
