import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../redux/actions/bookingActions";
import { Col, Row, Card, Tag } from "antd";
import Spinner from '../components/Spinner';
import moment from "moment";

function UserBookings() {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.bookingsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(getAllBookings());
  }, []);

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <h2 className="page-title">🚗 My Bookings</h2>
      <Row justify="center" gutter={[24, 24]}>
        <Col lg={16} sm={24}>
          {bookings.filter(o => o.user === user._id).map((booking) => {
            return (
              <Card
                key={booking._id}
                className="booking-card"
                hoverable
                bordered={false}
              >
                <Row gutter={[16, 16]} align="middle">
                  {/* Car Image */}
                  <Col lg={6} sm={24} className="image-container">
                    <img
                      src={booking.car.image}
                      alt={booking.car.name}
                      className="car-image"
                    />
                  </Col>

                  {/* Booking Details */}
                  <Col lg={12} sm={24}>
                    <h3 className="car-name">{booking.car.name}</h3>
                    <p><b>Total Hours:</b> {booking.totalHours} hrs</p>
                    <p><b>Rent per Hour:</b> ₹{booking.car.rentPerHour}</p>
                    <p><b>Total Amount:</b> ₹{booking.totalAmount}</p>
                    <p><b>Transaction ID:</b> {booking.transactionId}</p>
                  </Col>

                  {/* Booking Time & Status */}
                  <Col lg={6} sm={24} className="time-status">
                    <Tag color="blue">From: {moment(booking.bookedTimeSlots.from).format('LLL')}</Tag>
                    <Tag color="red">To: {moment(booking.bookedTimeSlots.to).format('LLL')}</Tag>
                    <p className="date-booked">
                      📅 Booked on: {moment(booking.createdAt).format('MMM DD, YYYY')}
                    </p>
                  </Col>
                </Row>
              </Card>
            );
          })}
        </Col>
      </Row>

      {/* 🌟 Stylish CSS */}
      <style jsx="true">{`
        .page-title {
          text-align: center;
          margin-top: 20px;
          font-size: 26px;
          font-weight: bold;
          color: #001529;
        }
        .booking-card {
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease-in-out;
          background: white;
        }
        .booking-card:hover {
          transform: scale(1.02);
          box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
        }
        .image-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .car-image {
          width: 100%;
          border-radius: 10px;
          max-height: 140px;
          object-fit: cover;
        }
        .car-name {
          font-size: 20px;
          font-weight: bold;
          color: #1890ff;
        }
        .time-status {
          text-align: right;
        }
        .date-booked {
          font-size: 14px;
          font-weight: bold;
          color: #555;
        }
      `}</style>
    </DefaultLayout>
  );
}

export default UserBookings;
