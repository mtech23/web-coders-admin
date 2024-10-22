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
import {
  getEntity,
  deleteEntity,
  updateEntity,
  addEntity,
} from "../../services/commonServices";
import { imgUrl } from "../../utils/convertToFormData";
import Chip from "../../Components/chip";
import { appTitle } from "../../utils/commonUtils";

export const UsersManagement = () => {
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const inActive = () => {
    setShowModal(false);
    setShowModal2(true);
  };
  const ActiveMale = () => {
    setShowModal3(false);
    setShowModal4(true);
  };

  // const filterData = data?.filter((item) =>
  //   item.title.toLowerCase().includes(inputValue.toLowerCase())
  // );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

  const ProductData = async () => {
    const response = await getEntity("/user-listing");
    if (response) {
      setData(response.data);
    }
    console.log(response);
  };

  const handleDropdownToggle = (userId, dropdownType) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [userId]: {
        ...prevState[userId],
        [dropdownType]: !prevState[userId]?.[dropdownType],
      },
    }));
  };

  const handleDelete = async (id) => {
    await deleteEntity(`admin/delete-product/${id}`);
    ProductData();
  };

  const handleUpdateStatus = async (id) => {
    try {
      await addEntity(`/handle-status/${id}`, {});
      ProductData();
    } catch (error) {
      console.log("error", error);
    }
  };

  const maleHeaders = [
    {
      key: "id",
      title: "Id",
    },
    {
      key: "image",
      title: "Image",
    },
    {
      key: "Name",
      title: "Name",
    },
    {
      key: "Email",
      title: "Email",
    },
    {
      key: "status",
      title: "Status",
    },
    {
      key: "actions",
      title: "Actions",
    },
  ];
  useEffect(() => {
    document.title = `${appTitle} | Product Management`;
    ProductData();
  }, []);
  
  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="row mb-3 justify-content-between">
                  <div className="col-md-6 mb-2">
                    <h2 className="mainTitle">Users Management</h2>
                  </div>
                  {/* <div className="col-md-3 mb-2">
                    <div className="addUser">
                      <CustomButton
                        text="Add New Product"
                        variant="primaryButton"
                        onClick={hanldeRoute}
                      />
                      <CustomInput
                        type="text"
                        placeholder="Search Here..."
                        value={inputValue}
                        inputClass="mainInput"
                        onChange={handleChange}
                      />
                    </div>
                  </div> */}
                </div>
                <div className="row mb-3">
                  <div className="col-12">
                    <CustomTable headers={maleHeaders}>
                      <tbody>
                        {currentItems?.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td><img src={`${imgUrl}/${item?.image}`} className="avatarIcon" alt="" /></td>
                            <td className="text-capitalize">{item?.name}</td>
                            <td>{item?.email}</td>
                            <td className="activeAndDeactivate">
                              {item?.status == "Suspended" ? (
                                <p className="text-danger">Inactive</p>
                              ) : (
                                <p className="text-success">Active</p>
                              )}
                              <Dropdown className="tableDropdown">
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
                                  <div className="tableAction">
                                    {item?.status == "Suspended" ? (
                                      <div
                                        onClick={() =>
                                          handleUpdateStatus(item.id)
                                        }
                                      >
                                        Activate
                                      </div>
                                    ) : item?.status == "Active" ? (
                                      <div
                                        onClick={() =>
                                          handleUpdateStatus(item.id)
                                        }
                                      >
                                        Deactivate
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                            <td>
                              <Dropdown
                                className="tableDropdown"
                                show={dropdownOpen[item.id]?.actions}
                                onToggle={() =>
                                  handleDropdownToggle(item.id, "actions")
                                }
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
                                    to={`/users-management/user-details/${item.id}`}
                                  >
                                    <FontAwesomeIcon
                                      icon={faEye}
                                      className="tableActionIcon"
                                    />
                                    View
                                  </Link>
                                  {/* <Link
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
                                  </Link> */}
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
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
