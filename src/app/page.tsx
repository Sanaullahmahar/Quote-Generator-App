// app/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils"; // Ensure you have this utility for combining class names

// Quotes categorized by topic (assuming this part is correct from previous responses)
const topicQuotes: { [key: string]: string[] } = {
  success: [
    "Success is not for the lazy.",
    "Dream it. Wish it. Do it.",
    "Push yourself, because no one else is going to do it for you.",
    "Success usually comes to those who are too busy to be looking for it.",
    "Don’t be afraid to give up the good to go for the great.",
    "Success is walking from failure to failure with no loss of enthusiasm.",
    "The harder you work, the luckier you get.",
    "Success is not in what you have, but who you are.",
    "The way to get started is to quit talking and begin doing.",
    "Opportunities don't happen. You create them."
  ],
  life: [
    "The unexamined life is not worth living.",
    "Life is what happens when you're busy making other plans.",
    "The purpose of our lives is to be happy.",
    "Life is a daring adventure or nothing at all.",
    "In the end, it's not the years in your life that count. It's the life in your years.",
    "Live as if you were to die tomorrow. Learn as if you were to live forever."
  ],
  motivation: [
    "The only way to do great work is to love what you do.",
    "Believe you can and you're halfway there.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "Don't watch the clock; do what it does. Keep going.",
    "It does not matter how slowly you go as long as you do not stop.",
    "Your limitation—it’s only your imagination."
  ],
  happy: [
    "Happiness is not by chance, but by choice.",
    "Be so happy that when others look at you, they become happy too.",
    "Happiness is a journey, not a destination.",
    "The purpose of our lives is to be happy.",
    "Happiness depends upon ourselves.",
    "The most important thing is to enjoy your life — to be happy.",
    "Happiness is when what you think, what you say, and what you do are in harmony.",
    "Happiness is the best makeup.",
    "The secret of happiness is freedom.",
    "Do more of what makes you happy."
  ],
  wisdom: [
    "The only true wisdom is in knowing you know nothing.",
    "Knowledge is power. Information is liberating. Education is the premise of progress, in every society, in every family.",
    "The fool doth think he is wise, but the wise man knows himself to be a fool.",
    "It is better to keep your mouth closed and let people think you are a fool than to open it and remove all doubt.",
    "Patience is the companion of wisdom.",
    "Where there is no counsel, the people fall; but in the multitude of counselors there is safety."
  ],
  courage: [
    "Courage is not the absence of fear, but the triumph over it.",
    "It takes courage to grow up and become who you really are.",
    "Courage is resistance to fear, mastery of fear - not absence of fear.",
    "Without courage, you cannot practice any other virtue consistently.",
    "The ultimate measure of a man is not where he stands in moments of comfort and convenience, but where he stands at times of challenge and controversy.",
    "Fortune favors the bold."
  ],
  friendship: [
    "Friendship is born at that moment when one person says to another, 'What! You too? I thought I was the only one.'",
    "A true friend is someone who is always there for you, even when you're not at your best.",
    "Friendship is the hardest thing in the world to explain. It's not something you learn in school.",
    "A friend is one who overlooks your broken fence and admires the flowers in your garden.",
    "True friendship comes when the silence between two people is comfortable.",
    "Friends show their love in times of trouble, not just in times of happiness."
  ],
  failure: [
    "Failure is simply the opportunity to begin again, this time more intelligently.",
    "Don't fear failure. Fear being in the exact same place next year as you are today.",
    "Failure is a part of the process. You just learn to pick yourself back up.",
    "Mistakes are the portals of discovery.",
    "Our greatest glory is not in never failing, but in rising every time we fail.",
    "Failure is success in progress.",
    "Failure is the condiment that gives success its flavor.",
    "Do not be embarrassed by your failures, learn from them and start again.",
    "Every failure is a step to success.",
    "A failure is not a loss. It’s a gain. You learn. You change. You grow."
  ],
  sad: [
    "Tough times never last, but tough people do.",
    "Stars can't shine without darkness.",
    "Every day may not be good, but there is something good in every day.",
    "Out of difficulties grow miracles.",
    "Sadness flies away on the wings of time.",
    "The pain you feel today is the strength you feel tomorrow.",
    "Even the darkest night will end and the sun will rise.",
    "Sometimes you have to know sadness to know happiness.",
    "You are stronger than you think.",
    "This too shall pass."
  ],
  anxious: [
    "You don't have to control your thoughts. You just have to stop letting them control you.",
    "Anxiety does not empty tomorrow of its sorrows, but only empties today of its strength.",
    "Take a deep breath. You're going to be okay.",
    "Worrying is like paying a debt you don’t owe.",
    "You are stronger than your anxiety.",
    "Your mind will believe everything you tell it. Feed it hope. Feed it truth. Feed it with love.",
    "Anxiety happens when you think you have to figure everything out at once. Breathe. You’re strong.",
    "Don’t let your difficulties fill you with anxiety, after all it is only in the darkest nights that stars shine.",
    "Slow breathing is like an anchor in the midst of an emotional storm.",
    "You don't have to be perfect to be amazing."
  ],
  joy: [
    "Find joy in the journey.",
    "Joy is the simplest form of gratitude.",
    "Choose joy, even when you don't feel like it.",
    "Joy does not simply happen to us. We have to choose joy and keep choosing it every day.",
    "Let your joy be in your journey, not in some distant goal.",
    "Where there is love, there is joy.",
    "Joy is a net of love by which you can catch souls.",
    "Joy is the infallible sign of the presence of God.",
    "The pain passes, but the beauty remains.",
    "Joy comes from appreciating the small moments."
  ],
  adventure: [
    "Life is an adventure, not a package tour.",
    "Jobs fill your pocket, but adventures fill your soul.",
    "Adventure may hurt you, but monotony will kill you.",
    "The biggest adventure you can take is to live the life of your dreams.",
    "Adventure is worthwhile in itself.",
    "Fill your life with adventures, not things.",
    "Say yes to new adventures.",
    "Adventure is out there.",
    "Life is either a daring adventure or nothing at all.",
    "Travel far enough, you meet yourself."
  ],
  general: [
    "Believe in yourself and all that you are.",
    "The harder you work for something, the greater you'll feel when you achieve it.",
    "Don't watch the clock; do what it does. Keep going.",
    "Great things never come from comfort zones.",
    "Push yourself, because no one else is going to do it for you.",
    "Success is not for the lazy.",
    "Dream it. Wish it. Do it.",
    "Your limitation—it’s only your imagination.",
    "Do something today that your future self will thank you for.",
    "Don’t stop until you’re proud."
  ]
};

// Shuffle helper function to randomize array elements
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function QuoteGenerator() {
  const [topic, setTopic] = useState("");
  const [selectedQuotes, setSelectedQuotes] = useState<string[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [shakeInput, setShakeInput] = useState(false);
  // New state for dynamic placeholder text
  const [inputPlaceholder, setInputPlaceholder] = useState("Enter topic (e.g., success)");

  const popularTopicButtons = [
    { label: "Success", value: "success" },
    { label: "Life", value: "life" },
    { label: "Motivation", value: "motivation" },
    { label: "Happiness", value: "happiness" },
    { label: "Wisdom", value: "wisdom" },
    { label: "Courage", value: "courage" },
    { label: "Friendship", value: "friendship" },
  ];

  const generateQuotes = (selectedTopicValue?: string) => {
    const currentTopic = (selectedTopicValue || topic).trim().toLowerCase();
    const actualTopicKey = currentTopic === 'happiness' ? 'happy' : currentTopic;

    // Handle empty input: Trigger shake animation and change placeholder
    if (!currentTopic) {
      setShakeInput(true);
      setInputPlaceholder("Please input something"); // Change placeholder text

      // Revert shake and placeholder after animation duration
      setTimeout(() => {
        setShakeInput(false);
        setInputPlaceholder("Enter topic (e.g., success)"); // Revert to original placeholder
      }, 500); // Matches animation duration in globals.css

      setSelectedQuotes([]); // Clear any previously displayed quotes
      setHasSearched(false); // Reset search status
      return; // Stop function execution here
    }

    // Existing logic for valid topics
    let quotesToDisplay: string[];
    if (topicQuotes[actualTopicKey] && topicQuotes[actualTopicKey].length > 0) {
      const quotes = topicQuotes[actualTopicKey];
      const shuffled = shuffleArray(quotes);
      quotesToDisplay = shuffled.slice(0, 3);
    } else {
      quotesToDisplay = ["No quotes available for this topic. Try another!"]; // Message for valid but non-existent topic
    }

    setSelectedQuotes(quotesToDisplay);
    setHasSearched(true);
  };

  const handlePopularTopicClick = (topicValue: string) => {
    setTopic(topicValue);
    generateQuotes(topicValue);
  };

  return (
    <main
      className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-cover bg-center text-foreground transition-all duration-300"
      style={{ backgroundImage: "url('/my-bg.jpg')" }}
    >
      <Card className="w-full max-w-xl p-6 rounded-xl border border-border shadow-lg bg-card text-card-foreground space-y-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.005]">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="text-primary size-6" />
          <h1 className="text-3xl font-bold text-center">Quote Generator</h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            type="text"
            placeholder={inputPlaceholder} // Use the dynamic placeholder state
            value={topic}
            onChange={(e) => {
              setTopic(e.target.value);
              // If user starts typing while shaking, stop shake and revert placeholder
              if (shakeInput && e.target.value.length > 0) {
                setShakeInput(false);
                setInputPlaceholder("Enter topic (e.g., success)");
              }
              if (e.target.value === "") {
                setHasSearched(false);
                setSelectedQuotes([]);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                generateQuotes();
              }
            }}
            // Conditionally apply the shake animation class
            className={cn("flex-grow", {
              "animate-shake": shakeInput
            })}
          />

          <Button
            onClick={() => generateQuotes()}
            className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Get Quotes
          </Button>
        </div>

        {!hasSearched && (
          <div>
            <h2 className="text-lg font-semibold mb-3 text-center">Popular topics:</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {popularTopicButtons.map((btn) => (
                <Button
                  key={btn.value}
                  variant="secondary"
                  onClick={() => handlePopularTopicClick(btn.value)}
                  className="px-4 py-2 rounded-full text-sm"
                >
                  {btn.label}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Display quotes only if there are any */}
        {selectedQuotes.length > 0 && (
          <div className="grid gap-4">
            {selectedQuotes.map((quote, index) => (
              <Card key={index} className="bg-muted text-muted-foreground border border-border shadow-sm rounded-md transition-all duration-200 hover:shadow-md hover:-translate-y-1">
                <CardContent className="p-4 text-center text-base">{quote}</CardContent>
              </Card>
            ))}
          </div>
        )}
      </Card>
      <p className="text-center text-xs text-gray-400 dark:text-gray-600 mb-2 mt-4">
        Developed by Sanaullah
      </p>
    </main>
  );
}