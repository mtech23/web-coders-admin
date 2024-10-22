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

export const TagsManagement = () => {
  const [data, setData] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState({});

  const [modalHeading, setModalHeading] = useState("");
  const [deleteState, setDeleteState] = useState(false);
  const [success, setSuccess] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate();

  const hanldeRoute = () => {
    navigate("/add-tag");
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // const filterData = data?.filter((item) =>
  //   item.title.toLowerCase().includes(inputValue.toLowerCase())
  // );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

  const ProductData = async () => {
    const response = await getEntity("/tags");
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
    await deleteEntity(`/tag/${id}`);
    setModalHeading("tag Delete successfully");
    setSuccess(true);
    setDeleteState(true);
    ProductData();
  };

  const maleHeaders = [
    {
      key: "id",
      title: "Id",
    },
    {
      key: "title",
      title: "Title",
    },
    {
      key: "actions",
      title: "Actions",
    },
  ];

  useEffect(() => {
    document.title = `${appTitle} | Tags Management`;
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
                    <h2 className="mainTitle">Tags Management</h2>
                  </div>
                  <div className="col-md-3 mb-2">
                    <div className="addUser">
                      <CustomButton
                        text="Add New Tag"
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
                            <td>{index + 1}</td>
                            <td className="text-capitalize">{item?.title}</td>
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
                                    to={`/tags-management/tag-details/${item.id}`}
                                  >
                                    <FontAwesomeIcon
                                      icon={faEye}
                                      className="tableActionIcon"
                                    />
                                    View
                                  </Link>
                                  <Link
                                    to={`/tags-management/edit-tag/${item.id}`}
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
            show={deleteState}
            success={success}
            close={() => setDeleteState(false)}
            heading={modalHeading}
          ></CustomModal>
        </div>
      </DashboardLayout>
    </>
  );
};
