import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { auth } from "../../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

function Navbar() {
  const location = useLocation();
  const [isAuth, setAuth] = useState(null);
  const [userData, setUserData] = useState(null);

  const signup = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        alert("Signed in successfully!");
        setAuth(result.user);
        setUserData(result.user);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setAuth(user);
      setUserData(user);
    });
    return () => unsub();
  }, []);

  const logout = () => {
    signOut(auth)
      .then(() => {
        alert("User logged out");
        setAuth(null);
        setUserData(null);
      })
      .catch((err) => console.log(err));
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold d-flex align-items-center text-warning" to="/">
          <i className="bi bi-book me-2"></i>
          <span>BookStore</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item mx-2">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "text-warning fw-semibold" : ""
                }`}
                to="/"
              >
                Book List
              </Link>
            </li>

            <li className="nav-item mx-2">
              <Link
                className={`nav-link ${
                  location.pathname === "/addBook" ? "text-warning fw-semibold" : ""
                }`}
                to="/addBook"
              >
                Add Book
              </Link>
            </li>

            <li className="nav-item mx-2">
              {isAuth == null ? (
                <button onClick={signup} className="btn btn-outline-warning">
                  <i className="bi bi-google me-2"></i>
                  Sign In
                </button>
              ) : (
                <button onClick={logout} className="btn btn-outline-warning">
                  Logout
                </button>
              )}
            </li>

            {isAuth && (
              <li className="nav-item dropdown mx-2">
                <a
                  className="nav-link dropdown-toggle d-flex align-items-center text-warning"
                  href="#"
                  data-bs-toggle="dropdown"
                >
                  <img
                    src={userData?.photoURL}
                    alt="Profile"
                    className="rounded-circle me-2"
                    style={{
                      width: "35px",
                      height: "35px",
                      objectFit: "cover",
                      border: "2px solid #ffc107",
                    }}
                  />
                  <span className="d-none d-md-inline">
                    {userData?.displayName?.split(" ")[0] || "User"}
                  </span>
                </a>

                <ul className="dropdown-menu dropdown-menu-end shadow bg-dark text-light">
                  <li className="px-3 py-3 border-bottom border-secondary">
                    <div className="fw-semibold">{userData?.displayName}</div>
                    <small className="text-muted">{userData?.email}</small>
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
