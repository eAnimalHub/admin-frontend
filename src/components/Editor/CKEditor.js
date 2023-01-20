import React, { useState, useEffect } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment"; // <--- ADDED
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Link from "@ckeditor/ckeditor5-link/src/link";
import List from "@ckeditor/ckeditor5-list/src/list";
import Image from "@ckeditor/ckeditor5-image/src/image";
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload";
import ImageResize from "@ckeditor/ckeditor5-image/src/imageresize";
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote";
import Table from "@ckeditor/ckeditor5-table/src/table";
import TableToolbar from "@ckeditor/ckeditor5-table/src/tabletoolbar";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Strikethrough from "@ckeditor/ckeditor5-basic-styles/src/strikethrough";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline";
import Subscript from "@ckeditor/ckeditor5-basic-styles/src/subscript";
import Superscript from "@ckeditor/ckeditor5-basic-styles/src/superscript";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import Highlight from "@ckeditor/ckeditor5-highlight/src/highlight";
import Font from "@ckeditor/ckeditor5-font/src/font";
import RemoveFormat from "@ckeditor/ckeditor5-remove-format/src/removeformat";
import MediaEmbed from "@ckeditor/ckeditor5-media-embed/src/mediaembed";
import HtmlEmbed from "@ckeditor/ckeditor5-html-embed/src/htmlembed";
import SelectAll from "@ckeditor/ckeditor5-select-all/src/selectall";
import HorizontalLine from "@ckeditor/ckeditor5-horizontal-line/src/horizontalline";
import ListStyle from "@ckeditor/ckeditor5-list/src/liststyle";
import MyUploadAdapter from "./MyUploadAdapter";

import "./ckeditor.css";
function MWEditor({ mode, content, setContent }) {
  const [isLoading, setIsLoading] = useState(true);

  // console.log('mode', mode)
  const _onChange = (event, editor) => {
    setContent(editor.getData());
  };

  const _onBlur = (event, editor) => {
    console.log("Blur.");
  };

  const _onFocus = (event, editor) => {
    console.log("_onFocus.");
  };
  const _init = (editor) => {
    // You can store the "editor" and use when it is needed.
    console.log("Editor is ready to use!");
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return new MyUploadAdapter(loader);
    };
  };

  const get_count_with_range = (start, end) => {
    let count = [];
    for (let i = start; i <= end; i++) {
      count.push(i);
    }
    return count;
  };

  // console.log('mode > ', mode, mode ? 1 : 2)
  // const defaultToolbar = mode ? ['heading', '|', 'bold', 'italic', '|', 'bulletedList', 'numberedList', '|', 'imageUpload', 'insertTable', '|', 'alignment:left', 'alignment:right', 'alignment:center', 'alignment:justify', 'link', 'blockQuote', '|', 'undo', 'redo', 'highlight'] : [];
  const editorConfig = {
    plugins: [
      Font,
      RemoveFormat,
      Superscript,
      Subscript,
      ListStyle,
      HorizontalLine,
      Essentials,
      Highlight,
      Link,
      Paragraph,
      Alignment,
      Heading,
      Image,
      Bold,
      ImageResize,
      Italic,
      ImageUpload,
      ImageToolbar,
      ImageStyle,
      ImageCaption,
      BlockQuote,
      SelectAll,
      List,
      MediaEmbed,
      HtmlEmbed,
      Strikethrough,
      Underline,
    ],
    toolbar: {
      items: [
        "heading",
        "|",
        // "fontFamily",
        // "fontSize",
        "fontColor",
        "fontBackgroundColor",
        "|",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        // "removeFormat",
        // "selectAll",
        // "alignment:left",
        // "alignment:right",
        // "alignment:center",
        // "alignment:justify",
        // "|",
        // "subscript",
        // "superscript",
        "link",
        "imageUpload",
        "|",
        "bulletedList",
        "numberedList",
        "|",

        "horizontalLine",
        "|",
        "undo",
        "redo",
        // "mediaEmbed",
        // "highlight",
        // "htmlEmbed",
        // "blockQuote",
      ],
      // shouldNotGroupWhenFull: true,
    },
    heading: {
      options: [
        {
          model: "paragraph",
          title: "Paragraph",
          class: "ck-heading_paragraph",
        },
        {
          model: "heading1",
          view: "h1",
          title: "Heading 1",
          class: "ck-heading_heading1",
        },
        {
          model: "heading2",
          view: "h2",
          title: "Heading 2",
          class: "ck-heading_heading2",
        },
        {
          model: "heading3",
          view: "h3",
          title: "Heading 3",
          class: "ck-heading_heading3",
        },
        {
          model: "heading4",
          view: "h4",
          title: "Heading 4",
          class: "ck-heading_heading4",
        },
        {
          model: "heading5",
          view: "h5",
          title: "Heading 5",
          class: "ck-heading_heading5",
        },
        {
          model: "heading6",
          view: "h6",
          title: "Heading 6",
          class: "ck-heading_heading6",
        },
      ],
    },

    fontSize: {
      options: ["default", ...get_count_with_range(10, 100)],
    },
    fontBackgroundColor: {
      colors: [
        "#000000",
        "#FFFFFF",
        "#808080",
        "#FF6900",
        "#FCB900",
        "#7BDCB5",
        "#00D084",
        "#8ED1FC",
        "#0693E3",
        "#ABB8C3",
        "#EB144C",
        "#F78DA7",
        "#DB3E00",
        "#FCCB00",
        "#008B02",
        "#006B76",
        "#1273DE",
        "#004DCF",
        "#5300EB",
        "#EB9694",
        // ...
      ],
    },
    ckfinder: {
      uploadUrl:
        "https://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json",
    },

    image: {
      toolbar: [
        "imageTextAlternative",
        "|",
        "imageStyle:alignLeft",
        "imageStyle:full",
        "imageStyle:alignRight",
        "|",
        "imageResize",
      ],
      resizeUnit: "%",
      styles: [
        // This option is equal to a situation where no style is applied.
        "full",
        // This represents an image aligned to the left.
        "alignLeft",
        // This represents an image aligned to the right.
        "alignRight",
      ],
      resizeOptions: [
        {
          name: "imageResize:original",
          label: "Original",
          value: null,
        },
        {
          name: "imageResize:25",
          label: "25%",
          value: "25",
        },
        {
          name: "imageResize:50",
          label: "50%",
          value: "50",
        },
        {
          name: "imageResize:75",
          label: "75%",
          value: "75",
        },
      ],
    },
    alignment: {
      options: ["left", "right", "center", "justify"],
    },
    highlight: {
      options: [
        {
          model: "redPen",
          class: "pen-red",
          title: "Red pen",
          color: "var(--ck-highlight-pen-red)",
          type: "pen",
        },
        {
          model: "greenPen",
          class: "pen-green",
          title: "Green pen",
          color: "var(--ck-highlight-pen-green)",
          type: "pen",
        },
        {
          model: "yellowMarker",
          class: "marker-yellow",
          title: "Yellow marker",
          color: "var(--ck-highlight-marker-yellow)",
          type: "marker",
        },
        {
          model: "greenMarker",
          class: "marker-green",
          title: "Green marker",
          color: "var(--ck-highlight-marker-green)",
          type: "marker",
        },
        {
          model: "pinkMarker",
          class: "marker-pink",
          title: "Pink marker",
          color: "var(--ck-highlight-marker-pink)",
          type: "marker",
        },
        {
          model: "blueMarker",
          class: "marker-blue",
          title: "Blue marker",
          color: "var(--ck-highlight-marker-blue)",
          type: "marker",
        },
      ],
    },
  };
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 0);
  }, []);

  if (isLoading) {
    return <></>;
  }

  return (
    <CKEditor
      editor={ClassicEditor}
      config={editorConfig}
      data={content}
      onInit={_init}
      onChange={_onChange}
      onBlur={_onBlur}
      onFocus={_onFocus}
      disabled={mode} //readOnly
    />
  );
}

export default MWEditor;
