import { useForm } from "react-hook-form";
import { useAuth } from "../../content/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signIn, errors: loginErrors, isAuth } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth,navigate]);

  const onSubmit = handleSubmit(async (values) => {
    signIn(values);
  });

  return (
    <section className="min-h-screen flex items-stretch text-white ">
      <div className="w-full flex items-center justify-center text-center px-0 z-0 bg-zinc-800">
        <div className=" w-1/3 py-6 z-20 bg-zinc-900 rounded-xl ">
          <div className=" mb-6 py-2">
            <h1 className=" text-white text-6xl font-bold">Login</h1>
          </div>
          {loginErrors.map((error, i) => (
              <div className=" bg-rose-500 text-white p-2 rounded-2xl mx-auto w-2/3" key={i}>
                {error}
              </div>
            ))} 
            
          <form
            onSubmit={onSubmit}
            className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"
          >
            <div className="pb-2 pt-4">
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Email"
                className="block w-full p-4 text-lg rounded-2xl bg-zinc-700"
              />
              {errors.email && (
                <p className="text-red-500 text-left mt-2 ml-2">
                  Email is required
                </p>
              )}
            </div>
            <div className="pb-2 pt-4">
              <input
                className="block w-full p-4 text-lg rounded-2xl bg-zinc-700"
                type="password"
                {...register("password", { required: true })}
                placeholder="Password"
              />
              {errors.password && (
                <p className="text-red-500 text-left mt-2 ml-2">
                  Password is required
                </p>
              )}
            </div>
            <div className="text-right text-gray-400 hover:underline hover:text-gray-100">
              <a href="#">Forgot your password?</a>
            </div>
            <div className="px-4 pb-2 pt-4">
              <button className="uppercase block w-full p-4 text-lg rounded-2xl bg-indigo-500 hover:bg-indigo-600 focus:outline-none">
                sign in
              </button>
            </div>
          </form>
          <br />
          <div className="flex justify-evenly space-x-2 sm:w-2/3 mx-auto mt-4">
            <span className="bg-gray-500 h-px flex-grow t-2 relative top-2"></span>
            <span className="flex-none uppercase text-xs text-gray-400 font-semibold">
              or
            </span>
            <span className=" bg-gray-500 text-gray-400 h-px flex-grow t-2 relative top-2"></span>
          </div>
          <div className="py-6 space-x-2">
            <Link className="w-10 h-10 items-center justify-center inline-flex rounded-full font-bold text-lg border-2 border-white bg-gray-700">
              f
            </Link>
            <Link className="w-10 h-10 items-center justify-center inline-flex rounded-full font-bold text-lg border-2 border-white bg-gray-700">
              G+
            </Link>
            <Link className="w-10 h-10 items-center justify-center inline-flex rounded-full font-bold text-lg border-2 border-white bg-gray-700">
              in
            </Link>
          </div>
          <div className=" text-center ">
            <span className="text-xl text-white">Dont have an account?</span>
            <Link
              to={"/register"}
              className="text-blue-500 text-xl font-semibold ml-2"
            >
              Sing up
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
