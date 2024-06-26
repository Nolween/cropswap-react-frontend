import {ChatOutlined} from "@mui/icons-material";
import {NavigationMenu} from "../../layouts/NavigationMenu.jsx";
import {useEffect, useState} from "react";
import dayjs from "dayjs";
import {useTextTools} from "../../hooks/useTextTools.jsx";

export function AccountMessages() {

    const {truncateText} = useTextTools();
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState({});
    const [message, setMessage] = useState('');
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [authId, setAuthId] = useState(1);


    const handleSelectConversation = (conversation) => {
        setSelectedConversation(conversation);
    };

    const sendMessage = async () => {
        if (message.value === '') return;
        // Send the message to the server
        // axios.post('/messages', {
        //     content: message.value,
        //     sender_id: props.authId,
        //     receiver_id: selectedConversation.value.receiver_id
        // }).then(response => {
        //     message.value = '';
        // }).catch(error => {
        //     console.error(error);
        // });

        // FRONT TEMP ACTION
        // Push the message to the selected conversation
        const newMessage = {
            content: message,
            created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            sender_id: authId
        };
        let added = false;
        setConversations(prevConversations => {
            return prevConversations.map(conversation => {
                if (conversation.id === selectedConversation.id && !added) {
                    added = true;
                    conversation.messages.unshift(newMessage);
                    conversation.last_message = newMessage.content;
                    conversation.unread = 0;
                }
                return conversation;
            });
        })
        setMessage('');

    };

    useEffect(() => {

            // CSS to resize the left part of the screen
            const navigationMenu = document.querySelector('.navigation-menu');
            const leftPart = document.querySelector('.left-part');

            const resizeLeftPart = () => {
                const navigationMenuHeight = navigationMenu.offsetHeight;
                leftPart.style.height = `calc(100vh - ${navigationMenuHeight}px)`;
            };

            window.addEventListener('resize', resizeLeftPart);
            resizeLeftPart();

            //  CSS to resize the right part of the screen
            const rightPart = document.querySelector('.right-part');
            const messagePart = document.querySelector('.message-part');
            const userPart = document.querySelector('.user-part');
            const resizeRightPart = () => {
                const navigationMenuHeight = navigationMenu.offsetHeight;
                const messagePartHeight = messagePart.offsetHeight;
                const userPartHeight = userPart.offsetHeight;
                rightPart.style.height = `calc(100vh - ${navigationMenuHeight}px - ${messagePartHeight}px - ${userPartHeight}px)`;
            };

            window.addEventListener('resize', resizeRightPart);
            resizeRightPart();

            // Echo part, broadcasting events
            // Echo.private(`messages.${props.authId}`)
            //     .listen('UserMessageCreatedEvent', (e) => {
            //         // Find the conversation in the list of conversations thanks to the receiver_id and add the message to the messages array
            //         const existingConversation = Object.values(conversations.value).find(conversation => conversation.receiver_id === e.user_message.receiver_id && props.authId === e.user_message.sender_id);
            //
            //         if (existingConversation) {
            //             existingConversation.messages.unshift(e.user_message);
            //         } else {
            //             conversations.value.unshift({
            //                 receiver_id: e.user_message.receiver_id,
            //                 user: e.user_message.receiver,
            //                 user_image: e.user_message.receiver_image,
            //                 messages: [e.user_message],
            //                 last_message: e.user_message.content,
            //                 unread: 1,
            //             });
            //         }
            //     });

            //     Temp settings

        const conversationsToSet = ([
            {
                id: 1,
                receiver_id: 2,
                user: 'User 1',
                user_image: '/images/user/empty.webp',
                messages: [
                    {
                        content: 'Hello',
                        created_at: '2024-01-01 12:00:00',
                        sender_id: 2
                    },
                    {
                        content: 'How are you?',
                        created_at: '2024-01-01 12:00:00',
                        sender_id: 1
                    }
                ],
                last_message: 'How are you?',
                unread: 1
            },
            {
                id: 2,
                receiver_id: 1,
                user: 'User 2',
                user_image: '/images/user/empty.webp',
                messages: [
                    {
                        content: 'Hello',
                        created_at: '2024-01-01 12:00:00',
                        sender_id: 2
                    },
                    {
                        content: 'I am fine, thank you',
                        created_at: '2024-01-01 12:00:00',
                        sender_id: 1
                    }
                ],
                last_message: 'I am fine, thank you',
                unread: 0
            }
        ]);
            setConversations(conversationsToSet);

            setSelectedConversation(conversationsToSet[0]);

        },
        []);


    return (
        <div className="relative h-screen flex flex-col">
            <NavigationMenu/>

            <div className="flex flex-grow">
                <div className="w-16 md:w-1/4 bg-orange-500 overflow-auto overflow-x-hidden left-part">
                    <div className="text-white text-2xl p-2 hidden md:block text-center">CONVERSATIONS</div>
                    <div className="text-white text-2xl p-3 block md:hidden">
                        <ChatOutlined className="text-white" size={40}/>
                    </div>
                    <div className="space-y-2">
                        {conversations.length > 0 ? conversations.map(conversation => (
                            <div key={conversation.id}
                                 onClick={() => handleSelectConversation(conversation)}
                                 className={`p-3 hover:bg-orange-400 cursor-pointer text-white text-xl font-bold ${selectedConversation && conversation.id === selectedConversation?.id ? 'bg-orange-400' : ''}`}>
                                <div className="flex items-center gap-2 justify-center md:justify-start">
                                    <img src={conversation.user_image} className="object-cover w-8 h-8 rounded-full"
                                         alt="User image"/>
                                    <div className="hidden md:block">
                                        {conversation.user}
                                        <div
                                            className="font-medium overflow-hidden whitespace-nowrap overflow-ellipsis">
                                            {truncateText(conversation.messages[0].content, 15)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) : null}
                    </div>
                </div>

                <div className="relative w-full md:w-3/4 bg-gray-50">
                    <div
                        className="absolute top-O w-full text-xl md:text-5xl font-mono text-orange-500 border-b-2 p-3 user-part">
                        {selectedConversation?.user ?? 'User'}
                    </div>

                    <div className="absolute top-20 p-4 gap-2 w-full right-part overflow-auto">
                        {selectedConversation?.messages ? selectedConversation.messages.map((message, messageIndex) => (
                            <div key={messageIndex}
                                 className={`w-full flex ${authId === message.sender_id ? 'justify-end' : 'justify-start'}`}>
                                <div
                                    className={`w-3/4 rounded-2xl p-2 mb-4 border-2 border-orange-500 ${authId === message.sender_id ? 'bg-orange-500 text-white' : 'bg-white text-orange-500'}`}>

                                    <div className="font-bold text-xl mb-2">{message.content}</div>
                                    <div
                                        className="text-end ">{dayjs(message.created_at).format('DD/MM/YYYY à HH:mm')}</div>

                                </div>
                            </div>
                        )) : null}
                    </div>

                    <div className="absolute bottom-0 w-full bg-orange-500 p-2 flex gap-2 message-part">
                        <input type="text" className="w-3/4 p-2 rounded-2xl border-transparent"
                               value={message} onChange={(event) => setMessage(event.target.value)}
                               placeholder="Votre message ici" onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                sendMessage();
                            }
                        }}/>
                        <button className="w-1/4 bg-lime-500 text-white p-2 rounded-2xl"
                                onClick={() => sendMessage}>ENVOYER
                        </button>
                    </div>

                </div>

            </div>
        </div>
    )
}