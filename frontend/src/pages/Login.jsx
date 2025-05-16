const Login = () => {
  const handleLogin = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-black px-6 py-3 rounded shadow"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
