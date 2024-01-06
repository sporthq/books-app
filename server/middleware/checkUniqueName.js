export const checkUniqueName = async (req, res, next) => {
	const { loginMethod } = req.body;

    console.log(loginMethod);
	if (loginMethod !== 'google') {
		const { name } = req.body;

		const existingUser = await User.findOne({ name });
		if (existingUser) {
			throw new Error(`A user with the name ${name} already exists.`);
		}
	} else {
		req.body.name.unique = false;
	}

	next();
};
