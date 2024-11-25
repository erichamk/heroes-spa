import { screen } from '@testing-library/dom';
import { PrivateRoute } from '../../src/router/PrivateRoute';
import { render } from '@testing-library/react';
import { AuthContext } from '../../src/auth';
import { MemoryRouter } from 'react-router-dom';

test('debe de mostrar el children si está auth', () => {
	Storage.prototype.setItem = jest.fn();

	const contextVal = {
		logged: true,
		user: {
			id: 1,
			name: 'test',
		},
	};

	render(
		<AuthContext.Provider value={contextVal}>
			<MemoryRouter initialEntries={['/marvel']}>
				<PrivateRoute>
					<h1>children</h1>
				</PrivateRoute>
			</MemoryRouter>
		</AuthContext.Provider>
	);
	expect(screen.getByText('children'));
	expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/marvel');
});
