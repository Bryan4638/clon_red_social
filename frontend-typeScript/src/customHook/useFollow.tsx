import { useState } from "react";
import { userFollowRequest } from "../api/user";
import { toast } from "sonner";

function useFollow() {
  const [loading, setLoading] = useState(false);

  const follow = (id: number) => {
    setLoading(true)
    userFollowRequest(id).then((res)=>{
      toast.success("Follow user success")
    }).catch((err)=>{
      console.log(err)
      toast.error("Follow user error.")
    }).finally(()=>{
      setLoading(false)
    })
  };

  return {follow, loading}
}

export default useFollow;
