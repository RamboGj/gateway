const { Button } = VM.require("buildhub.near/widget/components.Button");

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  place-items: center;
  overflow-y: auto;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  background: rgba(11, 12, 20, 0.5);
`;

const Content = styled.div`
  min-width: 300px;
  max-width: 1000px;
  padding: 24px;
  outline: none !important;
  background: #23242B;
  border-radius: 16px;
  color: white;
`;

function Modal({
  children,
  open,
  onOpen,
  toggle,
  key,
}) {
  return (
    <Dialog.Root open={open} key={key}>
      <Dialog.Trigger asChild onClick={onOpen}>
        {toggle || <></>}
      </Dialog.Trigger>
      <Dialog.Overlay asChild>
        <Overlay>
          <Dialog.Content>
            <Content>
              {children}
            </Content>
          </Dialog.Content>
        </Overlay>
      </Dialog.Overlay>
    </Dialog.Root>
  );
}

return { Modal };