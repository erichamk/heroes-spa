import React from 'react';
import { HeroCard } from '../components/HeroCard';
import { useForm } from '../../hooks/useForm';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { getHeroByName } from '../helpers';

export const SearchPage = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const { q = '' } = queryString.parse(location.search);

	const { searchText, onInputChange } = useForm({
		searchText: q,
	});

	const heroes = getHeroByName(q);

	const showSearch = q === '';
	const showError = q !== '' && heroes.length === 0;

	const onSearchSubmit = (event) => {
		event.preventDefault();
		if (searchText.trim().length <= -1) return;

		navigate(`?q=${searchText.toLowerCase().trim()}`);
	};
	return (
		<>
			<h1>Search</h1>
			<hr />
			<div className='row'>
				<div className='col-5'>
					<h4>Searching</h4>
					<form onSubmit={onSearchSubmit} aria-label='form'>
						<input
							type='text'
							placeholder='Search a hero'
							className='form-control'
							name='searchText'
							autoComplete='off'
							value={searchText}
							onChange={onInputChange}
						/>
						<button className='btn btn-outline-primary mt-1'>
							Search
						</button>
					</form>
				</div>

				<div className='col-7'>
					<h4>Results</h4>
					<hr />

					{/* {q === '' ? (
						<div className='alert alert-primary'>Search a hero</div>
					) : (
						heroes.length === 0 && (
							<div className='alert alert-danger'>
								No hero with <b>'{q}'</b>
							</div>
						)
					)} */}
					<div
						aria-label='showSearch-div'
						className='alert alert-primary'
						style={{ display: showSearch ? '' : 'none' }}
					>
						Search a hero
					</div>
					<div
						aria-label='showError-div'
						className='alert alert-danger'
						style={{ display: showError ? '' : 'none' }}
					>
						No hero with <b>'{q}'</b>
					</div>
					{heroes.map((hero) => (
						<HeroCard key={hero.id} {...hero} />
					))}
				</div>
			</div>
		</>
	);
};
