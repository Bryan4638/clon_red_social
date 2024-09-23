import { BiAngry, BiCamera, BiCircle, BiComment, BiHappyAlt, BiHappyHeartEyes, BiHeartCircle, BiLike, BiShare, BiSmile, BiSolidFileGif } from "react-icons/bi";
import { FaAngry } from "react-icons/fa";
import { FaHeartCirclePlus } from "react-icons/fa6";

function Listpost() {
  return (
    <div>
      {/* <!-- MULTIPLE IMAGES POST --> */}
      <div className="shadow bg-white dark:bg-zinc-800 dark:text-slate-300 mt-4 rounded-lg">
        {/* <!-- POST AUTHOR --> */}
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex space-x-2 items-center">
            <div className="relative">
              <img
                src="/images/avt-2.jpg"
                alt="{{post.author.username}} picture"
                className="w-10 h-10 rounded-full"
              />
              <span className="bg-green-500 w-3 h-3 rounded-full absolute right-0 top-3/4 border-white border-2"></span>
            </div>
            <div>
              <a href="{% url 'users:profile' post.author.username %}">
                <div className="font-semibold">Post Autor</div>
              </a>
              <span className="text-sm text-gray-500 dark:text-slate-400">
                Fecha de creacion
              </span>
            </div>
          </div>

          {/* {% if post.author %}
            <div x-data="{open:false}" className="relative inline-block text-left">
                <div>
                    <div @click="open=true" className="w-8 h-8 grid place-items-center text-xl text-gray-500 hover:bg-gray-200 dark:text-slate-300 hover:dark:bg-neutral-600 rounded-full cursor-pointer">
                        <i className='bx bx-dots-horizontal-rounded'></i>
                    </div>
                </div>
                <div x-show="open" @click.away="open=false" className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                    <div className="py-1" role="none">
                    <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                    <a href="{% url 'social:post-edit' post.pk %}" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">Edit</a>
                    <a href="{% url 'social:post-delete' post.pk %}" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">Delete</a>
                    
                    </div>
                </div>
            </div>
            {% endif %} */}
        </div>
        {/* <!-- END POST AUTHOR --> */}

        {/* <!-- POST CONTENT --> */}
        <div className="text-justify px-4 py-2">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia
          obcaecati quia magnam in impedit odio blanditiis, excepturi commodi
          temporibus rerum non maiores alias itaque beatae rem amet hic vel
          illum.
        </div>
        {/* <!-- END POST CONTENT --> */}

        {/* <!-- POST IMAGE --> */}
        <div className="py-2">
          <a href="{% url 'social:post-detail' post.pk %}">
            <img src="/images/post-1.jpg" alt="Post image" />
          </a>
        </div>
        {/* {% if post.image.count == 1 %}
        <div className="py-2">
                {% for img in post.image.all %}
                <a href="{% url 'social:post-detail' post.pk %}">
                <img src="{{img.image.url}}" alt="Post image">
                </a>
                {% endfor %}
        </div>
        {% endif %} */}

        {/* {% if post.image.count > 1 %}
        <div className="py-2">
            <div className="grid grid-cols-3 gap-1">
            {% for img in post.image.all %}
            <a href="{% url 'social:post-detail' post.pk %}">
            <img src="{{img.image.url}}" alt="Post image">
            </a>
            {% endfor %}
            </div>

        </div>
        {% endif %} */}
        {/* <!-- END POST IMAGE --> */}

        {/* <!-- POST REACT --> */}
        <div className="px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex flex-row-reverse items-center">
              <span className="ml-2 text-gray-500 dark:text-slate-300">
                999
              </span>
              <span className="rounded-full grid place-items-center text-2xl -ml-1 text-red-500">
                <BiAngry/>
              </span>
              <span className="rounded-full grid place-items-center text-2xl -ml-1 text-rose-500">
                <BiHeartCircle/>
              </span>
              <span className="rounded-full grid place-items-center text-2xl -ml-1 text-amber-300">
                <BiHappyAlt/>
              </span>
            </div>
            <div className="text-gray-500 dark:text-slate-300 ">
              <span className="px-4">90 Comments</span>
              <span>66 Shares</span>
            </div>
          </div>
        </div>
        {/* <!-- END POST REACT --> */}

        {/* <!-- POST ACTION --> */}
        <div className="py-2 px-4">
          <div className="border border-gray-200 dark:border-zinc-700 border-l-0 border-r-0 py-1">
            <div className="flex space-x-2">
              <div className="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 hover:dark:bg-neutral-700 text-xl py-2 rounded-lg cursor-pointer text-gray-500 dark:text-slate-300">
                <BiLike className="text-sky-600"/>
                <span className="text-sm font-semibold">Like</span>
              </div>
              <div className="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 hover:dark:bg-neutral-700 text-xl py-2 rounded-lg cursor-pointer text-gray-500 dark:text-slate-300">
                <BiComment/>
                <span className="text-sm font-semibold">Comment</span>
              </div>
              <div className="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 hover:dark:bg-neutral-700 text-xl py-2 rounded-lg cursor-pointer text-gray-500 dark:text-slate-300">
                <BiShare/>
                <span className="text-sm font-semibold">Share</span>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- END POST ACTION --> */}

        {/* <!-- LIST COMMENT --> */}
        <div className="py-2 px-4">
          {/* <!-- COMMENT --> */}
          <div className="flex space-x-2">
            <img
              src="./images/avt-5.jpg"
              alt="Profile picture"
              className="w-9 h-9 rounded-full"
            />
            <div>
              <div className="bg-gray-100 hover:dark:bg-neutral-800 dark:bg-neutral-700 p-2 rounded-2xl text-sm">
                <span className="font-semibold block">John Doe</span>
                <span>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </span>
              </div>
              <div className="p-2 text-xs text-gray-500 dark:text-slate-300">
                <span className="font-semibold cursor-pointer">Like</span>
                <span>.</span>
                <span className="font-semibold cursor-pointer">Reply</span>
                <span>.</span>
                10m
              </div>
              {/* <!-- COMMENT --> */}
              <div className="flex space-x-2">
                <img
                  src="./images/avt-7.jpg"
                  alt="Profile picture"
                  className="w-9 h-9 rounded-full"
                />
                <div>
                  <div className="bg-gray-100 dark:bg-neutral-700 p-2 rounded-2xl text-sm">
                    <span className="font-semibold block">John Doe</span>
                    <span>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </span>
                  </div>
                  <div className="p-2 text-xs text-gray-500 dark:text-slate-300">
                    <span className="font-semibold cursor-pointer">Like</span>
                    <span>.</span>
                    <span className="font-semibold cursor-pointer">Reply</span>
                    <span>.</span>
                    10m
                  </div>
                </div>
              </div>
              {/* <!-- END COMMENT --> */}
            </div>
          </div>
          {/* <!-- END COMMENT --> */}
          {/* <!-- COMMENT --> */}
          <div className="flex space-x-2">
            <img
              src="./images/avt-5.jpg"
              alt="Profile picture"
              className="w-9 h-9 rounded-full"
            />
            <div>
              <div className="bg-gray-100 hover:dark:bg-neutral-800 dark:bg-neutral-700 p-2 rounded-2xl text-sm">
                <span className="font-semibold block">John Doe</span>
                <span>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. In
                  voluptate ipsa animi corrupti unde, voluptatibus expedita
                  suscipit, itaque, laudantium accusantium aspernatur officia
                  repellendus nihil mollitia soluta distinctio praesentium nulla
                  eos?
                </span>
              </div>
              <div className="p-2 text-xs text-gray-500 dark:text-slate-300">
                <span className="font-semibold cursor-pointer">Like</span>
                <span>.</span>
                <span className="font-semibold cursor-pointer">Reply</span>
                <span>.</span>
                10m
              </div>
              {/* <!-- COMMENT --> */}
              <div className="flex space-x-2">
                <img
                  src="./images/avt-7.jpg"
                  alt="Profile picture"
                  className="w-9 h-9 rounded-full"
                />
                <div>
                  <div className="bg-gray-100 dark:bg-neutral-700 p-2 rounded-2xl text-sm">
                    <span className="font-semibold block">John Doe</span>
                    <span>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </span>
                  </div>
                  <div className="p-2 text-xs text-gray-500 dark:text-slate-300">
                    <span className="font-semibold cursor-pointer">Like</span>
                    <span>.</span>
                    <span className="font-semibold cursor-pointer">Reply</span>
                    <span>.</span>
                    10m
                  </div>
                </div>
              </div>
              {/* <!-- END COMMENT --> */}
            </div>
          </div>
          {/* <!-- END COMMENT --> */}
        </div>
        {/* <!-- END LIST COMMENT --> */}

        {/* <!-- COMMENT FORM --> */}
        <div className="py-2 px-4">
          <div className="flex space-x-2">
            <img
              src="./images/tuat.jpg"
              alt="Profile picture"
              className="w-9 h-9 rounded-full"
            />
            <div className="flex-1 flex bg-gray-100 hover:dark:bg-neutral-800 dark:bg-neutral-700 rounded-full items-center justify-between px-3">
              <input
                type="text"
                placeholder="Write a comment..."
                className="outline-none bg-transparent flex-1 "
              />
              <div className="flex space-x-0 items-center justify-center">
                <span className="w-7 h-7 grid place-items-center rounded-full hover:bg-gray-200 cursor-pointer text-gray-500 dark:text-slate-300 dark:hover:bg-neutral-700 text-xl">
                  <BiSmile/>
                </span>
                <span className="w-7 h-7 grid place-items-center rounded-full hover:bg-gray-200 cursor-pointer text-gray-500 dark:text-slate-300 dark:hover:bg-neutral-700 text-xl">
                  <BiCamera/>
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- END COMMENT FORM -->  */}
      </div>
      {/* <!-- END POST --> */}
    </div>
  );
}

export default Listpost;
