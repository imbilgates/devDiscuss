import { useState } from "react";
import { createDiscussion } from '../../service/Service';
import { useNavigate } from 'react-router-dom';
import { predefinedTags } from '../../utils/PreTags';
import { showToast } from "../../utils/toastUtils";

const CreateDiscussion = () => {
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();

  const handleTagAdd = (tag) => {
    if (tag === "") return;

    if (!predefinedTags.includes(tag)) {
      showToast("You can only add predefined tags.", "error")
      return;
    }

    if (tags.length >= 3) {
      showToast("You cannot add more than 3 tags.", "error")
      return;
    }

    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }

    setSearchInput("");
  };

  const handleTagRemove = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      title: e.target.title.value,
      description: e.target.description.value,
      tags,
    };

    try {
      await createDiscussion(formData);
      setLoading(false);
      e.target.title.value = "";
      e.target.description.value = "";
      setTags([]);
      setSearchInput("");
      navigate("/");
      showToast("Discussion Created Successfully!", "success")
    } catch (error) {
      setLoading(false);
      console.error("Error creating discussion:", error);
      showToast("Error creating discussion. Please try again.", "error");
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Create your question here</label>
          <input
            type="text"
            className="form-control"
            name="title"
            placeholder="Enter the question"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            name="description"
            placeholder="Enter the description"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tags</label>
          <div className="d-flex align-items-center">
            <input
              type="text"
              className="form-control w-25"
              placeholder="Search tags"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => handleTagAdd(searchInput)}
            >
              Add
            </button>
          </div>
          <div className="mt-2">
            {predefinedTags
              .filter(
                (tag) =>
                  tag.toLowerCase().includes(searchInput.toLowerCase()) &&
                  !tags.includes(tag)
              )
              .map((tag, index) => (
                <button
                  type="button"
                  key={index}
                  className="btn btn-outline-info btn-sm me-2 mt-2"
                  onClick={() => handleTagAdd(tag)}
                >
                  {tag}
                </button>
              ))}
          </div>
          <div className="mt-3">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="badge bg-info text-dark me-2"
                style={{ cursor: "pointer" }}
                onClick={() => handleTagRemove(tag)}
              >
                {tag} &times;
              </span>
            ))}
          </div>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? (
            <>
              Loading...
              <span
                className="spinner-border spinner-grow-sm"
                role="status"
                aria-hidden="true"
              ></span>
            </>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateDiscussion;
