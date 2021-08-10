import '../styles/global.scss'
import { AuthProvider } from '../contexts/AuthContext'

function MyApp({ Component, pageProps }){

  return (
    <div>
      <main>
        <AuthProvider>
          <Component {...pageProps}/>
        </AuthProvider>
      </main>
    </div>
  )
}

/*  */
export default MyApp;
