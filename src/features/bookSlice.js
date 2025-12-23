import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import { ref , remove, update } from "firebase/database";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";

export const addBook = createAsyncThunk("/addBook", async (data) => {
const newData=data
addDoc(collection(db,"bloglist"),newData)
return newData
});

export const viewBook = createAsyncThunk("/viewBook", async () => {
const data =await getDocs(collection(db,"bloglist"))
console.log(data)
const arr=[]
data.forEach((doc)=>{
  const newBook={
    id:doc.id,
    ...doc.data()
  }
  arr.push(newBook)
})
return arr;
});

export const deletBook = createAsyncThunk("/deleteBook", async (id) => {
 await deleteDoc(doc(db,`bloglist/${id}`))
  return { id };
});

export const UpdateBook = createAsyncThunk("/UpdateBook", async (data) => {
  const { id, ...rest } = data;
  await updateDoc(doc(db, `books/${id}`),rest);
  return { id, ...rest };
});

const bookSlice = createSlice({
  name: "books",
  initialState: {
    bookList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addBook.fulfilled, (state, action) => {
        state.bookList.push(action.payload);
      })
      .addCase(viewBook.fulfilled, (state, action) => {
        state.bookList = action.payload;
      })
      .addCase(deletBook.fulfilled, (state, action) => {
        const { id } = action.payload;
        state.bookList = state.bookList.filter((ele) => ele.id !== id);
      })
      .addCase(UpdateBook.fulfilled, (state, action) => {
        const { id } = action.payload;
        const index = state.bookList.findIndex((book) => book.id === id);
        if (index !== -1) {
          state.bookList[index] = action.payload;
        }
      });
  },
});

export default bookSlice.reducer;
