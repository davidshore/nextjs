import { model } from "@/util/ai";
import { useEffect, useState } from "react";

export default function AIQuestions() {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");

  const [history, setHistory] = useState([]);

  async function sendPrompt() {
    const result = await model.generateContent(prompt);
    const answerText = result.response.text();
    setAnswer(answerText);

    // Lägg till i history
    const newHistory = [...history];
    newHistory.push({ prompt, answer: answerText });
    setHistory(newHistory);
  }

  // async function sendOnPageLoad(question) {
  //   const result = await model.generateContent(question);
  //   setAnswer(result.response.text());
  // }

  // useEffect när sidan laddas
  // 1. en funktion som ska anropas
  // 2. en array som bestämmer när den ska anropas
  // useEffect(() => {
  //   sendOnPageLoad("Hur många bor i Norge?");
  // }, []);

  // useEffect när en variabel ändras

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("history"));

    setHistory(data);
  }, []);

  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem("history", JSON.stringify(history));
    }
  }, [history]);

  return (
    <div>
      <h2>AI Questions</h2>

      <input
        className="border border-gray-500"
        type="text"
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button onClick={sendPrompt}>Send</button>

      <p>{answer}</p>
    </div>
  );
}
