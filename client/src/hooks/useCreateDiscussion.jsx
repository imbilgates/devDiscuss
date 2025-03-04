import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDiscussion } from "../service/Service";
import { showToast } from "../utils/toastUtils";
import { showUploadProgress } from "../utils/showUploadProgress";

const useCreateDiscussion = () => {
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [code, setCode] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (formData, resetForm) => {
    setLoading(true);
  
    // Start the upload progress and pass a callback for navigation
    showUploadProgress(() => {
      setLoading(false);
      resetForm(); // Reset form fields
      navigate("/"); // Navigate only after progress finishes
    });
  
    try {
      await createDiscussion(formData);
    } catch (error) {
      setLoading(false);
      console.error("Error creating discussion:", error);
      showToast("Error creating discussion. Please try again.", "error");
    }
  };
  
  

  return {
    loading,
    tags,
    setTags,
    code,
    setCode,
    selectedLanguage,
    setSelectedLanguage,
    handleSubmit,
  };
};

export default useCreateDiscussion;
