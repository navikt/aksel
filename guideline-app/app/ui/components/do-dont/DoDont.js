import React from 'react';
import Example from '../example/Example';

import './styles.less';

export const DoDont = (props) => (
	<div className="dodont">
		{props.children}
	</div>
);

export const Do = (props) => (
	<div className="dodont__do">
		<Example>
			{props.children}
		</Example>
		<div className="dodont__label">
			Gjør dette
		</div>
	</div>
);

export const Dont = (props) => (
	<div className="dodont__dont">
		<Example>
			{props.children}
		</Example>
		<div className="dodont__label">
			Ikke gjør dette
		</div>
	</div>
);