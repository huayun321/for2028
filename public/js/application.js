// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {

  var winScore = {
    's8' : 'p83Xcs0a56gO1RtcAthkn9wC68tg',
    's16' : 'p83Xcs5WNCIJxXiA7DuWEi69Pcbg',
    's32' : 'p83Xcs1tZsj4sWncRvvSlUCYctNA',
    's1024': 'p83Xcs0TuD-sZebI1cgOQSzhtS_Q',
    's2048': 'p83Xcs9Qv86hPvVsCdr0nIc52r_Y'
  }

  new GameManager(winScore, 4, KeyboardInputManager, HTMLActuator, LocalStorageManager);
});
