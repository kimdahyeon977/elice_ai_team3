import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  FormControl,
  InputLabel,
  InputAdornment,
  Box,
  Input,
} from "@mui/material";

import * as Api from "../../api";
import { useParams } from "react-router-dom";
import CommunityComment from "./CommunityComment";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";

const CommunityCommentModal = ({ openAddComment, setOpenAddComment }) => {
  const [comment, setComment] = useState("");
  const [contentList, setContentList] = useState([]);
  const [page, setPage] = useState(1);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false); //로딩 스피너
  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    if (page >= 0) {
      getComment();
    }
  }, [page]);

  const getComment = useCallback(async () => {
    setIsLoading(true);
    // Get Data Code
    const res = await Api.get(`comments?postId=${id}&page=${page}&perPage=15`);
    if (res.data.comments) {
      setContentList((prev) => [...prev, ...res.data.comments]);
      setLastPage(res.data.lastPage);
    } else {
      console.log(res);
    }
    setIsLoading(false);
  }, [page]);

  const postComment = async () => {
    try {
      await Api.post(`comments`, {
        postId: id,
        content: comment,
      });

      const res = await Api.get(`comments?postId=${id}&page=1&perPage=15`);
      setPage(1);
      setContentList(res.data.comments);
      setComment("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      postComment();
    }
  };

  const handleClick = async () => {
    setPage((prev) => prev + 1);
  };

  return (
    <Dialog
      open={openAddComment}
      fullWidth={true}
      onClose={() => {
        setOpenAddComment(false);
      }}
    >
      <DialogTitle sx={{ pt: 2, bgcolor: "white" }}>
        <IconButton
          aria-label="close"
          onClick={() => {
            setOpenAddComment(false);
          }}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ bgcolor: "white" }}>
          <DialogContentText
            align="center"
            sx={{ mt: 3, fontSize: "1rem", fontWeight: "bold" }}
          >
            댓글 목록
          </DialogContentText>
        </DialogContent>
        {/* <hr /> */}
      </DialogTitle>
      <Box sx={{ px: 3 }} component="form" autoComplete="off" noValidate>
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="standard-adornment-comment">
            댓글 달기...
          </InputLabel>
          <Input
            onKeyPress={handleOnKeyPress}
            value={comment}
            id="standard-adornment-comment"
            onChange={(e) => setComment(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <Button onClick={postComment}>게시</Button>
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>
      <Box sx={{ pt: 2 }}>
        {contentList?.map((content, i) => {
          return (
            <CommunityComment
              key={i}
              content={content}
              setContentList={setContentList}
              setPage={setPage}
            />
          );
        })}
      </Box>
      <Box display="flex" sx={{ justifyContent: "center", pb: 1 }}>
        {isLoading ? (
          <Box>
            <CircularProgress color="success" />
          </Box>
        ) : (
          <IconButton
            onClick={handleClick}
            sx={{
              color: "#212121",
              "&:hover": {
                backgroundColor: "transparent",
                color: "#212121",
              },
            }}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        )}
      </Box>
    </Dialog>
  );
};

export default CommunityCommentModal;
