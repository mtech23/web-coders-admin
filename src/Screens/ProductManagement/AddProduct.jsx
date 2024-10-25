import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from "../../Components/CustomInput";
import { SelectBox } from "../../Components/CustomSelect";
import CustomButton from "../../Components/CustomButton";

import { getEntity, addEntity } from "../../services/commonServices";

import { useNavigate } from "react-router";
import { imgUrl } from "../../utils/convertToFormData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export const AddProduct = () => {
  const navigate = useNavigate();
  const [editIndex, setEditIndex] = useState();
  const [modalHeading, setmodalHeading] = useState("");
  const [modalBtn, setModalBtn] = useState("");
  const [edit, setEdit] = useState(false);
  const [modalMessage, setModalMessage] = useState(false);
  const [addVariantModal, setAddVariantModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [variantDataaa, setVariantData] = useState({});
  const [slideImages, setSlideImages] = useState([]);
  const [formData, setFormData] = useState({
    themes: [],
    slideImages: [],
  });
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await getEntity("/get-categories");
      console.log("aa", response.data);
      setCategories(
        response.data.map((item) => ({ id: item.id, name: item.title }))
      );
    } catch (error) {
      console.log("categores Error", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleOpenVariant = (data, index) => {
    if (data) {
      setEditIndex(index);
      console.log("datadata", data);
      setmodalHeading("Edit Variant");
      setModalBtn("Edit Variant");
      setVariantData(data);
    } else {
      setmodalHeading("Add Variant");
      setModalBtn("Add Variant");
      // setVariantData({ id: nanoid() })
    }
    setAddVariantModal(true);
  };
  console.log("varianttt", variantDataaa);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleVariantChange = (e) => {
    const { name, value } = e.target;
    const variantData = {};
    variantData[name] = value;

    setVariantData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    console.log("variantData", variantDataaa);
  };
  const handleAddVariant = () => {
    console.log("variantDataaa", variantDataaa);

    setFormData((prevData) => ({
      ...prevData,
      themes: [...prevData.themes, variantDataaa],
    }));
    setAddVariantModal(false);
    setVariantData({});
  };

  const handleEditVariant = () => {
    const tempArray = [...formData.themes];
    tempArray.splice(editIndex, 1, variantDataaa);
    console.log("tempArray", tempArray);

    setFormData((prevData) => ({
      ...prevData,
      themes: tempArray,
    }));
    setAddVariantModal(false);
    setVariantData({});
  };

  // const handleImageChange = (e) => {
  //   const files = Array.from(e.target.files)
  //   console.log(e.target.files);

  //   const imgUrls = files.map(file => URL.createObjectURL(file))
  //   console.log("imgUrls", imgUrls);

  //   setSlideImages(prevImages => prevImages.concat(imgUrls))
  //   console.log("slideImagessssss", slideImages)
  //   setFormData({...formData, slideImages: slideImages})
  //   console.log("slide Images", slideImages);

  // }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newSlides = files.map((file) => {
        const blobUrl = URL.createObjectURL(file);
        return { file, blobUrl }; // Store both file and blob URL
    });

    setSlideImages((prevSlides) => prevSlides.concat(newSlides));
    setFormData((prevFormData) => ({
        ...prevFormData,
        slideImages: prevFormData.slideImages.concat(
            files.map((file) => ({
                id:0, // Generate a unique ID
                image:file,
            }))
        ), // Store objects with file and unique ID
    }));
};

  const handleRemoveImage = (index) => {
    setSlideImages((prevSlides) => prevSlides.filter((_, i) => i !== index));
    setFormData((prevFormData) => ({
      ...prevFormData,
      slideImages: prevFormData.slideImages.filter((_, i) => i !== index), // Remove the corresponding binary image
    }));
  };

  useEffect(() => {
    return () => {
      slideImages.forEach((slide) => URL.revokeObjectURL(slide.blobUrl));
    };
  }, [slideImages]);

  const filehandleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileName = file;
      setFormData((prevData) => ({
        ...prevData,
        thumbnail_image: fileName,
      }));
    }
  };

  const handleSubmit = async (event) => {
    console.log("formData", formData);
    event.preventDefault();

    if (formData.themes.length != 0) {
      try {
        const response = await addEntity("/add-product", formData);
        if (response.status) {
          console.log("response before if", response.status);
          setmodalHeading("product added");
          setSuccess(true);
          setEdit(true);
          setTimeout(() => {
            navigate(-1);
          }, 1500);
        } else if (!response.status) {
          console.log("response before if", response.status);
          setmodalHeading("error adding product ");
          setSuccess(false);
          setEdit(true);
        }
      } catch (error) {
        // console.log("response before if", response.status);
        setmodalHeading("error adding product ");
        setSuccess(false);
        setEdit(true);
        // console.error("Error submitting form:", error);
        // alert("error", error.message);
  
        console.error("Error submitting form:", error);
      }
      // finally {
      //   setTimeout(() => {
      //     navigate(-1);
      //   }, 1500);
      // }
    }
     else{
      // alert("Add Variant")
        setmodalHeading("Please Add Atleast One Variant!");
        setSuccess(true);
        setModalMessage(true);
     }
  };

  console.log("formData", formData);
  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <h2 className="mainTitle">
                <BackButton />
                Add New Product
              </h2>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <CustomInput
                      label="Add Product Title"
                      required
                      id="title"
                      type="text"
                      placeholder="Enter Product Title"
                      labelClass="mainLabel"
                      inputClass="mainInput"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6 mb-4">
                    <SelectBox
                      selectClass="mainInput"
                      name="category_id"
                      label="Categories"
                      placeholder="Categories"
                      required
                      value={formData.category_id}
                      option={categories}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 mb-4">
                    <CustomInput
                      label="Add Author"
                      required
                      id="author"
                      type="text"
                      placeholder="Add Author"
                      labelClass="mainLabel"
                      inputClass="mainInput"
                      name="author"
                      value={formData.author}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6 mb-4">
                    <CustomInput
                      label="Base URL"
                      required
                      id="base_url"
                      type="text"
                      placeholder="Base URL"
                      labelClass="mainLabel"
                      inputClass="mainInput"
                      name="base_url"
                      value={formData.base_url}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 mb-4">
                    <CustomInput
                      label="Upload thumbnail Image"
                      required
                      id="file"
                      type="file"
                      labelClass="mainLabel"
                      inputClass="mainInput"
                      name="thumbnail_image"
                      onChange={filehandleChange}
                    />
                  </div>

                  <div class="col-md-6 mb-4">
                    <div class="inputWrapper">
                      <label for="slideImages" class="mainLabel">
                        Upload Slide Images<span>*</span>
                      </label>
                      <input
                        type="file"
                        id="slideImages"
                        name="slideImages"
                        class="mainInput"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>

                  <div className="row">
                    {slideImages.map((slide, index) => (
                      <div className="col-md-3 mb-4" key={index}>
                        <div className="slide_image-preview">
                          <div className="slide_img">
                            <img
                              src={slide.blobUrl}
                              alt={`Uploaded Preview ${index + 1}`}
                              className="img-fluid"
                            />
                            <button
                              onClick={() => handleRemoveImage(index)}
                              className="slide_img-remove backButton"
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="col-md-12 mb-4">
                    <div className="inputWrapper">
                      <div className="form-controls">
                        <label htmlFor="">Description</label>
                        <textarea
                          name="description"
                          className="form-control shadow border-0"
                          id=""
                          cols="30"
                          rows="10"
                          value={formData.description}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  {/* Add Variant Theme */}
                  <div className="col-md-12 mb-4">
                    <div
                      className="customButton primaryButton"
                      onClick={() => handleOpenVariant()}
                    >
                      Add Variant
                    </div>
                    {/* <CustomButton
                      btnClass="primaryBtn"
                      className="addVariant"
                      variant="primaryButton"
                      text="Add Variant"
                      onClick={() => handleOpenVariant()}
                    /> */}
                  </div>
                  <CustomModal
                    autoClose={false}
                    show={addVariantModal}
                    success={success}
                    close={() => setAddVariantModal(false)}
                    heading={modalHeading}
                  >
                    <div className="row">
                      <div className="col-md-12 mb-2">
                        <CustomInput
                          label="Variation name"
                          required
                          id="variation_name"
                          type="text"
                          placeholder="Variation name"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="variation_name"
                          value={variantDataaa.variation_name}
                          onChange={handleVariantChange}
                        />
                      </div>
                      <div className="col-md-12 mb-2">
                        <CustomInput
                          label="Variation Type"
                          required
                          id="variation_type"
                          type="text"
                          placeholder="Variation Type"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="variation_type"
                          value={variantDataaa.variation_type}
                          onChange={handleVariantChange}
                        />
                      </div>
                      <div className="col-md-12 mb-2">
                        <CustomInput
                          label="Variation Value"
                          required
                          id="variation_value"
                          type="text"
                          placeholder="Variation Value"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="variation_value"
                          value={variantDataaa.variation_value}
                          onChange={handleVariantChange}
                        />
                      </div>
                      <div className="col-md-12 mb-2">
                        <CustomInput
                          label="Base URL"
                          required
                          id="base_url"
                          type="text"
                          placeholder="Base URL"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="base_url"
                          value={variantDataaa.base_url}
                          onChange={handleVariantChange}
                        />
                      </div>
                      <div className="col-md-12 mb-2 text-center">
                        {modalBtn == "Add Variant" ? (
                          <div
                            className=" primaryButton  customButton"
                            onClick={() => handleAddVariant()}
                          >
                            {modalBtn}
                          </div>
                        ) : (
                          <div
                            className=" primaryButton  customButton"
                            onClick={() => handleEditVariant()}
                          >
                            {modalBtn}ccc
                          </div>
                        )}
                      </div>
                    </div>
                  </CustomModal>

                  <div className="row">
                    {formData?.themes.map((item, index) => (
                      <div className="col-md-4 mb-4">
                        <div class="card">
                          <div class="card-body">
                            <h2 class="card-title">Variant {index + 1}</h2>
                            <div className="row">
                              <div className="mb-2 col-md-6">
                                <p class="card-text font-weight-bold m-0">
                                  Variation name
                                </p>
                                <p class="card-text m-0">
                                  {item.variation_name}
                                </p>
                              </div>
                              <div className="mb-2 col-md-6">
                                <p class="card-text font-weight-bold m-0">
                                  Variation type
                                </p>
                                <p class="card-text m-0">
                                  {item.variation_type}
                                </p>
                              </div>
                              <div className="mb-2 col-md-6">
                                <p class="card-text font-weight-bold m-0">
                                  Variation Value
                                </p>
                                <p class="card-text m-0">
                                  {item.variation_value}
                                </p>
                              </div>
                              <div className="mb-2 col-md-6">
                                <p class="card-text font-weight-bold m-0">
                                  Base URL
                                </p>
                                <p class="card-text m-0">{item.base_url}</p>
                              </div>
                            </div>
                            <div
                              class="btn primaryButton"
                              onClick={() => handleOpenVariant(item, index)}
                            >
                              Edit
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Add Variant Theme */}
                </div>
                <CustomButton
                  btnClass="primaryBtn"
                  variant="primaryButton"
                  text="Add Product"
                  type="submit"
                />
              </form>
            </div>
          </div>
          <CustomModal
            autoClose={false}
            show={edit}
            success={success}
            close={() => setEdit(false)}
            heading={modalHeading}
          ></CustomModal>
          <CustomModal
            autoClose={false}
            show={modalMessage}
            success={false}
            close={() => setModalMessage(false)}
            heading={modalHeading}
          ></CustomModal>
        </div>
      </DashboardLayout>
    </>
  );
};
