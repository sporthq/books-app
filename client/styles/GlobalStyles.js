import { createGlobalStyle } from 'styled-components';

const styled = { createGlobalStyle };
const GlobalStyles = styled.createGlobalStyle`
	:root {
		--primary-100: #d4eaf7;
		--primary-200: #b6ccd8;
		--primary-300: #3b3c3d;
		--accent-100: #71c4ef;
		--accent-150: #1a7598;
		--accent-200: #00668c;
		--text-100: #1d1c1c;
		--text-200: #313d44;
		--bg-100: #fffefb;
		--bg-200: #f5f4f1;
		--bg-300: #cccbc8;
		--grey-0: #f8f9fa;
		--grey-50: #e5e8eb;
		--grey-300: #dee2e6;
		--grey-600: #868e96;
		--grey-900: #212529;
		--green-600: #37b24d;
		--green-900: #2b8a3e;
		--red-100: #fee2e2;
		--red-700: #b91c1c;
		--red-800: #991b1b;

		--backdrop-color: rgba(0, 0, 0, 0.3);
		// dark
		/*    --primary-100:#1F3A5F;
    --primary-200:#4d648d;
    --primary-300:#acc2ef;
    --accent-100:#3D5A80;
    --accent-200:#cee8ff;
    --text-100:#FFFFFF;
    --text-200:#e0e0e0;
    --bg-100:#0F1C2E;
    --bg-200:#1f2b3e;
    --bg-300:#374357;
       */
		--border-radius-tiny: 3px;
		--border-radius-sm: 5px;
		--border-radius-md: 7px;
		--border-radius-lg: 9px;

		--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
		--shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
		--shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);
	}
	*,
	*::before,
	*::after {
		box-sizing: border-box;
		padding: 0;
		margin: 0;

		/* Creating animations for dark mode */
		transition:
			background-color 0.3s,
			border 0.3s;
	}

	html {
		font-size: 62.5%;
	}

	body {
		font-family: 'Poppins', sans-serif;
		color: var(--color-grey-700);

		transition:
			color 0.3s,
			background-color 0.3s;
		min-height: 100vh;
		max-width: 136rem;
		margin: 0 auto;
		padding: 0 3.2rem;
		line-height: 1.5;
		font-size: 1.6rem;
	}

	@media only screen and (max-width: 100em) {
		body {
			max-width: 120rem;
		}
	}
	// 1200px
	@media only screen and (max-width: 75em) {
		body {
			max-width: 100rem;
		}
	}

	// 1024px
	@media only screen and (max-width: 64em) {
		body {
			/* max-width: 83rem; */
		}
	}

	input,
	button,
	textarea,
	select {
		font-family: inherit;
		color: inherit;
	}

	li {
		list-style: none;
	}
	a {
		text-decoration: none;
	}
	button {
		cursor: pointer;
	}

	*:disabled {
		cursor: not-allowed;
	}
`;

export default GlobalStyles;
