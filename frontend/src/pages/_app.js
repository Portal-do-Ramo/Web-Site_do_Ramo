import '../styles/global.scss'

function MyApp({ Component, pageProps }){
  return (
    <div>
      <main>

        <Component {...pageProps}/>

      </main>

    </div>
  )
}

/*  */
export default MyApp;
