import { Form, Button, InputGroup } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import goldenretriever from "../goldenretriever.jpeg";
import Predictions from "@aws-amplify/predictions";
import { ProtectiveEquipmentSummarizationAttributes } from "@aws-sdk/client-rekognition";

const DogForm = () => {
  const [inputFile, setInputFile] = useState();
  const [previewFile, setPreviewFile] = useState();
  const [isDog, setIsDog] = useState(true);
  const [isCalculating, setIsCalculating] = useState(false);
  useEffect(() => {
    setInputFile(document.getElementById("myInput"));
  }, []);

  const isADog = (file) => {
    // console.log(file);
    setPreviewFile(URL.createObjectURL(file));
    //Insert AWS code stuff here

    let labelArray = [];
    setIsCalculating(true);
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
        setIsCalculating(false);
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
              backgroundColor: "#40798C",
              paddingTop: "1vh",
              paddingBottom: "1vh",
              color: "#0b2027",
            }}
          >
            <h1 style={{ marginLeft: "1vw", fontWeight: "bold" }}>
              Dog or Not!
            </h1>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <h1 className="text-center" style={{ color: "#0b2027" }}>
            Is it a Dog?
          </h1>

          {isCalculating ? (
            <h4 style={{ color: "grey" }}>Calculating...</h4>
          ) : isDog ? (
            <h4 style={{ color: "green" }}>Yes, it is (probably) a dog!</h4>
          ) : (
            <h4 style={{ color: "red" }}>No, it is (probably) not a dog!</h4>
          )}

          <div
            style={{
              display: "block",
              height: "65vh",
              width: "80vw",
              justifyContent: "center",
              margin: "0 auto",
            }}
          >
            <img
              src={previewFile ? previewFile : goldenretriever}
              style={{
                objectFit: "contain",
                width: "100%",
                height: "100%",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
          </div>
          <br />
          <div
            className="d-grid gap-2"
            style={{ marginLeft: "20vw", marginRight: "20vw" }}
          >
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
      </div>
    </div>
  );
};

export default DogForm;
