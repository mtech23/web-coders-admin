import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomButton from "../../Components/CustomButton";
import { appTitle } from "../../utils/commonUtils";
import { getEntity } from "../../services/commonServices";
import { imgUrl } from "../../utils/convertToFormData";

export const UserDetails = () => {
  const { id } = useParams();

  const base_url = "https://custom.mystagingserver.site/Tim-WDLLC/public/";

  const [data, setData] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [message, setMessage] = useState(false);

  const inActive = () => {
    setShowModal(false);
    setShowModal2(true);
  };
  const Active = () => {
    setShowModal3(false);
    setShowModal4(true);
  };

  const orderDetail = async () => {
    try {
      const response = await getEntity(`/user-view/${id}`);
      setData(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    orderDetail();
  }, []);

  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <h2 className="mainTitle">
                <BackButton />
                users Details
              </h2>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              {/* <div className="row mb-3 justify-content-end">
                <div className="col-lg-4 text-end order-1 order-lg-2 mb-3">
                  <button onClick={() => {
                    data?.status ? setShowModal(true) : setShowModal3(true)
                  }} className="notButton primaryColor fw-bold text-decoration-underline">Mark as {data?.status ? 'Inactive' : 'Active'}</button>
                  <span className={`statusBadge ${data?.status == 1 ? 'statusBadgeActive' : 'statusBadgeInactive'}`}>{data?.status == 1 ? 'Active' : 'Inactive'}</span>
                </div>
              </div> */}

              <div className="row">
                {/* <div className="col-md-6 mb-4">
                  <div className="productImage">
                    <img src={base_url + data?.image} />
                  </div>
                </div> */}

                <div className="col-md-6 mb-4">
                  <div className="productInfo">
                    <h5 className="text-capitalize">Profile</h5>
                    <div className="user_profile-img">
                      <img src={`${imgUrl}/${data?.image}`} alt="" />
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <div className="productInfo">
                    <h5 className="text-capitalize">Name</h5>
                    <p className="text-capitalize">{data?.name ? data?.name : "Not Available"}</p>
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <div className="productInfo">
                    <h5 className="text-capitalize">Email</h5>
                    <p className="text-capitalize">{data?.email ? data?.email : "Not Available"}</p>
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <div className="productInfo">
                    <h5 className="text-capitalize">Phone Number</h5>
                    <p className="text-capitalize">{data?.phone_number ? data?.phone_number : "Not Available"}</p>
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <div className="productInfo">
                    <h5 className="text-capitalize">Auth ID</h5>
                    <p className="text-capitalize">{data?.auth_id ? data?.auth_id : "Not Available"}</p>
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <div className="productInfo">
                    <h5 className="text-capitalize">Role</h5>
                    {data?.role == 1 ? (
                      <p className="text-capitalize text-success">Admin</p>
                    ) : (
                      <p className="text-capitalize">User</p>
                    )}
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <div className="productInfo">
                    <h5 className="text-capitalize">Status</h5>
                    {data?.status == 0 ? (
                      <p className="text-danger">UnActive</p>
                    ) : (
                      <p className="text-success">Active</p>
                    )}
                  </div>
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
          action={Active}
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
      </DashboardLayout>
    </>
  );
};
