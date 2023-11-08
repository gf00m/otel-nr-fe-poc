import React from 'react'
import { UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { Col, Row, Button } from 'antd';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    // trace,
    context,
    propagation,
} from "@opentelemetry/api";
import * as api from "../config/api"

// const tracer = trace.getTracer('my-service-tracer')

const JavaStack = () => {

    const [loadings, setLoadings] = React.useState(false);
    const [uname, setUname] = React.useState("")
    const [netWorkMsg, setNetWorkMsg] = React.useState("")
    const [err, setErr] = React.useState(false);
    const navigate = useNavigate();


    const makeApiCall = () => {

        let output = {}
        propagation.inject(context.active(), output);

        setNetWorkMsg("")

        axios.get(api.java,
            { headers: output }
        )
            .then((res) => {
                console.log(res?.data)
                setLoadings(false);
                setNetWorkMsg(`Success: `)
                return res.data
            }).catch((e) => {
                setLoadings(false);
                setNetWorkMsg(e.message)
            })

        setLoadings(false)

    }

    const enterLoading = () => {
        if (uname) {
            setErr(false)
            setLoadings(true);
            makeApiCall(uname)
        }
        else {
            setErr(true)
        }
    };

    const handleName = (val) => {
        setUname(val)
        val ? setErr(false) : setErr(true)
    }

    return (
        <div style={{ border: "1px solid #ccc", padding: "10px 20px", margin: "10px" }}>
            <p style={{ paddingBottom: "5px", fontWeight: "bold", color: "#5e5e5e" }}>Java Stack</p>
            <Row gutter={32}>

                <Col className="gutter-row" span={10}>
                    <Input size="large" placeholder="Enter the name" prefix={<UserOutlined />} allowClear onChange={(e) => { handleName(e.target.value) }} />
                    {err ? <p style={{ color: "red", fontSize: "12px" }}>*Required</p> : null}
                    <Button type="primary" loading={loadings} onClick={() => enterLoading()} style={{ margin: "10px 0" }}>
                        Request API call
                    </Button>
                    <Button type="primary" loading={loadings} onClick={() => navigate('/ts-stack')} style={{ margin: "10px 0 10px 10px" }}>
                        Redirect to TS
                    </Button>
                </Col>
                <Col className="gutter-row" span={10}>
                    <p> {netWorkMsg} </p>
                </Col>
            </Row>
        </div>
    )
}

export default JavaStack