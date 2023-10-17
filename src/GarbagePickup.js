import { useRef, useEffect, useState } from "react";
import io from "socket.io-client";
import { FaTrashAlt, FaPlay, FaStop, FaPause } from "react-icons/fa";
import "./garbageStyle.css";

const socket = io.connect("http://localhost:3000/");

const GarbagePickup = (props) => {
  const [trashCanCss, setTrashCanCss] = useState("trash-icon");
  const [modelStatus, setModelStatus] = useState("model not loaded");
  const [garbageStatus, setGarbageStatus] = useState(
    "Waiting for Garbage truck.",
  );
  useEffect(() => {
    socket.on("pickup_status", (data) => {
      if (data === "picking_up") {
        setTrashCanCss("trash-icon trash-icon-empty");
        setGarbageStatus("Emptying trash can!");
      } else {
        setTrashCanCss("trash-icon");
        setGarbageStatus("Emptying trash can!");
      }
    });

    socket.on("model_status", (data) => {
      setModelStatus(data);
    });
  }, [socket]);

  return (
    <>
      <div className="container-small-app-viewer">
        <div className="top-container">
          <div className="top-title">
            <h2>Garbage Can Pickup</h2>
            <p>{modelStatus}</p>
          </div>
        </div>
        <div className="graphic-display">
          <p>{garbageStatus}</p>
          <FaTrashAlt className={trashCanCss} />
        </div>
      </div>
    </>
  );
};

export default GarbagePickup;
