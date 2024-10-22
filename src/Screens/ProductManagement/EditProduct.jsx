import { useState, useEffect } from "react";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from "../../Components/CustomInput";
import { SelectBox } from "../../Components/CustomSelect";
import CustomButton from "../../Components/CustomButton";

import {
  getEntity,
  addEntity,
  deleteEntity,
  updateEntity,
} from "../../services/commonServices";

import { useNavigate, useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { imgUrl } from "../../utils/convertToFormData";

export const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editIndex, setEditIndex] = useState();
  const [modalHeading, setmodalHeading] = useState("");
  const [modalBtn, setModalBtn] = useState("");
  const [edit, setEdit] = useState(false);
  const [addVariantModal, setAddVariantModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [variantDataaa, setVariantData] = useState({});
  const [formData, setFormData] = useState({
    themes: [],
    slideImages: [],
  });
  const [categories, setCategories] = useState([]);

  console.log("formData.slideImages", formData.slideImages)

  const getProduct = async () => {
    try {
      const response = await getEntity(`/view-product/${id}`);
      setFormData(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

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

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    console.log("fileName", file);

    try {
      console.log("responseresponseresponse", file);
      const response = await addEntity("/add-gallery-image", {
        image: file,
        product_id: id,
      });
      console.log("aaaaaa", file);

      getProduct();
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleDeleteVariant = async (variant_id) => {
    try {
      const response = await deleteEntity(`/delete-variant/${variant_id}`)
      getProduct();
    } catch (error) {
      console.log("error", error);
      
    }
  }

  // const handleRemoveImage = (index) => {
  //   setSlideImages((prevImages) => prevImages.filter((_, i) => i !== index));
  // };

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

    try {
      const response = await updateEntity(`/add-product/${id}`, formData);
      if (response.status) {
        console.log("response before if", response.status);
        setmodalHeading("product updated!");
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
  };

  const handleDeleteSlideImg = async (imgId) => {
    await deleteEntity(`/delete-gallery-image/${imgId}`);
    const updatedImages = formData.slideImages.filter(
      (image) => image.id !== imgId
    );
    setFormData((prevData) => ({
      ...prevData,
      slideImages: updatedImages,
    }));
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
                Edit Product
              </h2>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <CustomInput
                      label="Product Title"
                      required
                      id="title"
                      type="text"
                      placeholder="Product Title"
                      labelClass="mainLabel"
                      inputClass="mainInput"
                      name="title"
                      value={formData?.title}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6 mb-4">
                    <SelectBox
                      selectClass="mainInput"
                      name="category"
                      label="Categories"
                      placeholder="Category"
                      required
                      value={formData?.category_id}
                      option={categories}
                      onChange={(e) =>
                        handleChange({
                          target: {
                            name: "category_id",
                            value: e.target.value,
                          },
                        })
                      }
                    />
                  </div>

                  <div className="col-md-6 mb-4">
                    <CustomInput
                      label="Author"
                      required
                      id="author"
                      type="text"
                      placeholder="Author"
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
                      label="thumbnail Image"
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
                        Slide Images<span>*</span>
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
                    {formData.slideImages.map((image, index) => (
                      <div className="col-md-3 mb-4">
                        <div className="slide_image-preview">
                          <div key={index} className="slide_img">
                            <img
                              src={`${imgUrl}/${image?.image}`}
                              alt={`Uploaded Preview ${index + 1}`}
                              className="img-fluid"
                            />
                            <div
                              onClick={() => handleDeleteSlideImg(image.id)}
                              className="slide_img-remove backButton"
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </div>
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
                            className="primaryButton  customButton"
                            onClick={() => handleAddVariant()}
                          >
                            {modalBtn}
                          </div>
                        ) : (
                          <div
                            className="primaryButton  customButton"
                            onClick={() => handleEditVariant()}
                          >
                            {modalBtn}
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
                            <div className="d-flex gap-2">
                              <div
                                class="btn primaryButton"
                                onClick={() => handleOpenVariant(item, index)}
                              >
                                Edit
                              </div>
                              <div
                                class="btn btn-dark"
                                onClick={() => handleDeleteVariant(item.id)}
                              >
                                Delete
                              </div>
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
                  text="Edit Product"
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
        </div>
      </DashboardLayout>
    </>
  );
};
