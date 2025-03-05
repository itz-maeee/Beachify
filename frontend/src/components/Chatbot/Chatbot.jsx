// Chatbot.jsx
import React, { useState, useEffect, useRef } from "react";
import "./Chatbot.css";
import botLogo from "./bot-logo.png"; // Import the chatbot logo

const chatbotResponses = {
  "hello": "Hi there! Welcome to Beachify! How can I help you today?",
  "hi": "Hello! Looking for a great beach vacation?",
  "who are you": "I'm your Beachify assistant, here to help you plan your perfect trip!",
  "what do you do": "I help you find amazing beach destinations, tour packages, and more!",
  "best beaches": "Some top-rated beaches are Maldives, Bora Bora, and Seychelles!",
  "how do I book a tour": "You can book through our website or let me know which destination you're interested in!",
  "what activities can I do": "Surfing, snorkeling, scuba diving, jet skiing, and more!",
  "thank you": "You're welcome! Have a fantastic beach vacation! 🌊🌴",
  "what is the best time to visit the beach?": "The best time to visit Indian beaches is usually from November to March when the weather is pleasant.",
  "do you offer discounts?": "Yes! We offer seasonal discounts on Indian beach tours. Check our website for the latest deals!",
  "can I book a hotel with you?": "Absolutely! We have partnerships with top-rated Indian beach resorts and hotels.",
  "do you offer travel insurance?": "Yes, we provide travel insurance options for a stress-free vacation.",
  "what are some romantic beach destinations?": "Andaman & Nicobar, Lakshadweep, and Goa are perfect for couples!",
  "do you offer family-friendly beach packages?": "Yes, we have special family packages with kid-friendly activities in places like Kovalam and Mahabalipuram!",
  "can I rent water sports equipment?": "Yes! You can rent jet skis, surfboards, and snorkeling gear at many Indian beaches like Gokarna and Puri.",
  "what should I pack for a beach trip?": "Swimsuits, sunscreen, sunglasses, a hat, and flip-flops are essentials!",
  "do you offer guided tours?": "Yes, we have experienced guides for various Indian beach excursions!",
  "how do I cancel my booking?": "You can cancel via our website or by contacting our support team.",
  "is there a refund policy?": "Yes, we offer refunds based on our cancellation policy. Check our website for details!",
  "what are some hidden beach gems?": "Try visiting Marari Beach (Kerala), Gahirmatha Beach (Odisha), and Bangaram Beach (Lakshadweep) for stunning hidden spots!",
  "can I bring my pet to the beach?": "Some Indian beaches allow pets, like Mandarmani Beach in West Bengal.",
  "do you provide transportation?": "Yes, we offer airport transfers and shuttle services to Indian beach destinations.",
  "how much does a beach tour cost?": "Prices vary depending on location and package. Check our website for details!",
  "can I customize my travel itinerary?": "Absolutely! Let us know what you'd like, and we'll create a custom plan!",
  "do you have luxury beach packages?": "Yes! We offer premium beachfront villas and yacht tours in Goa and Kerala.",
  "do you provide food options?": "Yes, many of our packages include meal plans at beachside restaurants.",
  "are there any safety guidelines?": "Yes, always follow lifeguard instructions and be aware of local safety measures.",
  "do you offer honeymoon packages?": "Yes! We have romantic honeymoon packages with private beach dinners in Andaman and Goa.",
  "what is the most affordable beach destination?": "Beaches like Puri, Gokarna, and Digha are great budget-friendly options!",
  "do you offer group discounts?": "Yes! We offer special rates for group bookings.",
  "what happens if the weather is bad?": "We provide rescheduling options or refunds for weather-related cancellations.",
  "how can I contact support?": "You can reach us via live chat, email, or our support hotline.",
  "is Wi-Fi available at the beach resorts?": "Most of our partner resorts offer free Wi-Fi.",
  "do you have eco-friendly travel options?": "Yes! We promote sustainable tourism and eco-resorts.",
  "can I pay in installments?": "Yes, we offer flexible payment plans for select packages.",
  "do you provide local guides?": "Yes! Our local guides offer personalized beach tours.",
  "how long do your tours last?": "Our tours range from a few hours to multi-day experiences.",
  "do I need a visa for Indian beach travel?": "No visa is required for Indian citizens traveling within India. Foreign tourists should check visa requirements.",
  "can I go diving without experience?": "Yes! We offer beginner-friendly diving courses with certified instructors in places like Havelock Island.",
  "what currency should I bring?": "Indian Rupees (INR) is the accepted currency at all Indian beaches.",
  "can I book last-minute trips?": "Yes! We offer last-minute deals based on availability.",
  "what are the best beaches for surfing?": "Kovalam, Varkala, and Murudeshwar are top surfing spots in India!",
  "do you offer airport pick-up services?": "Yes, we provide airport transfers to select destinations.",
  "how do I leave feedback?": "You can leave a review on our website or social media pages!",
  "are there any hidden fees?": "No, we ensure transparency in pricing with no hidden charges.",
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Welcome to Beachify! How can I assist you?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const chatBodyRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = (event) => {
    if (event.key === "Enter" && input.trim()) {
      const userMessage = { text: input, sender: "user" };
      setMessages((prev) => [...prev, userMessage]);
      const botReplyText = chatbotResponses[input.toLowerCase()] || "I'm not sure, but I can find out for you!";
      
      setTimeout(() => {
        const botReply = { text: botReplyText, sender: "bot" };
        setMessages((prev) => [...prev, botReply]);
      }, 1000);
      
      setInput("");
    }
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div>
      <button onClick={toggleChat} className="chat-button">💬</button>
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <img src={botLogo} alt="Chatbot Logo" className="chat-logo" />
            Beachify Chat
          </div>
          <div className="chat-body" ref={chatBodyRef}>
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                {msg.sender === "user" ? "You: " : "Bot: "}{msg.text}
              </div>
            ))}
          </div>
          <input
            type="text"
            className="chat-input"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={sendMessage}
          />
        </div>
      )}
    </div>
  );
};

export default Chatbot;
