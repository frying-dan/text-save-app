import React, { useState, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import IntroScreen from './IntroScreen.tsx';

const lightTheme = {
  background: '#f5f5f7',
  text: '#1d1d1f',
  cardBackground: '#ffffff',
  inputBorder: '#d2d2d7',
};

const darkTheme = {
  background: '#1d1d1f',
  text: '#f5f5f7',
  cardBackground: '#2c2c2e',
  inputBorder: '#454545',
};

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  
  #root {
    width: 100%;
    height: 100%;
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  overflow-y: auto;
  height: 100%;
`;

const TextDisplay = styled.div`
  text-align: center;
  margin-bottom: 20px;
  font-size: calc(14px + 1.5vw);
  max-width: 80%;
  word-wrap: break-word;
  max-height: 50vh;
  overflow-y: auto;
  padding: 10px;
`;

const Input = styled.input`
  margin-top: 20px;
  padding: 10px;
  width: 100%;
  max-width: 300px;
  font-size: 16px;
  font-family: inherit;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.inputBorder};
  background-color: ${props => props.theme.cardBackground};
  color: ${props => props.theme.text};
`;

const Button = styled(motion.button)`
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 16px;
  font-family: inherit;
  background-color: #0071e3;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SavedTextsContainer = styled(motion.div)`
  width: ${props => props.isMobile ? '100%' : '300px'};
  background-color: ${props => props.theme.cardBackground};
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  padding: 20px;
  overflow-y: auto;
  height: 100%;
  position: ${props => props.isMobile ? 'fixed' : 'relative'};
  left: ${props => props.isMobile ? (props.showSavedTexts ? '0' : '-100%') : '0'};
  top: ${props => props.isMobile ? '0' : 'auto'};
  transition: left 0.3s ease-in-out;
  z-index: 1000;
`;

const SavedTextItem = styled(motion.div)`
  margin-bottom: 15px;
  padding: 10px;
  background-color: ${props => props.theme.background};
  border-radius: 8px;
  position: relative;
  cursor: pointer;
  min-height: 80px;
`;

const DeleteButton = styled(motion.button)`
  position: absolute;
  right: 10px;
  top: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: #ff3b30;
`;

const EditButton = styled(motion.button)`
  position: absolute;
  right: 10px;
  bottom: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: #0071e3;
`;

const TagInput = styled.input`
  margin-top: 10px;
  padding: 5px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.inputBorder};
  background-color: ${props => props.theme.cardBackground};
  color: ${props => props.theme.text};
`;

const Tag = styled.span`
  display: inline-block;
  background-color: ${props => props.theme.background};
  padding: 2px 8px;
  margin-right: 5px;
  margin-bottom: 5px;
  border-radius: 4px;
  font-size: 12px;
`;

const Select = styled.select`
  margin-top: 10px;
  margin-bottom: 20px;
  padding: 10px;
  width: 100%;
  max-width: 300px;
  font-size: 16px;
  font-family: inherit;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.inputBorder};
  background-color: ${props => props.theme.cardBackground};
  color: ${props => props.theme.text};
  cursor: pointer;
`;

const ThemeToggleContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 10px;
`;

const ThemeToggleButton = styled(motion.button)`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: ${props => props.theme.text};
`;

const DeleteAllButton = styled(Button)`
  background-color: #ff3b30;
  margin-bottom: 20px;
`;

const App = () => {
  const [inputText, setInputText] = useState('');
  const [savedTexts, setSavedTexts] = useState([]);
  const [selectedText, setSelectedText] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showSavedTexts, setShowSavedTexts] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [tagInput, setTagInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    try {
      const storedTexts = localStorage.getItem('savedTexts');
      if (storedTexts) {
        const parsedTexts = JSON.parse(storedTexts);
        setSavedTexts(Array.isArray(parsedTexts) ? parsedTexts : []);
      } else {
        setSavedTexts([]);
      }
    } catch (err) {
      console.error('Error loading saved texts:', err);
      setSavedTexts([]);
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        handleSaveEdit();
      } else if (e.key === 'Escape' && editingIndex !== null) {
        setEditingIndex(null);
        setInputText('');
        setTagInput('');
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [editingIndex]);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const extractMainIdea = (text) => {
    const words = text.split(' ');
    return words.length > 5 ? words.slice(0, 5).join(' ') + '...' : text;
  };

  const handleSaveText = useCallback(() => {
    if (inputText.trim()) {
      const mainIdea = extractMainIdea(inputText);
      const tags = tagInput.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
      const newSavedTexts = [...savedTexts, { full: inputText, summary: mainIdea, tags }];
      setSavedTexts(newSavedTexts);
      localStorage.setItem('savedTexts', JSON.stringify(newSavedTexts));
      setInputText('');
      setTagInput('');
    }
  }, [inputText, tagInput, savedTexts]);

  const handleDeleteText = (index) => {
    if (window.confirm('Are you sure you want to delete this text?')) {
      const newSavedTexts = savedTexts.filter((_, i) => i !== index);
      setSavedTexts(newSavedTexts);
      localStorage.setItem('savedTexts', JSON.stringify(newSavedTexts));
      if (index === savedTexts.length - 1) {
        setSelectedText(newSavedTexts[newSavedTexts.length - 1]?.full || '');
      }
    }
  };

  const handleDeleteAllTexts = () => {
    if (window.confirm('Are you sure you want to delete all saved texts?')) {
      setSavedTexts([]);
      localStorage.removeItem('savedTexts');
      setSelectedText('');
    }
  };

  const handleEditText = (index) => {
    setEditingIndex(index);
    setInputText(savedTexts[index].full);
    setTagInput(savedTexts[index].tags.join(', '));
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null) {
      const newSavedTexts = [...savedTexts];
      const tags = tagInput.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
      newSavedTexts[editingIndex] = { 
        full: inputText, 
        summary: extractMainIdea(inputText),
        tags
      };
      setSavedTexts(newSavedTexts);
      localStorage.setItem('savedTexts', JSON.stringify(newSavedTexts));
      setInputText('');
      setTagInput('');
      setEditingIndex(null);
    } else {
      handleSaveText();
    }
  };

  const handleSelectText = (text) => {
    setSelectedText(text.full);
    if (isMobile) {
      setShowSavedTexts(false);
    }
  };

  const toggleSavedTexts = () => {
    setShowSavedTexts(!showSavedTexts);
  };

  const filteredTexts = Array.isArray(savedTexts) ? savedTexts.filter(text => 
    text.full.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'All' || text.tags.includes(selectedCategory))
  ) : [];

  const allCategories = ['All', ...new Set(savedTexts.flatMap(text => text.tags))];

  const SavedTextsComponent = () => (
    <SavedTextsContainer
      isMobile={isMobile}
      showSavedTexts={showSavedTexts}
      initial={false}
      animate={{ x: isMobile && !showSavedTexts ? '-100%' : 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 style={{
        fontSize: '24px',
        fontWeight: '500',
        color: isDarkMode ? '#f5f5f7' : '#1d1d1f',
        marginBottom: '20px'
      }}>Saved Texts</h2>
      <DeleteAllButton
        onClick={handleDeleteAllTexts}
        whileHover={{ scale: 1.05, backgroundColor: '#FF4B40' }}
        whileTap={{ scale: 0.95 }}
      >
        Delete All Texts
      </DeleteAllButton>
      <Input
        type="text"
        placeholder="Search saved texts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '10px', width: 'calc(100% - 20px)' }}
      />
      <Select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {allCategories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </Select>
      {filteredTexts.map((text, index) => (
        <SavedTextItem
          key={index}
          onClick={() => handleSelectText(text)}
          whileHover={{ scale: 1.02, backgroundColor: isDarkMode ? '#3a3a3c' : '#e8e8e8' }}
          whileTap={{ scale: 0.98 }}
        >
          <span style={{ fontSize: '14px', color: isDarkMode ? '#f5f5f7' : '#333', display: 'block', marginBottom: '10px', paddingRight: '60px' }}>{text.summary}</span>
          <div style={{ marginBottom: '30px' }}>
            {text.tags.map((tag, tagIndex) => (
              <Tag key={tagIndex}>{tag}</Tag>
            ))}
          </div>
          <DeleteButton
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteText(index);
            }}
          >
            Delete
          </DeleteButton>
          <EditButton
            onClick={(e) => {
              e.stopPropagation();
              handleEditText(index);
            }}
          >
            Edit
          </EditButton>
        </SavedTextItem>
      ))}
    </SavedTextsContainer>
  );

  const handleGetStarted = () => {
    setShowIntro(false);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <AnimatePresence mode="wait">
        {showIntro ? (
          <IntroScreen key="intro" onGetStarted={handleGetStarted} />
        ) : (
          <AppContainer
            as={motion.div}
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {isMobile && (
              <Button
                onClick={toggleSavedTexts}
                style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  zIndex: 1001
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {showSavedTexts ? 'Hide Saved Texts' : 'Show Saved Texts'}
              </Button>
            )}
            <ThemeToggleContainer>
              <ThemeToggleButton onClick={() => setIsDarkMode(false)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <FaSun />
              </ThemeToggleButton>
              <ThemeToggleButton onClick={() => setIsDarkMode(true)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <FaMoon />
              </ThemeToggleButton>
            </ThemeToggleContainer>
            <AnimatePresence>
              {(!isMobile || showSavedTexts) && <SavedTextsComponent />}
            </AnimatePresence>
            <MainContent>
              <TextDisplay>
                {selectedText ? (
                  <>
                    <h2>Selected Text:</h2>
                    <p>{selectedText}</p>
                  </>
                ) : (
                  <h1>Welcome! Start by typing and saving some text.</h1>
                )}
              </TextDisplay>
              <Input
                type="text"
                placeholder="Type something..."
                value={inputText}
                onChange={handleInputChange}
              />
              <TagInput
                type="text"
                placeholder="Add tags (comma-separated)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
              />
              <Button
                onClick={handleSaveEdit}
                whileHover={{ scale: 1.05, backgroundColor: '#0077ED' }}
                whileTap={{ scale: 0.95 }}
              >
                {editingIndex !== null ? 'Save Edit' : 'Save Text'}
              </Button>
            </MainContent>
          </AppContainer>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please refresh the page.</h1>;
    }

    return this.props.children;
  }
}

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);