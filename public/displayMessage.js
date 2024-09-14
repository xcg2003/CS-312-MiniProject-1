
function editPost(id){
    // Prompt the user for the new values (this can be replaced with a form or modal for better UX)
    const newTitle = prompt("Enter new title:");
    const newUsername = prompt("Enter new username:");
    const newMessage = prompt("Enter new message:");

    // Send a PUT request to update the post
    fetch(`/post/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: newTitle,
            username: newUsername,
            message: newMessage,
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Post updated successfully!');
            window.location.reload(); // Reload to update the UI with new values
        } else {
            alert('Error updating post: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to update post');
    });
}

function deletePost(id){
    fetch(`/post/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if(response.ok){
            return response.json();
        }else {
            alert('Error deleting post');
        }
    })
    .then(data => {
        // Assuming the server returns a success message or similar
        console.log('Post deleted:', data);
        // Remove the post from the DOM
        const messageElement = document.querySelector(`.message[data-id='${id}']`);
        if (messageElement) {
            messageElement.remove();
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to delete post');
    });

    window.location.reload();
}
