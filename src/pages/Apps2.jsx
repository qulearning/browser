import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Gms = () => {
	const nav = useNavigate();
	useEffect(() => nav('/materials'), [nav]);
	return null;
};

export default Gms;
