const auth = require('./auth.route')
const post = require('./post.route')
const user = require('./user.route')
const store = require('./store.route')
const comment = require('./comment.route')
const like = require('./like.route')
const upload = require('./upload.route')
const rate = require('./rate.route')

module.exports = {
    auth: auth,
    post: post,
    user: user,
    store: store,
    comment: comment,
    like: like,
    upload: upload,
    rate: rate
}
