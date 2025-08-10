module.exports = {
    createUserRequest(req, res, next) {
        const rules = {
            username: true,
            password: true,
            email: true
        }
        const keys = Object.keys(rules);
        const errors = {}
        for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            if (!key) continue;
            if(!errors.message) errors.message = 'Validation error'
            if (!req.body[key]) errors[key] = `${key} is required!`
        }
        if (errors.error) {
            return res.status(422).send({
                errors
            })
        }

        next()
    }
}