import { useState } from "react";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import ImageHandler from "../../Components/ImageHandler/ImageHandler";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import ReactQuill styles

export const AddBlog = () => {
  const [formData, setFormData] = useState({
    image: "",
    title: "",
    short_description: "",
    long_description: "",
    is_hidden: 0,
  });

  const [modalHeading, setModalHeading] = useState("");
  const [addState, setAddState] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDescriptionChange = (content) => {
    setFormData((prevData) => ({
      ...prevData,
      description: content,
    }));
  };

  const filehandleChange = ({ event }) => {
    const file = event.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        image: file,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Your API call to add the blog here
      console.log("Form data:", formData);
      setModalHeading("Blog added successfully");
      setSuccess(true);
      setAddState(true);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <h2 className="mainTitle">
                <BackButton />
                Add New Blog
              </h2>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-md-12 mb-4">
                        <ImageHandler
                          onUpload={filehandleChange}
                          showEdit={true}
                          text={"Blog Image"}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Title"
                          required
                          id="name"
                          type="text"
                          placeholder="Enter Blog Title"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-md-12 mb-4">
                        <div className="inputWrapper">
                          <div className="form-controls">
                            <label htmlFor="long_description">
                              Description
                            </label>
                            <ReactQuill
                              theme="snow"
                              value={formData.description}
                              onChange={handleDescriptionChange}
                              placeholder="Write your blog content here..."
                              style={{
                                height: "200px",
                                marginBottom: "50px",
                                borderRadius: "10px",
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12">
                        <CustomButton
                          variant="primaryButton"
                          text="Submit"
                          type="submit"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <CustomModal
          autoClose={true}
          show={addState}
          success={success}
          close={() => setAddState(false)}
          heading={modalHeading}
        ></CustomModal>
      </DashboardLayout>
    </>
  );
};
