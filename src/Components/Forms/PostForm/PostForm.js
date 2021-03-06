import { connect } from "react-redux";
import axios from "axios";
import { useState } from "react";
import {Link} from 'react-router-dom'
import "./PostForm.css";

function PostForm(props) {
  const [state, setState] = useState({
    title: "",
    content: "",
    postAddress: "",
  });
  const formArr = [
    { label: "title" },
    { label: "content" },
    { label: "postAddress" },
  ];

  const changeHandle = (e) =>
    setState({ ...state, [e.target.name]: e.target.value });
    
  const submit = (e) => {
    e.preventDefault();
    if (props.user.username) {
      axios
        .post("/api/posts", state)
        .then((res) => props.history.push("/feed"));
    } else {
      alert("Must be logged in to create posts");
    }
  };

  const formMapped = formArr.map((input) => (
    <div className="post-input" key={input.label}>
      <input
        className="form-input"
        name={input.label}
        type="text"
        placeholder={input.label}
        onChange={(e) => changeHandle(e)}
      />
    </div>
  ));

  return (
    <div className="PostForm content-box">
      <form className="post-form" onSubmit={(e) => submit(e)}>
        <h2 className="title">New Post</h2>
        {formMapped}
        <div className="form-buttons">
          <button className="form-button" type="submit">
            Submit Post!
          </button>
          <button className="form-button" type="reset">
            <Link style={{textDecoration: "none"}} to="/feed">
            Cancel Post!
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps= state => state;

export default connect(mapStateToProps)(PostForm);
