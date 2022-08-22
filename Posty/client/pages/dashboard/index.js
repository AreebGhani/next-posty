// Imports
import Title from "../../components/Title/Title"; // Title
import TimeSince from "../../components/TimeSince/TimeSince"; // TimeSince
import Link from "next/link"; // Net Link
import { useRouter } from "next/router"; // Next Router
import { useState, useEffect } from "react"; // useState || useEffect
import axios from "axios"; // Axios

// Dashboard Component
export default function Dashboard() {
  // Using useRouter Function
  const router = useRouter();

  // Applying Middleware

  // For auth Users
  if (localStorage.getItem("user")) {
    // If User Login

    var user = JSON.parse(localStorage.getItem("user")); // Getting User from Local Storage

    const name = user.name; // Getting User Name
    const id = user._id; // Getting User Id

    // useStates
    const [heading, setHeading] = useState(""); // For Handling Heading Input Field
    const [body, setBody] = useState(""); // For Handling Body Input Field
    const [posts, setPosts] = useState([]); // For Handling Posts
    const [totalPosts, setTotalPosts] = useState(0); // For Handling Total Number of Posts
    const [page, setPage] = useState(1); // For Handling Page Numbers
    const [totalPages, setTotalPages] = useState(1); // For Handling Total Number of Pages
    const [postLoding, setPostLoading] = useState("Loading ..."); // For Handling Post loading

    // For Pagiation
    var paginationButtons = []; // For Handling Number of Paginations Buttons
    paginationButtons = Array(totalPages).fill(null); // Creating a NULL Array having Index Number equals to the Total Number of Pages

    // Fetch Posts Function
    const fetchPosts = async (num) => {
      // Applying Try Catch
      try {
        // Requesting using Axios
        const { data } = await axios({
          url: "/api/data/getPost",
          method: "POST",
          data: { id, num },
        });
        // Getting Response
        if (!data.posts) {
          // If there is no post
          console.log("No Post Yet");
          console.log(data);
        } else {
          // If Data is OK
          setPosts(data.posts);
          setTotalPosts(data.total);
          setTotalPages(data.pages);
          setPostLoading("No Post Yet");
        }
      } catch (error) {
        // Catch an Error
        alert("Something went wrong");
        console.log("Error: ", error);
      }
    };

    // Submit Form Function
    const submit = async (e) => {
      // Preventing Form from Submission
      e.preventDefault();
      // Applying Validation
      if (!heading || !body) {
        // If Heading or Body Field is Empty
        alert("Please fill all the fields");
      } else {
        // If all field are fill

        // Date to Send as JSON
        var post = {
          heading: heading,
          body: body,
          addedBy: name,
          userId: id,
        };

        // Applying Try Catch
        try {
          // Requesting using Axios
          const { data } = await axios({
            url: "/api/data/addPost",
            method: "POST",
            data: post,
          });
          // Getting Response
          if (data.post === "added") {
            // If Post is Added
            alert("Post Added Succesfully");
            console.log("Post Added Succesfully");
            setHeading(""); // Changing Heading Input Field Value to Empty
            setBody(""); // Changing Body Input Field Value to Empty
            fetchPosts(); // Fetching Updated Posts
          } else {
            // If an Error Occur
            alert("Something went wrong");
            console.log(data);
          }
        } catch (error) {
          // Catch an Error
          alert("Something went wrong");
          console.log("Error: ", error);
        }
      }
    };

    // Delete Post Function
    const delPost = async (postId) => {
      // Applying Try Catch
      try {
        // Requesting using Axios
        const { data } = await axios({
          url: "/api/data/delPost",
          method: "POST",
          data: { postId },
        });
        // Getting Response
        if (data.post === "deleted") {
          // If Post is Deleted
          alert("Post Deleted Succesfully");
          console.log("Post Deleted Succesfully");
          fetchPosts(); // Fetching Updated Posts
        } else {
          // If an Error Occur
          alert("Something went wrong");
          console.log(data);
        }
      } catch (error) {
        // Catch an Error
        alert("Something went wrong");
        console.log("Error: ", error);
      }
    };

    // Like | UnLike Post Function
    const likePost = async (postId, action) => {
      // Applying Try Catch
      try {
        // Resquesting using Axios
        const { data } = await axios({
          url: "/api/data/likePost",
          method: "POST",
          data: { postId, action, id },
        });
        // Getting Response
        if (data.post === action) {
          // If Post is like | UnLike
          fetchPosts(); // Fetching Updated Posts
          console.log("Post has been " + data.post + "d");
        } else {
          // If an Error Occur
          alert("Something went wrong");
          console.log(data);
        }
      } catch (error) {
        // Catch an Error
        alert("Something went wrong");
        console.log("Error: ", error);
      }
    };

    // Changing Page Function
    const nextPage = (num) => {
      // If Page Number is between Min Page and Max Page
      if (num > 0 && num <= totalPages) {
        setPage(num); // Update Page Number State
        fetchPosts(num); // Fetching Updated Posts
        router.push("/dashboard"); // Rediect To Page Top
      }
    };

    // Fetching Updated Posts
    useEffect(() => {
      fetchPosts();
    }, []);

    // Function Dashboard Return
    return (
      <>
        <Title title="Dashboard" />
        <div className="formContainer">
          <form onSubmit={submit}>
            <label className="label">Heading</label>
            <br />
            <textarea
              className="input"
              type="text"
              value={heading}
              onChange={({ target }) => setHeading(target.value)}
              placeholder="Enter your post heading"
              name="heading"
              id="heading"
              required
              autoComplete="true"
            />
            <br />
            <label className="label">Body</label>
            <br />
            <textarea
              className="input"
              type="text"
              value={body}
              onChange={({ target }) => setBody(target.value)}
              placeholder="Enter your post body"
              name="body"
              id="body"
              required
              autoComplete="true"
            />
            <br />
            <button type="submit" className="btn">
              Publish
            </button>
            <br />
          </form>
        </div>
        <div className="container">
          {!posts || posts.length === 0 ? (
            <div className="text-center nopost">{postLoding}</div>
          ) : (
            posts.map((post, index) => {
              return (
                <div key={index} className="postContainer">
                  <h2 className="heading">{post.heading}</h2>
                  <p className="body">{post.body}</p>
                  <span>
                    By:{" "}
                    <Link
                      href={{
                        pathname: "/user",
                        query: { userId: post.userId },
                      }}
                    >
                      <span className="addedBy">{post.addedBy}</span>
                    </Link>{" "}
                    —<span className="ago"> {TimeSince(post.date)} ago</span>
                    <span className="likes">
                      [{post.likes}]{" "}
                      <span
                        className="likebtn"
                        onClick={() => likePost(post._id, "like")}
                      >
                        Like 👍
                      </span>
                      |{" "}
                      <span
                        className="likebtn"
                        onClick={() => likePost(post._id, "unlike")}
                      >
                        Unlike 👎
                      </span>
                    </span>
                  </span>
                  <span className="del">
                    <button onClick={() => delPost(post._id)}>x</button>
                  </span>
                  <div>
                    <br />
                  </div>
                  <hr />
                </div>
              );
            })
          )}
          <br />
          <h3 className="text-right margin-right">
            {" "}
            {!totalPages || totalPosts === 0
              ? ""
              : "Total Posts: " + totalPosts}{" "}
          </h3>
          <br />
          {paginationButtons.length === 0 ? (
            ""
          ) : (
            <div className="pagination">
              <button onClick={() => nextPage(page - 1)}>⇐</button>
              {paginationButtons.map((e, index) => {
                return (
                  <button key={index} onClick={() => nextPage(index + 1)}>
                    {index + 1}
                  </button>
                );
              })}
              <button onClick={() => nextPage(page + 1)}>⇒</button>
            </div>
          )}
        </div>
      </>
    );
  } else {
    // For Guest
    router.push("/login"); // Redirect to Login Page
  }
}
