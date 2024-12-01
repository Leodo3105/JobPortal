import Post from '../../models/post.js';
import Comment from '../../models/comment.js';
import User from '../../models/user.js';

// Tạo bài viết mới
export async function createPost(req, res) {
  const userId = req.user?.id;
  const userRole = req.user?.role;

  if (userRole !== 'employer') {
    return res.status(403).json({ code: 'FORBIDDEN', message: 'Only employers can create posts' });
  }

  try {
    const { title, content } = req.body;
    const post = await Post.create({
      title,
      content,
      userId,
    });

    res.status(201).json({ code: 'POST_CREATED', message: 'Post created successfully', post });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ code: 'POST_CREATION_FAILED', message: 'Failed to create post', error: error.message });
  }
}

// Lấy danh sách bài viết
export async function getPosts(req, res) {
  try {
    const posts = await Post.findAll({
      include: { model: User, attributes: ['name'] },
    });

    if (posts.length === 0) {
      return res.status(404).json({ code: 'NO_POSTS_FOUND', message: 'No posts found' });
    }

    res.status(200).json({ code: 'POSTS_RETRIEVED', message: 'Posts retrieved successfully', posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ code: 'POST_FETCH_FAILED', message: 'Failed to fetch posts', error: error.message });
  }
}

// Lấy chi tiết một bài viết
export async function getPostById(req, res) {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: { model: User, attributes: ['name'] },
    });

    if (!post) {
      return res.status(404).json({ code: 'POST_NOT_FOUND', message: 'Post not found' });
    }

    res.status(200).json({ code: 'POST_RETRIEVED', message: 'Post retrieved successfully', post });
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ code: 'POST_FETCH_FAILED', message: 'Failed to fetch post', error: error.message });
  }
}

// Cập nhật bài viết
export async function updatePost(req, res) {
  const userId = req.user?.id;
  const userRole = req.user?.role;

  try {
    const post = await Post.findByPk(req.params.id);

    if (!post) {
      return res.status(404).json({ code: 'POST_NOT_FOUND', message: 'Post not found' });
    }

    if (userRole !== 'employer' || post.userId !== userId) {
      return res.status(403).json({ code: 'FORBIDDEN', message: 'You are not authorized to update this post' });
    }

    const { title, content } = req.body;
    await post.update({ title, content });

    res.status(200).json({ code: 'POST_UPDATED', message: 'Post updated successfully', post });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ code: 'POST_UPDATE_FAILED', message: 'Failed to update post', error: error.message });
  }
}

// Xóa bài viết
export async function deletePost(req, res) {
  const userId = req.user?.id;
  const userRole = req.user?.role;

  try {
    const post = await Post.findByPk(req.params.id);

    if (!post) {
      return res.status(404).json({ code: 'POST_NOT_FOUND', message: 'Post not found' });
    }

    if (userRole !== 'employer' || post.userId !== userId) {
      return res.status(403).json({ code: 'FORBIDDEN', message: 'You are not authorized to delete this post' });
    }

    await post.destroy();

    res.status(200).json({ code: 'POST_DELETED', message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ code: 'POST_DELETION_FAILED', message: 'Failed to delete post', error: error.message });
  }
}

// Tạo bình luận cho bài viết
export async function createComment(req, res) {
  const userId = req.user?.id;
  const { postId } = req.params;

  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ code: 'POST_NOT_FOUND', message: 'Post not found' });
    }

    const { content } = req.body;
    const comment = await Comment.create({
      content,
      userId,
      postId,
    });

    res.status(201).json({ code: 'COMMENT_CREATED', message: 'Comment created successfully', comment });
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ code: 'COMMENT_CREATION_FAILED', message: 'Failed to create comment', error: error.message });
  }
}
