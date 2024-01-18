const { Avatar, Button, InputField, TextEditor } = VM.require(
  "buildhub.near/widget/components"
);
const { PlusIcon } = VM.require("buildhub.near/widget/components.Icons.PlusIcon");
const { Modal } = VM.require("buildhub.near/widget/components.Modals.Modal");
const { XTrigger } = VM.require("buildhub.near/widget/components.Modals.XTrigger");
const { H3 } = VM.require("buildhub.near/widget/components.Text.H3");

const onSaveTemplate = props.onSaveTemplate;
const isOpen = props.isOpen;
const onOpenChange = props.onOpenChange;
const templateToEdit = props.templateToEdit;
const onEdit = props.onEditTemplate;
const onClearSelected = props.onClear; 

const isEditing = templateToEdit.title.length > 0

const FiltersSection = styled.div`
  width: 100%;
`;
const ModalContainer = styled.div`
  width: 552px;
  display: flex;
  flex-direction: column;
  gap: 24px 0;
  flex-grow: 1;
`;

const SaveTemplateWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

const TextareaWrapper = styled.div`
  display: grid;
  vertical-align: top;
  align-items: center;
  position: relative;
  align-items: stretch;

  textarea {
    display: flex;
    align-items: center;
    transition: all 0.3s ease;
  }

  textarea::placeholder {
    padding-top: 4px;
    font-size: 20px;
  }

  textarea:focus::placeholder {
    font-size: inherit;
    padding-top: 0px;
  }

  &::after,
  textarea,
  iframe {
    width: 100%;
    min-width: 1em;
    height: unset;
    min-height: 3em;
    font: inherit;
    margin: 0;
    resize: none;
    background: none;
    appearance: none;
    border: 0px solid #eee;
    grid-area: 1 / 1;
    overflow: hidden;
    outline: none;
  }

  iframe {
    padding: 0;
  }

  textarea:focus,
  textarea:not(:empty) {
    border-bottom: 1px solid #eee;
    min-height: 5em;
  }

  &::after {
    content: attr(data-value) " ";
    visibility: hidden;
    white-space: pre-wrap;
  }
  &.markdown-editor::after {
    padding-top: 66px;
    font-family: monospace;
    font-size: 14px;
  }
`;

const MarkdownEditor = `
  html {
    background: #23242b;
  }

  * {
    border: none !important;
  }

  .rc-md-editor {
    background: #4f5055;
    border-top: 1px solid #4f5055 !important;
    border-radius: 8px;
  }

  .editor-container {
    background: #4f5055;
  }
  
  .drop-wrap {
    top: -110px !important;
    border-radius: 0.5rem !important;
  }

  .header-list {
    display: flex;
    align-items: center;
  }

  textarea {
    background: #23242b !important;
    color: #fff !important;

    font-family: sans-serif !important;
    font-size: 1rem;

    border: 1px solid #4f5055 !important;
    border-top: 0 !important;
    border-radius: 0 0 8px 8px;
  }

  .rc-md-navigation {
    background: #23242b !important;
    border: 1px solid #4f5055 !important;
    border-top: 0 !important;
    border-bottom: 0 !important;
    border-radius: 8px 8px 0 0;
  
    i {
      color: #cdd0d5;
    }
  }

  .editor-container {
    border-radius: 0 0 8px 8px;
  }

  .rc-md-editor .editor-container .sec-md .input {
    overflow-y: auto;
    padding: 8px !important;
    line-height: normal;
    border-radius: 0 0 8px 8px;
  }
`;

const MarkdownPreview = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 16px !important;
  }
  @media (max-width: 767px) {
    font-size: 15px !important;
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-size: 15px !important;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  strong,
  b {
    font-weight: 500 !important;
  }
  ol,
  ul,
  dl {
    margin-bottom: 0.5rem;
    white-space: inherit;
  }
  p {
    margin-bottom: 0.5rem;
  }
  hr {
    display: none;
  }
  img {
    border-radius: var(--bs-border-radius-lg);
    max-height: 40em;
  }
  th {
    min-width: 5em;
  }

  .table > :not(caption) > * > * {
    padding: 0.3rem;
  }

  * {
    color: #b6b6b8 !important;
  }

  a {
    color: #0d6efd !important;

    &:hover {
      color: #0a58ca !important;
    }
  }
`;

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const [template, setTemplate] = useState(templateToEdit)

const isValidTemplate = template.title.length > 0 && template.content.length > 0

function onResetForm() {
  setTemplate({
    title: "",
    content: "# Hello World"
  })
  onClearSelected()
}

useEffect(() => {
  setTemplate(templateToEdit)
}, [templateToEdit])


return (
  <Modal
    open={isOpen}
    key="create"
    onOpen={onOpenChange}
    onClose={onOpenChange}
  >
    <ModalContainer>
      <HeaderWrapper>
        <H3>
          {isEditing ? `Edit ${templateToEdit.title} template` : "Add new markdown template"}
        </H3>
        <XTrigger onClose={onOpenChange} />
      </HeaderWrapper>
      <InputField
        key="templateTitleInput"
        label="Title"
        placeholder="Name your template"
        value={template.title}
        onChange={(e) => {
          setTemplate((prev) => ({
            title: e.target.value,
            content: prev.content
          }))
        }}
      />

      <TextareaWrapper
        className="markdown-editor"
        data-value={"templateContent"}
        key={"templateContent"}
      >
        <Widget
          src="mob.near/widget/MarkdownEditorIframe"
          props={{
            initialText: template.content,
            embedCss: MarkdownEditor,
            onChange: (v) => {
              setTemplate((prev) => ({
                ...prev,
                content: v
              }))
            },
          }}
        />
      </TextareaWrapper>

      <SaveTemplateWrapper>
        <Dialog.Trigger asChild>
          <Button
            style={{ fontSize: 14 }}
            disabled={!isValidTemplate}
            onClick={() => {
              if (isEditing) {
                onResetForm()
                onEdit(
                  templateToEdit.title,
                  template.title, 
                  template.content, 
                  onOpenChange
                )
              } else {
                onResetForm()
                onSaveTemplate(
                  template.title, 
                  template.content, 
                  onOpenChange
                )
              }
            }}
            variant="primary"
          >
            Save Template
          </Button>
        </Dialog.Trigger>
      </SaveTemplateWrapper>
    </ModalContainer>
  </Modal>
);