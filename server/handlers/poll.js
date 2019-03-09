//handlers
const db = require('../models/index');

exports.polls = async (req,res,next) => {
    try {
        const polls = await db.Poll.find();
        res.status(200).json(polls);
     } catch (error) {
        error.status = 400;
        next(error);
    };
};

exports.createPoll = async (req,res,next) => {
    try {
        console.log(req.decoded);
        const {id} = req.decoded;
        const {question,options} = req.body;
        const user = await db.User.findById(id);
        const poll=  await db.Poll.create({
           user, 
            question,
            options:options.map(optionS => ({
                option:optionS,votes:0
            }))
        });
        user.polls.push(poll);
        user.save();
     res.status(201).json({...poll._doc,user:user._id});

    } catch (error) {
     error.status = 400;
     next(error);   
            };  
        }

        exports.usersPolls = async (req,res,next)=> {
            try{
                const {id} = req.decoded;
                const user = await db.User.findById(id).populate('polls');

                res.status(200).json(user.polls)
            }catch(e){
                e.status = 404;
                next(e);
            }
        }
        exports.getPoll = async (req,res,next) => {
            try {
                    const {id } = req.params;
                    const poll =  await db.Poll.findById(id).populate('user',['username','id']);
                    if(!poll){
                        throw new Error('No poll found');
                    }
                    res.send(poll)
            } catch (error) {   
                error.status = 404;
                next(error);
                
            }
        }

        exports.deletePoll = async (req,res,next) => {
            try {
                const {id:pollId} = req.params;
                const {id:userId} = req.decoded;
                const poll = await db.Poll.findById(pollId);
                if(!poll) throw new Error('No poll found'); 
                if(poll.user.toString() !== userId){
                    throw  new Error('Unauthorized access');
                }else{
                    
await poll.remove();
res.status(202).json(poll);
                }
            } catch (error) {
                
            }
        }

        exports.vote = async (req,res,next) => {
            try {
                
                const {id:pollId} = req.params;
                const {id:userId} = req.decoded;    
                console.log('decoded ',req.decoded);

                const {answer} = req.body;
                // console.log('pollId '+pollId,'userId '+userId,'anser '+answer);

                if(answer){

                    const poll = await db.Poll.findById(pollId);
                    if(!poll){
                        throw new Error('Poll not found');
                    }
                        const vote = poll.options.map(
                            option => {
                                if(option.option === answer){
                                    return {
                                        option:option.option,
                                        _id: option._id,
                                        votes: options.vote +1
                                    }
                                }else{
                                    return option
                                }
                            }
                        )
                    
                    if(poll.voted.filter(user => 
                        user.toString() === userId).length <= 0 ){
                            poll.voted.push(userId);
                            poll.options = vote;
                            await poll.save();
                        }else{
                            throw new Error('Already voted')
                        }

                       return res.status(202).json(poll)
                }else{
                    throw new Error('No answer provided');
                }
                
            } catch (error) {
                error.status = 404;
                next(error)
            }
        }