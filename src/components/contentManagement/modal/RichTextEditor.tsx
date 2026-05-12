import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Underline as UnderlineIcon,
} from "lucide-react";
import { useState } from "react";

interface RichTextEditorProps {
  label?: string;
  value?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  className?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  label = "A IMPORTANT SAFETY INFORMATION:",
  value = "",
  onChange,
  placeholder = "Start typing...",
  className = "",
}) => {
  const [isPlainText, setIsPlainText] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline cursor-pointer",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right"],
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none focus:outline-none min-h-[200px] px-4 py-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-1",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
  });

  if (!editor) {
    return null;
  }

  const toggleBold = () => editor.chain().focus().toggleBold().run();
  const toggleItalic = () => editor.chain().focus().toggleItalic().run();
  const toggleUnderline = () => editor.chain().focus().toggleUnderline().run();
  const toggleH1 = () =>
    editor.chain().focus().toggleHeading({ level: 1 }).run();
  const toggleH2 = () =>
    editor.chain().focus().toggleHeading({ level: 2 }).run();
  const toggleBulletList = () =>
    editor.chain().focus().toggleBulletList().run();
  const toggleOrderedList = () =>
    editor.chain().focus().toggleOrderedList().run();
  const setAlignLeft = () => editor.chain().focus().setTextAlign("left").run();
  const setAlignCenter = () =>
    editor.chain().focus().setTextAlign("center").run();
  const setAlignRight = () =>
    editor.chain().focus().setTextAlign("right").run();

  const addLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const togglePlainText = () => {
    setIsPlainText(!isPlainText);
  };

  const ToolbarButton = ({
    onClick,
    isActive = false,
    children,
    title,
  }: {
    onClick: () => void;
    isActive?: boolean;
    children: React.ReactNode;
    title?: string;
  }) => (
    <button
      onClick={onClick}
      type="button"
      title={title}
      className={`p-2 hover:bg-gray-100 rounded transition-colors ${
        isActive ? "bg-gray-200" : ""
      }`}
    >
      {children}
    </button>
  );

  const ToolbarDivider = () => (
    <div className="w-px h-6 bg-gray-300 mx-1"></div>
  );

  return (
    <div className={`w-full ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-900">{label}</h3>
        <button
          onClick={togglePlainText}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <span>&lt;/&gt;</span>
          <span>Plain Text</span>
        </button>
      </div>

      {/* Editor Container */}
      <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
        {/* Toolbar */}
        <div className="border-b border-gray-300 bg-gray-50 p-2 flex items-center gap-1 flex-wrap">
          {/* Text Formatting */}
          <ToolbarButton
            onClick={toggleBold}
            isActive={editor.isActive("bold")}
            title="Bold"
          >
            <Bold size={18} className="text-gray-700" />
          </ToolbarButton>
          <ToolbarButton
            onClick={toggleItalic}
            isActive={editor.isActive("italic")}
            title="Italic"
          >
            <Italic size={18} className="text-gray-700" />
          </ToolbarButton>
          <ToolbarButton
            onClick={toggleUnderline}
            isActive={editor.isActive("underline")}
            title="Underline"
          >
            <UnderlineIcon size={18} className="text-gray-700" />
          </ToolbarButton>

          <ToolbarDivider />

          {/* Headings */}
          <ToolbarButton
            onClick={toggleH1}
            isActive={editor.isActive("heading", { level: 1 })}
            title="Heading 1"
          >
            <span className="text-sm font-semibold text-gray-700">H1</span>
          </ToolbarButton>
          <ToolbarButton
            onClick={toggleH2}
            isActive={editor.isActive("heading", { level: 2 })}
            title="Heading 2"
          >
            <span className="text-sm font-semibold text-gray-700">H2</span>
          </ToolbarButton>

          <ToolbarDivider />

          {/* Lists */}
          <ToolbarButton
            onClick={toggleBulletList}
            isActive={editor.isActive("bulletList")}
            title="Bullet List"
          >
            <List size={18} className="text-gray-700" />
          </ToolbarButton>
          <ToolbarButton
            onClick={toggleOrderedList}
            isActive={editor.isActive("orderedList")}
            title="Numbered List"
          >
            <ListOrdered size={18} className="text-gray-700" />
          </ToolbarButton>

          <ToolbarDivider />

          {/* Text Alignment */}
          <ToolbarButton
            onClick={setAlignLeft}
            isActive={editor.isActive({ textAlign: "left" })}
            title="Align Left"
          >
            <AlignLeft size={18} className="text-gray-700" />
          </ToolbarButton>
          <ToolbarButton
            onClick={setAlignCenter}
            isActive={editor.isActive({ textAlign: "center" })}
            title="Align Center"
          >
            <AlignCenter size={18} className="text-gray-700" />
          </ToolbarButton>
          <ToolbarButton
            onClick={setAlignRight}
            isActive={editor.isActive({ textAlign: "right" })}
            title="Align Right"
          >
            <AlignRight size={18} className="text-gray-700" />
          </ToolbarButton>

          <ToolbarDivider />

          {/* Link */}
          <ToolbarButton
            onClick={addLink}
            isActive={editor.isActive("link")}
            title="Add Link"
          >
            <LinkIcon size={18} className="text-gray-700" />
          </ToolbarButton>
        </div>

        {/* Editor Content */}
        <div className="bg-[#F5F3FF] min-h-[200px]">
          {isPlainText ? (
            <textarea
              value={editor.getHTML()}
              onChange={(e) => {
                editor.commands.setContent(e.target.value);
              }}
              className="w-full min-h-[200px] p-4 bg-transparent font-mono text-sm resize-none focus:outline-none"
              placeholder={placeholder}
            />
          ) : (
            <EditorContent editor={editor} />
          )}
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;
