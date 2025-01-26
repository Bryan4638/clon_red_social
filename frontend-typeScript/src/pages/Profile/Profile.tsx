import { useEffect, useState } from "react";
import { getUserRequest } from "../../api/user";
import { useAuth } from "../../context/AuthContext";
import { Link, useSearchParams } from "react-router-dom";
import { SERVER_URL } from "../../config";
import { MdVerified } from "react-icons/md";
import { User } from "../../types";

import { Tabs, Tab, Chip, Button } from "@heroui/react";
import useFollow from "../../customHook/useFollow";
import { FaBookmark, FaUserCircle } from "react-icons/fa";

export const GalleryIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="24"
      role="presentation"
      viewBox="0 0 24 24"
      width="24"
      {...props}
    >
      <path
        d="M2.58078 19.0112L2.56078 19.0312C2.29078 18.4413 2.12078 17.7713 2.05078 17.0312C2.12078 17.7613 2.31078 18.4212 2.58078 19.0112Z"
        fill="currentColor"
      />
      <path
        d="M9.00109 10.3811C10.3155 10.3811 11.3811 9.31553 11.3811 8.00109C11.3811 6.68666 10.3155 5.62109 9.00109 5.62109C7.68666 5.62109 6.62109 6.68666 6.62109 8.00109C6.62109 9.31553 7.68666 10.3811 9.00109 10.3811Z"
        fill="currentColor"
      />
      <path
        d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.19C2 17.28 2.19 18.23 2.56 19.03C3.42 20.93 5.26 22 7.81 22H16.19C19.83 22 22 19.83 22 16.19V13.9V7.81C22 4.17 19.83 2 16.19 2ZM20.37 12.5C19.59 11.83 18.33 11.83 17.55 12.5L13.39 16.07C12.61 16.74 11.35 16.74 10.57 16.07L10.23 15.79C9.52 15.17 8.39 15.11 7.59 15.65L3.85 18.16C3.63 17.6 3.5 16.95 3.5 16.19V7.81C3.5 4.99 4.99 3.5 7.81 3.5H16.19C19.01 3.5 20.5 4.99 20.5 7.81V12.61L20.37 12.5Z"
        fill="currentColor"
      />
    </svg>
  );
};

function Profile() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("q") ?? "";
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const { loading: loadingFolow, follow } = useFollow();

  const { user: userAuth } = useAuth();

  const handleCLickFollow = (id: number) => () => {
    follow(id);
  };

  useEffect(() => {
    setLoading(true);
    getUserRequest(userId)
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <>
      {loading && <h1 className="pt-36">cargando</h1>}
      {!loading && user && (
        <main className=" w-full py-0 h-screen hide-scrollbar overflow-y-scroll">
          {/* <!--banner img--> */}
          <div className="relative bg-gray-800 max-w-full ">
            <div className="absolute inset-0">
              <img
                className="w-full h-full object-cover"
                src={user.banner}
                alt=""
              />
              <div
                className="absolute inset-0 mix-blend-multiply"
                aria-hidden="true"
              ></div>
            </div>
            <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8"></div>
          </div>

          {/* <!--USER PROFILE--> */}
          <div className="md:grid md:gap-6 relative flex space-x-22 pt-4 ">
            <div className="mt-5 md:mt-0 w-full">
              {/* <!--User info--> */}
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 ">
                <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                  {/* <!--profile picture--> */}
                  <div className="flex justify-center items-center space-x-5">
                    <img
                      className=" h-24 w-24 rounded-full ring-4 dark:ring-dark-second ring-white sm:h-32 sm:w-32 hover:bg-gray-100"
                      src={user.avatar}
                      alt="{{profile.user.username}} Profile Picture"
                    />

                    <div className=" sm:block  mt-6 min-w-0 flex-1">
                      <h1 className="flex justify-start items-center text-3xl font-bold dark:text-gray-200 text-gray-900 truncate">
                        {/* {{profile.user.username}} 
                        {% if profile.verified == "verified" %} */}
                        {user.username}
                        {/* <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 inline-block text-emerald-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        ></svg> */}
                        {/* {% endif %} */}
                        {user.status && (
                          <MdVerified className="text-emerald-400 ml-1" />
                        )}
                      </h1>
                    </div>
                  </div>
                  <div className=" mt-6 sm:flex-1  sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                    <div className="mt-6 flex flex-col max-w-full justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                      {" "}
                      {/* {% if user.is_authenticated and user == profile.user %} */}
                      {parseInt(userId) === userAuth?.id && (
                        <a className="inline-flex justify-center px-4 py-2 border dark:bg-emerald-700 dark:hover:bg-emerald-900 dark:border-emerald-400 border-emerald-500 shadow-sm text-md font-bold rounded-full text-gray-200 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-dark-second focus:ring-emerald-500">
                          <span>Edit Profile</span>
                        </a>
                      )}
                      {parseInt(userId) !== userAuth?.id && (
                        <Button
                          isLoading={loadingFolow}
                          onPress={handleCLickFollow(user.id)}
                          className="inline-flex justify-center px-4 py-2 border dark:bg-emerald-700 dark:hover:bg-emerald-900 dark:border-emerald-400 border-emerald-500 shadow-sm text-md font-bold rounded-full text-gray-200 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-dark-second focus:ring-emerald-500"
                        >
                          Follow
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="sm:flex  mt-6 min-w-0  justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-400 font-bold text-lg">
                    {user.firstName} {user.lastName}
                  </span>

                  <div className="sm:py-0 py-4 flex justify-start items-center gap-5">
                    <p className="text-sm dark:text-dark-txt text-neutral-300">
                      {user._count.followers} Followers
                    </p>
                    <p className="text-sm dark:text-dark-txt text-neutral-300">
                      {user._count.following} Following
                    </p>
                  </div>
                </div>

                {/* {% if profile.bio %} */}
                <p className="mt-2 max-w-4xl text-sm dark:text-dark-txt text-gray-500">
                  {user.bio}
                </p>
                {/* {% endif %} */}

                {/* <!--Location--> */}
                <div className="  sm:grid-cols-4 sm:inline-flex">
                  {user.location && (
                    <p className="mt-2 max-w-4xl text-sm mx-1 text-gray-500 cursor-default">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2 inline-block"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>{" "}
                      {user.location}
                    </p>
                  )}

                  {/* <!--Website--> */}
                  {user.url && (
                    <p className="mt-2 max-w-4xl text-sm mx-1 dark:text-dark-txt text-gray-500 cursor-default">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2 inline-block"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      <a
                        className="text-emerald-400 hover:text-emerald-700"
                        href={user.url}
                        target="_blank"
                        rel="nofollow"
                      >
                        {user.url}
                      </a>
                    </p>
                  )}

                  {/* <!-- Birthday -->*/}
                  {user.birthday && (
                    <p className="mt-2 max-w-4xl text-sm mx-1 text-gray-500 cursor-default">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1 inline-block"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                      </svg>
                      {formatDate(user.birthday)}
                    </p>
                  )}

                  {/* <!-- Date Joined -->*/}
                  {user.createdAt && (
                    <p className="mt-2 max-w-4xl text-sm mx-1 text-gray-500 cursor-default">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2 inline-block"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatDate(user.createdAt)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center pt-5 ">
            <div className="w-auto lg:w-4/5 xl:w-3/5 px-2">
              <Tabs
                aria-label="Options"
                classNames={{
                  tabList:
                    "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                  cursor: "w-full bg-[#10b981]",
                  tab: "max-w-full flex justify-between px-0 h-12",
                  tabContent: "group-data-[selected=true]:text-[#10b981]",
                }}
                className="w-full justify-center"
                color="success"
                variant="underlined"
              >
                <Tab
                  className="w-full justify-center"
                  key="post"
                  title={
                    <div className="flex items-center space-x-2 w-full">
                      <GalleryIcon />
                      <span>Post</span>
                      <Chip size="sm" variant="faded">
                        {user._count.posts}
                      </Chip>
                    </div>
                  }
                >
                  <div className="masonry">
                    {user.posts.length >= 1 &&
                      user.posts.map((post) => {
                        return (
                          <Link
                            key={post.id}
                            className="cursor-pointer masonry-item"
                            to={`/post-detail?post=${post.id}`}
                          >
                            <img
                              src={`${SERVER_URL}/public/users/${post.image[0]}`}
                              loading="lazy"
                              alt="Post image"
                              className="img"
                            />
                          </Link>
                        );
                      })}
                  </div>
                  {user.posts.length === 0 && (
                    <div className="flex justify-center items-center p-10">
                      <h1 className="font-bold text-xl text-zinc-400">
                        No post to show
                      </h1>
                    </div>
                  )}
                </Tab>
                <Tab
                  className="w-full justify-center"
                  key="music"
                  title={
                    <div className="flex items-center space-x-2">
                      <FaUserCircle className="size-5" />
                      <span>About me</span>
                    </div>
                  }
                >
                  <div className="flex justify-center items-center pb-5">
                    <div className="w-4/5 px-2 ">
                      <div className="mt-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div>
                          <dl className="sm:divide-y sm:divide-gray-200 dark:sm:divide-neutral-600">
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                              <dt className="text-sm font-medium text-gray-500 ">
                                Full name
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
                                {user.firstName} {user.lastName}
                              </dd>
                            </div>
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                              <dt className="text-sm font-medium text-gray-500">
                                Application for
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
                                Backend Developer
                              </dd>
                            </div>
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                              <dt className="text-sm font-medium text-gray-500">
                                Email address
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
                                {user.email}
                              </dd>
                            </div>
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                              <dt className="text-sm font-medium text-gray-500">
                                Count Post
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
                                {user._count.posts}
                              </dd>
                            </div>
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                              <dt className="text-sm font-medium text-gray-500">
                                About
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
                                {user.abaut}
                              </dd>
                            </div>
                            {/* <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                <dt className="text-sm font-medium text-gray-500">
                                  Attachments
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
                                  <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                      <div className="w-0 flex-1 flex items-center">
                                        
                                        <svg
                                          className="flex-shrink-0 h-5 w-5 text-gray-400"
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                          aria-hidden="true"
                                        ></svg>
                                        <span className="ml-2 flex-1 w-0 truncate">
                                          resume_back_end_developer.pdf
                                        </span>
                                      </div>
                                      <div className="ml-4 flex-shrink-0">
                                        <a
                                          href="#"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                          Download
                                        </a>
                                      </div>
                                    </li>
                                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                      <div className="w-0 flex-1 flex items-center">
                                        
                                        <svg
                                          className="flex-shrink-0 h-5 w-5 text-gray-400"
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                          aria-hidden="true"
                                        ></svg>
                                        <span className="ml-2 flex-1 w-0 truncate">
                                          coverletter_back_end_developer.pdf
                                        </span>
                                      </div>
                                      <div className="ml-4 flex-shrink-0">
                                        <a
                                          href="#"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                          Download
                                        </a>
                                      </div>
                                    </li>
                                  </ul>
                                </dd>
                              </div> */}
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab
                  className="w-full justify-center"
                  key="videos"
                  title={
                    <div className="flex items-center space-x-2">
                      <FaBookmark className="size-5" />
                      <span>Bookmark</span>
                      <Chip size="sm" variant="faded">
                        0
                      </Chip>
                    </div>
                  }
                >
                  <div className="flex justify-center items-center p-10">
                    <div>
                      <h1 className="font-bold text-xl text-zinc-400">
                        There are no saved posts
                      </h1>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </main>
      )}
    </>
  );
}

export default Profile;
