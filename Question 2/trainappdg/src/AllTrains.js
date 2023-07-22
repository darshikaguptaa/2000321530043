import React from "react";
import Train from "./Train";
import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

const AllTrains = () => {
    const [trains, setTrains] = useState([]);
    const headers = {
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTAwMTI1OTgsImNvbXBhbnlOYW1lIjoiYWJjZCIsImNsaWVudElEIjoiMzZlMzkwZmQtNTMyMi00ZWUwLWE3ZDItM2MxMmI1M2Y1MGJiIiwib3duZXJOYW1lIjoiIiwib3duZXJFbWFpbCI6IiIsInJvbGxObyI6IjIwMDAzMjE1MzAwNDMifQ.xx-o067Z3b-Qnc7XGNO17xgHoZl08lyTeyd6RyvmGMI",
    };
    const trainsData = async () => {
        try {
            const country = await axios.get(
                "http://20.244.56.144:80/train/trains",
                { headers }
            );
            setTrains(country.data);
            console.log(country.data);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        trainsData();
    }, []);

    const trainDetails = () => {
        <Train />;
        console.log("hello");
    };

    return (
        <div className="alltrains">
            {trains &&
                trains.map((train) => {
                    return (
                        <div
                            className="train"
                            onClick={trainDetails}
                            key={train.name}
                        >
                            <h3>{train.trainName}</h3>
                            <h4>{train.price.AC}</h4>
                        </div>
                    );
                })}
        </div>
    );
};

export default AllTrains;
