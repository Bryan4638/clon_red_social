import { useState } from "react";
import { toast } from "sonner";
import { useFollowStore } from "../store/useFollowStore";

function useFollow() {
  const [loading, setLoading] = useState(false);
  const userFollow = useFollowStore((store) => store.userFollow);
  const userUnfollow = useFollowStore((store) => store.userUnfollow);

  const follow = (id: number) => {
    setLoading(true);
    userFollow(id)
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Follow user error.");
        setLoading(false);
      });
  };

  const unFollow = (id: number) => {
    setLoading(true);
    userUnfollow(id)
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Follow user error.");
        setLoading(false);
      });
  };

  return { follow, unFollow, loading };
}

export default useFollow;
