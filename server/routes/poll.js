//routes
const router = require('express').Router();

const handle = require('../handlers');

const auth = require('../middleware/auth');


router
.route('/')
.get(handle.polls)
.post(auth, handle.createPoll)

router
.get('/user',auth,handle.usersPolls)

router
.route('/:id')
.get(handle.getPoll)
.delete(auth,handle.deletePoll)
.post(auth,handle.vote)

  module.exports = router;