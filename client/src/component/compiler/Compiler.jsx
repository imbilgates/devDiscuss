import { useState, useRef } from "react";
import { Box, Select, MenuItem, IconButton, Typography } from "@mui/material";
import CodeMirror from "@uiw/react-codemirror";
import { PlayArrow, RestartAlt } from "@mui/icons-material";
import { runCode as apiRunCode } from "../../utils/Api";
import { languageExtensions } from "../../utils/Language";
import CodeModal from "./CodeModal";

const Compiler = () => {
    const [open, setOpen] = useState(false);
    const [code, setCode] = useState(``);
    const [output, setOutput] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState("python");
    const [waitingForInput, setWaitingForInput] = useState(false);
    const [userInput, setUserInput] = useState("");
    const [error, setError] = useState(""); // Store error message
    const inputRef = useRef(null);

    const runCode = async (stdinValue = "") => {
        setOutput([]);
        setWaitingForInput(false);
        setUserInput("");
        setError(""); // Reset error before execution

        try {
            const response = await apiRunCode(selectedLanguage, code, stdinValue);
            console.log("Execution Result:", response);

            if (response.stderr) {
                setOutput([response.stderr]);
                setError(response.stderr); // Set error message
                setOpen(true); // Open modal on error
            } else {
                const outputLines = response.stdout.split("\n");
                if (outputLines.some(line => line.includes("Enter your name:"))) {
                    setOutput(outputLines.slice(0, -1));
                    setWaitingForInput(true);
                    setTimeout(() => inputRef.current?.focus(), 100);
                } else {
                    setOutput(response.stdout ? outputLines : ["No output"]);
                }
            }
        } catch (error) {
            console.error("Execution error:", error);
            setError("Error executing code"); // Fallback error message
            setOpen(true); // Open modal on error
        }
    };

    const handleUserInput = async (e) => {
        if (e.key === "Enter" && userInput.trim() !== "") {
            setWaitingForInput(false);
            await runCode(userInput);
        }
    };

    const resetCode = () => {
        setCode("");
        setOutput([]);
        setWaitingForInput(false);
        setUserInput("");
    };

    return (
        <Box sx={styles.container}>
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
                        <IconButton onClick={() => runCode()} color="primary"><PlayArrow /></IconButton>
                        <IconButton onClick={resetCode} color="error"><RestartAlt /></IconButton>
                    </Box>
                </Box>
                <CodeMirror
                    value={code}
                    onChange={(value) => setCode(value)}
                    extensions={[languageExtensions[selectedLanguage]]}
                    theme="dark"
                    height="calc(100vh - 50px)"
                    style={styles.codeEditor}
                />
            </Box>
            <Box sx={styles.outputContainer}>
                <strong>Output:</strong>
                {output.map((line, index) => (
                    <Typography key={index} sx={styles.outputText}>{line}</Typography>
                ))}

                {waitingForInput && (
                    <Box sx={styles.inlineInput}>
                        <Typography sx={styles.outputText}>Enter your name: </Typography>
                        <input
                            ref={inputRef}
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyDown={handleUserInput}
                            style={styles.inputBox}
                        />
                    </Box>
                )}
            </Box>

            {/* Show modal only when there is an error */}
            <CodeModal
                language={selectedLanguage}
                code={code}
                open={open}
                onClose={() => setOpen(false)}
                error={error} // Pass error message
            />
        </Box>
    );
};

export default Compiler;


const styles = {
    container: {
        display: "flex",
        width: "100vw",
        height: "100vh",
        border: "none",
        overflow: "hidden",
        backgroundColor: "#1e1e1e",
    },
    editorContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        backgroundColor: "#282c34",
        color: "#fff",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "10px",
    },
    outputContainer: {
        flex: 1,
        backgroundColor: "#181a1f",
        padding: "15px",
        borderLeft: "2px solid #444",
        color: "#fff",
        fontFamily: "monospace",
        overflow: "auto",
    },
    select: {
        backgroundColor: "#333",
        borderRadius: "4px",
        color: "#fff",
        padding: "5px",
    },
    buttonContainer: {
        display: "flex",
        gap: "5px",
    },
    codeEditor: {
        border: "none",
        borderRadius: "8px",
        fontSize: "16px",
        backgroundColor: "#1e1e1e",
        color: "#fff",
    },
    outputText: {
        fontFamily: "monospace",
        color: "#fff",
    },
    inlineInput: {
        display: "flex",
        alignItems: "center",
        gap: "5px",
    },
    inputBox: {
        backgroundColor: "transparent",
        border: "none",
        color: "#fff",
        fontFamily: "monospace",
        fontSize: "16px",
        outline: "none",
        caretColor: "#fff",
    },
};
