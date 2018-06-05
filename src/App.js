import React, { Component } from 'react';
import { BrowserRouter as Router, HashRouter, Route, Link, Redirect } from "react-router-dom";
import * as qs from 'query-string';
import './App.css';
import './scripto.css';

var scripto = require('./lib/scriptosenso');
const fs = window.require('fs');


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked:true,
      file:null,
    }
  }
  onLightMode(e) {
    console.warn(e.currentTarget.checked);
    this.setState({checked:e.currentTarget.checked})
  }

  componentWillMount() {
    if (qs.parse(this.props.location.search)) {
      var file = qs.parse(this.props.location.search).file;
      this.setState({file:file})
    } else {
      console.log("no file");
    }

  }

  async componentDidMount(e) {
    var scobj = new scripto.Scripto();
    const self = this;

    if (this.state.file) {
      if (this.state.file=="filename") {
        var file = "/Users/markspurgeon/Desktop/scripto-file/examples/createdFile.scripto"
      } else {
        var file = this.state.file
      }
      console.log('found file');

      fs.readFile(file, function read(err, data) {
        if (err) {
            throw err;
        }
        var dat = scobj.loadData(data);
        var scrd = scobj.getScript();
        console.log(dat, scrd);
        self.setState({scripto:scobj, scriptData:scrd})
      });
    }

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

    if (this.state.scripto) {
      console.log(this.state.scriptData);
      var scriptContent = this.state.scriptData.map((item) => {
        if (item.type=="§T"){
          return (
            <p className="scripto t">{item.content}</p>
          )
        } else if (item.type=="§ST"){
          return (
            <p className="scripto st">{item.content}</p>
          )
        } else if (item.type=="§C"){
          return (
            <p className="scripto c">{item.content}</p>
          )
        }
        else if (item.type=="§CA"){
          return (
            <p className="scripto ca">{item.content}</p>
          )
        } else if (item.type=="§A"){
          return (
            <p className="scripto a">{item.content}</p>
          )
        } else if (item.type=="§S"){
          return (
            <p className="scripto s">{item.content}</p>
          )
        } else if (item.type=="§D"){
          return (
            <p className="scripto d">{item.content}</p>
          )
        } else {
          return (
            <p className="scripto p">{item.content}</p>
          )
        }

      });
    } else {
      var scriptContent = null;
    }
    return (

      <div className="App" >
          <header className="App-header" style={{backgroundColor:headerColor, borderColor:borderColor}}>
            <div className="Layout-flex">
              <div className="Layout-left" style={{borderColor:borderColor}}></div>
              <div className="Layout-main">
                <p className="App-title">Scripto {this.state.file}</p>
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
                        {scriptContent}
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
                        <input type="checkbox" onChange={(e) => this.onLightMode(e) } checked={this.state.checked}/>
                        <span className="slider round"></span>
                      </label>
                    </div>
                    <div className="Script-Right-Button-Box">
                    </div>
                    <div className="Script-Right-Spacer">
                    </div>
                    <div className="Script-Right-Button-Box">
                      <a href="#" className="Script-Right-Button">
                        Export to PDF
                      </a>
                    </div>
                    <div className="Script-Right-Button-Box">
                        <a href="#" className="Script-Right-Button Primary">
                          save script
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

const App = () => (
  <HashRouter>
    <div>
      <ul>
        <li>
          <Link to="/?file=0">Home</Link>
        </li>
      </ul>

      <hr />
      <Route path="/" component={Main} />
    </div>
  </HashRouter>
);

export default App;
