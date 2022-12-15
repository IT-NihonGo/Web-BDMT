const path = require('path')

const {
    getPostByPostId,
    updatePostByPostId,
} = require('../../CRUD/post')

async function uploadSingle(request, response) {
    try {
        if (request.files) {
            const postId = request.params.id
            // Check if user exists
            const dbPost = await getPostByPostId(postId)
            if (dbPost) {
                // Update user avatar in database
                const listImages =[]
                for(let i=0; i<request.files.length; i++){
                    const extName = path.extname(request.files[i].originalname)
                    const imageUrl = `public/images/posts/post${postId}-${request.files[i].originalname}${extName}`
                    listImages.push(imageUrl)
                }
                const updatePost = {
                    images: listImages,
                }
                updatePostByPostId(updatePost, dbPost.id).then(
                    () => {
                        return response.status(200).json({
                            message: "Upload post successfully!",
                        })
                    },
                )
            } else {
                return response.status(404).json({
                    message: 'Post not found!',
                })
            }
        } else {
            return response.status(400).json({
                message: 'Image file not found!',
            })
        }
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

module.exports = uploadSingle
