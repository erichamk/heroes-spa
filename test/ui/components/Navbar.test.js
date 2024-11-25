import { fireEvent, render, screen } from '@testing-library/react';
import { Navbar } from '../../../src/ui';
import { AuthContext } from '../../../src/auth';
import { MemoryRouter, useNavigate } from 'react-router-dom';

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockUseNavigate,
}));

beforeEach(() => jest.clearAllMocks());

const contextVal = {
	logged: true,
	user: {
		id: 1,
		name: 'test',
	},
	logout: jest.fn(),
};

test('debe de mostrar el nombre de usuario logueado', () => {
	render(
		<AuthContext.Provider value={contextVal}>
			<MemoryRouter initialEntries={['/marvel']}>
				<Navbar />
			</MemoryRouter>
		</AuthContext.Provider>
	);
	expect(screen.getByText(contextVal.user.name));
});

test('debe llamar logout y navigate al hacer click en el button', () => {
	render(
		<AuthContext.Provider value={contextVal}>
			<MemoryRouter initialEntries={['/marvel']}>
				<Navbar />
			</MemoryRouter>
		</AuthContext.Provider>
	);

	const logoutButton = screen.getByRole('button', { name: 'Logout' });

	fireEvent.click(logoutButton);

	expect(contextVal.logout).toHaveBeenCalled();
	expect(mockUseNavigate).toHaveBeenCalledWith('/login', { replace: true });
});
