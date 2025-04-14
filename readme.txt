
// view blog list
viewBlogList => creation of problem (id) is undefined.
 this for get know id:-
  if (!blogDetails) {
    console.log(`Blog with ID ${blogId} not found.`);
  } else {
    console.log(`Found blog: `, blogDetails);
  }


// for deletion of post 
--> This approach has limitations — data is lost on server restart and the response methods might conflict. For a more robust solution, using a database and separating presentation logic from server-side code is recommended.

-------------------- as a flow diagram ----------------
Client (Browser)
     |
     |---> GET /          (Homepage)          ---> [Server renders index.ejs]
     |
     |---> POST /home     (Add Blog)          ---> [Server adds to blogList & renders home.ejs]
     |
     |---> GET /blogDetails/:id (View Blog)   ---> [Server renders viewBlogList.ejs]
     |
     |---> GET /edit/:id  (Edit Form)         ---> [Server renders index.ejs with isEdit=true]
     |
     |---> POST /edit/:id (Update Blog)       ---> [Server updates blog & renders home.ejs]
     |
     |---> POST /delete/:id (Delete Blog)     ---> [Server deletes blog & redirects to home.ejs]

----------------------------------------------------------

Request Parameters:

req.params is an object that contains route parameters. In this case, req.params.id extracts the specific blog ID from the URL.
For example, if a user visits /blogDetails/5, then req.params.id will have the value 5.


Finding the Blog Entry:

const blogDetails = blogList.find((blog) => blog.id === parseInt(blogId));
This line searches through the blogList array to find the blog that matches the given ID.
parseInt(blogId) converts the id from a string to a number (since route parameters are usually strings).
The find() method returns the first blog object that has an id matching the parsed blog ID.

----------------------------------------------------------


blogList = blogList.filter((blog) => blog.id !== parseInt(blogId));
This line filters out the blog with the matching ID from the blogList array.
parseInt(blogId) converts the blogId from a string to a number.
The filter() method creates a new array that includes all blogs except the one with the specified ID.
This effectively deletes the blog post with the given ID from the list.


----------------------------------------------------------------


