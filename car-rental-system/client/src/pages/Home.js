import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { getAllCars } from "../redux/actions/carsActions";
import { Col, Row, DatePicker, Button, Card } from "antd";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import moment from "moment";

const { RangePicker } = DatePicker;

function Home() {
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

  function setFilter(values) {
    const selectedFrom = moment(values[0], "MMM DD yyyy HH:mm");
    const selectedTo = moment(values[1], "MMM DD yyyy HH:mm");

    const filteredCars = cars.filter((car) => {
      if (car.bookedTimeSlots.length === 0) return true;

      return !car.bookedTimeSlots.some((booking) =>
        selectedFrom.isBetween(booking.from, booking.to) ||
        selectedTo.isBetween(booking.from, booking.to) ||
        moment(booking.from).isBetween(selectedFrom, selectedTo) ||
        moment(booking.to).isBetween(selectedFrom, selectedTo)
      );
    });

    setTotalcars(filteredCars);
  }

  return (
    <DefaultLayout>
      <div className="home-header">
        <h2>🚗 Find Your Perfect Ride</h2>
        <RangePicker 
          showTime={{ format: "HH:mm" }} 
          format="MMM DD yyyy HH:mm" 
          onChange={setFilter}
          className="date-picker"
        />
      </div>

      {loading && <Spinner />}

      <Row justify="center" gutter={[24, 24]}>
        {totalCars.map((car) => (
          <Col lg={6} sm={24} xs={24} key={car._id}>
            <Card
              hoverable
              cover={<img alt={car.name} src={car.image} className="car-image" />}
              className="car-card"
            >
              <div className="car-details">
                <h3 className="car-name">{car.name}</h3>
                <p className="rent-price">💰 Rent: ₹{car.rentPerHour} / hour</p>
                <Button className="book-btn">
                  <Link to={`/booking/${car._id}`} style={{ color: "white" }}>
                    Book Now
                  </Link>
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* 🌟 Stylish CSS */}
      <style jsx="true">{`
        .home-header {
          text-align: center;
          margin-bottom: 20px;
          background: linear-gradient(135deg, #1890ff, #001529);
          padding: 20px;
          border-radius: 8px;
          color: white;
        }
        .date-picker {
          width: 100%;
          max-width: 400px;
          margin-top: 10px;
        }
        .car-card {
          border-radius: 10px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease-in-out;
          overflow: hidden;
        }
        .car-card:hover {
          transform: translateY(-5px);
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
        .book-btn {
          width: 100%;
          background: linear-gradient(90deg, #ff4d4f, #ff7b7b);
          border: none;
          color: white;
          font-weight: bold;
          padding: 10px;
          border-radius: 5px;
        }
        .book-btn:hover {
          opacity: 0.9;
        }
      `}</style>
    </DefaultLayout>
  );
}

export default Home;
