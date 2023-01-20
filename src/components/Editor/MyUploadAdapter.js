// import { _upload_file_on_s3 } from "src/DAL/upload_s3/upload_s3";
// import { baseUri as base_uri, s3baseUrl } from "../../config/config";

class MyUploadAdapter {
  constructor(loader) {
    // The file loader instance to use during the upload.
    this.loader = loader;
    console.log(loader, "LOADER");
    // this.url = `${base_uri}api/general_image/editor_images.php`;
  }
  // Starts the upload process.
  _initRequest() {
    console.log("_initRequest");
    const xhr = (this.xhr = new XMLHttpRequest());

    // Note that your request may look different. It is up to you and your editor
    // integration to choose the right communication channel. This example uses
    // a POST request with JSON as a data structure but your configuration
    // could be different.
    xhr.open("POST", this.url, true);
    xhr.responseType = "json";
  }
  _initListeners(resolve, reject, file) {
    console.log("_initListeners ....>>>", file);
    const genericErrorText = `Couldn't upload file: ${file.name}.`;
    const formData = new FormData();

    formData.append("project_name", "upload_s3_files");
    formData.append("upload_file", file);

    // _upload_file_on_s3(formData)
    //   .then((response) => {
    //     console.log(response, "uploadEditorImage");
    //     if (response.code === 200) {
    //       resolve({
    //         default: s3baseUrl + "/" + response.file_name,
    //       });
    //     } else {
    //       reject(genericErrorText);
    //     }
    //   })
    //   .catch((err) => {
    //     reject(genericErrorText);
    //   });
  }
  _sendRequest(file) {
    // Prepare the form data.
    const data = new FormData();
    this.loader.file.then((result) => {
      console.log(result, "Result");
      // data.append("token", localStorage.getItem("token"));
      data.append("task_images", result);
      console.log(...data, "data");
      this.xhr.send(data);
    });
    // Important note: This is the right place to implement security mechanisms
    // like authentication and CSRF protection. For instance, you can use
    // XMLHttpRequest.setRequestHeader() to set the request headers containing
    // the CSRF token generated earlier by your application.

    // Send the request.
    // this.xhr.send(data);
  }

  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          console.log("file", file);
          this._initRequest();
          this._initListeners(resolve, reject, file);
          this._sendRequest(file);
        })
    );
  }

  // Aborts the upload process.
  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }
}
export default MyUploadAdapter;
