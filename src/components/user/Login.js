import { Button, Card, Col, Form, Input, Row, Typography, Select } from "antd";
import React, { useState } from "react";
import styles from "./Login.module.css";

import { useDispatch } from "react-redux";
import { addUser } from "../../redux/rtk/features/user/userSlice";

import { toast } from "react-toastify";
import LoginTable from "../Card/LoginTable";

const Login = () => {
	const dispatch = useDispatch();
	const [loader, setLoader] = useState(false);
	const { Title } = Typography;

	const loginStyle = {
		position: 'relative', // Add relative positioning to the container
		height: '100vh', // Set a height to cover the entire viewport
	};

	const overlayStyle = {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(33, 150, 243, 0.8)', // Adjust the color and opacity as needed
		zIndex: 1, // Ensure the overlay is above other content
	};

	const backgroundImageStyle = {
		backgroundImage: `url('/assets/img/signInImage.png')`, // Use the imported background image
		backgroundSize: 'cover', // You can adjust this to control how the image is sized
		backgroundRepeat: 'no-repeat',
		height: '100%', // Set a height to cover the entire viewport
		zIndex: 0, // Place the background image below the overlay
	};

	const formContainerStyle = {
		position: 'relative', // Ensure the form container remains in the stacking context of the overlay
		zIndex: 2, // Place the form container above the overlay
	};

	const onFinish = async (values) => {
		const resp = await dispatch(addUser(values));
		if (resp.payload.message === "success") {
			setLoader(false);
			window.location.href = "/admin/dashboard";
		} else {
			setLoader(false);
		}
	};
	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
		setLoader(false);
		toast.error("Error at login Please try again");
	};

	return (

		<div style={loginStyle}>
			<div style={backgroundImageStyle}></div>
			<div style={overlayStyle}>
				<Row className='card-container'>
					<Col>
						<Row className='card-row'>
							<Col span={24}>
								<Card bordered={false} className={styles.card}>
									<Title level={4} className='gutter-row title-login text-center' span={6}>
										Sistem Informasi Kontroling<br/>Lembaga Pemasyarakatan Majalengka
									</Title>
									<div className='login-logo'>
										<div className='kemenkuham-logo'/>
										<div className='separator-logo'/>
										<div className='lp-logo'/>
									</div>
									<Form
										name='basic'
										labelCol={{
											span: 6,
										}}
										wrapperCol={{
											span: 16,
										}}
										onFinish={onFinish}
										onFinishFailed={onFinishFailed}
										autoComplete='off'>
										<Form.Item
											className='mb-5'
											label='Username'
											name='userName'
											rules={[
												{
													required: true,
													message: "Please input your userName!",
												},
											]}>
											<Input />
										</Form.Item>

										<Form.Item
											className='mb-5'
											label='Password'
											name='password'
											rules={[
												{
													required: true,
													message: "Please input your password!",
												},
											]}>
											<Input.Password />
										</Form.Item>

										<Form.Item className={styles.submitBtnContainer}>
											<Button
												type='primary'
												htmlType='submit'
												loading={loader}
												onClick={() => setLoader(true)}>
												Submit
											</Button>
										</Form.Item>
									</Form>
								</Card>
							</Col>
						</Row>
					</Col>
				</Row>
			</div>

		</div>


	);
};

export default Login;
