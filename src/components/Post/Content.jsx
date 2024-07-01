

const Content = ({tweet}) => {
  return (
    <div className="my-4">
      {tweet.texContent && <p>{tweet.texContent}</p>}
      {tweet.imageContent && (
        <img src={tweet.imageContent} className="my-2 w-full rounded-lg object-cover max-[400px]" alt="" />
      )}
    </div>
  );
}

export default Content;
