import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import { editEntity, updateEntity } from "../../services/commonServices";
import { imgUrl } from "../../utils/convertToFormData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import ImageHandler from "../../Components/ImageHandler/ImageHandler";
import CustomModal from "../../Components/CustomModal";

export const EditTag = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  const [modalHeading, setModalHeading] = useState("");
  const [editState, setEditState] = useState(false);
  const [success, setSuccess] = useState(false);

  const getColorData = async () => {
    try {
      const response = await editEntity(`/get-tag/${id}`);

      setFormData(response.data);

      // setImagePreview(`${imgUrl}/${colorData.primary_image}`);
      // setVariationPreviews(
      //   colorData.variations.map((url) => `${imgUrl}/${url}`)
      // );
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getColorData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {

      // Send the data directly or handle the file uploads appropriately
      const response = await updateEntity(
        `/add-tag/${id}`,
        formData
      );
      setFormData(response.data);
      // navigate(-1);
      setModalHeading("Tag updated successfully");
      setSuccess(true);
      setEditState(true);
      setTimeout(() => {
        navigate(-1);
      }, 1500);
      console.log("response", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log("sssss", formData);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };

  return (
    <DashboardLayout>
      <div className="dashCard mb-4">
        <div className="row mb-3">
          <div className="col-12 mb-2">
            <h2 className="mainTitle">
              <BackButton />
              Edit Tag
            </h2>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-12">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <CustomInput
                        label="Update Tag"
                        required
                        id="title"
                        type="text"
                        placeholder="Update Tag"
                        labelClass="mainLabel"
                        inputClass="mainInput"
                        name="title"
                        value={formData?.title}
                        onChange={handleChange}
                      />
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
        show={editState}
        success={success}
        close={() => setEditState(false)}
        heading={modalHeading}
      ></CustomModal>
    </DashboardLayout>
  );
};
