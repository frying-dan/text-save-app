import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const IntroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  color: #1d1d1f;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  font-size: 21px;
  color: #86868b;
  text-align: center;
  max-width: 600px;
  line-height: 1.5;
`;

const GetStartedButton = styled.button`
  background-color: #0071e3;
  color: #ffffff;
  font-size: 17px;
  padding: 12px 24px;
  border-radius: 980px;
  border: none;
  margin-top: 40px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0077ed;
  }
`;

interface IntroScreenProps {
  onGetStarted: () => void;
}

const IntroScreen = ({ onGetStarted }: IntroScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <IntroContainer>
        <Title>Welcome to YourApp</Title>
        <Subtitle>
          Discover a new way to save and organize your thoughts. 
          Simple, intuitive, and designed for you.
        </Subtitle>
        <GetStartedButton onClick={onGetStarted}>Get Started</GetStartedButton>
      </IntroContainer>
    </motion.div>
  );
};

export default IntroScreen;