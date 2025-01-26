import { FC } from "react";
import { SERVER_URL } from "../../config";
import { Card, CardFooter, Image } from "@heroui/react";
import { useNavigate } from "react-router-dom";

interface PostImagePrps {
  postImage: string[];
  id: string;
}

const PostImage: FC<PostImagePrps> = ({ postImage, id }) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/post-detail?post=${id}`);
  return (
    <>
      <div className="py-2">
        <div
          className={
            postImage.length >= 2
              ? "grid grid-cols-2 gap-1"
              : "grid grid-cols-1 gap-1"
          }
        >
          {postImage.slice(0, 4).map((ima, index) => (
            <Card
              key={ima}
              isFooterBlurred
              isBlurred
              className="border-none flex items-center"
              radius="lg"
            >
              <Image
                isBlurred
                isZoomed
                src={`${SERVER_URL}/public/users/${ima}`}
                alt="Post image"
              />
              {index === 3 && postImage.length > 4 && (
                <CardFooter
                  onClick={handleClick}
                  className="justify-center before:bg-white/10 h-full w-full overflow-hidden absolute before:rounded-xl rounded-large shadow-small z-10"
                >
                  <h1 className="text-xl text-white/80">Show More Images.</h1>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default PostImage;
