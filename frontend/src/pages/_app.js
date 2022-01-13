import '../styles/global.scss'
import { AuthContextProvider } from '../contexts/AuthContext'
import { ImageContextProvider } from '../contexts/ImageContext'

function MyApp({ Component, pageProps }){

  return (
    <div>
      <main>
        <AuthContextProvider>
          <ImageContextProvider>
            <Component {...pageProps}/>
          </ImageContextProvider>
        </AuthContextProvider>
      </main>
    </div>
  )
}

/*  */
export default MyApp;
