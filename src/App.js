import React, {useState ,useEffect} from "react";

import Header from './components/Header';
import Nav from "./components/Nav";
import {BrowserRouter} from "react-router-dom";
import Main from "./components/Main";
import Loader from "./components/Loader";


function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [paths, setPaths] = useState({});


  useEffect(() => {
    fetch("https://lms-mai-instruction-default-rtdb.europe-west1.firebasedatabase.app/paths.json")
      .then(res => res.json())
      .then(
        result => {
            setPaths(result);
            setIsLoaded(true);
        })
  }, [])

  const [isActiveMenu, setIsActiveMenu] = React.useState(false);


    return (
      <BrowserRouter>
        <div className={`wrapper ${isActiveMenu ? "lock" : ""}`}>
          <Header isActiveMenu={isActiveMenu} setIsActiveMenu={setIsActiveMenu}/>
          <div className="page">
          {
            isLoaded ?
              <div className="container">
                <div className="page__row">
                  <Nav paths={paths} isActiveMenu={isActiveMenu} setIsActiveMenu={setIsActiveMenu}/>
                  <Main paths={paths}/>
                </div>
              </div> :
              <Loader/>
          }
          </div>
        </div>
      </BrowserRouter>
    );
}

export default App;
