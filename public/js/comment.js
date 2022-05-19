const newFormHandler = async (event) => {
  const content = document.querySelector('#comment-content').value.trim();
  const post_id = event.target.getAttribute('data-post-id');

  if (content && post_id) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ content, post_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace(`/post/${post_id}/comment`);
      console.log('Comment created')
    } else {
      alert('Failed to create post');
    }
  }
};

document.querySelector('#create-comment').addEventListener('click', newFormHandler);
