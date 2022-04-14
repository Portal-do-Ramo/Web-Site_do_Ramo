import '../styles/global.scss'
import { AuthContextProvider } from '../contexts/AuthContext'
import { ImageContextProvider } from '../contexts/ImageContext'
import { PSEFormContextProvider } from '../contexts/PSEFormContext';

function MyApp({ Component, pageProps }){

  return (
    <div>
      <main>
        <AuthContextProvider>
          <ImageContextProvider>
            <PSEFormContextProvider>
              <Component {...pageProps}/>
            </PSEFormContextProvider>
          </ImageContextProvider>
        </AuthContextProvider>
      </main>
    </div>
  )
}

/*  */
export default MyApp;
