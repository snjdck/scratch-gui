

import React from 'react';
import ReactDOM from 'react-dom';

import AppStateHOC from './lib/app-state-hoc.jsx';
import GUI from './containers/gui.jsx';
import ProjectLoaderHOC from './lib/project-loader-hoc.jsx';

import styles from './index.css';

if(!localStorage.language){
	localStorage.language = "en";
}

switch(localStorage.language){
	case "zh-cn":
		require("./language/zh-hans");
		break;
	default:
		require("./language/en");
}

const App = AppStateHOC(ProjectLoaderHOC(GUI));

const appTarget = document.createElement('div');
appTarget.className = styles.app;
document.body.appendChild(appTarget);

ReactDOM.render(<App />, appTarget);
