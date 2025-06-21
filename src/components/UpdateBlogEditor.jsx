import React, { memo, useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';

import Header from '@editorjs/header';
import Table from '@editorjs/table';
import List from '@editorjs/list';
import Quote from '@editorjs/quote';
import Warning from '@editorjs/warning';
import Embed from '@editorjs/embed';
import Underline from '@editorjs/underline';
import Marker from '@editorjs/marker';
import Delimiter from '@editorjs/delimiter';
import AlignmentTuneTool from 'editorjs-text-alignment-blocktune';
import Strikethrough from '@sotaproject/strikethrough';

import TextTransformTool from './TextTransformTool';
import CustomSimpleImage from './EditorTools/BlockTools/CustomeSimpleImage';
import '../style/Editor.css';

import { useSelector } from 'react-redux';
import CustomImageTool from './CustomImageTool';

const UpdateBlogEditor = ({ editorRef }) => {
  const { content } = useSelector((state) => state.editableblog);
  const isEditorReady = useRef(false);

  useEffect(() => {
    // Wait until content is loaded before initializing
    if (!editorRef.current && content?.blocks?.length > 0) {
      const editor = new EditorJS({
        holder: 'editor-div',
        autofocus: true,
        placeholder: 'Write a post...',
        data: content,
        onReady: () => {
          console.log('EditorJS Ready');
          isEditorReady.current = true;
        },
        tools: {
          header: {
            class: Header,
            inlineToolbar: true,
            placeholder: 'Enter Heading',
            levels: [1, 2, 3],
            defaultLevel: 1,
            tunes: ['alignment'],
          },
          image: {
            class: CustomImageTool
          },
          table: {
            class: Table,
            withHeadings: true,
          },
          list: {
            class: List,
            inlineToolbar: true,
            config: { defaultStyle: 'unordered' },
          },
          quote: {
            class: Quote,
            inlineToolbar: true,
            tunes: ['alignment'],
            shortcut: 'CTRL+SHIFT+O',
            config: {
              quotePlaceholder: 'Enter a quote',
              captionPlaceholder: "Author",
            },
          },
          embed: Embed,
          warning: Warning,
          underline: Underline,
          alignment: {
            class: AlignmentTuneTool,
            config: {
              default: 'left',
              blocks: {
                header: 'center',
                paragraph: 'left',
              },
            },
          },
          strikethrough: Strikethrough,
          textTransform: TextTransformTool,
          marker: Marker,
          delimiter: Delimiter,
        },
      });

      editorRef.current = editor;
    }

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
        isEditorReady.current = false;
      }
    };
  }, [content, editorRef]);

  return <div id="editor-div" className="editor-container" />;
};

export default memo(UpdateBlogEditor);
