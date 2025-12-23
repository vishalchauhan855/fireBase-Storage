import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletBook, viewBook } from "../features/bookSlice";
import { FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function BookList() {
  const dispatch = useDispatch();
  const bookList = useSelector((state) => state.bookList);

  useEffect(() => {
    dispatch(viewBook());
  }, [dispatch]);

  const Trash = (id) => {
    dispatch(deletBook(id));
  };

  if (!bookList || bookList.length === 0) {
    return (
      <div className="container app-main">
        <div className="text-center py-5">
          <i className="bi bi-book empty-state-icon"></i>
          <h4 className="mt-3">No books found</h4>
          <p className="text-muted-soft">
            Start by adding some books to your collection.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container app-main">
      <div className="row mb-3">
        <div className="col-12 d-flex justify-content-between align-items-end">
          <div>
            <h2 className="mb-1">Book Collection</h2>
            <p className="text-muted-soft">
              Total Books: {bookList?.length || 0}
            </p>
          </div>
          <NavLink to="/addBook" className="btn btn-accent">
            <i className="bi bi-plus-circle me-1"></i>
            Add Book
          </NavLink>
        </div>
      </div>

      <div className="row">
        {bookList.map((book) => (
          <div key={book.id} className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100 shadow-sm book-card">
              <div className="card-header book-card-header">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="badge bg-light text-dark">
                    {book.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                  <small className="text-light">{book.id}</small>
                </div>
              </div>

              <div className="card-body">
                <h5 className="card-title text-primary">{book.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  by {book.author}
                </h6>
                <p className="card-text small text-dark mt-3">
                  {book.description || "No description available."}
                </p>

                <div className="mt-3">
                  <div className="row small text-muted">
                    <div className="col-6">
                      <span className="book-meta-label">Genre</span>
                      <br />
                      <span className="text-capitalize">
                        {book.genre?.replace("-", " ") || "NA"}
                      </span>
                    </div>
                    <div className="col-6">
                      <span className="book-meta-label">Year</span>
                      <br />
                      {book.publicationYear || "NA"}
                    </div>
                  </div>

                  <div className="row small text-muted mt-2">
                    <div className="col-6">
                      <span className="book-meta-label">ISBN</span>
                      <br />
                      {book.isbn || "NA"}
                    </div>
                    <div className="col-6">
                      <span className="book-meta-label">Price</span>
                      <br />
                      {book.price || "0.00"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-2 btn-group">
                <button
                  className="btn btn-danger"
                  onClick={() => Trash(book.id)}
                >
                  <FaTrash />
                </button>
                <NavLink
                  className="btn btn-warning"
                  to={`/UpdateBook/${book.id}`}
                >
                  Update
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookList;
