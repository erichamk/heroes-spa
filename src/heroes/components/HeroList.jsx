import { useMemo } from 'react';
import { getHeroesByPublisher } from '../helpers';
import { HeroCard } from './HeroCard';

export const HeroList = ({ publisher }) => {
	// para memorizar heroes y no ejecutar getHeroesByPublisher en caso de redibujar este component.
	// por ejemplo si hubiera un useState
	const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher]);

	return (
		<div className='row row-cols-1 row-cols-md-3 g-3'>
			{heroes.map((heroe) => {
				return <HeroCard key={heroe.id} {...heroe} />;
			})}
		</div>
	);
};
