import { MemoryRouter } from 'react-router-dom';
import { SearchPage } from '../../../src/heroes';
import { fireEvent, render, screen } from '@testing-library/react';
const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockUseNavigate,
}));

beforeEach(() => jest.clearAllMocks());

test('debe de mostrarse correctamente con valores por defecto', () => {
	const container = render(
		<MemoryRouter>
			<SearchPage />
		</MemoryRouter>
	);
	expect(container).toMatchSnapshot();
});

test('debe de mostrar a Batman y el input con el valor del queryString', () => {
	render(
		<MemoryRouter initialEntries={['/search?q=batman']}>
			<SearchPage />
		</MemoryRouter>
	);
	const input = screen.getByRole('textbox');
	expect(input.value).toBe('batman');

	const img = screen.getByRole('img');
	expect(img.src).toContain('/assets/heroes/dc-batman.jpg');

	const showSearchDiv = screen.getByLabelText('showSearch-div');
	expect(showSearchDiv.style.display).toBe('none');
});

test('debe mostrar un error si no se encuentra el hero (batman123)', () => {
	render(
		<MemoryRouter initialEntries={['/search?q=batman123']}>
			<SearchPage />
		</MemoryRouter>
	);

	const showErrorDiv = screen.getByLabelText('showError-div');
	expect(showErrorDiv.style.display).toBe('');
});

test('debe de llamar el navigate a la pantalla nueva', () => {
	render(
		<MemoryRouter initialEntries={['/search']}>
			<SearchPage />
		</MemoryRouter>
	);
	const searchText = 'batman';
	const input = screen.getByRole('textbox');
	//para textbox que usa useForm debe llevar name y value
	fireEvent.input(input, {
		target: { name: 'searchText', value: searchText },
	});

	const form = screen.getByRole('form');
	fireEvent.submit(form);

	expect(mockUseNavigate).toHaveBeenCalledWith(
		`?q=${searchText.toLowerCase().trim()}`
	);
});
