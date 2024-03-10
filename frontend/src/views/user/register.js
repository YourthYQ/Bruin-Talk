import React from 'react'
import { Button, message, Form, Input, Tooltip, Checkbox } from "antd";
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import './style.css'
import api from "../../http/api";
import bruinImage from "./bruin-image.png"
import laDay from './la-day.jpg';
import laNight from './la-night.jpg';
import { useTheme } from '../../context/ThemeContext'; 
import dayTheme from './day-theme.png'; 
import nightTheme from './night-theme.png'; 

export default function Register() {
  const [messageApi, contextHolder] = message.useMessage();
  const key = "updatable";
  const openMessage = () => {
    messageApi.open({
      key,
      type: "loading",
      content: "Loading...",
    });
  };
  const onFinish = async (values) => {
    try {
      openMessage();
      const result = await api.register(values);
      if(result.code === 0){
        messageApi.open({
          key,
          type: 'success',
          content: 'Register successfully!',
          duration: 1,
        });
      }else{
        console.log(result);
        messageApi.open({
          key,
          type: 'error',
          content: result.msg,
          duration: 2,
        });
      }
      console.log("Success:", values);
    } catch (error) {}
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const { isNight, toggleTheme } = useTheme();

  return (
    <div 
      className="containerLogin"
      style={{
        backgroundImage: `url(${isNight ? laNight : laDay})`,
      }}
    >
      <div className="top-right-button">
        <button onClick={toggleTheme} className="circle-button">
          <img src={isNight ? nightTheme : dayTheme} alt="Change theme" />
        </button>
      </div>
      {contextHolder}
      <div 
        className='register box'
        style={isNight ? {
          background: '#ffffff'
          } 
          : {
            background: 'linear-gradient(to bottom, rgba(112, 179, 196, 0.20), rgba(255, 199, 164, 0.25))'
          }
        }
      
      >
        <img src={bruinImage} id="bruin-logo" alt="Bruin logo" />
        <br></br>
        <br></br>
        <br></br>
        <h2>Create your account</h2>
        <br></br>
        <p>and dive into Bruin Talk!</p>
        <h1></h1>
        <Form
          name="basic"
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Enter your username',
              },
            ]}
          >
            <Input
              placeholder="How do I address you?"
              prefix={<UserOutlined className="site-form-item-icon" />}
              suffix={
                <Tooltip title="Call your name!">
                  <InfoCircleOutlined
                    style={{
                      color: 'rgba(0,0,0,.45)',
                    }}
                  />
                </Tooltip>
              }
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Secret here!',
              },
            ]}
          >
            <Input.Password 
              placeholder="Back up your password!"
            />
          </Form.Item>
          <Form.Item
            style={{ margin: "0px!important" }}
            wrapperCol={{
              offset: 0,
              span: 24,
            }}
          >
            <Button type="primary" htmlType="submit" className="z_btn">
              <strong>CONTINUE</strong>
            </Button>
          </Form.Item>
          <Form.Item
          >
            Have an account?
            <Link 
              to={"/user/login"} 
              style={{ 
                color: isNight ? 'blue' : 'white' 
              }}
            > Log in here</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}