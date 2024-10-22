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

export const OrderManagement = () => {
  const [data, setData] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [inputValue, setInputValue] = useState("");
  const statusOptions = [
    {
      id: 0,
      value: "Pending",
      className: "text-danger",
    },
    {
      id: 1,
      value: "In Progress",
      className: "text-info",
    },
    {
      id: 2,
      value: "Fulfilled",
      className: "text-success",
    },
  ];

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
    const response = await getEntity("/qoute-requests");
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

  const handleStatusUpdate = async (entity_id, status_id) => {
    await addEntity(`/update-request-status/${entity_id}`, {
      request_status: status_id,
    });
    ProductData();
  };

  const handleUpdateStatus = async (status, id) => {
    setDropdownOpen("");
    try {
      const response = await updateEntity(`admin/order/update/${id}`, {
        order_status: status,
      });

      console.log("status", response);
      ProductData();
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const maleHeaders = [
    {
      key: "id",
      title: "Id",
    },
    {
      key: "email",
      title: "Email",
    },
    {
      key: "username",
      title: "Name",
    },

    {
      key: "phone",
      title: "Phone",
    },
    {
      key: "message",
      title: "Message",
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

  const renderOption = (id) => {
    const matchedItem = statusOptions.find((item) => item.id === id);
    return matchedItem ? (
      <p className={matchedItem.className}>{matchedItem.value}</p>
    ) : null;
  };
  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="row mb-3 justify-content-between">
                  <div className="col-md-6 mb-2">
                    <h2 className="mainTitle">Order Management</h2>
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
                            <td className="text-capitalize">{item?.email}</td>
                            <td>{item?.name}</td>
                            <td>{item?.phone}</td>
                            <td>{item?.message}</td>
                            <td className="activeAndDeactivate">
                              {renderOption(item.request_status)}
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
                                  {statusOptions.map((status) => (
                                    <Link
                                      key={status.id}
                                      className="tableAction"
                                      onClick={() =>
                                        handleStatusUpdate(item.id, status?.id)
                                      }
                                    >
                                      {status.value}
                                    </Link>
                                  ))}
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                            {/* <td>{item.in_stock ? "Yes" : "No"}</td> */}
                            {/* <td>
                              {" "}
                              <Chip
                                stock={item.stock_value}
                                isStockItem={item.in_stock}
                              />
                            </td> */}
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
                                    to={`/order-management/order-details/${item.id}`}
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
