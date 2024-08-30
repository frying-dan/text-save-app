import styled from 'styled-components';
import { motion } from 'framer-motion';

export const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
`;

export const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const TextDisplay = styled.div`
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
  padding: 20px;
  background-color: ${props => props.theme.secondaryBackground};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Input = styled.textarea`
  width: 100%;
  max-width: 600px;
  height: 150px;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid ${props => props.theme.border};
  border-radius: 4px;
  font-size: 16px;
  resize: vertical;
`;

export const Button = styled(motion.button)`
  padding: 10px 20px;
  background-color: ${props => props.theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
`;

export const SavedTextsContainer = styled.div`
  width: 300px;
  height: 100%;
  overflow-y: auto;
  padding: 20px;
  background-color: ${props => props.theme.secondaryBackground};
  border-right: 1px solid ${props => props.theme.border};
`;

export const SavedTextItem = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  background-color: ${props => props.theme.background};
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.hover};
  }
`;

export const DeleteButton = styled.button`
  background-color: ${props => props.theme.danger};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  margin-left: 10px;
  cursor: pointer;
`;