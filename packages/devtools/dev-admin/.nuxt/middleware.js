const middleware = {}

middleware['auth'] = require('../src/middleware/auth.ts')
middleware['auth'] = middleware['auth'].default || middleware['auth']

export default middleware
