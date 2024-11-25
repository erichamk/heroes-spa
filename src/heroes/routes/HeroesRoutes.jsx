import React from 'react';
import { Navbar } from '../../ui';
import { Navigate, Route, Routes } from 'react-router-dom';
import { DCPage, HeroPage, MarvelPage, SearchPage } from '../pages';

export const HeroesRoutes = () => {
	return (
		<>
			<Navbar />

			<Routes>
				<Route path='marvel' element={<MarvelPage />} />
				<Route path='dc' element={<DCPage />} />
				<Route path='search' element={<SearchPage />} />
				<Route path='hero/:id' element={<HeroPage />} />

				<Route path='/' element={<Navigate to='marvel' />} />
			</Routes>
		</>
	);
};
