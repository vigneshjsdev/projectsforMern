import { Col, Row, Form, Input, Upload, Button } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import Spinner from '../components/Spinner'
import { addCar } from '../redux/actions/carsActions'
import { UploadOutlined } from '@ant-design/icons';
function AddCar() {

    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.alertsReducer)
    const [file, setFile] = useState(null);


    // function onFinish(values){

    //    console.log(file);

    //     formData.append('file', file);
    //     formData.append('upload_preset', 'ml_default'); // If using services like Cloudinary
    //     formData.append('cloud_name', 'dn2g52ol9');

    //     // Example: Upload to Cloudinary or a custom backend
    //     fetch('https://api.cloudinary.com/v1_1/dn2g52ol9/image/upload', {
    //         method: 'POST',
    //         body: formData,
    //     }).then((response) => {
    //     response.json().then(data=>console.log(data));

    //     })

    //      values.bookedTimeSlots=[]

    //      dispatch(addCar(values))
    //      console.log(values)
    // }

    // function onFinish(values) {
    //     if (file) {
    //         const formData = new FormData();
    //         formData.append('file', file);
    //         formData.append('upload_preset', 'car'); // If using services like Cloudinary
    //         formData.append('cloud_name', 'dn2g52ol9');

    //         // Example: Upload to Cloudinary or a custom backend dn2g52ol9
    //         fetch('https://api.cloudinary.com/v1_1/dn2g52ol9/car', {
    //             method: 'POST',
    //             body: formData,
    //             mode:"no-cors"
    //         })
    //             .then((res) => res.json())
    //             .then((data) => {
    //                 console.log(data);
                    
    //                 values.image = data.url; // Update the image field with the uploaded URL
    //                 values.bookedTimeSlots = [];
    //                 dispatch(addCar(values));
    //                 // message.success('Car added successfully!');
    //             })
    //             .catch((error) => {
    //                 // message.error('Image upload failed!');
    //                 console.error(error);
    //             });
    //     } else {
    //         // message.error('Please upload an image file.');
    //     }
    // }

    function onFinish(values) {
        if (!file) {
            console.error("Please upload an image file.");
            return;
        }
    
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'car_upload'); // ✅ Ensure this preset exists in Cloudinary
    
        fetch('https://api.cloudinary.com/v1_1/dn2g52ol9/image/upload', {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Cloudinary Response:", data);
    
                if (data.secure_url) {
                    values.image = data.secure_url; // ✅ Use `secure_url` instead of `url`
                    values.bookedTimeSlots = [];
                    dispatch(addCar(values));
                    console.log("Car added:", values);
                } else {
                    console.error("Cloudinary upload failed:", data);
                }
            })
            .catch((error) => {
                console.error("Image upload error:", error);
            });
    }
    


    // const handleFileChange = (info) => {
    //     if (info.fileList && info.fileList.length > 0) {
    //         const latestFile = info.fileList[info.fileList.length - 1].originFileObj;
    //         if (latestFile) {
    //             setFile(latestFile); // Update the state with the latest file
    //         } else {
    //             // message.error('Failed to retrieve the file.');
    //         }
    //     } else {
    //         setFile(null); // Clear the file if none is selected
    //         // message.warning('No file selected.');
    //     }
    // };


    const handleFileChange = (info) => {
        if (info.fileList.length > 0) {
            const latestFile = info.fileList[info.fileList.length - 1].originFileObj;
            setFile(latestFile);
        } else {
            setFile(null);
        }
    };
    

    return (
        <DefaultLayout>
            {loading && (<Spinner />)}
            <Row justify='center mt-5'>
                <Col lg={12} sm={24} xs={24} className='p-2'>
                    <Form className='bs1 p-2' layout='vertical' onFinish={onFinish}>
                        <h3>Add New Car</h3>
                        <hr />
                        <Form.Item name='name' label='Car name' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='image' label='Image url' rules={[{ required: true }]}>
                            {/* <Input/> */}
                            <Upload
                                beforeUpload={() => false} // Prevent automatic upload
                                onChange={handleFileChange}
                                maxCount={1}
                                accept="image/*"
                            >
                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item name='rentPerHour' label='Rent per hour' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='capacity' label='Capacity' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='fuelType' label='Fuel Type' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>

                        <div className='text-right'>
                            <button className='btn1'>ADD CAR</button>
                        </div>

                    </Form>
                </Col>
            </Row>

        </DefaultLayout>
    )
}

export default AddCar
