import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './component/App.tsx';

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
