import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './route'
import { RouterProvider } from 'react-router-dom'
import { StrictMode } from 'react'
import { Slide, ToastContainer } from 'react-toastify'

export const App = () => {
  return (
    <RouterProvider router={Router} />
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastContainer
      limit={1}
      position="top-center"
      autoClose={3000} //ms
      newestOnTop={true}
      closeOnClick
      pauseOnHover={false}
      theme="dark"
      closeButton={false}
      transition={Slide}
      toastClassName='z-9999'
    />
    <App />
  </StrictMode>
);
