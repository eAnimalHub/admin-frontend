import React, { useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
// import { invokeApi, s3baseUrl } from "../../bl_libs/invokeApi";
import { invokeApi } from "src/bl_libs/invokeApi";
import { s3baseUrl } from "src/config/config";

export default function TinyEditor({
  setDetailDescription,
  handleSubmit,
  detailDescriptionCk,
}) {
  const editorRef = useRef(null);

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent(<p>Hi this iz Zubair</p>));
      setDetailDescription(editorRef.current.getContent());
    }
  };
  function example_image_upload_handler(blobInfo, success, failure, progress) {
    console.log("inside image upoad function");
    console.log(blobInfo.blob());
    let requestObj = {
      path: "/app/update_image_on_s3/",
      method: "POST",
      headers: {
        "x-sh-auth": localStorage.getItem("token"),
      },
    };

    let _formData = new FormData();
    _formData.append("image", blobInfo.blob());
    _formData.append("width", "600");
    requestObj["postData"] = _formData;
    console.log(..._formData);

    invokeApi(requestObj).then((res) => {
      console.log(res, "IMAGE UPLOADER");
      if (res.code === 200) {
        success(s3baseUrl + res.image_path);
      } else {
        failure(res.message);
      }
    });
    console.log(requestObj, "requestObj");
  }
  const textToHtml = (text) => {
    const elem = document.createElement("div");
    return text
      .split(/\n\n+/)
      .map((paragraph) => {
        return (
          "<p>" +
          paragraph
            .split(/\n+/)
            .map((line) => {
              elem.textContent = line;
              return elem.innerHTML;
            })
            .join("<br/>") +
          "</p>"
        );
      })
      .join("");
  };

  return (
    <>
      <Editor
        apiKey="o74is8fu0fhdzefwd4dz4n1h0g1hhju79y6smh63lyg6gykh"
        onChange={log}
        value={detailDescriptionCk}
        onInit={(evt, editor) => (editorRef.current = editor)}
        onEditorChange={(newValue, editor) => {
          //   setDetailDescription(newValue);
          setDetailDescription(editor.getContent());
        }}
        init={{
          images_upload_handler: example_image_upload_handler,
          height: 500,
          menubar: true,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      {/* <button onClick={log}>Log editor content</button> */}
    </>
  );
}
