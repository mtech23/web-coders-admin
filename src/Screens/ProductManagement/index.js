import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faEye,
  faEdit,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import CustomTable from "../../Components/CustomTable";
import CustomModal from "../../Components/CustomModal";

import CustomPagination from "../../Components/CustomPagination";
import CustomButton from "../../Components/CustomButton";

import "./style.css";
import { getEntity, deleteEntity } from "../../services/commonServices";
import { imgUrl } from "../../utils/convertToFormData";
import Chip from "../../Components/chip";
import { appTitle } from "../../utils/commonUtils";

export const ProductManagement = () => {
  const [data, setData] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate();

  const [modalHeading, setModalHeading] = useState("");
  const [edit, setEdit] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  console.log();

  const hanldeRoute = () => {
    navigate("/add-product");
  };

  const inActive = () => {
    setShowModal(false);
    setShowModal2(true);
  };
  const ActiveMale = () => {
    setShowModal3(false);
    setShowModal4(true);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

  const ProductData = async () => {
    const response = await getEntity("/get-products");
    console.log(response.data)
    if (response) {
      setData(response.data);
    }
  };

  useEffect(() => {
    document.title = `${appTitle} | Product Management`;
    ProductData();
  }, []);
  const handleDropdownToggle = (userId) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [userId]: !prevState[userId],
    }));
  };

  const handleDelete = async (id) => {
    await deleteEntity(`/delete-product/${id}`);
    setModalHeading("Product deleted successfully");
    setSuccess(true);
    setEdit(true);
    ProductData();
  };

  const maleHeaders = [
    {
      key: "id",
      title: "ID",
    },
    {
      key: "name",
      title: "Name",
    },
    {
      key: "author",
      title: "Author",
    },
    {
      key: "category",
      title: "Category",
    },
    {
      key: "variant",
      title: "Variant",
    },
    {
      key: "Actions",
      title: "Actions",
    },
  ];

  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="row mb-3 justify-content-between">
                  <div className="col-md-6 mb-2">
                    <h2 className="mainTitle">Product Management</h2>
                  </div>
                  <div className="col-md-3 mb-2 d-flex justify-content-end">
                    <div className="addUser">
                      <CustomButton
                        text="Add New Product"
                        variant="primaryButton"
                        onClick={hanldeRoute}
                      />
                      {/* <CustomInput
                        type="text"
                        placeholder="Search Here..."
                        value={inputValue}
                        inputClass="mainInput"
                        onChange={handleChange}
                      /> */}
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12">
                    <CustomTable headers={maleHeaders}>
                      <tbody>
                        {currentItems?.map((item, index) => (
                          <tr key={index}>
                            <td className="text-capitalize">{index + 1}</td>
                            <td className="text-capitalize">{item?.title}</td>
                            <td className="text-capitalize">{item?.author}</td>
                            <td>{item?.category}</td>
                            <td>
                              {item?.themes.length}
                            </td>
                            <td>
                              <Dropdown
                                className="tableDropdown"
                                show={dropdownOpen[item.id]}
                                onToggle={() => handleDropdownToggle(item.id)}
                              >
                                <Dropdown.Toggle
                                  variant="transparent"
                                  className="notButton classicToggle"
                                >
                                  <FontAwesomeIcon icon={faEllipsisV} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu
                                  align="end"
                                  className="tableDropdownMenu"
                                >
                                  <Link
                                    className="tableAction"
                                    to={`/product-details/${item.id}`}
                                  >
                                    <FontAwesomeIcon
                                      icon={faEye}
                                      className="tableActionIcon"
                                    />
                                    View
                                  </Link>
                                  <Link
                                    to={`/product-management/edit-product/${item.id}`}
                                    className="tableAction"
                                  >
                                    <FontAwesomeIcon
                                      icon={faEdit}
                                      className="tableActionIcon"
                                    />
                                    Edit
                                  </Link>
                                  <Link
                                    className="tableAction"
                                    onClick={() => handleDelete(item?.id)}
                                  >
                                    <FontAwesomeIcon
                                      icon={faTrashCan}
                                      className="tableActionIcon"
                                    />
                                    Delete
                                  </Link>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                            {/* <td className={item.status == 1 ? 'greenColor' : "redColor"}>{item.status == 1 ? 'Active' : "Inactive"}</td> */}
                            {/* <td>
                              <Dropdown className="tableDropdown">
                                <Dropdown.Toggle variant="transparent" className="notButton classicToggle">
                                  <FontAwesomeIcon icon={faEllipsisV} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu align="end" className="tableDropdownMenu">

                                  <Link to={`/book-management/book-details/${item?.id}`} className="tableAction"><FontAwesomeIcon icon={faEye} className="tableActionIcon" />View</Link>
                                  <Link to={`/book-management/edit-book/${item?.id}`} className="tableAction"><FontAwesomeIcon icon={faEdit} className="tableActionIcon" />Edit</Link>

                                </Dropdown.Menu>
                              </Dropdown>
                            </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </CustomTable>
                    <CustomPagination
                      showing={currentItems?.length}
                      itemsPerPage={itemsPerPage}
                      totalItems={data?.length}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <CustomModal
            autoClose={true}
            show={edit}
            success={success}
            close={() => setEdit(false)}
            heading={modalHeading}
          ></CustomModal>

          <CustomModal
            show={showModal}
            close={() => {
              setShowModal(false);
            }}
            action={inActive}
            heading="Are you sure you want to mark this user as inactive?"
          />
          <CustomModal
            show={showModal2}
            close={() => {
              setShowModal2(false);
            }}
            success
            heading="Marked as Inactive"
          />

          <CustomModal
            show={showModal3}
            close={() => {
              setShowModal3(false);
            }}
            action={ActiveMale}
            heading="Are you sure you want to mark this user as Active?"
          />
          <CustomModal
            show={showModal4}
            close={() => {
              setShowModal4(false);
            }}
            success
            heading="Marked as Active"
          />
        </div>
      </DashboardLayout>
    </>
  );
};
