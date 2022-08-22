// Imports
import { useState, useEffect } from "react"; // useState | useEffect
import Link from "next/link"; // Next Link
import axios from "axios"; // Axios
import { useRouter } from "next/router"; // Next Router
import Title from "../../components/Title/Title"; // Title
import TimeSince from "../../components/TimeSince/TimeSince"; // TimeSince

// Home Component
export default function Home() {
  // Using useRouter Function
  const router = useRouter();

  // useStates
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
        url: "/api/data/posts",
        method: "POST",
        data: { num },
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

  // Like | UnLike Post Function
  const likePost = async (postId, action) => {
    // Applying Middleware

    // For Auth User
    if (localStorage.getItem("user")) {
      // If User is Login

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
    } else {
      // For Guest User
      router.push("/login"); // Redirect to Login
    }
  };

  // Changing Page Function
  const nextPage = (num) => {
    // If Page Number is between Min Page and Max Page
    if (num > 0 && num <= totalPages) {
      setPage(num); // Update Page Number State
      fetchPosts(num); // Fetching Updated Posts
      router.push("/home"); // Rediect To Page Top
    }
  };

  // Fetching Updated Posts
  useEffect(() => {
    fetchPosts();
  }, []);

  // Function Home Return
  return (
    <>
      <Title title="Home" />
      <div className="container">
        <h1 className="text-center">
          <u>All Posts</u>
        </h1>
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
}
