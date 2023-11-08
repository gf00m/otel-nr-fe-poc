import React from "react";
import { Col, Row, Button } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  // trace,
  context,
  propagation,
} from "@opentelemetry/api";
import * as api from "../config/api"

const PyStack = () => {

  const [loadings, setLoadings] = React.useState(false);
  const [netWorkMsg, setNetWorkMsg] = React.useState("");
  const navigate = useNavigate();

  const makeApiCall = () => {

    let output = {}
    propagation.inject(context.active(), output);

    axios.get(api.python,
      { headers: output }
    )
      .then((res) => {
        setLoadings(false);
        setNetWorkMsg(`Success: ${res?.data}`);
        return res.data;
      })
      .catch((e) => {
        setLoadings(false);
        setNetWorkMsg(e.message);
      });

    setLoadings(false);
  };

  const enterLoading = () => {
    setLoadings(true);
    makeApiCall();
  };

  return (
    <div
      style={{ border: "1px solid #ccc", padding: "10px 20px", margin: "10px" }}
    >
      <p style={{ paddingBottom: "5px", fontWeight: "bold", color: "#5e5e5e" }}>
        Python Stack
      </p>
      <Row gutter={32}>
        <Col className="gutter-row" span={10}>
          <Button
            type="primary"
            loading={loadings}
            onClick={() => enterLoading()}
            style={{ margin: "10px 0" }}
          >
            Request API call
          </Button>
          <Button
            type="primary"
            loading={loadings}
            onClick={() => navigate("/")}
            style={{ margin: "10px 0 10px 10px" }}
          >
            Redirect to home
          </Button>
        </Col>
        {!loadings && (
          <Col className="gutter-row" span={10}>
            <p> {netWorkMsg} </p>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default PyStack;
