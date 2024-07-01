/**
 * Herhangi bir medya içeriği (foto, belge,video, ses,dosya veri tabanlarına doğrudan kaydetmeyiz sebebi yüzlerce mgb kaybetmesi bu soruna çözüm olarak sadece medya depolaması için tasarlanmış olan yapılarda depolayıp medyaya erişmek için kullanılan url adreslerini veritabanında saklarız)
 * 
 */

//bu fonk beklentimiz dosyayı alıp firebase storageye yükleyip ardından urli'ni return etmesi
import {  getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";

const upload = async(file) => {
//! 1..eğerki dosya resim değilse veya dosya yoksa fonsiyonu durdur
if(!file?.type.startsWith("image") || !file){
return null;
}
console.log(file);

//! 2..dosyanın yükleneceği konumun referansını al
const imageRef = ref(storage, v4() + file.name);

//! 3..refaransını oluşturduğumuz konuma dosyayı yükle
await uploadBytes(imageRef, file);

//! 4..yüklenilen dosyanın url al ve return et
return await (getDownloadURL(imageRef)); 
}

export default upload;











