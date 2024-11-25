import { heroes } from '../data/heroes';

export const getHeroByName = (name = '') => {
	console.log('getHeroByName');
	if (name.length === 0) return [];

	name = name.toLocaleLowerCase().trim();

	return heroes.filter((heroe) =>
		heroe.superhero.toLocaleLowerCase().includes(name)
	);
};
