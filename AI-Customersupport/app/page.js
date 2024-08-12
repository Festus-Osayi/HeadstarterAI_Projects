'use client'
import { Box, Button, Stack, TextField, Container, Avatar, Select, MenuItem, FormControl, InputLabel, Typography } from "@mui/material"
import { } from '@mui/material';
import { useState, useEffect } from 'react';


export default function Home() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCelebrity, setSelectedCelebrity] = useState('');
    const [celebrities, setCelebrities] = useState([]);

    useEffect(() => {
        // Fetch the list of celebrities from the backend or an external API
        const fetchCelebrities = async () => {
            try {
                const response = await fetch('/api/celebrities');
                const data = await response.json();
                setCelebrities(data.celebrities);
                console.log(response)
            } catch (error) {
                console.error('Error fetching celebrities:', error);
            }
        };

        fetchCelebrities();
    }, []);

    const sendMessage = async () => {
        if (!message.trim() || !selectedCelebrity) return;  // Ensure message and celebrity are selected
        setIsLoading(true);

        setMessages((messages) => [
            ...messages,
            { role: 'user', content: message },
        ]);

        setMessage('');

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [...messages, { role: 'user', content: message }],
                    selectedCelebrity
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const { content, celebrityName, imageUrl } = await response.json();

            setMessages((messages) => [
                ...messages,
                { role: 'assistant', content, celebrityName, imageUrl },
            ]);
        } catch (error) {
            console.error('Error:', error);
            setMessages((messages) => [
                ...messages,
                { role: 'assistant', content: "I'm sorry, but I encountered an error. Please try again later." },
            ]);
        }
        setIsLoading(false);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    };

    const handleCelebrityChange = (e) => {
        setSelectedCelebrity(e.target.value);
        setMessages([]); 
    };

    return (
        <Container maxWidth='lg'>
            <Box
                width='100%'
                height="80vh"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                marginTop='2em'
                padding='1em'
                marginBottom='2em'
            >
                <FormControl fullWidth>
                    <InputLabel id="celebrity-select-label">Select Celebrity</InputLabel>
                    <Select
                        labelId="celebrity-select-label"
                        id="celebrity-select"
                        value={selectedCelebrity}
                        label="Select Celebrity"
                        onChange={handleCelebrityChange}
                        fullWidth
                    >
                        {celebrities.map((celebrity) => (
                            <MenuItem key={celebrity.name} value={celebrity.name}>
                                {celebrity.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Stack
                    direction={'column'}
                    height="700px"
                    border="1px solid black"
                    width="80%"
                    padding={2}
                    spacing={3}
                    marginTop={2}
                    overflow='auto'
                    box-sizing='border-box'
                    borderRadius={4}
                >
                    <Stack
                        direction={'column'}
                        spacing={2}
                        flexGrow={1}
                        overflow="auto"
                        maxHeight="100%"
                    >
                        {messages.map((message, index) => (
                            <Box
                                key={index}
                                display="flex"
                                justifyContent={
                                    message.role === 'assistant' ? 'flex-start' : 'flex-end'
                                }
                            >
                                {message.role === 'assistant' && message.imageUrl && (
                                    <Avatar src={message.imageUrl} alt={message.celebrityName} sx={{ mr: 2 }} />
                                )}
                                <Box
                                    bgcolor={
                                        message.role === 'assistant'
                                            ? 'primary.main'
                                            : 'secondary.main'
                                    }
                                    color="white"
                                    borderRadius={5}
                                    p={3}
                                    maxWidth='70%'
                                    wordWrap="break-word"
                                >
                                    {message.content}
                                </Box>
                            </Box>
                        ))}
                    </Stack>
                    <Stack direction={'row'} spacing={2}>
                        <TextField
                            label="Message"
                            fullWidth
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyPress}
                            disabled={isLoading}
                        />
                        <Button variant="contained" onClick={sendMessage}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Sending...' : 'Send'}
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Container>
    );
} 