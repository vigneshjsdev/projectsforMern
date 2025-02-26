import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { deleteCar, getAllCars } from "../redux/actions/carsActions";
import { Col, Row, Card, Button, Popconfirm, message } from "antd";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";

function AdminHome() {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalCars, setTotalcars] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, []);

  useEffect(() => {
    setTotalcars(cars);
  }, [cars]);

  return (
    <DefaultLayout>
      <div className="admin-header">
        <h2>🚗 Admin Panel</h2>
        <Button type="primary" size="large" icon={<PlusOutlined />}>
          <Link to="/addcar" style={{ color: "white" }}>Add Car</Link>
        </Button>
      </div>

      {loading && <Spinner />}

      <Row justify="center" gutter={[24, 24]}>
        {totalCars.map((car) => {
          return (
            <Col lg={6} sm={24} xs={24} key={car._id}>
              <Card
                hoverable
                cover={<img alt={car.name} src={car.image} className="car-image" />}
                className="car-card"
              >
                <div className="car-details">
                  <h3 className="car-name">{car.name}</h3>
                  <p className="rent-price">💰 Rent: ₹{car.rentPerHour} / hour</p>

                  <div className="action-buttons">
                    <Link to={`/editcar/${car._id}`}>
                      <Button shape="circle" icon={<EditOutlined />} className="edit-btn" />
                    </Link>

                    <Popconfirm
                      title="Are you sure to delete this car?"
                      onConfirm={() => dispatch(deleteCar({ carid: car._id }))}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button shape="circle" icon={<DeleteOutlined />} className="delete-btn" />
                    </Popconfirm>
                  </div>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>

      {/* 🌟 Stylish CSS */}
      <style jsx="true">{`
        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          background: #001529;
          padding: 20px;
          border-radius: 8px;
          color: white;
        }
        .car-card {
          border-radius: 10px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease-in-out;
        }
        .car-card:hover {
          transform: scale(1.05);
          box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
        }
        .car-image {
          height: 180px;
          object-fit: cover;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
        }
        .car-details {
          text-align: center;
          padding: 10px;
        }
        .car-name {
          font-size: 18px;
          font-weight: bold;
          color: #1890ff;
        }
        .rent-price {
          font-size: 16px;
          color: #555;
        }
        .action-buttons {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 10px;
        }
        .edit-btn {
          background-color: #52c41a;
          color: white;
          border: none;
        }
        .delete-btn {
          background-color: #ff4d4f;
          color: white;
          border: none;
        }
        .edit-btn:hover, .delete-btn:hover {
          opacity: 0.8;
        }
      `}</style>
    </DefaultLayout>
  );
}

export default AdminHome;
