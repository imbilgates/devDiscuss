import { useState } from 'react';
import { Box, Select, MenuItem, IconButton } from '@mui/material';
import CodeMirror from '@uiw/react-codemirror';
import { PlayArrow, RestartAlt } from '@mui/icons-material';
import { runCode as apiRunCode } from '../../../utils/Api';
import { languageExtensions } from '../../../utils/Language';

const Compiler = () => {
    const [code, setCode] = useState('');
    const [output, setOutput] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('javascript');

    const runCode = async () => {
        const response = await apiRunCode(selectedLanguage, code);
        setOutput(response.stdout ? response.stdout.split('\n') : [response.stderr || 'Error executing code']);
    };

    const resetCode = () => {
        setCode('');
        setOutput([]);
    };

    return (
        <Box sx={styles.container}>
            {/* Left Side - Code Editor */}
            <Box sx={styles.editorContainer}>
                <Box sx={styles.header}>
                    <Select
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        size="small"
                        sx={styles.select}
                    >
                        {Object.keys(languageExtensions).map((lang) => (
                            <MenuItem key={lang} value={lang}>{lang.toUpperCase()}</MenuItem>
                        ))}
                    </Select>
                    <Box sx={styles.buttonContainer}>
                        <IconButton onClick={runCode} color="primary"><PlayArrow /></IconButton>
                        <IconButton onClick={resetCode} color="error"><RestartAlt /></IconButton>
                    </Box>
                </Box>
                <CodeMirror
                    value={code}
                    onChange={(value) => setCode(value)}
                    extensions={[languageExtensions[selectedLanguage]]}
                    theme="light"
                    height="100%"
                    style={{ border: '1px solid #ccc', borderRadius: '8px', fontSize: '14px', backgroundColor: '#fff' }}
                />
            </Box>
            {/* Right Side - Output Panel */}
            <Box sx={styles.outputContainer}>
                <strong>Output:</strong>
                <pre>{output.length > 0 ? output.join('\n') : 'No output'}</pre>
            </Box>
        </Box>
    );
};

export default Compiler;

const styles = {
    container: {
        display: 'flex',
        width: '900px',
        height: '500px',
        border: '2px solid #ddd',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: '#f9f9f9',
    },
    editorContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        backgroundColor: '#fff',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
    },
    outputContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: '15px',
        borderLeft: '2px solid #ddd',
        color: '#333',
        fontFamily: 'monospace',
        overflow: 'auto',
    },
    select: {
        backgroundColor: '#fff',
        borderRadius: '4px',
        padding: '5px',
    },
    buttonContainer: {
        display: 'flex',
        gap: '5px',
    },
};
