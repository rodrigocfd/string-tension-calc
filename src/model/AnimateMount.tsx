import {cloneElement, Children, ReactElement, ReactNode, useEffect, useState} from 'react';

interface Props {
	children: ReactNode;
	clsTrans: string;
}

export default function AnimateMount(props: Props) {
	const [dynCls, setDynCls] = useState('');

	useEffect(() => {
		setDynCls(' ' + props.clsTrans);
	}, []);

	return Children.map(props.children, child => {
		const elem = child as ReactElement<any>;
		const origCls = elem.props.className || '';
		return cloneElement(elem, {className: origCls + dynCls});
	});
}
