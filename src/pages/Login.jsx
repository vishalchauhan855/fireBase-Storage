import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

function Login() {
  const navigate = useNavigate();

  const signup = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(() => {
        alert("Signed in successfully!");
        navigate("/");
      })
      .catch(() => {
        alert("Sign in failed. Please try again.");
      });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        alert("User logged out");
      })
      .catch(() => {
        alert("Logout failed. Please try again.");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is logged in", user);
      }
    });
    return () => unsubscribe();
  }, []);

  const user = auth.currentUser;

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-dark">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card border-0 shadow-lg rounded-4 bg-secondary text-light">
              <div className="card-body p-4 text-center">
                <h3 className="fw-bold mb-2">BookStore</h3>
                <p className="text-light mb-4">
                  Sign in to access your bookshelf
                </p>

                {user ? (
                  <>
                    <div className="mb-4">
                      <h6 className="fw-semibold mb-1">
                        {user.displayName || user.email}
                      </h6>
                      <p className="text-light small">
                        You are logged in
                      </p>
                    </div>
                    <button
                      onClick={logout}
                      className="btn btn-outline-light w-100"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={signup}
                      className="btn btn-light w-100 py-2 mb-3"
                    >
                      <i className="bi bi-google me-2"></i>
                      Continue with Google
                    </button>
                    <p className="text-light small mb-0">
                      Secure sign in powered by Google
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
