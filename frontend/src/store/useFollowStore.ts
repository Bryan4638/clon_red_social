import { create } from "zustand";
import { userFollowRequest, userUnFollowRequest } from "../api/user";

type Store = {
  followingList: number[];
  setFollowingList: (list: number[]) => void;
  userFollow: (id: number) => Promise<void>;
  userUnfollow: (id: number) => Promise<void>;
};

export const useFollowStore = create<Store>((set, get) => {
  return {
    followingList: [],

    setFollowingList: (list) => {
      set({ followingList: list });
    },

    userFollow: async (id) => {
      try {
        const { followingList } = get();
        await userFollowRequest(id);

        set({ followingList: [...followingList, id] });

      } catch (err) {
        console.log(err);
      }
    },
    userUnfollow: async (id) => {
      try {
        const { followingList } = get();
        await userUnFollowRequest(id);

        set({ followingList: followingList.filter((item) => item !== id) });
        
      } catch (err) {
        console.log(err);
      }
    },
  };
});
