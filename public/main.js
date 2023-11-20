// USE WITH FIREBASE AUTH
// import ViewDirectorBasedOnUserAuthStatus from '../utils/viewDirector';
import 'bootstrap'; // import bootstrap elements and js
import '../styles/main.scss';
// import { render } from 'sass';

const init = () => {
  const punchLineBody = document.getElementById('punchLineBody');
  const jokeBody = document.getElementById('jokeBody');
  const jokeButton = document.getElementById('jokeLol');

  let setup = '';
  let punchLine = '';
  let i = 0;

  const endpoint = 'https://v2.jokeapi.dev/joke/pun';
  const getRequest = () => new Promise((resolve, reject) => {
    fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
        setup = data.setup;
        punchLine = data.delivery;
      })
      .catch(reject);
  });

  getRequest();

  const JokeSequence = () => {
    if (i === 1) {
      jokeBody.innerHTML = setup;
      jokeButton.innerHTML = 'Get the Punchline.';
    }
    if (i === 2) {
      punchLineBody.innerHTML = punchLine;
      jokeButton.innerHTML = 'Lol. Hear another one?';
    }
    if (i === 3) {
      i = 0;
      jokeBody.innerHTML = '';
      punchLineBody.innerHTML = '';
      jokeButton.innerHTML = 'Click me to hear a joke';
      getRequest();
    }
  };

  document.getElementById('jokeLol').addEventListener('click', () => {
    if (setup === undefined || null) {
      console.warn('undefined');
      getRequest();
      i = 0;
      jokeButton.innerHTML = 'I dont know if I want to tell you that actually...  Try again...';
    } else {
      i += 1;
      JokeSequence();
    }
  });
};

init();
