function fireKey(el, val)
{
    var key = val;
    if(document.createEventObject)
    {
        var eventObj = document.createEventObject();
        eventObj.keyCode = key;
        el.fireEvent('onkeydown', eventObj);
    }
    else if(document.createEvent)
    {
        var eventObj = document.createEvent('Events');
        eventObj.initEvent('keydown', true, true);
        eventObj.which = key;
        el.dispatchEvent(eventObj);
    }
}
var fire = function(key) {
  fireKey(element, key);
}
var id_interval = null;
var savedGameState = null;
var keys = [];
var element = document.getElementsByClassName('container')[0];
var index = 0;
var match = {
  up:     38,
  right:  39,
  down:   40,
  left:   37,
  reverse: {
    38:   'up',
    39:   'right',
    40:   'down',
    37:   'left',
  }
};



var biggestHorizontalTweenValue = function(currentGameState) {
  var tab = JSON.parse(currentGameState).grid.cells;
  var x = 0;
  var y = 0;
  var tween = 0;
  while (x < 3)
  {
    y = 0;
    while (y < 4)
    {
      if  ((tab[x][y] != null) && (tab[x+1][y] != null) &&
          (tab[x][y].value == tab[x+1][y].value) &&
          tab[x][y].value > tween)
        tween = tab[x][y].value
      ++y;
    }
    ++x;
  }
  return tween;
}
var biggestVerticalTweenValue = function(currentGameState) {
  var tab = JSON.parse(currentGameState).grid.cells;
  var x = 0;
  var y = 0;
  var tween = 0;
  while (x < 4)
  {
    y = 0;
    while (y < 3)
    {
      if  ((tab[x][y] != null) && (tab[x][y+1] != null) &&
          (tab[x][y].value == tab[x][y+1].value) &&
          tab[x][y].value > tween)
        tween = tab[x][y].value
      ++y;
    }
    ++x;
  }
  return tween;
}

var sequence = [
'down', 'left', 'down', 'right'
];
var askKey = function()
{
  var currentGameState = window.localStorage.gameState;
  var key = match[sequence[index % sequence.length]]; // same key than last time
  if (!(currentGameState != savedGameState)) // if is the same
  {
    ++index;
    key = match[sequence[index % sequence.length]]
  }
  // checking for some better move
  var h_tween = biggestHorizontalTweenValue(currentGameState);
  var v_tween = biggestVerticalTweenValue(currentGameState);
  if ((h_tween > v_tween) &&
      (key != match.left) && (key != match.right)
      )
  {
    key = match.right;
  }
  else if ((v_tween >= h_tween) && (v_tween > 0))
  {
    key = match.down;
  }
  keys.push(key);
  savedGameState = window.localStorage.gameState;
}





var pushKey = function() {
  askKey();
  fire(keys.pop());
}
id_interval = setInterval(pushKey, 250);



//clearInterval(id_interval);


//eval(atob("ZnVuY3Rpb24gZmlyZUtleShlbCwgdmFsKQ0Kew0KICAgIHZhciBrZXkgPSB2YWw7DQogICAgaWYoZG9jdW1lbnQuY3JlYXRlRXZlbnRPYmplY3QpDQogICAgew0KICAgICAgICB2YXIgZXZlbnRPYmogPSBkb2N1bWVudC5jcmVhdGVFdmVudE9iamVjdCgpOw0KICAgICAgICBldmVudE9iai5rZXlDb2RlID0ga2V5Ow0KICAgICAgICBlbC5maXJlRXZlbnQoJ29ua2V5ZG93bicsIGV2ZW50T2JqKTsNCiAgICB9DQogICAgZWxzZSBpZihkb2N1bWVudC5jcmVhdGVFdmVudCkNCiAgICB7DQogICAgICAgIHZhciBldmVudE9iaiA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudHMnKTsNCiAgICAgICAgZXZlbnRPYmouaW5pdEV2ZW50KCdrZXlkb3duJywgdHJ1ZSwgdHJ1ZSk7DQogICAgICAgIGV2ZW50T2JqLndoaWNoID0ga2V5Ow0KICAgICAgICBlbC5kaXNwYXRjaEV2ZW50KGV2ZW50T2JqKTsNCiAgICB9DQp9DQp2YXIgZmlyZSA9IGZ1bmN0aW9uKGtleSkgew0KICBmaXJlS2V5KGVsZW1lbnQsIGtleSk7DQp9DQp2YXIgaWRfaW50ZXJ2YWwgPSBudWxsOw0KdmFyIHNhdmVkR2FtZVN0YXRlID0gbnVsbDsNCnZhciBrZXlzID0gW107DQp2YXIgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NvbnRhaW5lcicpWzBdOw0KdmFyIGluZGV4ID0gMDsNCnZhciBtYXRjaCA9IHsNCiAgdXA6ICAgICAzOCwNCiAgcmlnaHQ6ICAzOSwNCiAgZG93bjogICA0MCwNCiAgbGVmdDogICAzNywNCiAgcmV2ZXJzZTogew0KICAgIDM4OiAgICd1cCcsDQogICAgMzk6ICAgJ3JpZ2h0JywNCiAgICA0MDogICAnZG93bicsDQogICAgMzc6ICAgJ2xlZnQnLA0KICB9DQp9Ow0KDQoNCg0KdmFyIGJpZ2dlc3RIb3Jpem9udGFsVHdlZW5WYWx1ZSA9IGZ1bmN0aW9uKGN1cnJlbnRHYW1lU3RhdGUpIHsNCiAgdmFyIHRhYiA9IEpTT04ucGFyc2UoY3VycmVudEdhbWVTdGF0ZSkuZ3JpZC5jZWxsczsNCiAgdmFyIHggPSAwOw0KICB2YXIgeSA9IDA7DQogIHZhciB0d2VlbiA9IDA7DQogIHdoaWxlICh4IDwgMykNCiAgew0KICAgIHkgPSAwOw0KICAgIHdoaWxlICh5IDwgNCkNCiAgICB7DQogICAgICBpZiAgKCh0YWJbeF1beV0gIT0gbnVsbCkgJiYgKHRhYlt4KzFdW3ldICE9IG51bGwpICYmDQogICAgICAgICAgKHRhYlt4XVt5XS52YWx1ZSA9PSB0YWJbeCsxXVt5XS52YWx1ZSkgJiYNCiAgICAgICAgICB0YWJbeF1beV0udmFsdWUgPiB0d2VlbikNCiAgICAgICAgdHdlZW4gPSB0YWJbeF1beV0udmFsdWUNCiAgICAgICsreTsNCiAgICB9DQogICAgKyt4Ow0KICB9DQogIHJldHVybiB0d2VlbjsNCn0NCnZhciBiaWdnZXN0VmVydGljYWxUd2VlblZhbHVlID0gZnVuY3Rpb24oY3VycmVudEdhbWVTdGF0ZSkgew0KICB2YXIgdGFiID0gSlNPTi5wYXJzZShjdXJyZW50R2FtZVN0YXRlKS5ncmlkLmNlbGxzOw0KICB2YXIgeCA9IDA7DQogIHZhciB5ID0gMDsNCiAgdmFyIHR3ZWVuID0gMDsNCiAgd2hpbGUgKHggPCA0KQ0KICB7DQogICAgeSA9IDA7DQogICAgd2hpbGUgKHkgPCAzKQ0KICAgIHsNCiAgICAgIGlmICAoKHRhYlt4XVt5XSAhPSBudWxsKSAmJiAodGFiW3hdW3krMV0gIT0gbnVsbCkgJiYNCiAgICAgICAgICAodGFiW3hdW3ldLnZhbHVlID09IHRhYlt4XVt5KzFdLnZhbHVlKSAmJg0KICAgICAgICAgIHRhYlt4XVt5XS52YWx1ZSA+IHR3ZWVuKQ0KICAgICAgICB0d2VlbiA9IHRhYlt4XVt5XS52YWx1ZQ0KICAgICAgKyt5Ow0KICAgIH0NCiAgICArK3g7DQogIH0NCiAgcmV0dXJuIHR3ZWVuOw0KfQ0KDQp2YXIgc2VxdWVuY2UgPSBbDQonZG93bicsICdsZWZ0JywgJ2Rvd24nLCAncmlnaHQnDQpdOw0KdmFyIGFza0tleSA9IGZ1bmN0aW9uKCkNCnsNCiAgdmFyIGN1cnJlbnRHYW1lU3RhdGUgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdhbWVTdGF0ZTsNCiAgdmFyIGtleSA9IG1hdGNoW3NlcXVlbmNlW2luZGV4ICUgc2VxdWVuY2UubGVuZ3RoXV07IC8vIHNhbWUga2V5IHRoYW4gbGFzdCB0aW1lDQogIGlmICghKGN1cnJlbnRHYW1lU3RhdGUgIT0gc2F2ZWRHYW1lU3RhdGUpKSAvLyBpZiBpcyB0aGUgc2FtZQ0KICB7DQogICAgKytpbmRleDsNCiAgICBrZXkgPSBtYXRjaFtzZXF1ZW5jZVtpbmRleCAlIHNlcXVlbmNlLmxlbmd0aF1dDQogIH0NCiAgLy8gY2hlY2tpbmcgZm9yIHNvbWUgYmV0dGVyIG1vdmUNCiAgdmFyIGhfdHdlZW4gPSBiaWdnZXN0SG9yaXpvbnRhbFR3ZWVuVmFsdWUoY3VycmVudEdhbWVTdGF0ZSk7DQogIHZhciB2X3R3ZWVuID0gYmlnZ2VzdFZlcnRpY2FsVHdlZW5WYWx1ZShjdXJyZW50R2FtZVN0YXRlKTsNCiAgaWYgKChoX3R3ZWVuID4gdl90d2VlbikgJiYNCiAgICAgIChrZXkgIT0gbWF0Y2gubGVmdCkgJiYgKGtleSAhPSBtYXRjaC5yaWdodCkNCiAgICAgICkNCiAgew0KICAgIGtleSA9IG1hdGNoLnJpZ2h0Ow0KICB9DQogIGVsc2UgaWYgKCh2X3R3ZWVuID49IGhfdHdlZW4pICYmICh2X3R3ZWVuID4gMCkpDQogIHsNCiAgICBrZXkgPSBtYXRjaC5kb3duOw0KICB9DQogIGtleXMucHVzaChrZXkpOw0KICBzYXZlZEdhbWVTdGF0ZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2FtZVN0YXRlOw0KfQ0KDQoNCg0KDQoNCnZhciBwdXNoS2V5ID0gZnVuY3Rpb24oKSB7DQogIGFza0tleSgpOw0KICBmaXJlKGtleXMucG9wKCkpOw0KfQ=="));
//id_interval = setInterval(pushKey, 80);

