module.exports = {
    name: String,
    following: [Array('user'), 'followers'],
    followers: [Array('user'), 'following'],
    memberships: [Array('membership'), 'users'],
    credentials: [Array('credential'), 'user'],
    sessions: [Array('session'), 'user']
}
