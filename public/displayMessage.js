
function editPost(id){

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
