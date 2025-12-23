import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addBook, UpdateBook, viewBook } from "../features/bookSlice";
import { useNavigate, useParams } from "react-router-dom";

function BookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bookList = useSelector((state) => state.bookList);

  useEffect(() => {
    dispatch(viewBook());
  }, [dispatch]);

  useEffect(() => {
    if (id && bookList.length > 0) {
      const singleBook = bookList.find((book) => book.id === id);
      if (singleBook) reset(singleBook);
    }
  }, [id, bookList, reset]);

  const onSubmit = (data) => {
    if (!id) {
      dispatch(addBook(data));
      alert("Book added");
    } else {
      dispatch(UpdateBook({ id, ...data }));
      alert("Book updated");
    }
    reset();
    navigate("/");
  };

  return (
    <div className="container app-main py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg border-0">
            <div
              className="card-header text-white"
              style={{
                background: "linear-gradient(90deg, #0f2027, #203a43, #2c5364)",
              }}
            >
              <h3 className="card-title mb-0 text-center">
                {id ? "Update Book" : "Add New Book"}
              </h3>
            </div>
            <div className="card-body bg-light">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Book Title</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.title ? "is-invalid" : ""
                    }`}
                    {...register("title", {
                      required: "Book title is required",
                      minLength: {
                        value: 2,
                        message: "Title must be at least 2 characters",
                      },
                    })}
                  />
                  {errors.title && (
                    <div className="invalid-feedback">
                      {errors.title.message}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Author</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.author ? "is-invalid" : ""
                    }`}
                    {...register("author", {
                      required: "Author name is required",
                    })}
                  />
                  {errors.author && (
                    <div className="invalid-feedback">
                      {errors.author.message}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">ISBN</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.isbn ? "is-invalid" : ""
                    }`}
                    {...register("isbn", {
                      pattern: {
                        value: /^(\d{10}|\d{13})$/,
                        message: "ISBN must be 10 or 13 digits",
                      },
                    })}
                  />
                  {errors.isbn && (
                    <div className="invalid-feedback">
                      {errors.isbn.message}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Publication Year
                  </label>
                  <input
                    type="number"
                    className={`form-control ${
                      errors.publicationYear ? "is-invalid" : ""
                    }`}
                    {...register("publicationYear", {
                      min: {
                        value: 1000,
                        message: "Please enter a valid year",
                      },
                      max: {
                        value: new Date().getFullYear(),
                        message: "Year cannot be in the future",
                      },
                    })}
                  />
                  {errors.publicationYear && (
                    <div className="invalid-feedback">
                      {errors.publicationYear.message}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Genre</label>
                  <select className="form-select" {...register("genre")}>
                    <option value="">Select Genre</option>
                    <option value="fiction">Fiction</option>
                    <option value="non-fiction">Non-Fiction</option>
                    <option value="science-fiction">Science Fiction</option>
                    <option value="fantasy">Fantasy</option>
                    <option value="mystery">Mystery</option>
                    <option value="biography">Biography</option>
                    <option value="history">History</option>
                    <option value="self-help">Self Help</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Description</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    {...register("description")}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Price</label>
                  <input
                    type="number"
                    step="0.01"
                    className={`form-control ${
                      errors.price ? "is-invalid" : ""
                    }`}
                    {...register("price", {
                      min: {
                        value: 0,
                        message: "Price cannot be negative",
                      },
                    })}
                  />
                  {errors.price && (
                    <div className="invalid-feedback">
                      {errors.price.message}
                    </div>
                  )}
                </div>

                <div className="mb-4 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="inStock"
                    {...register("inStock")}
                  />
                  <label className="form-check-label" htmlFor="inStock">
                    Currently in stock
                  </label>
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button
                    type="button"
                    className="btn btn-outline-secondary me-md-2"
                    onClick={() => reset()}
                  >
                    Reset
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {id ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookForm;
