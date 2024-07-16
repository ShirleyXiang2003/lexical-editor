import { $getRoot, $getSelection, $createParagraphNode, $createTextNode } from "lexical";
import { useEffect, useRef } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { MuiContentEditable, placeHolderSx } from "./styles";
import { Box, Divider } from "@mui/material";
import { lexicalEditorConfig } from "../../config/lexicalEditorConfig";
import LexicalEditorTopBar from "../LexicalEditorTopBar";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import ImagesPlugin from "../CustomPlugins/ImagePlugin";
import FloatingTextFormatToolbarPlugin from "../CustomPlugins/FloatingTextFormatPlugin";

function LexicalEditorWrapper(props) {
  return (
    <LexicalComposer initialConfig={lexicalEditorConfig}>
      <LexicalEditorTopBar />
      <Divider />
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        background: "white",
        position: "relative",
        overflow: "hidden",
        height: "100%",
        width: "100%"
      }}>
        <RichTextPlugin
          contentEditable={<MuiContentEditable />}
          placeholder={<Box sx={placeHolderSx}>输入你的文本...</Box>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <OnChangePlugin onChange={onChange} />
        <HistoryPlugin />
        <ListPlugin />
        <LinkPlugin />
        <ImagesPlugin captionsEnabled={false} />
        <FloatingTextFormatToolbarPlugin />
        <SavePlugin />
      </Box>
    </LexicalComposer>
  );
}

function onChange(editorState) {
  editorState.read(() => {
    const root = $getRoot();
    const json = root.exportJSON();
    console.log("Saving content to localStorage:", json);
    localStorage.setItem('lexical-content', JSON.stringify(json));
  });
}

function SavePlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.update(() => {
      const savedContent = localStorage.getItem('lexical-content');
      console.log("Loading content from localStorage:", savedContent);
      if (savedContent) {
        let parsedContent;
        try {
          parsedContent = JSON.parse(savedContent);
          console.log("Parsed content:", parsedContent);
        } catch (error) {
          console.error("Error parsing saved content:", error);
          return;
        }

        const root = $getRoot();
        root.clear();

        if (parsedContent && typeof parsedContent === 'object' && !Array.isArray(parsedContent)) {
          if (parsedContent.hasOwnProperty('children')) {
            parsedContent.children.forEach((node) => {
              const newNode = $createParagraphNode();
              if (node && node.children && Array.isArray(node.children)) {
                node.children.forEach((child) => {
                  if (child && child.text) {
                    const textNode = $createTextNode(child.text);
                    newNode.append(textNode);
                  }
                });
              }
              root.append(newNode);
            });
          } else {
            console.warn("Parsed content has no 'children' property:", parsedContent);
          }
        } else {
          console.warn("Parsed content is not a valid object:", parsedContent);
        }
      }
    });
  }, [editor]);

  return null;
}


function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    editor.focus();
  }, [editor]);
  return null;
}

export default LexicalEditorWrapper;
