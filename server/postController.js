module.exports = {
    checkPosts: async(req, res) => {
        const db = req.app.get('db');
        try {
            const posts = await db.posts.check_posts();
            res.status(200).send(posts);
        } catch (err) {
            console.log(err)
        }
    },
    findPost: async(req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        const [post] = await db.posts.find_post(+id);
        if (post){
            res.status(200).send(post)
        } else {
            res.status(409).send('This is not the post you are looking for.')
        }
    },
    findPostsByUser: async(req,res) =>{
        const db = req.app.get('db')
        const {id} = req.params;
        const {userId} = req.session.user
        const posts = await db.posts.find_posts_by_user([+id, userId]);
        if(posts){
            res.status(200).send(posts)
        } else {
            res.status(409).send('You have made an error in judgement')
        }
    },
    createPost: async(req, res) => {
        const db = req.app.get('db');
        const {title, content, post_url} = req.body;
        const {userId} = req.session.user;
        try{
            const post = await db.posts.create_post([title, content, post_url, userId]);
            res.status(200).send(post)
        } catch(err) {
            console.log('Error occurred when trying to add post', err)
        }
    },
    updatePost: async(req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        const {content, post_url} = req.body;

        try{
            const post = await db.posts.update_post([+id, content, post_url]);
            res.status(200).send(post)
        }catch(err){
            console.log('Post could not be updated', err)
            res.sendStatus(409)
        }
    },
    deletePost: async(req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;

        try{
            const post = await db.posts.delete_post(+id);
            res.status(200).send(post)
        } catch(err){
            console.log("Gourdn't delete this masterpiece", err);
            res.sendStatus(500);
        }
    }
}