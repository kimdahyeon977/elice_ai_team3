import {
  Typography,
  CardActions,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as Api from "../../api";
const MyScheduleCard = ({ myPlant, setMyPlants }) => {
  const navigate = useNavigate();
  const watering = async () => {
    await Api.post(`plants/${myPlant.plantId}/${myPlant._id}`, {
      isChecked: true,
    });
    await Api.get("schedules").then((res) => {
      setMyPlants(res.data);
    });
  };
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        maxWidth: "700px",
        mx: "auto",
      }}
    >
      <CardContent
        onClick={() => {
          navigate(`/mygarden/${myPlant.plantId}`);
        }}
      >
        <Typography>
          오늘은{" "}
          <Typography component="span" sx={{ fontWeight: "bold" }}>
            {myPlant.nickname}
          </Typography>{" "}
          물 주는 날입니다.
        </Typography>
        <Typography variant="subtitle1">{myPlant.species}</Typography>
      </CardContent>

      <CardActions>
        {!myPlant.isChecked ? (
          <Button onClick={watering}>물주기</Button>
        ) : (
          <Button
            onClick={() => {
              alert("이미 물을 주셨습니다.");
            }}
          >
            완료
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default MyScheduleCard;
