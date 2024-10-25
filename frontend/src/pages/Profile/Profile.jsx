import { useEffect, useState } from "react";
import { getUserRequest } from "../../api/user";
import { Spinner } from "@material-tailwind/react";
import { useAuth } from "../../content/AuthContext";
import Post from "../../Components/Post/Post";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

function Profile() {
  const [userId, setUserId] = useState(() => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get("q") ?? "";
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Post");

  const { user: userAu } = useAuth();

  useEffect(() => {
    setLoading(true);
    getUserRequest(userId)
      .then((res) => setUser(res.data.data))
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  return (
    <>
      {loading && (
        <div className="flex justify-center items-center mt-3 mb-1">
          <Spinner />
        </div>
      )}
      {!loading && user && (
        <main className=" min-h-screen w-full py-0 overflow-x-hidden">
          {/* <!--banner img--> */}
          <div className="relative bg-gray-800 max-w-full">
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
          <div className="md:grid md:gap-6 relative flex space-x-22 pt-4">
            <div className="mt-5 md:mt-0 ">
              <div>
                {/* <!--User info--> */}
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                    {/* <!--profile picture--> */}
                    <div className="flex">
                      <img
                        className=" h-24 w-24 rounded-full ring-4 dark:ring-dark-second ring-white sm:h-32 sm:w-32 hover:bg-gray-100"
                        src={user.avatar}
                        alt="{{profile.user.username}} Profile Picture"
                      />
                    </div>

                    {/* {% if user.is_authenticated and user != profile.user %}
                        {% if is_following %} */}

                    {userId != userAu.userId && (
                      <div>
                        <button className="float-right inline-flex justify-center px-4 py-2 border dark:bg-dark-main dark:border-dark-third dark:hover:bg-dark-third dark:text-dark-txt border-blue-500 shadow-sm text-md font-bold rounded-full text-blue-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-dark-second focus:ring-blue-500">
                          Unfollow
                        </button>
                      </div>
                    )}

                    <div className=" mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                      <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                        {/* {% if user.is_authenticated and user == profile.user %} */}
                        {userId == userAu.userId && (
                          <a className="inline-flex justify-center px-4 py-2 border dark:bg-neutral-700 dark:border-emerald-400 dark:hover:bg-dark-third dark:text-dark-txt border-emerald-500 shadow-sm text-md font-bold rounded-full text-emerald-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-dark-second focus:ring-emerald-500">
                            <span>Edit Profile</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className=" sm:block  mt-6 min-w-0 flex-1">
                    <h1 className="text-2xl font-bold dark:text-gray-50 text-gray-900 truncate">
                      {/* {{profile.user.username}} 
                        {% if profile.verified == "verified" %} */}
                      {user.username}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 inline-block text-emerald-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      ></svg>
                      {/* {% endif %} */}
                    </h1>
                  </div>

                  {/* {% if profile.bio %} */}
                  <p className="mt-2 max-w-4xl text-sm dark:text-dark-txt text-gray-500">
                    {user.bio}
                  </p>
                  {/* {% endif %} */}

                  <div className="inline-flex grid-cols-4">
                    {/* <!-- Location -->
                {% if profile.location %} */}
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
                    {/* {% endif %} */}

                    {/* <!--Website-->
                {% if profile.url %} */}
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
                        href="{{profile.url}}"
                        target="_blank"
                        rel="nofollow"
                      >
                        profile.url
                      </a>
                    </p>
                    {/* {% endif %} */}

                    {/* {% if profile.birthday %} */}
                    <p className="mt-2 max-w-4xl text-sm mx-1 text-gray-500 cursor-default">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 inline-block"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                      </svg>
                      {user.birthday}
                    </p>
                    {/* {% endif %} */}

                    {/* <!-- Date Joined -->
                {% if profile.date_created %} */}
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
                      {user.createdAt}
                    </p>
                    {/* {% endif %} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center pt-5">
            <div className="w-3/5  px-2">
              <Tabs value={activeTab}>
                <TabsHeader
                  className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                  indicatorProps={{
                    className:
                      "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                  }}
                >
                  <Tab
                    value={"Post"}
                    onClick={() => setActiveTab("Post")}
                    className={activeTab === "Post" ? "text-gray-900" : ""}
                  >
                    Post
                  </Tab>
                  <Tab
                    value={"Info"}
                    onClick={() => setActiveTab("Info")}
                    className={activeTab === "Info" ? "text-gray-900" : ""}
                  >
                    Info
                  </Tab>
                  <Tab
                    value={"Bookmark"}
                    onClick={() => setActiveTab("Bookmark")}
                    className={activeTab === "Bookmark" ? "text-gray-900" : ""}
                  >
                    Bookmark
                  </Tab>
                </TabsHeader>
                <TabsBody>
                  <TabPanel value={"Post"}>
                    <div className="flex justify-center items-center pb-5">
                      <div className="w-4/5 px-2 ">
                        {user.posts.length >= 1 &&
                          user.posts.map((post) => {
                            return (
                              <Post
                                post={post}
                                key={post.id}
                                deletePost={() => console.log("hola")}
                              ></Post>
                            );
                          })}
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel value={"Info"}>
                    <div className="flex justify-center items-center pb-5">
                      <div className="w-4/5 px-2 ">
                        <div className="mt-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                          <div>
                            <dl className="sm:divide-y sm:divide-gray-200">
                              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                <dt className="text-sm font-medium text-gray-500">
                                  Full name
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                  profile.user.first_name profile.user.last_name
                                </dd>
                              </div>
                              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                <dt className="text-sm font-medium text-gray-500">
                                  Application for
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                  Backend Developer
                                </dd>
                              </div>
                              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                <dt className="text-sm font-medium text-gray-500">
                                  Email address
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                  profile.user.email
                                </dd>
                              </div>
                              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                <dt className="text-sm font-medium text-gray-500">
                                  Salary expectation
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                  $120,000
                                </dd>
                              </div>
                              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                <dt className="text-sm font-medium text-gray-500">
                                  About
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                  Fugiat ipsum ipsum deserunt culpa aute sint do
                                  nostrud anim incididunt cillum culpa
                                  consequat. Excepteur qui ipsum aliquip
                                  consequat sint. Sit id mollit nulla mollit
                                  nostrud in ea officia proident. Irure nostrud
                                  pariatur mollit ad adipisicing reprehenderit
                                  deserunt qui eu.
                                </dd>
                              </div>
                              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                <dt className="text-sm font-medium text-gray-500">
                                  Attachments
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                  <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                      <div className="w-0 flex-1 flex items-center">
                                        {/* <!-- Heroicon name: solid/paper-clip --> */}
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
                                        {/* <!-- Heroicon name: solid/paper-clip --> */}
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
                              </div>
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                </TabsBody>
              </Tabs>
            </div>
          </div>
        </main>
      )}
    </>
  );
}

export default Profile;
