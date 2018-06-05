


var dataSkeleton = {
  filetype: {
    version:"0.0.2",
    url:"https://github.com/the-duck/scripto/"
  },
  meta: {
    title:"",
    synopsis:"",
    authors:"",
    address:"",
    copyright:""
  },
  global: {
    characters:[],
    locations:[]
  },
  script: []
}

function formatData(stringData) {
  // TODO checking and stuff
  return JSON.parse(stringData);
}
function dataToString(data) {
  // TODO impose new file version, convert and stuff
  var newdata = data ;
  newdata.filetype = dataSkeleton.filetype;
  newdata.file = null;
  return JSON.stringify(newdata, null, 2);
}

function getScriptObjects(scriptArray) {
  var ScriptData = [];
  var lastObjectType = "";
  for (var i = 0; i < scriptArray.length; i++) {
    var scriptLine = scriptArray[i];
    var type = RegExp('§[a-zA-Z]+ ').exec(scriptLine);
    if (type) {
      var linenotype = scriptLine.replace(type[0], "");
      var extraData = RegExp('\{(.*?)\}').exec(linenotype);
      if (extraData) {
        try {
          var sFixed = extraData[0].replace(new RegExp("'", 'g'),"\"") //'{"identifier":"ID", "label":"LABEL"}'
          var extra = JSON.parse(sFixed)
        } catch (e) {
          console.error(e);
        }
        var scriptValue = linenotype.replace(extraData[0], "");
      } else {
        var extra = null;
        var scriptValue = linenotype;
      }

      ScriptData.push({type:type[0].trim(), content:scriptValue, extra: extra || null, id:i})
    }
    //var lineData = scriptLine.replace(type, "");
  }

  return ScriptData;

}

function Scripto() {
  var data = dataSkeleton;
  /* Input and output */
  this.loadData = function(stringData) {
    this.data = formatData(stringData);
  };
  this.getStringData = function () {
    //TODO update this.data.script
    return dataToString(this.data)
  };

  /* Get functions */
  this.getWholeData = function() {return this.data}
  this.getMetaData = function () {return data.meta};
  this.getGlobalData = function () {return this.data.global;};
  this.getScriptRaw = function () {return this.data.script;};
  this.getScript = function () {return getScriptObjects(this.data.script)}

  /* Set functions*/
  this.setMetaData = function () {
    //TODO update this.data.meta
    return this.data.meta
  };
  this.setGlobalData = function () {
    //TODO update this.data.global
    return this.data.global
  };
  // unrecommended --> dangerous to add all
  this.setScript = function () {
    //TODO
    return getScriptObjects(this.data.script)
  }
  this.addScriptItem = function(position, item) {
    // position : id of the item that is placed __before__ the new item
    // TODO: add an item
  }
}
/*Scripto.prototype.getScript = function () {
  var d = this.data;
  var sc = getScriptObjects(d);
  return sc;
}*/

module.exports = {
  Scripto: Scripto
}
