var _initIndexObjByLevel = function(level) {
  for (var key in _indexObj) {
    if (parseInt(/\d/.exec(key)) > level) {
      _indexObj[key] = {
        index: -1,
        tagLevel: 7
      };
    }
  }
}

var _indexObj = {},
  _childNodes = [];

module.exports = {
  initChildNodes: function(childNodes) {
    _childNodes = [];
  },
  initIndexObj: function(indexObj) {
    _indexObj = {
      _level1: { index: -1, tagLevel: 7 },
      _level2: { index: -1, tagLevel: 7 },
      _level3: { index: -1, tagLevel: 7 },
      _level4: { index: -1, tagLevel: 7 },
      _level5: { index: -1, tagLevel: 7 },
      _level6: { index: -1, tagLevel: 7 }
    };
  },
  getChildNodes: function() {
    return _childNodes;
  },
  insertNode: function(currentNode, currentNodeTagLevel) {
    for (var key in _indexObj) {
      if (_indexObj[key].tagLevel >= currentNodeTagLevel) {
        switch (key) {
          case '_level1':
            _childNodes.push(currentNode);
            _indexObj._level1.index = _childNodes.length - 1;
            _indexObj._level1.tagLevel = currentNodeTagLevel;
            _initIndexObjByLevel(1);
            break;
          case '_level2':
            _childNodes[_indexObj._level1.index].nodes.push(currentNode);
            _indexObj._level2.index = _childNodes[_indexObj._level1.index].nodes.length - 1;
            _indexObj._level2.tagLevel = currentNodeTagLevel;
            _initIndexObjByLevel(2);
            break;
          case '_level3':
            _childNodes[_indexObj._level1.index].nodes[_indexObj._level2.index].nodes.push(currentNode);
            _indexObj._level3.index = _childNodes[_indexObj._level1.index].nodes[_indexObj._level2.index].nodes.length - 1;
            _indexObj._level3.tagLevel = currentNodeTagLevel;
            _initIndexObjByLevel(3);
            break;
          case '_level4':
            _childNodes[_indexObj._level1.index].nodes[_indexObj._level2.index].nodes[_indexObj._level3.index].nodes.push(currentNode);
            _indexObj._level4.index = _childNodes[_indexObj._level1.index].nodes[_indexObj._level2.index].nodes[_indexObj._level3.index].nodes.length - 1;
            _indexObj._level4.tagLevel = currentNodeTagLevel;
            _initIndexObjByLevel(4);
            break;
          case '_level5':
            _childNodes[_indexObj._level1.index].nodes[_indexObj._level2.index].nodes[_indexObj._level3.index].nodes[_indexObj._level4.index].nodes.push(currentNode);
            _indexObj._level5.index = _childNodes[_indexObj._level1.index].nodes[_indexObj._level2.index].nodes[_indexObj._level3.index].nodes[_indexObj._level4.index].nodes.length - 1;
            _indexObj._level5.tagLevel = currentNodeTagLevel;
            _initIndexObjByLevel(5);
            break;
          case '_level6':
            _childNodes[_indexObj._level1.index].nodes[_indexObj._level2.index].nodes[_indexObj._level3.index].nodes[_indexObj._level4.index].nodes[_indexObj._level5.index].nodes.push(currentNode);
            _indexObj._level6.index = _childNodes[_indexObj._level1.index].nodes[_indexObj._level2.index].nodes[_indexObj._level3.index].nodes[_indexObj._level4.index].nodes[_indexObj._level5.index].nodes.length - 1;
            _indexObj._level6.tagLevel = currentNodeTagLevel;
            _initIndexObjByLevel(6);
            break;
        }
        break;
      }
    }
  },
  scrollMethod: function(ele) {
    return function() {
      // scroll function
      var targetScroll = document.getElementById(ele.id).offsetTop;
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      var bFirefox = !!document.documentElement.scrollTop && document.documentElement.scrollTop != document.body.scrollTop;
      var scrollPerTime = Math.abs(currentScroll - targetScroll) / 50;
      var tryCount = 0;
      console.log(bFirefox)
      var scrollInterval = setInterval(function() {
        if ((!bFirefox && Math.abs(document.body.scrollTop - targetScroll) > scrollPerTime) || (bFirefox && Math.abs(document.documentElement.scrollTop - targetScroll) > scrollPerTime)) {
          if (currentScroll < targetScroll) {
            document.body.scrollTop += scrollPerTime;
            document.documentElement.scrollTop  += scrollPerTime;
          } else {
            document.body.scrollTop -= scrollPerTime;
            document.documentElement.scrollTop  -= scrollPerTime;
          }
          tryCount++;
          if (tryCount === 60) {
            clearInterval(scrollInterval);
          }
        } else {
          document.body.scrollTop = targetScroll;
          document.documentElement.scrollTop  = targetScroll;
          clearInterval(scrollInterval);
        }
      }, 2);
    }
  }
};
