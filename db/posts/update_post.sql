UPDATE posts
SET post_address = $2, content = $3
WHERE post_id = $1
SELECT * FROM posts ORDER BY post_id

--updating what a post says