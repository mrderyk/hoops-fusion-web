import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { ChartIcon } from '../../../../src/icons/ChartIcon';
import { StatCharter } from 'widgets/StatCharter';
import { IconWrapper, HelperText, ExpandButtonWrapper,  ModalHeader, ModalInnerWrapper, TitleWrapper, CloseButton } from './styled';

export const PopupCharter: React.FC<{}> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const content = isOpen ? null : <ExpandButton onClick={() => setIsOpen(true)} />;
  return (
    <>
      { content }
      <CharterModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
};

const ExpandButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <ExpandButtonWrapper onClick={onClick}>
      <HelperText>{'Open Stat Charter'}</HelperText>
      <IconWrapper>
        <ChartIcon />
      </IconWrapper>
    </ExpandButtonWrapper>
    )
};

const CharterModal: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        contentLabel="Example Modal"
        style={{
          content: {padding: 0 }
        }}
      > 
        <ModalInnerWrapper>
          <ModalHeader>
            <TitleWrapper>
              {'Stat Charter'}
            </TitleWrapper>
            <CloseButton onClick={() => onClose()} />
          </ModalHeader>
          <StatCharter />
        </ModalInnerWrapper>
      </Modal>
    </>
  )
};
