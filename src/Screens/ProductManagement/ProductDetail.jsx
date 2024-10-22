import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import { getEntity } from "../../services/commonServices";

export const ProductDetails = () => {
  const imgUrl = process.env.REACT_APP_IMG_URL;
  const { id } = useParams();
  const [data, setData] = useState({});

  const getProductDetail = async () => {
    try {
      const response = await getEntity(`/view-product/${id}`);
      setData(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  console.log("dataaaaaaaaaaaaaaaaaa", data);

  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <h2 className="mainTitle">
                <BackButton />
                Product Details
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

                <div className="row">
                  <div className="col-md-12">
                    <h1>Slide Images</h1>
                  </div>
                  {data?.slideImages?.map((item, index) => {
                    return (
                      <div className="col-md-3 mb-4">
                        <div className="slide_image-preview">
                          <div className="slide_img">
                            <img
                              src={`${imgUrl}/${item.image}`}
                              alt=""
                              className="img-fluid"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="col-md-12">
                    <h1>Theme Data</h1>
                  </div>
                <div className="col-md-6 mb-4">
                  <div className="productInfo">
                    <h5 className="text-capitalize">Name</h5>
                    <p className="text-capitalize">{data?.title}</p>
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <div className="productInfo">
                    <h5 className="text-capitalize">Description</h5>
                    <p className="text-capitalize">{data?.description}</p>
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <div className="productInfo">
                    <h5 className="text-capitalize">Author</h5>
                    <p className="text-capitalize">{data?.author}</p>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="productInfo">
                    <h5 className="text-capitalize">Category</h5>
                    <p className="text-capitalize">{data?.category}</p>
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <div className="productInfo">
                    <h5 className="text-capitalize">Base URL</h5>
                    <p className="text-capitalize">
                      <a href={data?.base_url}>{data?.base_url}</a>
                    </p>
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <div className="productInfo">
                    <h5 className="text-capitalize">Featured</h5>
                    <p className="text-capitalize">{data?.featured}</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <h1>Variations</h1>
                  </div>
                  {data?.themes?.map((item, index) => (
                    <div className="col-md-4 mb-4">
                      <div class="card">
                        <div class="card-body">
                          <h2 class="card-title">Variant {index + 1}</h2>
                          <div className="row">
                            <div className="mb-2 col-md-6">
                              <p class="card-text font-weight-bold m-0">
                                Variation name
                              </p>
                              <p class="card-text m-0">{item.variation_name}</p>
                            </div>
                            <div className="mb-2 col-md-6">
                              <p class="card-text font-weight-bold m-0">
                                Variation type
                              </p>
                              <p class="card-text m-0">{item.variation_type}</p>
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
                          {/* <div
                            class="btn primaryButton"
                            onClick={() => handleOpenVariant(item, index)}
                          >
                            Edit
                          </div> */}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="productInfo">
                      {/* <h5 className="text-capitalize">Thumbnail Image</h5> */}
                      <h1>Thumbnail Image</h1>
                      <div className="slide_image-preview">
                        <div className="slide_img">
                          <img
                            src={`${imgUrl}/${data?.thumbnail_image}`}
                            alt=""
                            className="img-fluid"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};
