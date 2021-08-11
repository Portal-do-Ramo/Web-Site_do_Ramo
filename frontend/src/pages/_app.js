import '../styles/global.scss'
import { Provider } from '../contexts/Context'
import { MktInputContext } from '../contexts/MktInputContext'

function MyApp({ Component, pageProps }){

  return (
    <div>
      <main>
        <Provider>   
            <Component {...pageProps}/>
        </Provider>
      </main>
    </div>
  )
}

/*  */
export default MyApp;
