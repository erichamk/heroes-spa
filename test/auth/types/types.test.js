import { types } from '../../../src/auth/types/types';

test('debe de regresar estos types', () => {
	expect(types).toEqual({
		login: '[Auth] Login',
		logout: '[Auth] Logout',
	});
});
