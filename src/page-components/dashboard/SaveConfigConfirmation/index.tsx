import { CloseIcon } from "src/icons/CloseIcon";
import { PlusIcon } from "src/icons/PlusIcon";
import { PopupWrapper, CloseButton, Wrapper } from "./styled";

export const SaveConfigConfirmation: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <Wrapper>
      <PopupWrapper>
        <div>
          Your widgets have been saved to this browser.
        </div>
        <div>
          Saving to user account is coming soon.
        </div>
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>
      </PopupWrapper>
    </Wrapper>
  )
};