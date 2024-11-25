import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../src/auth';
import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import { AppRouter } from '../../src/router/AppRouter';

test('debe de mostrar el login si no esta auth', () => {
	const contextVal = {
		logged: false,
	};

	render(
		<AuthContext.Provider value={contextVal}>
			<MemoryRouter initialEntries={['/marvel']}>
				<AppRouter />
			</MemoryRouter>
		</AuthContext.Provider>
	);
	expect(screen.getAllByText('Login').length).toBeGreaterThan(0);
});

test('debe de mostrar Marvel si esta auth', () => {
	const contextVal = {
		logged: true,
		user: {
			id: 1,
			name: 'test',
		},
	};

	render(
		<AuthContext.Provider value={contextVal}>
			<MemoryRouter initialEntries={['/login']}>
				<AppRouter />
			</MemoryRouter>
		</AuthContext.Provider>
	);
	expect(screen.getAllByText('Marvel').length).toBeGreaterThan(0);
});
