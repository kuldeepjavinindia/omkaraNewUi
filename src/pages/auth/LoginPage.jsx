import { FiAlertTriangle } from "react-icons/fi"; 
import { BiCheckCircle } from "react-icons/bi"; 
import { FcGoogle } from "react-icons/fc";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useEffect, useState, useTransition } from "react";
import { Card, Input, Button, Typography, Alert } from "@material-tailwind/react";
// import { Link } from "react-router-dom";
import { useAuthDispatch, useAuthState } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { singInReq } from "../../store/slice/AuthSlice";
import axios from "axios";
import { SignInReq } from "../../constants/defaultRequest";

const LoginPage = () => {
  const [ShowPassword, setShowPassword] = useState();
  const [APISuccess, setAPISuccess] = useState(null);
  const [APIError, setAPIError] = useState(null);
  const [Loading, setLoading] = useState(false);
  
  const authState = useAuthState();
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition()



  const {
    register,
    handleSubmit,
    formState:{
      errors
    },
  } = useForm()

  // const form00 = useForm()



  

  const onSubmit = (data) => {
    setAPISuccess(null);
    setAPIError(null);
    setLoading(!Loading)

    let params = SignInReq;
    params = {
      ...params,
      UserId: data.username,
      password: data.password,
    }

    startTransition( async () => {
        try {
          
          await axios.post(
            `${singInReq}`,
            params
          ).then(res => {
            let redData = res.data
            // console.log(redData)


            if(redData.response_code == 403){
              setAPIError(redData.msg)
            }else{
              setAPISuccess(redData.msg)
              

              localStorage.setItem('user', JSON.stringify(redData))
              dispatch({ type: 'LOGIN', payload: redData });

            }

            setLoading(false)
            
          });

        } catch (error) {
            console.log('login error ---- ', error)
        }
        // console.log(' data>>>> ', data)
        // setTab(nextTab);
      });
  } 



  // const handleLogin = () => {
  //     // Replace this with your actual login logic
  //     // const user = { name: 'John Doe' }; // This should come from your authentication API
  //     // localStorage.setItem('user', JSON.stringify(user))
  //     // dispatch({ type: 'LOGIN', payload: user });
  // };

  if (authState.isAuthenticated) {
      navigate("/");
  }
  
  useEffect(() => {
    if(localStorage.getItem('user')){
      dispatch({ type: 'LOGIN', payload: JSON.parse(localStorage.getItem('user')) }); 
    }else{
      if (!authState.isAuthenticated) {
        navigate("/login");
      }
    }
  }, [])
  

  return (
    <>
      <div
        style={{
          // backgroundImage: `url(${
          //   import.meta.env.VITE_BASE_URL
          // }/images/login-dark-bg.svg)`,
          width: "100%",
          height: "100vh",
          backgroundSize: "cover",
        }}
        className="flex justify-center items-center bg-black"
      >
        <div className="main-login-card bg-white rounded-lg overflow-hidden">
          <div className="grid grid-cols-2">
            <div className="login-left bg-theme-c4 p-8" style={{
              backgroundImage: `url(${
                import.meta.env.VITE_BASE_URL
              }/images/login-side-bg.svg)`,
        }}>
              <h1 className="font-normal text-xl text-white">
                “In God we trust, all others must bring data.”
                <br />
                <strong>- W. E. Deming</strong>
              </h1>
            </div>
            <div className="login-right ">
              <div className="w-full">
                <Card className=" place-content-center place-items-center w-full p-8 ">
                  <img
                    src={import.meta.env.VITE_BASE_URL + "/images/logo.png"}
                    className="max-w-48"
                  />
                  
                  <form
                    className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    {/* {JSON.stringify(errors)} */}
                    <div className="mb-1 flex flex-col gap-6">
                      {
                        APIError && (
                          <Alert color="red" icon={<FiAlertTriangle size={22} />}>
                            {APIError}
                          </Alert>
                        )
                      }
                      {
                        APISuccess && (
                          <Alert color="green" icon={<BiCheckCircle size={22} />}>
                            {APISuccess}
                          </Alert>
                        )
                      }
                      <div>
                        <Input
                          disabled={Loading} 
                          size="lg"
                          placeholder="Enter Username"
                          label="Username"
                          // onChange={(e) => setUsername(e.target.value)}
                          // value={username}
                          {...register("username", {required:true} )}
                        />
                        {/* <div className="text-red-500 font-medium">sasa</div> */}
                      </div>
                      <div className=" relative">
                        <Input
                          disabled={Loading}
                          type={!ShowPassword ? "password" : "text"}
                          size="lg"
                          placeholder="********"
                          label="Password"
                          maxLength={16}
                          // onChange={(e) => setPassword(e.target.value)}
                          // value={password}
                          // {...register("password", {require:true})}
                          {...register("password", {required: true})}
                        />
                        <span
                          onClick={() => {
                            setShowPassword(!ShowPassword);
                          }}
                          className=" cursor-pointer absolute top-[.85rem] right-4"
                        >
                          {ShowPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                        {/* <div className="text-red-500 font-medium">sasa</div> */}
                      </div>
                    </div>
                    <Typography className="text-end text-theme font-normal">
                      Forgot Password?
                    </Typography>

                    {/* <Link to={'/'}> */}
                      {/* <Button onClick={handleLogin} className="mt-2 bg-theme" fullWidth type="submit"> */}
                      <Button disabled={Loading} className="mt-2 bg-theme" fullWidth type="submit">
                        Login
                      </Button>
                    {/* </Link> */}

                    <Typography className="text-center my-5 font-normal">Or</Typography>

                    <Button
                      className="mt-2 relative "
                      variant="outlined"
                      fullWidth
                    >
                      <span className=" absolute left-5 top-1/3">
                        <FcGoogle size={20} />
                      </span>
                      <span>Sign in with Google</span>
                    </Button>
                  </form>
                </Card>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="container mx-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="login-left place-content-center place-items-center">
              <h1 className="font-normal text-xl text-white ml-20">
                “In God we trust, all others must bring data.”
                <br />
                <strong>- W. E. Deming</strong>
              </h1>
            </div>
            <div className="login-right ">
              <div className="flex justify-center">
                <Card className=" place-content-center place-items-center w-fit p-8">

                  <img src={import.meta.env.VITE_BASE_URL + "/images/logo.png"} className="max-w-48" />
                  <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" action="/">
                    <div className="mb-1 flex flex-col gap-6">
                      <div>
                      <Input
                        size="lg"
                        placeholder="Enter Username"
                        label="Username"
                      />
                      </div>
                      <div className=" relative">
                        <Input
                            type={!ShowPassword ? "password" : "text"}
                            size="lg"
                            placeholder="********"
                            label="Password"
                            maxLength={16}
                        />
                        <span onClick={()=>{
                            setShowPassword(!ShowPassword)
                        }} className=" cursor-pointer absolute top-[.85rem] right-4">
                            {
                                ShowPassword 
                                ?
                                <FaEyeSlash />
                                :
                                <FaEye />
                            }
                        </span>
                      </div>
                    </div>
                    <Typography className="text-end text-theme">Forgot Password?</Typography>

                    <Button className="mt-2 bg-theme" fullWidth type="submit">
                      Login
                    </Button>
                    
                    <Typography className="text-center my-5">OR</Typography>


                    <Button className="mt-2 relative " variant="outlined" fullWidth>
                    <span className=" absolute left-5 top-1/3">
                        <FcGoogle size={20}/>
                    </span>
                    <span>Sign in with Google</span>
                    </Button>


                  </form>
                </Card>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default LoginPage;
