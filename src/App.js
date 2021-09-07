import React, {useState ,useEffect} from "react";

import Header from './components/Header';
import Nav from "./components/Nav";
import {HashRouter} from "react-router-dom";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
export default function App() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [paths, setPaths] = useState({});
  const [isActiveMenu, setIsActiveMenu] = React.useState(false);

  useEffect(() => {
    console.log(process.env)
    fetch(`${process.env.REACT_APP_DB_URL}/paths.json`)
      .then(res => res.json())
      .then(
        result => {
          setPaths(result);
          setIsLoaded(true);
        },
        error => {
          setIsLoaded(true);
          console.log(error);
          setError(error);
        }
      )
  }, []);

  document.body.style.overflow = isActiveMenu ? "hidden" : "";
  document.querySelector("html").style.overflow = isActiveMenu ? "hidden" : "";

  function getBodyScrollTop()
  {
    return window.self.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop);
  }
  return (
      <HashRouter>
        <div className={`wrapper ${isActiveMenu ? "lock" : ""}`}>
          <Header isActiveMenu={isActiveMenu} setIsActiveMenu={setIsActiveMenu}/>
          <div className="page">
            {
              (() => {
                if(error) {
                  return <Error/>
                } else if(!isLoaded) {
                  return <Loader/>
                } else if(isLoaded && paths){
                  return(
                    <div className="container">
                      <div className="page__row">
                        <Nav paths={paths} isActiveMenu={isActiveMenu} setIsActiveMenu={setIsActiveMenu}/>
                        <Main paths={paths}/>
                      </div>
                    </div>
                  )
                } else {
                  return <Error/>
                }
              })()
          }
          </div>
        </div>
      </HashRouter>
    );
}
