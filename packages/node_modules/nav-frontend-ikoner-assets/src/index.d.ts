declare module 'nav-frontend-ikoner-assets' {
	import * as React from 'react';

	export type icons =
		| 'advarsel-sirkel'
		| 'advarsel-trekant'
		| 'advarsel-trekant-fylt'
		| 'alarm'
		| 'alarm-ny'
		| 'arbeidsgiver'
		| 'feil-sirkel-fylt'
		| 'help-circle'
		| 'help-circle_hover'
		| 'info-sirkel'
		| 'info-sirkel-fylt'
		| 'info-sirkel-orange'
		| 'kalender'
		| 'minus'
		| 'nav-ansatt'
		| 'ok-sirkel'
		| 'ok-sirkel-fylt'
		| 'spinner'
		| 'spinner-negativ'
		| 'spinner-stroke'
		| 'spinner-stroke-negativ'
		| 'stegindikator__hake'
		| 'stonad'
		| 'tilsette'
		| 'trashcan'
		| 'vedlegg';

	export interface IconProps {
		kind: icons;
		hight?: number;
		width?: number;
		size?: string | number;
		className?: string;
	}

	const t: new (props: IconProps) => React.Component<IconProps, any>;
	export default t;
}
