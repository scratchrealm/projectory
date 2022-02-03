import { MuiThemeProvider } from '@material-ui/core';
import MainWindow from 'components/MainWindow/MainWindow';
import ProjectorySetup from 'core/ProjectorySetup';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import GoogleSignInSetup from './commonComponents/googleSignIn/GoogleSignInSetup';
import theme from './theme';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <GoogleSignInSetup>
          <ProjectorySetup>
            {/* <ReCaptchaSetup> */}
              <div className="App">
                <MainWindow />
              </div>
            {/* </ReCaptchaSetup> */}
          </ProjectorySetup>
        </GoogleSignInSetup>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
