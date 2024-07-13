

const Content = ({ tweet }) => {
  console.log(tweet);
  return (
    <div className="my-4">
      {tweet?.textContent && <p className="text-white">{tweet?.textContent}</p>}
      {tweet?.imageContent && (
        <img
          src={tweet.imageContent}
          className="my-2 w-full rounded-lg object-cover max-w-[400px]"
          alt=""
        />
      )}
    </div>
  );
};

export default Content;
