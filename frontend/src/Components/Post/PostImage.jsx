import { SERVER_URL } from "../../conf";

function PostImage({ postImage, user }) {

  return (
    <>
      <div className="py-2">
        <div
          className={
            postImage.length === 1
              ? ""
              : postImage.length > 4
              ? "grid grid-cols-3 gap-1"
              : "grid grid-cols-2 gap-1"
          }
        >
          {postImage.map((ima) => (
            <div

              className="cursor-pointer flex justify-center items-center"
              key={ima}
            >
              <img src={`${SERVER_URL}/public/users/${ima}`} loading="lazy" alt="Post image" />
            </div>
          ))}
        </div>
      </div>

    </>
  );
}

export default PostImage;
