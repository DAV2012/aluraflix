import './App.css';
import Header from './componentes/header';
import Footer from './componentes/footer';
import { DataProvider } from './contexts/FirebaseProvider';
import Main from './componentes/main/main';


function App({uidUser}) {
  


  return (
    <>
      <DataProvider uidUser={uidUser}>
        <Header />
        <Main>
        </Main>
      </DataProvider>
      <Footer />
    </>
  );
}

export default App;
