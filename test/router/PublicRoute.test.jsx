import { render, screen } from '@testing-library/react';
import { AuthContext } from '../../src/auth/context/AuthContext';
import { PublicRoute } from '../../src/router/PublicRoute';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

test('debe de mostrar el children si no está auth', () => {
	const contextVal = {
		logged: false,
	};

	render(
		<AuthContext.Provider value={contextVal}>
			<PublicRoute>
				<h1>children</h1>
			</PublicRoute>
		</AuthContext.Provider>
	);
	// children de publicroute solo se debe mostrar si no está autenticado
	expect(screen.getByText('children'));
});

test('debe de navegar si está auth', () => {
	const contextVal = {
		logged: true,
		user: {
			id: 1,
			name: 'test',
		},
	};

	render(
		<AuthContext.Provider value={contextVal}>
			{/* para poder usar Navigate */}
			<MemoryRouter initialEntries={['/login']}>
				<Routes>
					{/* se deben crear ambas rutas para simular el caso completo */}
					<Route
						path='/login'
						element={
							<PublicRoute>
								<h1>Página Login</h1>
							</PublicRoute>
						}
					/>
					<Route path='/marvel' element={<h1>Página Marvel</h1>} />
				</Routes>
			</MemoryRouter>
		</AuthContext.Provider>
	);

	expect(screen.getByText('Página Marvel'));
});
