        // We wrap EVERYTHING in DOMContentLoaded to tell the browser:
        // "Wait until all the HTML tags above are loaded before running this code!"
        document.addEventListener('DOMContentLoaded', () => {
            
            // 1. Grab all the HTML elements safely now that they exist
            const BACKEND_URL = "https://ciberlocal.com/widget/";
			const widgetContainer = document.getElementById('custom-chat-widget');
            const toggleBubble = document.getElementById('chat-toggle-bubble');
            const sendButton = document.getElementById('chat-send-btn');
            const userInput = document.getElementById('chat-user-input');
            const messagesContainer = document.getElementById('chat-messages-container');
            const iconSvg = document.getElementById('chat-icon-svg');

            const chatIconPath = "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z";
            const closeIconPath = "M18 6L6 18M6 6l12 12";

			// Change your random ID generator to avoid triggering the server firewall rules
			let chatCode = localStorage.getItem('chat_session_id');
			if (!chatCode) {
				// Generates something clean like "client-1793361240"
				chatCode = 'client-' + Math.floor(Date.now() / 1000); 
				localStorage.setItem('chat_session_id', chatCode);
			}

            // 3. Toggle opening/closing chat window click events
            toggleBubble.addEventListener('click', () => {
                const isOpen = widgetContainer.classList.toggle('open');
                if (isOpen) {
                    iconSvg.innerHTML = `<path d="${closeIconPath}"></path>`;
                    userInput.focus();
                    fetchMessages(); 
                } else {
                    iconSvg.innerHTML = `<path d="${chatIconPath}"></path>`;
                }
            });

			function appendMessage(text, direction, timestamp = '') {
				const msgDiv = document.createElement('div');
				msgDiv.className = direction === 'user' ? 'message outbound' : 'message inbound';
				
				// Create text wrapper to protect formatting
				const textSpan = document.createElement('span');
				textSpan.textContent = text;
				msgDiv.appendChild(textSpan);

				// If a timestamp exists, parse and format it cleanly (e.g., "14:32")
				if (timestamp) {
					const timeDiv = document.createElement('div');
					timeDiv.style.fontSize = '10px';
					timeDiv.style.opacity = '0.6';
					timeDiv.style.marginTop = '4px';
					timeDiv.style.textAlign = direction === 'user' ? 'right' : 'left';
					
					// Grab just the Hours:Minutes from the MySQL timestamp (YYYY-MM-DD HH:MM:SS)
					const timeParts = timestamp.split(' ')[1] ? timestamp.split(' ')[1].split(':') : null;
					timeDiv.textContent = timeParts ? `${timeParts[0]}:${timeParts[1]}` : '';
					msgDiv.appendChild(timeDiv);
				}

				messagesContainer.appendChild(msgDiv);
				messagesContainer.scrollTop = messagesContainer.scrollHeight;
			}

			// 1. Add this line right ABOVE your fetchMessages function!
			let lastMessageCount = 0;

			// 2. Your optimized fetchMessages function
			async function fetchMessages() {
				try {
					const response = await fetch(`${BACKEND_URL}chat.php?action=fetch&chatcode=${chatCode}&api_key=${KEY_TOKEN}`);

					const rawText = await response.text();
					
					if (!rawText.trim()) return;

					const data = JSON.parse(rawText);
					
					// Only rebuild the DOM if a brand new message has arrived
					if (Array.isArray(data) && data.length > lastMessageCount) {
						messagesContainer.innerHTML = ''; // Rebuild clean chat feed
						data.forEach(msg => {
							appendMessage(msg.message, msg.sender, msg.created_at);
						});
						
						// Keep the counter updated with the current database message count
						lastMessageCount = data.length;
					}
				} catch (error) {
					console.error('Error syncing chat logs:', error);
				}
			}



async function handleSendMessage() {
    const chatInput = document.getElementById('chat-user-input');
    const text = chatInput ? chatInput.value.trim() : '';
    const chatCode = localStorage.getItem('chat_session_id') || window.chatCode; 

    // --- 🔍 CRITICAL DEBUG DIAGNOSTIC LOGS ---
    const targetLink = `${BACKEND_URL}chat.php`;
    const dataPayload = {
        chatcode: chatCode, 
        message: text,        
        sender: 'user'       
    };
    
    console.log("🔗 REACHING LINK LOCATION:", targetLink);
    console.log("📦 RAW PAYLOAD BEING SENT:", JSON.stringify(dataPayload));
    // ------------------------------------------

    if (!text || !chatCode) {
        console.warn("Cannot send: Message or ChatCode is missing.");
        return;
    }

    try {
        const response = await fetch(targetLink, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'X-Chat-Key': KEY_TOKEN 
            },
            body: JSON.stringify(dataPayload)
        });

        const data = await response.json();
        console.log("Server Response:", data);
        
        if (data.status === 'success') {
            if (chatInput) chatInput.value = ''; 
        } else {
            console.error("Server validation failed:", data.message);
        }
    } catch (error) {
        console.error("Network dispatch failed:", error);
    }
}

/*



async function handleSendMessage() {
    // 1. Grab your values directly from your DOM inputs or local storage
    // const chatInput = document.querySelector('#chat-user-input') || document.querySelector('.chat-user-input');
	const chatInput = document.getElementById('chat-user-input');
    const text = chatInput ? chatInput.value.trim() : '';
    
    // Grab your active session code from your variable or local storage
    const chatCode = localStorage.getItem('chat_session_id') || window.chatCode; 

    console.log("Internal lookup tracking values:", { chatCode, text });

    // 2. Prevent sending if anything is empty
    if (!text || !chatCode) {
        console.warn("Cannot send: Message or ChatCode is missing.", { chatCode, text });
        return;
    }

    try {
        const response = await fetch(`${BACKEND_URL}chat.php`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'X-Chat-Key': KEY_TOKEN 
            },
            body: JSON.stringify({
                sessionid: chatCode, 
                message: text,        // Maps the text variable string to the 'message' database key
                sender: 'user'       
            })
        });

        const data = await response.json();
        console.log("Server Response:", data);
        
        if (data.status === 'success') {
            if (chatInput) chatInput.value = ''; // Clear out the chat box text input on success
            // Trigger your message rendering updates here (e.g., fetchMessages() or renderBubble())
        }
    } catch (error) {
        console.error("Network dispatch failed:", error);
    }
}

/*
            // 5. Fire outward POST message request
			async function handleSendMessage() {
				const text = userInput.value.trim();
				if (!text) return;

				userInput.value = '';

				try {
					console.log("Attempting to post message payload to backend...", {chatCode, text});
		
// ⚠️ CHANGED: Using backticks `...` instead of single quotes '...'
const response = await fetch(`${BACKEND_URL}chat.php`, {
    method: 'POST',
    headers: { 
        'Content-Type': 'application/json',
        'X-Chat-Key': KEY_TOKEN // Injects the gate key passkey validation layer
    },
    body: JSON.stringify({
        sessionid: chatCode, // ⚠️ CHANGED: 'sessionid' matches the firewall bypass naming scheme
        message: text,
        sender: 'user'
    })
});

		
					
					//const response = await fetch('chat.php', {
					//const response = await fetch('${BACKEND_URL}chat.php', {
					//	method: 'POST',
					//	headers: { 'Content-Type': 'application/json' },
					//	body: JSON.stringify({
					//		session_id: chatCode,
					//		message: text,
					//		sender: 'user'
					//	})
					//});
					
					
					// Read raw response string text to see if PHP crashed
					const responseText = await response.text();
					console.log("Raw Server Response Text:", responseText);

					// Attempt to parse it as clean JSON
					try {
						const data = JSON.parse(responseText);
						if (data.status === 'success') {
							console.log("Database write verified successfully!");
							fetchMessages(); 
						} else {
							alert("Server error status: " + JSON.stringify(data));
						}
					} catch(jsonErr) {
						alert("The server didn't send back clean JSON data! Check the console logs.");
						console.error("JSON Parsing Error on return output:", jsonErr);
					}

				} catch (error) {
					alert("Network communication crash! Is XAMPP fully active?");
					console.error('Fatal Fetch Communication Error:', error);
				}
			}
*/

            // 6. Hook actions to button interactions
            sendButton.addEventListener('click', handleSendMessage);
            userInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') handleSendMessage();
            });

            // Auto refresh background data checks loops
            setInterval(() => {
                if (widgetContainer.classList.contains('open')) {
                    fetchMessages();
                }
            }, 3000);


			const widgetInput = document.getElementById('chat-user-input');

// Helper function to send the typing state to the server
function sendUserTypingState(isTyping) {
    // ⚠️ CHANGED: Note the backticks `...` instead of single quotes '...'
    fetch(`${BACKEND_URL}chat.php?action=set_typing&api_key=${KEY_TOKEN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender: 'user', is_typing: isTyping })
    })
    .catch(err => console.error("Typing tracking failed:", err));
}

			// Helper function to send the typing state to the server
			//function sendUserTypingState(isTyping) {
			//	fetch('${BACKEND_URL}chat.php?action=set_typing&api_key=${KEY_TOKEN}', {
			//		method: 'POST',
			//		headers: { 'Content-Type': 'application/json' },
			//		body: JSON.stringify({ sender: 'user', is_typing: isTyping })
			//	});
			//}

			// Check the input text box value dynamically
			widgetInput.addEventListener('input', () => {
				if (widgetInput.value.trim().length > 0) {
					sendUserTypingState(1); // Has text! Show typing...
				} else {
					sendUserTypingState(0); // Input is completely empty! Clear indicator
				}
			});

			// CRITICAL FIX: Make sure the indicator clears out immediately when they send the message
			const originalHandleSendMessage = handleSendMessage;
			handleSendMessage = async function() {
				await originalHandleSendMessage();
				sendUserTypingState(0); // Clear state since the text box is now empty
			};

			// 2. Check if the Admin is typing
			// Locate this block in your index.php script section and update it:
			setInterval(async () => {
				
				if (!widgetContainer.classList.contains('open')) return;
				
				try {
					//const response = await fetch(`chat.php?action=get_typing&target=admin`);
					const response = await fetch(`${BACKEND_URL}chat.php?action=get_typing&target=admin&api_key=${KEY_TOKEN}`);
					const resData = await response.json();
					console.log("interval5"+JSON.stringify(resData, null, 2));
					
					// --- UPDATED SELECTOR FOR PRECISE EXTRACTION ---
					const subTitle = document.getElementById('chat-header-status');
					
					
					if (subTitle) { // Safety guard check
						if (resData.is_typing === 1) {
							console.log("Agent is typing");
							subTitle.textContent = "Agent is typing...";
							subTitle.style.color = "#22c55e"; // Changes text color to solid green
						} else {
							subTitle.textContent = "Online";
							subTitle.style.color = "white"; // Restores default text styling
						}
					}
				} catch (err) {
					console.error("Error matching agent typing state:", err);
				}
			}, 2000);


const KEY_TOKEN = "MySuperSecurePasskey123_ChangeMe"; // Must match WIDGET_SECRET_KEY exactly

// 1. Example for GET requests (Append it directly as a parameter)
const response = fetch(`${BACKEND_URL}chat.php?action=fetch&chatcode=${chatCode}&api_key=${KEY_TOKEN}`);

// 2. Example for POST requests (Pass it inside a custom header field tracking key)
fetch(`${BACKEND_URL}chat.php`, {
    method: 'POST',
    headers: { 
        'Content-Type': 'application/json',
        'X-Chat-Key': KEY_TOKEN // Injects the anonymous gate passkey signature
    },
    body: JSON.stringify({ chatcode: chatCode, message: 'text', sender: 'user' })
});

// 3. Make sure your typing check loop also includes it:
const res = fetch(`${BACKEND_URL}chat.php?action=get_typing&target=admin&api_key=${KEY_TOKEN}`);


        });

