import "./ImageWindow.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, Divider } from "@mui/material";
import { DropzoneArea } from "material-ui-dropzone";
import { CardHeader } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useState, useRef } from "react";
import placeholder from "../../images/placeholder-image.png";

const url = "https://projekt1-api.azurewebsites.net/api/HttpTrigger1";

export function ImageWindow() {
  const [file, setFile] = useState(null);
  const [img, setImage] = useState(placeholder);
  const [uploading, setUploading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  function handleUpload() {
    setUploading(true);
  }
  function onClose() {
    setUploading(false);
  }

  async function handleRead() {
    if (file) {
      setIsFetching(true);
      let headersList = {
        Accept: "*/*",
      };

      let formdata = new FormData();
      formdata.append("picture", file[0]);

      fetch(url, {
        method: "POST",
        body: formdata,
        headers: headersList,
      })
        .then((response) => response.body)
        .then((rb) => {
          var reader = rb.getReader();
          return new ReadableStream({
            start(controller) {
              return pump();
              function pump() {
                return reader.read().then(({ done, value }) => {
                  if (done) {
                    controller.close();
                    return;
                  }
                  controller.enqueue(value);
                  return pump();
                });
              }
            },
          });
        })
        .then((stream) => new Response(stream))
        .then((response) => response.blob())
        .then((blob) => URL.createObjectURL(blob))
        .then((url) => {
          console.log(url);
          const audio = new Audio(url);
          audio.play();
        });
        setIsFetching(false);
    }
  }

  return (
    <div className="center-screen">
    {isFetching ? (<Box
      sx={{
        position: "absolute",
        marginTop: "750px",
        marginRight: "430px",
      }}
    >
      <CircularProgress size="30px" />
    </Box>): (null)}
      <Card sx={{ maxWidth: 800 }}>
        <CardHeader title="Photo Reader" />
        {uploading ? (
          <div className="dropdownn">
            <CardMedia height="600">
              <DropzoneArea
                maxWidth={800}
                filesLimit={1}
                onChange={(file) => {
                  if (file.length !== 0) {
                    setFile(file);
                    setImage(URL.createObjectURL(file[0]));
                    onClose();
                  }
                }}
              />
            </CardMedia>
          </div>
        ) : (
          <CardMedia component="img" height="600" image={img} />
        )}

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Upload your photo
          </Typography>
          <Typography variant="body2" color="text.secondary">
            "After uploading an image and clicking READ button you will hear
            it's description."
          </Typography>         
        </CardContent>

        <Button
          variant="outlined"
          startIcon={<UploadIcon />}
          onClick={handleUpload}
        >
          Upload
        </Button>
        <Button
          variant="outlined"
          startIcon={<VolumeUpIcon />}
          onClick={handleRead}
        >
          Read
        </Button>
      </Card>
    </div>
  );
}
