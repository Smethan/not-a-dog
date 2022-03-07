import { Form, Button, InputGroup } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import goldenretriever from "../goldenretriever.jpeg";
import Predictions from "@aws-amplify/predictions";
import { ProtectiveEquipmentSummarizationAttributes } from "@aws-sdk/client-rekognition";

const DogForm = () => {
  const [inputFile, setInputFile] = useState();
  const [previewFile, setPreviewFile] = useState();
  const [isDog, setIsDog] = useState(true);
  useEffect(() => {
    setInputFile(document.getElementById("myInput"));
  }, []);

  const isADog = (file) => {
    // console.log(file);
    setPreviewFile(URL.createObjectURL(file));
    //Insert AWS code stuff here

    let labelArray = [];
    Predictions.identify({
      labels: {
        source: {
          file,
        },
        type: "LABELS",
      },
    })
      .then((response) => {
        // console.log(response);
        const { labels } = response;
        labels.forEach((object) => {
          const { name } = object;
          labelArray.push(name);
        });
        setIsDog(labelArray.includes("Dog"));
      })
      .catch((err) => console.log({ err }));
  };

  const clickTheInvisButton = () => {
    inputFile?.click();
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="col-md-12"
          style={{ padding: "0px", textAlign: "left" }}
        >
          <div
            className="page-header"
            style={{
              backgroundColor: "cyan",
              paddingTop: "2px",
              paddingBottom: "2px",
            }}
          >
            <h1 style={{ marginLeft: "5px" }}>Dog or Not!</h1>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <h1 className="text-center">Is it a Dog?</h1>

          {isDog ? (
            <h4 style={{ color: "green" }}>Yes, it is a dog!</h4>
          ) : (
            <h4 style={{ color: "red" }}>No, it is not a dog!</h4>
          )}

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              maxHeight: "60vh",
              justifyContent: "center",
            }}
          >
            <img
              src={previewFile ? previewFile : goldenretriever}
              style={{ objectFit: "scale-down" }}
            />
          </div>
          <br />
          <div className="d-grid gap-2">
            <Button
              type="button"
              variant="primary"
              size="lg"
              onClick={clickTheInvisButton}
            >
              Upload Image
            </Button>

            <input
              id="myInput"
              className="d-none"
              type={"file"}
              onChange={(e) => {
                isADog(e.target.files[0]);
              }}
            />
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
};

export default DogForm;
