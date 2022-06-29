import React, { useState } from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import diagnosis from "../../imgs/diagnosis.webp";
import DiagnosisDialog from "./DiagnosisDialog";
const Diagnosis = () => {
  const [openDiagnosisDialog, setOpenDiagnosisDialog] = useState(false);
  return (
    <>
      <Grid item xs={12} textAlign="center" sx={{ py: 10, mt: 20 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          아이가 아픈가요?
        </Typography>
        <Typography>식물 잎을 촬영하고 진단 결과를 받아보세요.</Typography>
        <Button
          color="success"
          variant="outlined"
          size="large"
          sx={{
            mt: 3,
            border: "0",
            bgcolor: "#64a68a",
            color: "white",
            ":hover": {
              bgcolor: "#64a68a",
              color: "white",
            },
          }}
          onClick={() => {
            setOpenDiagnosisDialog(true);
          }}
        >
          진단하러 가기
        </Button>
      </Grid>
      <DiagnosisDialog
        openDiagnosisDialog={openDiagnosisDialog}
        setOpenDiagnosisDialog={setOpenDiagnosisDialog}
      />
    </>
  );
};

export default Diagnosis;
