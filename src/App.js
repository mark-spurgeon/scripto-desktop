import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked:true
    }
  }
  onLightMode(e) {
    console.warn(e.currentTarget.checked);
    this.setState({checked:e.currentTarget.checked})
  }

  render() {

    if (this.state.checked) {
      var headerColor = "#202020";
      var contentColor = "#252525";
      var borderColor = "#1D1B1A";
    } else {
      var headerColor = "#E6DED2";
      var contentColor = "#E1DAC9";
      var borderColor = "#D3CDBD";
    }

    return (

      <div className="App">
          <header className="App-header" style={{backgroundColor:headerColor, borderColor:borderColor}}>
            <div className="Layout-flex">
              <div className="Layout-left" style={{borderColor:borderColor}}></div>
              <div className="Layout-main">
                <p className="App-title">Scripto</p>
              </div>
            </div>
          </header>
          <div className="App-content" style={{backgroundColor:contentColor}}>
            <div className="Layout-flex">
              <div className="Layout-left" style={{borderColor:borderColor}}>

              </div>
              <div className="Layout-main">
                <div className="Script-layout">
                  <div className="Script-main">
                      <div className="Script-Placeholder-box">
                        <div className="Script-Placeholder title">

                        </div>
                        <div className="Script-Placeholder subtitle">

                        </div>
                        <div className="Script-Placeholder c-box"><div className="Script-Placeholder character"></div></div>
                        <div className="Script-Placeholder paragraph">
                          <div className="Script-Placeholder p-line-indent">
                          </div>
                          <div className="Script-Placeholder p-line">
                          </div>
                          <div className="Script-Placeholder p-line">
                          </div>
                          <div className="Script-Placeholder p-line">
                          </div>
                          <div className="Script-Placeholder p-line">
                          </div>
                        </div>
                        <div className="Script-Placeholder c-box"><div className="Script-Placeholder character"></div></div>
                        <div className="Script-Placeholder paragraph">
                          <div className="Script-Placeholder p-line-indent">
                          </div>
                          <div className="Script-Placeholder p-line">
                          </div>
                          <div className="Script-Placeholder p-line">
                          </div>
                          <div className="Script-Placeholder p-line">
                          </div>
                          <div className="Script-Placeholder p-line">
                          </div>
                        </div>
                        <div className="Script-Placeholder c-box"><div className="Script-Placeholder character"></div></div>
                        <div className="Script-Placeholder paragraph">
                          <div className="Script-Placeholder p-line-indent">
                          </div>
                          <div className="Script-Placeholder p-line">
                          </div>
                          <div className="Script-Placeholder p-line">
                          </div>
                          <div className="Script-Placeholder p-line">
                          </div>
                          <div className="Script-Placeholder p-line">
                          </div>
                        </div>


                        <p>This is actual text that will be read</p>

                      </div>
                  </div>
                  <div className="Script-Right">
                    <div className="Script-Right-Button-Box">
                      <p className="Script-Right-Label">Dark</p>
                      <label className="switch">
                        <input type="checkbox" onClick={(e) => this.onLightMode(e) } checked={this.state.checked}/>
                        <span className="slider round"></span>
                      </label>
                    </div>
                    <div className="Script-Right-Button-Box">
                    </div>
                    <div className="Script-Right-Spacer">
                    </div>
                    <div className="Script-Right-Button-Box">
                      <a href="#" className="Script-Right-Button" style={{fontSize:12}} >
                        Export to PDF
                      </a>
                    </div>
                    <div className="Script-Right-Button-Box">
                        <a href="#" className="Script-Right-Button Primary">
                          Save
                        </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <script src="src/client.js">
          </script>
      </div>
    );
  }
}

export default App;
