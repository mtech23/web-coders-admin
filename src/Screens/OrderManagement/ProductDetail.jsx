import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomButton from "../../Components/CustomButton";
import { appTitle } from "../../utils/commonUtils";
import { getEntity } from "../../services/commonServices";

export const OrderDetails = () => {
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
      const response = await getEntity(`/view-qoute-request/${id}`);

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
                Order Details
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
                <div className="col-xl-4 col-md-6 mb-4">
                  <div className="productInfo">
                    <h5 className="text-capitalize">Name</h5>
                    <p className="text-capitalize">
                      {data?.name ? data?.name : "Not Available"}
                    </p>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 mb-4">
                  <div className="productInfo">
                    <h5 className="text-capitalize">Email</h5>
                    <p className="text-capitalize">
                      {data?.email ? data?.email : "Not Available"}
                    </p>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 mb-4">
                  <div className="productInfo">
                    <h5 className="text-capitalize">Phone</h5>
                    <p className="text-capitalize">
                      {data?.phone ? data?.phone : "Not Available"}
                    </p>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 mb-4">
                  <div className="productInfo">
                    <h5 className="text-capitalize">Message</h5>
                    <p className="text-capitalize">
                      {data?.message ? data?.message : "Not Available"}
                    </p>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 mb-4">
                  <div className="productInfo">
                    <h5 className="text-capitalize">Product Id</h5>
                    <p className="text-capitalize">
                      {data?.product_id ? data?.product_id : "Not Available"}
                    </p>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 mb-4">
                  <div className="productInfo">
                    <h5 className="text-capitalize">Product Variant Id</h5>
                    <p className="text-capitalize">
                      {data?.product_variant_id
                        ? data?.product_variant_id
                        : "Not Available"}
                    </p>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 mb-4">
                  <div className="productInfo">
                    <h5 className="text-capitalize">Website Purpose</h5>
                    <p className="text-capitalize">
                      {data?.website_purpose
                        ? data?.website_purpose
                        : "Not Available"}
                    </p>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 mb-4">
                  <div className="productInfo">
                    <h5 className="text-capitalize">Target Audience</h5>
                    <p className="text-capitalize">
                      {data?.target_audience
                        ? data?.target_audience
                        : "Not Available"}
                    </p>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 mb-4">
                  <div className="productInfo">
                    <h5 className="text-capitalize">Website Goals</h5>
                    <p className="text-capitalize">
                      {data?.website_goals
                        ? data?.website_goals
                        : "Not Available"}
                    </p>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 mb-4">
                  <div className="productInfo">
                    <h5 className="text-capitalize">Desired Features</h5>
                    <p className="text-capitalize">
                      {data?.desired_features
                        ? data?.desired_features
                        : "Not Available"}
                    </p>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 mb-4">
                  <div className="productInfo">
                    <h5 className="text-capitalize">Existing Branding</h5>
                    <p className="text-capitalize">
                      {data?.existing_branding
                        ? data?.existing_branding
                        : "Not Available"}
                    </p>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 mb-4">
                  <div className="productInfo">
                    <h5 className="text-capitalize">Existing Content</h5>
                    <p className="text-capitalize">
                      {data?.existing_content
                        ? data?.existing_content
                        : "Not Available"}
                    </p>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 mb-4">
                  <div className="productInfo">
                    <h5 className="text-capitalize">Domain Name</h5>
                    <p className="text-capitalize">
                      {data?.domain_name ? data?.domain_name : "Not Available"}
                    </p>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 mb-4">
                  <div className="productInfo">
                    <h5 className="text-capitalize">Web Hosting</h5>
                    <p className="text-capitalize">
                      {data?.web_hosting ? data?.web_hosting : "Not Available"}
                    </p>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 mb-4">
                  <div className="productInfo">
                    <h5 className="text-capitalize">Pick Date</h5>
                    <p className="text-capitalize">
                      {data?.pick_date ? data?.pick_date : "Not Available"}
                    </p>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 mb-4">
                  <div className="productInfo">
                    <h5 className="text-capitalize">Decision Making</h5>
                    <p className="text-capitalize">
                      {data?.decision_making
                        ? data?.decision_making
                        : "Not Available"}
                    </p>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 mb-4">
                  <div className="productInfo">
                    <h5 className="text-capitalize">Communication</h5>
                    <p className="text-capitalize">
                      {data?.communication
                        ? data?.communication
                        : "Not Available"}
                    </p>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 mb-4">
                  <div className="productInfo">
                    <h5 className="text-capitalize">Theme</h5>
                    <p className="text-capitalize">
                      {data?.theme ? data?.theme : "Not Available"}
                    </p>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 mb-4">
                  <div className="productInfo">
                    <h5 className="text-capitalize">Variant Name</h5>
                    <p className="text-capitalize">
                      {data?.variantName ? data?.variantName : "Not Available"}
                    </p>
                  </div>
                </div>

                <div className="col-md-12 mb-4">
                  <div className="productInfo">
                    <h1 className="text-capitalize">Product</h1>
                    <hr />
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 mb-4">
                  <div className="productInfo">
                    <h5 className="text-capitalize">ID</h5>
                    <p className="text-capitalize">
                      {data?.product?.id ? data?.product?.id : "Not Available"}
                    </p>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 mb-4">
                  <div className="productInfo">
                    <h5 className="text-capitalize">Category Id</h5>
                    <p className="text-capitalize">
                      {data?.product?.category_id
                        ? data?.product?.category_id
                        : "Not Available"}
                    </p>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 mb-4">
                  <div className="productInfo">
                    <h5 className="text-capitalize">Title</h5>
                    <p className="text-capitalize">
                      {data?.product?.title
                        ? data?.product?.title
                        : "Not Available"}
                    </p>
                  </div>
                </div>

                

                <div className="col-xl-4 col-md-6 mb-4">
                  <div className="productInfo">
                    <h5 className="text-capitalize">Author</h5>
                    <p className="text-capitalize">
                      {data?.product?.author
                        ? data?.product?.author
                        : "Not Available"}
                    </p>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 mb-4">
                  <div className="productInfo">
                    <h5 className="text-capitalize">Link</h5>
                    <p className="text-capitalize">
                      <a href={`${data?.product?.base_url}`}>
                        {data?.product?.base_url
                          ? data?.product?.base_url
                          : "Not Available"}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 mb-4">
                  <div className="productInfo">
                    <h5 className="text-capitalize">Featured</h5>
                    <p className="text-capitalize">
                      {data?.product?.featured
                        ? data?.product?.featured
                        : "Not Available"}
                    </p>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 mb-4">
                  <div className="productInfo">
                    <h5 className="text-capitalize">Active</h5>
                    <p className="text-capitalize">
                      {data?.product?.active
                        ? data?.product?.active
                        : "Not Available"}
                    </p>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 mb-4">
                  <div className="productInfo">
                    <h5 className="text-capitalize">Description</h5>
                    <p className="text-capitalize">
                      {data?.product?.description
                        ? data?.product?.description
                        : "Not Available"}
                    </p>
                  </div>
                </div>

                <div className="col-md-12 mb-4">
                  <div className="productInfo">
                    <h1 className="text-capitalize">Product Variant</h1>
                    <hr />
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 mb-4">
                  <div className="productInfo">
                    <h5 className="text-capitalize">ID</h5>
                    <p className="text-capitalize">
                      {data?.productvariant?.id
                        ? data?.productvariant?.id
                        : "Not Available"}
                    </p>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 mb-4">
                  <div className="productInfo">
                    <h5 className="text-capitalize">Product Id</h5>
                    <p className="text-capitalize">
                      {data?.productvariant?.product_id
                        ? data?.productvariant?.product_id
                        : "Not Available"}
                    </p>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 mb-4">
                  <div className="productInfo">
                    <h5 className="text-capitalize">Variation Name</h5>
                    <p className="text-capitalize">
                      {data?.productvariant?.variation_name
                        ? data?.productvariant?.variation_name
                        : "Not Available"}
                    </p>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 mb-4">
                  <div className="productInfo">
                    <h5 className="text-capitalize">Variation Type</h5>
                    <p className="text-capitalize">
                      {data?.productvariant?.variation_type
                        ? data?.productvariant?.variation_type
                        : "Not Available"}
                    </p>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 mb-4">
                  <div className="productInfo">
                    <h5 className="text-capitalize">Variation Value</h5>
                    <p className="text-capitalize">
                      {data?.productvariant?.variation_value
                        ? data?.productvariant?.variation_value
                        : "Not Available"}
                    </p>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 mb-4">
                  <div className="productInfo">
                    <h5 className="text-capitalize">Link</h5>
                    <p className="text-capitalize">
                      <a href={`${data?.productvariant?.base_url}`}>
                        {data?.productvariant?.base_url
                          ? data?.productvariant?.base_url
                          : "Not Available"}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 mb-4">
                  <div className="productInfo">
                    <h5 className="text-capitalize">Active</h5>
                    <p className="text-capitalize">
                      {data?.productvariant?.active
                        ? data?.productvariant?.active
                        : "Not Available"}
                    </p>
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
