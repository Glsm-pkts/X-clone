import moment from "moment";
import { MdEdit } from "react-icons/md";

const User = ({ tweet }) => {
  // Tarih verisine eriş ve moment ile formatla
  // tarih verisin eriş
  let date = tweet.createdAt;
  
  // Eğer date bir Date objesi değilse, onu Date objesine dönüştür
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  // moment yardımıyla şuanki tarihten ne kadar uzak olduğunu hesapla
  date = moment(date).fromNow();

  return (
    <div className="flex gap-3 items-center whitespace-nowrap">
      <p>{tweet.user.name}</p>

      <p className="text-gray-400 text-sm">
        @{tweet.user.name.toLowerCase().split(" ").join("_")}
      </p>

      <p className="text-gray-400 text-sm">{date}</p>

      {tweet.isEdited && (
        <p className="text-gray-400 text-xs">
          <span className="max-md:hidden">*düzenlendi</span>
          <MdEdit className="md:hidden" />
        </p>
      )}
    </div>
  );
};

export default User;
