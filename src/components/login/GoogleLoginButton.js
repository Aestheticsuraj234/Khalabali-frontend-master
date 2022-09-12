import GoogleButton from "react-google-button";

const GoogleLoginButton = () => {
  const handleGoogle = () => {
    window.open(
      `https://khalbali.wiki/api/auth/google`,
      // `http://localhost:5000/auth/google`,
      "_self"
    );
  };

  return <GoogleButton onClick={handleGoogle} />;
};

export default GoogleLoginButton;
