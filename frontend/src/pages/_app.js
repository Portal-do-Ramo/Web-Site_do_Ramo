import '../styles/global.scss'
import { AuthContextProvider } from '../contexts/AuthContext'
import { ImageContextProvider } from '../contexts/ImageContext'
import { PSEFormContextProvider } from '../contexts/PSEFormContext';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }){

  return (
    <div>
      <main>
        <AuthContextProvider>
          <ImageContextProvider>
            <PSEFormContextProvider>
              <Component {...pageProps}/>
              <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                draggable={false}
                pauseOnVisibilityChange
                closeOnClick
                pauseOnHover
              />
            </PSEFormContextProvider>
          </ImageContextProvider>
        </AuthContextProvider>
      </main>
    </div>
  )
}

/*  */
export default MyApp;
