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
    this._onScriptUpdate = this._onScriptUpdate.bind(this);
    this._saveScript = this._saveScript.bind(this)

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
      fs.readFile(this.state.file, function read(err, data) {
        if (err) {
            throw err;
        }
        var dat = scobj.loadData(data);
        var scrd = scobj.getScript();
        self.setState({scripto:scobj, scriptData:scrd})
      });
    }

  }

  _onScriptUpdate(e,item) {
    var newitem = item;
    newitem.content = e.target.value;
    this.state.scripto.updateScriptItem(newitem);
    this.setState({scriptData:this.state.scripto.getScript()});
  }
  _saveScript() {
    var sc = this.state.scripto.getStringData();
    fs.writeFile(this.state.file, sc, function(err){
      if (err) {
        return console.log(err);
      }
    });
    console.log('saved');
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
      var scriptContent = this.state.scriptData.map((item) => {
        if (item.type=="§T"){
          return (
            <input className="scripto input t" type="text" name="Title" value={item.content} key={item.id} onChange={(e)=>this._onScriptUpdate(e, item)}></input>
          )
        } else if (item.type=="§ST"){
          return (
            <input className="scripto input st" type="text" name="Subtitle" value={item.content} key={item.id} onChange={(e)=>this._onScriptUpdate(e, item)}></input>
          )
        } else if (item.type=="§C"){
          return (
            <input className="scripto input c" type="text" name="Character" value={item.content} key={item.id} onChange={(e)=>this._onScriptUpdate(e, item)}></input>
          )
        }
        else if (item.type=="§CA"){
          return (
            <input className="scripto input ca" type="text" name="Character Action" value={item.content} key={item.id} onChange={(e)=>this._onScriptUpdate(e, item)}></input>
          )
        } else if (item.type=="§A"){
          return (
            <input className="scripto input a" type="text" name="Act" value={item.content} key={item.id} onChange={(e)=>this._onScriptUpdate(e, item)}></input>
          )
        } else if (item.type=="§S"){
          return (
            <input className="scripto input s" type="text" name="Scene" value={item.content} key={item.id} onChange={(e)=>this._onScriptUpdate(e, item)}></input>
          )
        } else if (item.type=="§D"){
          return (
            <input className="scripto input d" type="text" name="Dialogue" value={item.content} key={item.id} onChange={(e)=>this._onScriptUpdate(e, item)}></input>
          )
        } else {
          return (
            <textarea className="scripto input p" type="text" name="Paragraph" value={item.content} key={item.id} onChange={(e)=>this._onScriptUpdate(e, item)}></textarea>
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

                        {
                          !scriptContent &&

                          <div>
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
                          </div>

                        }
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
                        <a href="#" className="Script-Right-Button Primary" onClick={()=>this._saveScript()}>
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
