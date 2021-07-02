import React, { useEffect, useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './pages/home/home';
import Game from './pages/game/game';
import FourZeroFour from './pages/fourZeroFour/fourZeroFour';
import Header from './modules/header/header';
import Footer from './modules/footer/footer';
import { getQuizCategories, getApiToken } from './services/api'
import { StoreContext } from './context/store';


function App() {

  const { globalState, dispatch } = useContext(StoreContext)

    useEffect(() => {
        async function fetchQuizCategories(){
            try{
                const res = await getQuizCategories()
                if(res.status === 200 && res.data?.trivia_categories){
                    dispatch({type: 'SET_CATEGORIES', categories: res.data.trivia_categories})
                }
            } 
            catch(error){
                console.log(error)
            }
            
        }
        fetchQuizCategories()
    }, [])

    useEffect(() => {
      async function getToken(){
        try{
          const res = await getApiToken()
          console.log({token: res})
          if(res.data.response_code === 0){
            localStorage.setItem('token', res.data.token)
          }
        }
        catch(error){
          console.log(error)
        }
      }
      getToken()
    }, [])

  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route exact path="/"><Home/></Route>
          <Route exact path="/quiz"><Game/></Route>
          <Route component={FourZeroFour}/>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
