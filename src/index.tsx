import React from 'react';
import ReactDOM from 'react-dom';
import GameEngine from './components/game-engine/GameEngine';
import './index.css';

ReactDOM.render(
	<React.StrictMode>
		<GameEngine />
	</React.StrictMode>,
	document.getElementById('root')
);
