// Imports
import Title from "../../components/Title/Title"; // Title
import TimeSince from "../../components/TimeSince/TimeSince"; // TimeSince
import Plural from "../../components/Plural/Plural"; // Plural
import { useEffect, useState } from "react"; // useState

// User Component
export default function user({ user, posts }) {
  // Total Likes
  var totalLikes = 0;

  // useStates
  const [loadPosts, setLoadPosts] = useState([]);

  useEffect(() => {
    setLoadPosts(posts);
  }, [posts]);

  // Function User Return
  return (
    <>
      <Title title="User" />
      <div className="container">
        <h1 className="text-center text-capitalize">{user[0].name}</h1>
        <br />
        <div className="resposive-table">
          <table className="table">
            <thead>
              <tr>
                <th className="w-10">No.</th>
                <th className="w-70">All Posts</th>
                <th className="w-10">Likes</th>
                <th className="w-10">Time</th>
              </tr>
            </thead>
            <tbody>
              {loadPosts.map((post, index) => {
                totalLikes += post.likes;
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="text-left">
                      <h2 className="text-capitalize margin-bottom">
                        {post.heading}
                      </h2>
                      <p>{post.body}</p>
                    </td>
                    <td>{post.likes}</td>
                    <td>{TimeSince(post.date)} ago</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <br />
        <h4 className="margin-left">
          <span className="text-capitalize">{user[0].name}</span> has posted{" "}
          {Plural(posts.length, "post")} and got {Plural(totalLikes, "like")}.
        </h4>
        <br />
      </div>
    </>
  );
}

// Get Server Side Props
export async function getServerSideProps(context) {
  // Data from Context Query
  var userId = context.query.userId;
  // Fetching Data
  const res = await fetch(
    `https://next-posty.herokuapp.com/user?userId=${userId}`
  );
  // Getting Response
  const data = await res.json();
  if (data.status === "OK") {
    // If Status is OK
    const user = data.data.user; // Getting User
    const posts = data.data.posts; // Getting Posts
    // Function Get Server Side Props Return
    return {
      // Returning Props as JSON
      props: {
        user,
        posts,
      },
    };
  }
}
