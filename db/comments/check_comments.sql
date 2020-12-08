 -- seeing all the comments
SELECT u.username, u.user_id, p.*, c.* FROM comments c
JOIN posts p ON p.post_id = c.post_id
JOIN users u ON u.user_id = c.user_id
WHERE c.post_id = $1
ORDER BY c.comment_id;