import React, { memo, useEffect, useRef } from 'react';
import '../style/Editor.css';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Table from '@editorjs/table';
import EditorjsList from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
import Quote from '@editorjs/quote';
import Warning from '@editorjs/warning';
import Embed from '@editorjs/embed';
import Underline from '@editorjs/underline';
import AlignmentTuneTool from 'editorjs-text-alignment-blocktune';
import Strikethrough from '@sotaproject/strikethrough';
import TextTransformTool from './TextTransformTool';
import Marker from '@editorjs/marker';
import Delimiter from '@editorjs/delimiter';
import CustomeImage from './EditorTools/BlockTools/CustomeSimpleImage';
import { useSelector } from 'react-redux';

function UpdateBlogEditor({ editorRef, loadEditableContent }) {
  const { content} = useSelector((state) => state.editableblog);
  const isEditorReady = useRef(false);

  useEffect(() => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: "editor-div",
        onReady: () => {
          console.log('Editor.js is ready!');
          isEditorReady.current = true;
          if (content?.blocks?.length > 0) {
            console.log("Content",content);
            // editor.render(content);
          }
        },
        autofocus: true,
        placeholder: "Write a post...",
        tools: {
          header: {
            class: Header,
            placeholder: "Enter Heading",
            levels: [1, 2, 3, 4, 5, 6],
            defaultLevel: 1,
            inlineToolbar: true,
            tunes: ['alignment']
          },
          image: {
            class: CustomeImage,
            config: {
              endpoints: {
                byFile: 'http://localhost:8008/api/v1/uploadFile',
                byUrl: 'http://localhost:8008/fetchUrl',
              }
            }
          },
          table: {
            class: Table,
            withHeadings: true
          },
          list: {
            class: EditorjsList,
            inlineToolbar: true,
            config: {
              defaultStyle: 'unordered'
            },
          },
          quote: {
            class: Quote,
            inlineToolbar: true,
            tunes: ['alignment'],
            shortcut: 'CTRL+SHIFT+O',
            config: {
              quotePlaceholder: 'Enter a quote',
              captionPlaceholder: "Quote's author",
            },
          },
          embed: Embed,
          warning: Warning,
          underline: Underline,
          alignment: {
            class: AlignmentTuneTool,
            config: {
              default: "left",
              blocks: {
                header: 'center',
                paragraph: 'left',
              }
            }
          },
          strikethrough: {
            class: Strikethrough,
          },
          textTransform: {
            class: TextTransformTool,
          },
          marker: {
            class: Marker
          },
          delimiter: {
            class: Delimiter
          }
        },
        data: content,
      });
      editorRef.current = editor;
    }
  }, [content, editorRef]);

  // Load content if editor is ready and content is updated
  useEffect(() => {
    if (
      isEditorReady.current &&
      editorRef.current &&
      content?.blocks?.length > 0
    ) {
      editorRef.current.render(content);
    }
  }, [content, editorRef]);

  return (
    <div className='editor-container'>
      <div id="editor-div"></div>
    </div>
  );
}

export default memo(UpdateBlogEditor);
